import React from 'react'
import ReactDOM from 'react-dom'
import * as utils from './utils'
import Form from './form'
import uuid from 'uuid'

const createColor = (label, value = '#000FFF') => ({ label, id: uuid(), value })
const colorsOptions = [
  createColor('Keyword'),
  createColor('String'),
  createColor('Number'),
  createColor('Boolean!'),
]
class App extends React.Component {
  constructor () {
    super()
    this.handleFormChange = this.handleFormChange.bind(this)
    this.state = {
      tokens: [],
      inputString: null,
      colorOptions: colorsOptions,
    }
  }
  componentDidMount () {
    const defaultVal = `console.log('hi')`
    utils
      .getTokens(defaultVal)
      .then(tokens => this.setState({ inputString: defaultVal, tokens }))
  }

  handleFormChange ({ target: { value } }) {
    this.setState({ inputString: value })
  }

  onColorizeClick () {
    utils
      .getTokens(this.state.inputString)
      .then(tokens => this.setState({ tokens }))
  }

  render () {
    return (
      <div>

        <h1>Hello World!!</h1>
        {this.state.colorOptions.map(({ label, id }) => {
          return (
            <Form label={label} id={id} key={id} />
            )
        })
        }
        <textarea rows="5" onChange={this.handleFormChange} />
        <button type="submit" onClick={() => this.onColorizeClick()}>
          COLOR
        </button>
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
