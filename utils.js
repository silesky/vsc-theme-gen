const Registry = require('vscode-textmate').Registry
const registry = new Registry()
const JSSyntaxPath = 'JavaScript.plist'
const grammar = registry.loadGrammarFromPathSync(JSSyntaxPath)

const generateMarkup = (code, tokens) => {
  return tokens
    .map(el => {
      el.code = code.slice(el.startIndex, el.endIndex) // add a new 'code' property
      return el
    })
    .map(el => {
      const classes = el.scopes
        .join(' ')
        .replace(/.js/gi, '') // remove , .js
        .replace(/\./gi, '-') // replace periods with dashes
        .replace('source', '') // remove 'source'
        .trim() // get rid of leading and trailing spaces, but not space between
      return `<span class='${classes}'>${el.code}</span>` // create the markup
    })
}

/** Returns a json object that describes the grammar of the code string
 * @param { string } code - code to tokenize
 * @param { language } language - e.g. js, python
 * @returns { object } representation of token
 */
const tokenize = (code, language) => {
  const tokens = grammar.tokenizeLine(code).tokens
  const markup = generateMarkup(code, tokens)
  return markup
}

module.exports = {
  tokenize
}
