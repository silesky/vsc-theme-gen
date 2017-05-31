import React from 'react'
import ReactDOM from 'react-dom'
import config from './config'
import * as utils from './utils'
class App extends React.Component {
  constructor () {
    super()
    this.state = {
      tokens: []
    }
  }
  componentDidMount () {
    utils
      .getTokens(`console.log('hi')`)
      .then(dataWithClassNames => this.setState({ tokens: dataWithClassNames }))
  }
  onColorizeClick () {}
  render () {
    return (
      <div>
        <h1>Hello World!!</h1>
        <textarea rows='5' />
        <button onClick={() => this.onColorizeClick()}>COLOR</button>
        <pre>
          {this.state.tokens.map(({ classNames, code }, ind) => {
            return <span key={ind} className={classNames}>{code}</span>
          })}
        </pre>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
