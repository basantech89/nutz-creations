import { Grid, Paper, Snackbar, Tab, Typography } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React from 'react'

import { useFormStyles } from '../style'
import CompanyDetails from './CompanyDetails'
import InformationSecurity from './InformationSecurity'
import PersonalDetails from './PersonalDetails'
import { useSignUpStyles } from './style'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function SignUp() {
  const classes = useFormStyles()
  const signupClasses = useSignUpStyles()

  // const dispatch = useAppDispatch()

  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue)
  }

  const [submitError, setSubmitError] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const TabLabel = ({ index, name }) => (
    <div>
      <span className={signupClasses.tabLabel}>{index}</span>
      <span> {name} </span>
    </div>
  )

  const handleSubmit = () => {
    // const { success, data, error }: any = await post('/api/user', {
    //   first_name: details.firstName,
    //   last_name: details.lastName,
    //   email: details.email,
    //   password: details.password
    // })
    //
    // const user = {
    //   email: details.email,
    //   firstName: details.firstName,
    //   lastName: details.lastName
    // }
    // if (success) {
    //   setItem('token', data.token)
    //   setItem('user', user)
    //   router.push('/signin')
    // } else {
    //   handleClick()
    //   // setSubmitError(error)
    // }
  }

  const handlePersonalDetails = (details) => {
    console.log(details)
    setValue('2')
  }

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div
          className={classes.paper}
          style={{ marginLeft: 140, marginRight: 100 }}
        >
          <Typography className={classes.title} component='h1' variant='h2'>
            Konfirmity
          </Typography>
          <Typography className={classes.subTitle} variant='subtitle1'>
            <div> Sign up to your account </div>
          </Typography>
          <div className={signupClasses.formContainer}>
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label='sign up tabs'
                className={signupClasses.tabs}
              >
                <Tab
                  value='1'
                  label={<TabLabel index='01' name='Personal Details' />}
                  {...a11yProps(0)}
                />
                <Tab
                  value='2'
                  label={<TabLabel index='02' name='Company Details' />}
                  {...a11yProps(1)}
                />
                <Tab
                  value='3'
                  label={<TabLabel index='03' name='Information Security' />}
                  {...a11yProps(2)}
                />
              </TabList>
              <TabPanel value='1' className={signupClasses.tabPanel}>
                <PersonalDetails onSubmit={handlePersonalDetails} />
              </TabPanel>
              <TabPanel value='2' className={signupClasses.tabPanel}>
                <CompanyDetails />
              </TabPanel>
              <TabPanel value='3' className={signupClasses.tabPanel}>
                <InformationSecurity />
              </TabPanel>
            </TabContext>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
              {submitError}
            </Alert>
          </Snackbar>
        </div>
      </Grid>
    </Grid>
  )
}
