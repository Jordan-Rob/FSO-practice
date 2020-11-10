import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Note from './components/Note';
import * as serviceWorker from './serviceWorker';


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
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect( () => {
    console.log('Effect')

    axios
      .get('http://localhost:3001/notes')
      .then( response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })

  }, [])


  
  const notesToShow = showAll ? notes:notes.filter(note => note.important === true)
  
  const addNote = (event) => {
    event.preventDefault()
    const newObject = {
      content:newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }

    axios
      .post('http://localhost:3001/notes', newObject)
      .then( response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })


    //setNotes(notes.concat(newObject))
    //setNewNote('')

  }

  const handleNoteChange = (event) =>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note.content} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   
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
