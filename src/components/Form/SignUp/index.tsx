import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import clsx from 'clsx'
import React from 'react'
import { useForm } from 'react-hook-form'

import { emailRegex, passwordRegex } from '../../../constants/regex'
import { useFormStyles } from '../style'

import { useSignUpStyles } from './style'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

declare interface IPersonalDetailsForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmedPassword: string
}

export default function SignUp() {
  const classes = useFormStyles()
  const signupClasses = useSignUpStyles()
  // const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    getValues,
    errors
  } = useForm<IPersonalDetailsForm>()

  const [submitError, setSubmitError] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleSignup = () => {
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

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div
          className={classes.paper}
          style={{ marginLeft: 140, marginRight: 100 }}
        >
          <Typography className={classes.title} component='h1' variant='h2'>
            Nutz Creations
          </Typography>
          <Typography className={classes.subTitle} variant='subtitle1'>
            <div> Sign up to your account </div>
          </Typography>
          <form
            className={clsx(classes.form, signupClasses.form)}
            onSubmit={handleSubmit(handleSignup)}
          >
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} style={{ paddingRight: 50 }}>
                  <TextField
                    name='firstName'
                    fullWidth
                    id='firstName'
                    label='First Name'
                    inputRef={register({ required: 'First Name is required' })}
                    error={!!errors?.firstName?.message}
                    helperText={errors?.firstName?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6} style={{ paddingLeft: 50 }}>
                  <TextField
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    inputRef={register}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    inputRef={register({
                      required: 'Email is required',
                      pattern: {
                        value: emailRegex,
                        message: 'Invalid Email Address'
                      }
                    })}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    inputRef={register({
                      required: 'Password is required',
                      pattern: {
                        value: passwordRegex,
                        message:
                          'Password must be between 4 and 8 digits long and include at least one numeric digit'
                      }
                    })}
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name='confirmedPassword'
                    label='Confirm Password'
                    type='password'
                    id='confirmedPassword'
                    inputRef={register({
                      required: 'Password is required',
                      validate: (value) =>
                        value === getValues('password') ||
                        "Password don't match"
                    })}
                    error={!!errors?.confirmedPassword?.message}
                    helperText={errors?.confirmedPassword?.message}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Next
              </Button>
              <Link href='/signin' variant='body2'>
                Already have an account? Sign in.
              </Link>
            </Box>
          </form>
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
