// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense= document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")

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
  } catch (err) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(err)
  }
}