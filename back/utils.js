const Registry = require('vscode-textmate').Registry
const registry = new Registry()
const JSSyntaxPath = 'JavaScript.plist'
const grammar = registry.loadGrammarFromPathSync(JSSyntaxPath)

/** converts user's code to html with tags representing the different elements
 * @param { string } code - code to tokenize
 * @param { string } language - e.g. js, python
 * @returns { string } representation of token
 */
const tokenize = (code, language) => {
  const tokens = grammar.tokenizeLine(code).tokens
  const tokensWithCode = tokens.map(el => {
    el.code = code.slice(el.startIndex, el.endIndex) // add a new 'code' property
    return el
  })
  return tokensWithCode
}

module.exports = {
  tokenize,
}
