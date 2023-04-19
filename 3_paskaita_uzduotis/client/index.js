fetch("http://localhost:3000/")
    .then((res)=>res.json())
    .then(data => showUsers(data))
  .catch(error => console.log(error))

  function showUsers(data) {
    data.forEach(data => {
      document.querySelector('tbody').append(createEle(data))
    })
}

function createEle(data){
    const password = document.createElement("td")
    const email = document.createElement("td")
    const name = document.createElement("td")
    
    const tableRow = document.createElement("tr")
   
    password.textContent = `${data.password}`
    email.textContent = `${data.email}`
    name.textContent = `${data.name}`
  
    tableRow.append(password, email, name)
  
    return tableRow
    
  }