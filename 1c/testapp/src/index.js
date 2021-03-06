import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Note from './components/Note';
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import * as serviceWorker from './serviceWorker';
import './index.css'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import NoteForm from './components/NoteForm'

//const Display = ({counter}) => <div><p>{counter}</p></div>
  

//const Button = ({handleClick, text}) =><div><button onClick={handleClick}>{text}</button></div>



// 1. SIMPLE STATE IMPLEMENTATION
/*
const App = () => {

  const [ counter, setCounter ] = useState(0)

  const increase = () => {
    setCounter(counter + 1)
  }

  const decrease = () => {
    setCounter(counter - 1)
  }

  return (
    <div>
      < Button handleClick = {increase} text = 'Increase' />
      < Display counter={counter} />
      < Button handleClick = {decrease} text = 'Decrease' />
      
    </div>
  )

}
*/


// 2. COMPLEX STATE IMPLEMENTATION  first iteration
const Display = ({counter}) => <div><p> {counter} </p></div>
const Button = ({handleClick, text}) => <div><button onClick={handleClick} >{text}</button></div>

/*
const App = () => {

  //********HigherOrder functions practice********
  const kids = [
    {name:'jason', age:13, allowance:2300},
    {name:'Mary', age:13, allowance:3400},
    {name:'Son', age:17, allowance:10500},
    {name:'Kris', age:14, allowance:5300},
    {name:'Kelly', age:17, allowance:9900},
    {name:'Mason', age:15, allowance:6400},
    {name:'Jenny', age:11, allowance:3500},
  ]
  
  const is13 = (kids)=> kids.age === 13
  
  const thirteen = kids.filter(is13)
  const namesonly = kids.map((kid)=> kid.name) 
  const ageOnly = kids.map((kid)=>kid.age)
  console.log(namesonly)
  console.log(ageOnly)

  const allowancesSum = kids.reduce((sum, kid) => {
    return sum + kid.allowance
  }, 0)

  console.log(allowancesSum)

  //*********END OF HIGHER ORDER FUNCS PRACTICE*********
  
  //first 
  /* 
  const [ left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  */

  //second
  /*
  const [click, setClick] = useState({ left:0, right:0})


  const leftClick = () => {
    const newClick = {
      left: click.left + 1,
      right: click.right
    }
    setClick(newClick)

  }
  
  const rightClick = () => {
    const newClick = {
      left: click.left,
      right: click.right + 1
    }
    setClick(newClick)
  }
  */

  //third , object spread

  /*
  const [click, setClick] = useState({ left:0, right:0})

  const leftClick = () => {
    const newClick = {
      ...click,  //object spread
      left: click.left + 1
    }
    setClick(newClick)
  }

  const rightClick = () => {
    const newClick = {
      ...click,   //object spread
      right: click.right + 1
    }
    setClick(newClick)
  }
 */
  //fourth, handling Arrays
  /*
  const [click, setClick] = useState({ left:0, right:0})
  const [allClicks, setAll] = useState([])

  const leftClick = () => {
    const newClick = {
      ...click,  //object spread
      left: click.left + 1
    }
    setClick(newClick)
    setAll(allClicks.concat('L'))
  }

  const rightClick = () => {
    const newClick = {
      ...click,   //object spread
      right: click.right + 1
    }
    setClick(newClick)
    setAll(allClicks.concat('R'))
  }

  //History component Conditional Rendering

  const History = (props) =>{
    if (props.allClicks.length === 0){
      return(
        <div>
          <p>the app is used by pressing the buttons</p>
        </div>
      )
    }

    return(
      <div>
        button press history: {props.allClicks.join('')}
      </div>
    )
  }


  return (
    <div>
      <Display counter={click.left} />
      <Button handleClick={leftClick} text='left' />
      <Button handleClick={rightClick} text='right' />
      <Display counter={click.right} />
      <History allClicks={allClicks} />
    </div>
  )

}
*/


const promise = axios.get('http://localhost:3001/notes')
promise.then(response => console.log(response.data))

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

/************Part2 Forms***************/
const App = () => {
  const [notes, setNotes] = useState([])
  //const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  // part 5 additions
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

  const noteFormRef = useRef()

  useEffect( () => {
    console.log('Effect')
    noteService
            .getAll()
            .then( response => {
            console.log('promise fulfilled')
            setNotes(response.data)
          })
    }, [])

  
  useEffect( () => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  
  const notesToShow = showAll ? notes:notes.filter(note => note.important === true)
  
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then( response => {
        setNotes(notes.concat(response.data))
      })
    //setNotes(notes.concat(newObject))
    //setNewNote('')

  }

  const toggleImportanceOf = (id) => {
    const note = notes.find( note => note.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then( response => {
        setNotes(notes.map( note => note.id !== id? note:response.data))
      })
      .catch( error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server `
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
      })
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      ) 
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (error) {
      setErrorMessage('Wrong Credentials')
      setTimeout( () => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  
  
  const loginForm = () => {
    
    return (
      <div>
        <Toggable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            usernameChange={({ target }) => setUsername(target.value)}
            passwordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </Toggable> 
      </div>
    )
  }


  const noteForm = () => {

    return (
      <Toggable buttonLabel='new Note' ref={noteFormRef}>
        <NoteForm createNote={addNote}/>
      </Toggable>
    )
  }
  

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      { /* user === null && loginForm() */}
      { /*user !== null && note()*/ }

      {
        user === null?
          loginForm():
          <div>
            <p>{ user.name } is logged in</p>
            { noteForm() }
          </div> 
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => 
          <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
       
    </div>
  )
}


const notes = [{id:0, val:'foo'}, {id:1, val:'foobar'}, {id:2, val:'barfoo'}]

ReactDOM.render(
  <React.StrictMode>
    <App  notes={ notes } />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
