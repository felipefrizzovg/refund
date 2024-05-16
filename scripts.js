// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense= document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
  // obtem o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "")

  // transforma o valor em centavos
  value = Number(value) / 100

  // atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
  // formata o valor no padrão BRL
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  // retorna o valor formatado
  return value
}

// Captura o evento de submit do formulário para obter os valores
form.onsubmit = (e) => {
  // previne o comportamento padrão de recarregar a pagina
  e.preventDefault()

  // cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }

  // chama a função que irá adicionar o item na lista
  expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o icone da category
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', newExpense.category_name)

    // cria as informações da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona o nome e categoria dentro da div de info
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace('R$', '')}`

    // Cria o icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute('src', 'img/remove.svg')
    removeIcon.setAttribute('alt', 'remover')

    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // adiciona o item na lista
    expenseList.append(expenseItem)

    // atualiza os totais
    updateTotals()
  } catch (err) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(err)
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children

    // Atualiza a quantidade de itens da lista
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Variavel para incrementar o total
    let total = 0

    // percorre cada item (li) da lista (ul)
    for(let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector('.expense-amount')

      // Remover caracteres não numéricos e substitui a virgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(',', ".")

      // converte valor para float
      value = parseFloat(value)

      // verifica se o numero é valido
      if(isNaN(value)) {
        return alert("Não foi possivel calcular o total. O valor não parece ser um número")
      }

      // incrementa o valor total
      total += Number(value)
    }
    
    // Cria a small para adicionar o R$ formatado
    const symbolBRL = document.createElement('small')
    symbolBRL.textContent = "R$"

    // formata o valor e remove o R$ que será exibido pela small
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // limpa o conteudo do elemento
    expensesTotal.innerHTML = ""

    // adiciona o simbolo da moeda e o valor total formatado
    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    console.log(error)
    alert('não foi possível atualizar os totais')
  }
}