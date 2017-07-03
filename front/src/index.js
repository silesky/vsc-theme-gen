import React from 'react'
import ReactDOM from 'react-dom'
import * as utils from './utils'
import Form from './form'
import uuid from 'uuid'
import styled from 'styled-components'

const defaultColor = '#0000FF'
const createColor = (label, tokens, initialColor = defaultColor) =>
  ({ label, tokens, color: initialColor, id: uuid() })

const initialColors = [
  createColor('Keyword', [ 'keyword', 'modifier', 'variable.language.this', 'support.type.object', 'constant.language' ]),
  createColor('Constant'),
  createColor('String', [ 'string' ]),
  createColor('Number', [ 'constant.numeric' ]),
  createColor('Boolean', [ 'constant.language.boolean' ]),
  createColor('Punctuation'),
  createColor('Function-call'), // e.g.
  createColor('Function'), // literal keyword
  createColor('Type'), // e.g. 'var, let, const'
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
    const defaultVal = utils.getTokens.toString()
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
    console.log(this.state.colorOptions)
    const newColor = event.target.value
    const newColors = this.state.colorOptions.map(el =>
      (el.id === id) ? { ...el, color: newColor } : el
    )
    this.setState({ colorOptions: newColors })
  }

  whichColor (classNames) {
    const findColorByLabel = (label = 'String') => {
      // take each word's classNames and see if it contains a label (i.e. 'string'). If it does, grab the color that matches thart
      const foundColor = this.state.colorOptions.find(el => el.label === label).color
      return (classNames.toLowerCase().match(label.toLowerCase())) ? foundColor : false
    }
    const labels = this.state.colorOptions.map(({ label }) => label)
    const color = labels
      .map(l => findColorByLabel(l))
      .filter(l => l)[0]
    return color
  }
  // e.g. takes "string.quoted.single.js" and returns a color

  render () {
    const Word = styled.span`
      color: ${props => this.whichColor(props.className)}
    `
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
          {this.state.tokens.map(({ classNames, code, scope }, ind) => {
            return <Word key={ind} className={classNames} scope={scope}>{code}</Word>
          })}
        </pre>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
