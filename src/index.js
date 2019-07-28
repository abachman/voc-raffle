import React from 'react'
import ReactDOM from 'react-dom'

console.log('hello from here')

const App = () => {
  console.log('hey from in an app')

  return (
    <h1>Hello World</h1>
  )
}

ReactDOM.render(<App />, document.getElementById("react-root"))

