import React from 'react'
import ReactDOM from 'react-dom'
import * as utils from './utils'
import Form from './form'
import uuid from 'uuid'

const createColor = (label, id = uuid(), color = '#000FFF', tokens) => ({ label, id, color, tokens })
const initialColors = [
  createColor('Keyword', undefined, undefined, [ 'keyword', 'modifier', 'variable.language.this', 'support.type.object', 'constant.language' ]),
  createColor('String', undefined, undefined, [ 'string' ]),
  createColor('Number', undefined, undefined, [ 'constant.numeric' ]),
  createColor('Boolean!', undefined, undefined, [ 'constant.language.boolean' ]),
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
    console.log('id', id, 'newColor', newColor)
    const newColors = this.state.colorOptions.map(el => 
      (el.id === id) ? { ...el, color: newColor } : el
    )
    console.log(newColors)
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
