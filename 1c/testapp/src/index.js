import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';


const Display = ({counter}) => <div><p>{counter}</p></div>
  

const Button = ({handleClick, text}) =><div><button onClick={handleClick}>{text}</button></div>





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

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
