import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core'
import { Copyright } from '@material-ui/icons'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
import React from 'react'
import { useForm } from 'react-hook-form'

import { emailRegex, passwordRegex } from '../../../constants/regex'
import { useAppDispatch } from '../../../store'
import { addUser } from '../../../store/state/user'
import { post } from '../../../utils/api'
import { setItem } from '../../../utils/common'
import { useFormStyles } from '../style'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

declare interface ISignInForm {
  email: string
  password: string
}

export default function SignIn() {
  const classes = useFormStyles()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm<ISignInForm>()

  const [submitError, setSubmitError] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const goToSignup = () => router.push('/signup')

  const onSubmit = async (creds) => {
    const res = await signIn()
    console.log(res)
    // const { success, error, data } = await post('/api/login', creds)
    // if (success) {
    //   const user = {
    //     email: data.email,
    //     firstName: data.firstName,
    //     lastName: data.lastName
    //   }
    //   setItem('token', data.token)
    //   setItem('user', user)
    //   dispatch(addUser(user))
    //   router.push('/profile')
    // } else {
    //   handleClick()
    //   setSubmitError(error)
    // }
  }

  return (
    <Grid container component='main' className={classes.root}>
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div
          className={classes.paper}
          style={{ marginLeft: 240, marginRight: 240 }}
        >
          <Typography className={classes.title} component='h1' variant='h2'>
            Nutz Creations
          </Typography>
          <Typography className={classes.subTitle} variant='subtitle1'>
            <div> We help growing companies manage compliance, </div>
            <div>
              {' '}
              obtain cybersecurity certifications, and establish Trust.{' '}
            </div>
          </Typography>
          <form
            className={classes.form}
            style={{ padding: '0 70px 0 10px' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
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
            <TextField
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              inputRef={register({
                required: 'Password is required',
                pattern: { value: passwordRegex, message: 'Invalid Password' }
              })}
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <div className={classes.formRow}>
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Link href='/'> Forgot Password </Link>
            </div>
            <div className={classes.formButtons}>
              <Button
                size='large'
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Login
              </Button>
              <Button
                size='large'
                variant='outlined'
                color='primary'
                className={classes.submit}
                onClick={goToSignup}
              >
                Sign up
              </Button>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {submitError}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  )
}
