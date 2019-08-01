import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import './core-ext/each_slice'
import './core-ext/shuffle'
import './core-ext/random_pop'
import './style.css'

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const PEOPLE = [
  [ 'Abdullah', '1968d12d3a8152c00486b69dd2208c2a' ],
  [ 'Adam', '939848268c73b4049f90ee0703df7c68' ],
  [ 'Bransyn', '295744ee9f01c7df6f14415198c709d2' ],
  [ 'Brendan', '2951ba18bfbc833b11008fad2185d8ae' ],
  [ 'Gabe', 'bf553ec76f2b6255deb47d9d8633df64' ],
  [ 'Jamie', '76de16cb97b382f990c4798277e37bab' ],
  [ 'Jeesoo', 'cdb94ae3973257571d99e66be1ab0894' ],
  [ 'Jess', '6254a7c32291e428e3138ef98ec18f75' ],
  [ 'Jessica', '35ef6db3a9ee1a2f0bc71fe0803966b4' ],
  [ 'Mae', '2fae245f92a4c73daaa972ae6dccb2fb' ],
  [ 'Miranda', 'f6e1b9f0339ccfdd559744d2f7cf7166' ],
  [ 'Paige', '9e451e3cc242a8b40e5af81890b248b0' ],
  [ 'Rachel', '3e4ea8302fc4154e17be4bfaa9e30e0f' ],
  [ 'Robb', '6340bd48e9f1248c6344d3008c0a08d7' ],
  [ 'Svetlana', '8d697b8ed37d4c477bd7f6a207ef1547' ]
]

PEOPLE.shuffle()

const Image = ({ email }) => {
  const imgUrl = `https://www.gravatar.com/avatar/${email}?d=monsterid`
  return (
    <img src={imgUrl} />
  )
}

const Row = ({ people }) => {
  return (
    <tr key={people[0][1]}>
      {
        people.map(person => {
          return (
            <td key={person[0]}>
              <Image email={person[1]} />
              <p>{person[0]}</p>
            </td>
          )
        })
      }
    </tr>
  )
}

const App = () => {
  const [ people, setPeople ] = useState(PEOPLE);
  const [ isRunning, setIsRunning ] = useState(false);

  useInterval(() => {
    if (isRunning && people.length > 1) {
      const nextPeople = people.slice()
      nextPeople.random_pop()
      setPeople(nextPeople)
    }
  }, 500)

  let table = []
  people.eachSlice(4, (slice) => table.push(<Row people={slice} key={slice[0][0]} />))

  return (
    <div>
      <div className='button' onClick={() => setIsRunning(true)}>
        <h3>GO!</h3>
      </div>
      <table>
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("react-root"))

