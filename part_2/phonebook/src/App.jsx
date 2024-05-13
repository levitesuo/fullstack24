import { useState, useEffect } from 'react'
import Input from './components/Input'
import Form from './components/Form'
import ContactList from './components/ContactList'

import personsService from './services/personsService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value) 
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const getHook = () => {
    personsService
      .getAll()
      .then(response => setPersons(response.data))
  }

  const addContact = (event) => {
    event.preventDefault()
    if (persons.map(obj => obj.name).includes(newName)) {
      updateContact()
    } else {
      personsService
        .create({name:newName, number:newNumber, id:String(persons.length + 1)})
        .then(response => setPersons(persons.concat(response.data)))
      setNewName('')
      setNewNumber('')
    }
  }

  const removeContact = contact => {
    if (window.confirm(`Do you really want to delte ${contact.name}?`)){
      personsService
        .remove(contact.id)
        .then(()=>{
          const newPersons = persons.filter(person => person.id !== contact.id)
          setPersons(newPersons)
        })
      }
  }

  const updateContact = () => {
    if (window.confirm(`Do you want to update the contact ${newName}?`)){
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.map(person => person.name.toUpperCase()).indexOf(newName.toUpperCase()) + 1)
      }

      personsService
        .update(newPerson)
        .then(() => {
          const newPersons = [...persons]
          newPersons[parseInt(newPerson.id)-1] = newPerson
          console.log(newPersons)
          setPersons(newPersons)
        })
    }
  }

  useEffect(getHook, [])
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
      <ContactList contancts={content} removeCommand={removeContact}/>
    </div>
  )
}

export default App