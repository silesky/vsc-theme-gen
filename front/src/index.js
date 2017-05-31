import React from 'react'
import ReactDOM from 'react-dom'
import config from './config'
class App extends React.Component {
  constructor () {
    super()
    this.state = {
      tokens: [],
    }
  }
  componentDidMount () {
    const fetchData = {
      method: 'POST',
      body: JSON.stringify({
        code: 'console.log("hello world")',
        language: 'js',
      }),
      headers: { 'Content-Type': 'application/json' },
    }
    fetch(`${config.server}/api/tokenize`, fetchData)
      .then(res => res.json())
      .then(tokens => {
        console.log(tokens)
        this.setState({ tokens: tokens.msg })
      })
  }
  render () {
    return (
      <div>
        <h1>Hello World!!</h1>
        <pre>{this.state.tokens}</pre>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
