const { override, addLessLoader } = require('customize-cra')
const rewireStyledComponents = require('react-app-rewire-styled-components')

const styledComponents = obj => config => {
  const newConfig = rewireStyledComponents(config, process.env.NODE_ENV, obj)
  return newConfig
}

module.exports = override(
  // addLessLoader({
  //   // rootpath: './src/styles/',
  //   paths: ['./src/styles/'],
  // }),
  styledComponents({
    displayName: process.env.NODE_ENV !== 'production',
  })
)
