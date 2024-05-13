import { useState } from 'react'
import Input from './components/Input'
import Form from './components/Form'
import ContactList from './components/ContactList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number:"11-22-33"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const addContact = (event) => {
    event.preventDefault()
    if (persons.map(obj => obj.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = persons.concat({name: newName, number: newNumber})
      setPersons(newPersons)
    }
  }

  const content = persons.filter((contact) => contact.name.toUpperCase().includes(nameFilter.toUpperCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Input onChange={handleFilterChange} value={nameFilter} text="filter shown with" />
      <Form 
        onSubmit={addContact} 
        onNameChange={handleNameChange} 
        nameValue={newName} 
        onNumberChange={handleNumberChange}
        numberValue={newNumber}/>

      <h2>Numbers</h2>
      <ContactList contancts={content} />
    </div>
  )
}

export default App