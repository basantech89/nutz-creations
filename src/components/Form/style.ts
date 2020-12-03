import { makeStyles } from '@material-ui/core/styles'

export const useFormStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  title: {
    fontFamily: 'Montserrat',
    color: '#43425D',
    fontWeight: 500
  },
  subTitle: {
    '& div': {
      fontFamily: 'Montserrat',
      color: '#aaabad'
    }
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    height: 'calc(100vh - 23rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiFormLabel-root': {
      fontFamily: 'Poppins'
    }
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    '& .MuiTypography-root': {
      fontFamily: 'Montserrat'
    }
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  submit: {
    paddingTop: 10,
    paddingBottom: 10,
    margin: theme.spacing(7, 0, 3, 0),
    width: 170,
    textTransform: 'unset',
    fontSize: '1rem',
    fontWeight: 400
  }
}))
