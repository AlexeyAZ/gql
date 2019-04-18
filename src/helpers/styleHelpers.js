const firstSymbolToLowerCase = str => {
  const firstSymbol = str[0]
  const otherSymbols = str.slice(1)
  const firstSymbolLowerCase = firstSymbol.toLowerCase()

  return firstSymbolLowerCase + otherSymbols
}

const getStyleObj = obj => {
  const variables = {}
  Object.keys(obj).forEach(item => {
    if (item.includes('.')) {
      const beforePoint = item.slice(0, item.indexOf('.'))
      const afterPoint = firstSymbolToLowerCase(item.slice(item.indexOf('.') + 2))
      if (!variables[beforePoint] && typeof variables[beforePoint] !== 'object') {
        variables[beforePoint] = {}
      }
      variables[beforePoint][afterPoint] = obj[item]
    } else {
      variables[item] = obj[item]
    }
  })
  return variables
}

const getIntValue = value => parseInt(value, 10)

export default { getStyleObj, getIntValue }
