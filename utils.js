const Registry = require('vscode-textmate').Registry
const registry = new Registry()
const JSSyntaxPath = 'JavaScript.plist'
const grammar = registry.loadGrammarFromPathSync(JSSyntaxPath)

module.exports = {
  /** Returns a json object that describes the grammar of the code string
   * @param { string } code - code to tokenize
   * @param { language } language - e.g. js, python
   * @returns { object } representation of token
   */
  tokenize: (code, language) => {
    return grammar.tokenizeLine(code)
  }
}
