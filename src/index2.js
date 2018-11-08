// ******************** variables **********************************

let url = `http://localhost:3000/dogs`
let table;
let form;
let editId;
let editRow;

// ******************** event listeners *****************************

document.addEventListener('DOMContentLoaded', (event)=>{
  table = document.querySelector('#table-body')
  form = document.querySelector('#dog-form')

  fetchDogs()

  table.addEventListener('click', (event)=>{
    if (event.target.className === 'button') {
      editDogHandler(event)
    }
  })

  form.addEventListener('submit', (event)=>{
    submitHandler(event)
  })

})

// ******************** helper functions ******************************

function fetchDogs(){
  fetch(url)
  .then(response=>response.json())
  .then((json)=>{
    addDogsToDom(json)
  })
}

function addDogsToDom(json){
  json.forEach((dog)=>{
    addSingleDogToDom(dog)
  })
}

function addSingleDogToDom(dog){
  table.innerHTML+= `
  <tr data-id=${dog.id}>
    <td class="name">${dog.name}</td>
    <td class="breed">${dog.breed}</td>
    <td class="sex">${dog.sex}</td>
    <td ><button class='button'>Edit</button></td>
  </tr>
  `
}

function editDogHandler(event){
  editId = event.target.parentElement.parentElement.dataset.id
  editRow = event.target.parentElement.parentElement

  let oldName = event.target.parentElement.parentElement.querySelector('.name').innerText
  let oldBreed = event.target.parentElement.parentElement.querySelector('.breed').innerText
  let oldSex = event.target.parentElement.parentElement.querySelector('.sex').innerText

  let inputName = form.children.name
  let inputBreed = form.children.breed
  let inputSex = form.children.sex

  inputName.value = oldName
  inputBreed.value = oldBreed
  inputSex.value = oldSex
}

function submitHandler(event){
  event.preventDefault()
  let newSex = event.target.children.sex.value
  let newName= event.target.children.name.value
  let newBreed = event.target.children.breed.value
  fetch(url+`/${editId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      name: newName,
      breed: newBreed,
      sex: newSex
    })
  }).then((response)=>{
    if (response.ok) {
      return response.json()
    }
  }).then((json)=>{
    editRow.innerHTML= `
    <tr data-id=${json.id}>
      <td class="name">${json.name}</td>
      <td class="breed">${json.breed}</td>
      <td class="sex">${json.sex}</td>
      <td ><button class='button'>Edit</button></td>
    </tr>
    `
    form.reset()
  })


}
