const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

messageOne.textContent = 'Please provide an address'

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  messageOne.textContent = 'Loading......😊'
  messageTwo.textContent = ''
  messageThree.textContent = ''
  messageFour.textContent = ''
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.message
        messageThree.textContent = data.temperature
        messageFour.textContent = data.feelslike
      }
    })
  })
})
