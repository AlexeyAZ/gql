import commonStyles from './commonStyles'
import mainTheme from './mainTheme'
import secondaryTheme from './secondaryTheme'

const theme = {
  main: {
    ...commonStyles,
    ...mainTheme,
  },
  secondary: {
    ...commonStyles,
    ...secondaryTheme,
  },
}

export default theme
