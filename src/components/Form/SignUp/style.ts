import { makeStyles } from '@material-ui/core/styles'

export const useSignUpStyles = makeStyles((theme) => ({
  form: {
    height: 'calc(100vh - 23rem)'
  },
  formContainer: {
    margin: theme.spacing(3, 0)
  },
  textField: {
    maxWidth: '45%'
  },
  tabs: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between'
    },
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
  },
  tabPanel: {
    padding: '20px 40px 0 10px'
  }
}))
