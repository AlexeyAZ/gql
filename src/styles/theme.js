import commonStyles from './commonStyles'
import mainTheme from './mainTheme'
import secondaryTheme from './secondaryTheme'
import media from './media'

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

Object.keys(theme).forEach(item => {
  theme[item].media = media(theme[item].mediaQueries)
})

export default theme
