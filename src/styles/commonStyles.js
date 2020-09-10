const commonStyles = {
  mediaQueries: {
    s: 360,
    m: 768,
    l: 992,
    xl: 1366,
    xxl: 1600,
  },
  trans: {
    defaultDuration: '300ms',
    default: '0.3s ease',
  },
  borderRadius: {
    default: '1px',
  },
  layout: {
    gradient:
      'linear-gradient(233.59deg, #FFEBEB 0.84%, #FADAE5 9.84%, #EACBE9 21.25%, #CAC1F0 34.48%, #98BCF3 51.35%, #75B1E4 62.51%, #51A6D2 75.35%, #259BBE 88.35%, #2586A4 102.04%, #25728A 116.92%, #235F72 130.18%, #204C5A 144.61%)',
  },
  content: {
    maxWidth: '1366px',
    verticalOffsets: {
      s: '20px',
      m: '20px',
      l: '50px',
      xl: '50px',
    },
    horizontalOffsets: {
      s: '20px',
      m: '20px',
      l: '50px',
      xl: '50px',
    },
  },
  window: {
    maxWidth: '1366px',
    header: {
      height: '46px',
    },
    content: {
      verticalOffsets: {
        s: '20px',
        m: '50px',
        l: '50px',
        xl: '50px',
      },
      horizontalOffsets: {
        s: '20px',
        m: '68px',
        l: '68px',
        xl: '68px',
      },
    },
    sidebar: {
      width: '300px',
    },
    size: {
      s: '360px',
      m: '800px',
      l: '1024px',
      xl: '1366px',
    },
  },
  sidebar: {
    width: '50px',
  },
  header: {
    height: '50px',
  },
  footer: {
    height: '50px',
  },
  formField: {
    bottomOffset: '10px',
  },
  colors: {
    violet: {
      main: '#7065ef',
      light: '#8D84F0',
    },
    blue: {
      darkest: '#153741',
      darken: '#3c798a',
      lighten: '#a6c8e3',
    },
    gray: {
      main: '#434343',
      light: '#7B7B7B',
      lighten: '#E5E5E5',
    },
  },
  zIndex: {
    modal: 10,
  },
}

export default commonStyles
