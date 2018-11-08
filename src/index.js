document.addEventListener('DOMContentLoaded', () => {
  // ************************************************
// ***************** Variables **********************
  // ************************************************

  let dogs = []
  const table = document.querySelector('#table-body')
  const form = document.querySelector('#dog-form')
  let editParent;
  let id;
  let beforeDog;


  // ************************************************
// *********** Fetch for all dogs *******************
  // ************************************************

  fetch('http://localhost:3000/dogs')
    .then((response)=>{return response.json()})
    .then((json)=> {
      dogs = json
      dogs.forEach((dog)=>{
        table.innerHTML +=`
          <tr data-id=${dog.id}>
            <td>Dog ${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button>Edit</button></td>
          </tr>`
      }) // end of the forEach for adding to DOM
    }) // end of the fetch


  // ************************************************
  // ************* Event Listener *******************
  // ************************************************

  table.addEventListener('click', (event)=>{
    if (event.target.localName === 'button') {
      editParent = event.target.parentElement.parentElement;
      id = event.target.parentElement.parentElement.dataset.id;
      beforeDog = dogs.find( dog=> dog.id== id);
      let beforeName = beforeDog.name;
      let beforeBreed = beforeDog.breed;
      let beforeSex = beforeDog.sex;
      form.children.name.value = beforeName;
      form.children.breed.value = beforeBreed;
      form.children.sex.value = beforeSex;
      form.children.button.value = 'Edit';
    } // end of if statement for edit button on table
  }) // end of event listener for click on table

  form.addEventListener('submit', (event)=>{
    if (form.children.button.value === 'Edit') {
      event.preventDefault();
      let updatedName = form.children.name.value;
      let updatedBreed = form.children.breed.value;
      let updatedSex = form.children.sex.value;

      fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          name: updatedName,
          breed: updatedBreed,
          sex: updatedSex
        }) // end of json stringify
      }).then((response)=>{
        if (response.ok) {
          beforeDog.name = updatedName;
          beforeDog.breed = updatedBreed;
          beforeDog.sex = updatedSex;
          
          editParent.innerHTML = `
          <td>Dog ${updatedName}</td>
          <td>${updatedBreed}</td>
          <td>${updatedSex}</td>
          <td><button>Edit</button></td>`
          form.reset()
          form.children.button.value = 'Submit';
        } // end of then for rendering
      }) //end of fetch
    } // end of if for edit
  }) //end of event listener for form submit


})// end of the event listener for DOMContentLoaded
