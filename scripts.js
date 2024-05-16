// Seleciona os elementos do formulário
const form = querySelector("form")
const amount = document.getElementById("amount")
const expense= document.getElementById("expense")
const category = document.getElementById("category")

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

form.onsubmit = (e) => {
  e.preventDefault()
}