// providing function for ajax call in person.ejs


function loadPeople() {
  const target = document.getElementById("target")
  fetch('http://localhost:5000/people')
    .then(data => {       
      return data.json()
    })
      .then(res => {
        let html = ''
        console.log(res)
        res.forEach(person => {
          html += '<li>' + person.name + '</li>'
        })
        target.innerHTML = html
    })
}



// Started with a pure html page. Our form tags had a http 
// action attached that would redirect the page each form submission.
// code below prevents all default submits
// function submitForm(e) {
//   e.preventDefault();
// }
// const forms = document.getElementsByTagName('form')
// for(let i = 0; i < forms.length; i++){
//   forms[i].addEventListener('submit', submitForm);
// }


//this is how you do a single form cancel default
// function deletePerson(e) {
//   const deleteInput = document.querySelector(".delete input");
//   e.preventDefault();
//   fetch("http://localhost:5000/deletePerson", {
//     method: "POST"
//   })
//     .then(data => {
//       return data.json();
//     })
//     .then(res => {
//       deleteInput.value = "";
//       deleteInput.placeholder = res.msg;
//     });
// }
// const deleteForm = document.querySelector(".delete");
// console.log(deleteForm.action);
// deleteForm.addEventListener("submit", deletePerson);



// event object has all the element's attributes so no need to pass parameters
// to pass data in fetch you need to include the header type, and the body.

function cancelRedirects(e) {
  e.preventDefault();
  let action = e.target.action
  let formClass = e.target.className
  const data={};
  const inputs = document.querySelectorAll('.'+formClass + ' input');
  if (formClass === 'add'){
    data.name = e.target.name.value
  }
  fetch(action, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(data => {
      return data.json();
    })
    .then(res => {
      for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
        inputs[i].placeholder = res.msg;
      }
    });
}

const forms = document.querySelectorAll("form");
for (let i = 0; i < forms.length; i++) {
  forms[i].addEventListener("submit", cancelRedirects);
}