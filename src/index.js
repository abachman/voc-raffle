import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import md5 from 'js-md5'

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
  [ 'Abdullah', 'abdullahbudri@gmail.com', ],
  [ 'Adam', 'adam.bachman@gmail.com' ],
  [ 'Bransyn', 'bransynluther@gmail.com', ],
  [ 'Brendan', 'brendanbeltz@gmail.com', ],
  [ 'Gabe', 'gabezurita@gmail.com', ],
  [ 'Jamie', 'jgaskins@gmail.com', ],
  [ 'Jeesoo', 'ysujs951@gmail.com', ],
  [ 'Jess', 'jessbeach1@gmail.com', ],
  [ 'Jessica', 'jmdembe@gmail.com', ],
  [ 'Mae', 'maebeale@gmail.com', ],
  [ 'Miranda', 'msw3bb@virginia.edu', ],
  [ 'Paige', 'paigelfink@gmail.com', ],
  [ 'Rachel', 'rachellesleywyatt@gmail.com', ],
  [ 'Robb', 'robb@thekidds.org', ],
  [ 'Svetlana', 'svileshina@gmail.com', ],
]

PEOPLE.shuffle()

const Image = ({ email }) => {
  const imgUrl = `https://www.gravatar.com/avatar/${md5(email)}?d=monsterid`
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
  console.log('hey from in an app')

  const [ people, setPeople ] = useState(PEOPLE);
  const [ isRunning, setIsRunning ] = useState(false);

  useInterval(() => {
    if (isRunning && people.length > 1) {
      const nextPeople = people.slice()
      nextPeople.random_pop()
      console.log("PEOPLE", nextPeople)
      setPeople(nextPeople)
    }
  }, 500)

  let table = []
  console.log("rebuild table with", people)
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

