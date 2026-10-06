const ingredientsList = document.querySelector('.ingredientsList')
const burgerList = document.querySelector('.burgerList')
const total = document.querySelector('.total')

const ingredients = [
  {
    name: 'Cheese',
    price: 2
  },
  {
    name: 'Tomato',
    price: 1
  },
  {
    name: 'Meat',
    price: 4
  },
  {
    name: 'Salad',
    price: 1
  },
  {
    name: 'Onion',
    price: 1
  }
]
let burger = []
function renderingredients (ingredientsRend) {
  ingredientsRend.forEach(element => {
    const ingredientsBox = document.createElement('div')
    const ingredientsinfo = document.createElement('p')
    const addBtn = document.createElement('button')

    ingredientsinfo.textContent = element.name + ' - ' + element.price + '$'
    addBtn.textContent = 'Add'

    ingredientsList.append(ingredientsBox)
    ingredientsBox.append(ingredientsinfo)
    ingredientsBox.append(addBtn)

    addBtn.addEventListener('click', function () {
      burger.push(element)
      renderBurger()
    })
  })
}

function renderBurger () {
  burgerList.innerHTML = ''
  burger.forEach((element, index) => {
    const burgerBox = document.createElement('div')
    const burgerinfo = document.createElement('p')
    const delBtn = document.createElement('button')

    delBtn.textContent = 'Delete'

    burgerList.append(burgerBox)
    burgerBox.append(burgerinfo)
    burgerBox.append(delBtn)
    burgerinfo.textContent = element.name + ' - ' + element.price + '$'
    delBtn.addEventListener('click', function () {
      burger.splice(index, 1)
      renderBurger()
    })
  })
  let finalSum = burger.reduce(function (sum, element) {
    return sum + element.price
  }, 0)

  total.textContent = 'Total: $' + finalSum
}

renderingredients(ingredients)
