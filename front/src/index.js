import React from 'react'
import ReactDOM from 'react-dom'
import * as utils from './utils'
import Form from './form'
import uuid from 'uuid'

const createColor = (label, color = '#000FFF') => ({ label, id: uuid(), color })
const initialColors = [
  createColor('Keyword', undefined, ['keyword', 'modifier', 'variable.language.this', 'support.type.object', 'constant.language']),
  createColor('String', undefined, ['string']),
  createColor('Number', undefined, ['constant.numeric'] ),
  createColor('Boolean!', undefined, ['constant.language.boolean']),
]
class App extends React.Component {
  constructor () {
    super()
    this.handleFormChange = this.handleFormChange.bind(this)
    this.state = {
      tokens: [],
      inputString: null,
      colorOptions: initialColors,
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
  changeColor (id, event) {
    const newColor = event.target.value
    console.log('newColor', newColor)
    const newColors = this.state.colorOptions.map((el) => {
      if (el.id === id) {
        el.color = newColor
      }
      return el
    });
    this.setState({ colorOptions: newColors })
  }

  render () {
    return (
      <div>
        <h1>VSCode Theme Color Generator</h1>
        {this.state.colorOptions.map(({ label, id, color }) => {
          return (
            <Form handleChangeColor={this.changeColor.bind(this, id)} color={color} label={label} id={id} key={id} />
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
