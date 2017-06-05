import config from './config'
/**
 * Cleans up the scopes array generated by vscode-textmate and converts it to a class name string
 * @param { array } scopes
 * @returns { string } class name(s)
 */
export const scopesToClasses = scopes =>
  scopes
    .join(' ')
    .replace(/.js/gi, '') // remove , .js
    .replace('source', '') // remove 'source'
    .trim() // get rid of leading and trailing spaces, but not space between

export const getTokens = code => {
  const fetchData = {
    method: 'POST',
    body: JSON.stringify({
      code: code,
      language: 'js',
    }),
    headers: { 'Content-Type': 'application/json' },
  }
  return fetch(`${config.server}/api/tokenize`, fetchData)
    .then(res => res.json())
    .then(res => {
      return res.data.map(el => {
        el.classNames = scopesToClasses(el.scopes)
        return el
      })
    })
}
