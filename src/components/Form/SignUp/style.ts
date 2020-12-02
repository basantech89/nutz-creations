import { makeStyles } from '@material-ui/core/styles'

export const useSignUpStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(3)
  },
  textField: {
    maxWidth: '45%'
  },
  tabs: {
    '& .MuiTabs-indicator': {
      display: 'none'
    },
    '& .MuiTab-root': {
      textTransform: 'none',
      paddingLeft: 0
    },
    '& .MuiTab-wrapper': {
      '& span': {
        fontSize: '0.9rem'
      }
    }
  },
  tabLabel: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    width: 37,
    height: 37,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5
  }
}))
