const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const casual = require('casual');

app.get("/randomUser", (req, res)=>{
  const user = `${casual.first_name} ${casual.last_name}`
  res.send(user); 
})

app.get("/randomColor", (req, res)=>{
  const color = `${casual.color_name }`
  res.send(color); 
})
app.get("/randomColors", (req, res)=>{
  const colors = []
  for (let i= 0; i <5 ; i++){
    const color = `${casual.color_name}`
    colors.push(color)
  }
  res.send(colors); 
})

app.get("/randomPlaces", (req, res)=>{
  const places = []
  const number = Math.floor(Math.random() * 5 + 1)

  for (let i= 0; i <number; i++){
    const user = {
      country: `${casual.country}`,
      city: `${casual.city}`,
      address: `${casual.address}`
    }
    places.push(user)
  }
  res.send(places); 
})

app.listen(port, ()=>{
  console.log(`Server is listening on port on port ${port}`)
})