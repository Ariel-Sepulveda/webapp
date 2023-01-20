import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState('')
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const [query, setQuery] = useState('')
  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    if (newName !== '' && newNumber !== '') {
      const person = persons.find(p => p.name === newName)
      if (person === undefined) {
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
          .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setMessage({ text: `Added ${returnedPerson.name}`, type: 'success'})
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      } else {
        if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
          personService
            .update(person.id, { ...person, number: newNumber })
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
              setMessage({ text: `Updated ${returnedPerson.name} number`, type: 'success'})
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setNewName('')
              setNewNumber('')
            }).catch(error => {
              setMessage({ text: `Information of ${person.name} has already been removed from server`, type: 'error'})
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== person.id))
            })
        }
      }
    }
  }

  const handlerDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletee(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter search={query} handler={handleSearch} />
      <h2>add a new</h2>
      <PersonForm formHandler={handleNewPerson} name={newName} nameHandler={handleNameChange} number={newNumber} numberHandler={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons query={query} persons={persons} handlerDelete={handlerDelete} />
    </div>
  )
}

const Filter = ({ search, handler }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={handler} />
    </div>
  )
}

const PersonForm = ({ name, nameHandler, number, numberHandler, formHandler }) => {
  return (
    <form onSubmit={formHandler}>
      <div>
        name: <input value={name} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={number} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ query, persons, handlerDelete }) => {
  return (
    <ul>
      {query === ''
        ? (persons.map(n =>
          <li key={n.id}>
            {`${n.name} ${n.number}`}
            <button onClick={() => handlerDelete(n.id)}>delete</button>
          </li>))
        : persons.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).map(n =>
          <li key={n.id}>
            {`${n.name} ${n.number}`}
          </li>)}
    </ul>
  )
}

export default App