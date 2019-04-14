const { override, addLessLoader } = require('customize-cra')

module.exports = override(
  addLessLoader({
    // rootpath: './src/styles/',
    paths: ['./src/styles/'],
  })
)
