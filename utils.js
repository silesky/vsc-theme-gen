const Registry = require('vscode-textmate').Registry
const registry = new Registry()
const JSSyntaxPath = 'JavaScript.plist'
const grammar = registry.loadGrammarFromPathSync(JSSyntaxPath)

module.exports = {
  tokenize: str => grammar.tokenizeLine(str)
}
