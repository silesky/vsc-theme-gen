export const scopesToClasses = scopes =>
  scopes
    .join(' ')
    .replace(/.js/gi, '') // remove , .js
    .replace(/\./gi, ' ') // replace periods with spaces
    .replace('source', '') // remove 'source'
    .trim() // get rid of leading and trailing spaces, but not space between
