import { Button, Grid, Link, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

import { emailRegex, passwordRegex } from '../../../../constants/regex'
import { post } from '../../../../utils/api'
import { setItem } from '../../../../utils/common'
import { useFormStyles } from '../../style'

declare interface IPersonalDetailsForm {
  firstName: string
  lastName: string
  email: string
  password: string
}

declare interface IPersonalDetailsProps {
  onOpen: (value: boolean) => void
}

const PersonalDetails: React.FC<IPersonalDetailsProps> = (props) => {
  const { register, handleSubmit, errors } = useForm<IPersonalDetailsForm>()
  const router = useRouter()
  const classes = useFormStyles()

  const handleClick = () => {
    props.onOpen(true)
  }

  const onSubmit = async (creds) => {
    const { success, data, error }: any = await post('/api/user', {
      first_name: creds.firstName,
      last_name: creds.lastName,
      email: creds.email,
      password: creds.password
    })

    const user = {
      email: creds.email,
      firstName: creds.firstName,
      lastName: creds.lastName
    }
    if (success) {
      setItem('token', data.token)
      setItem('user', user)
      router.push('/signin')
    } else {
      handleClick()
      // setSubmitError(error)
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} style={{ paddingRight: 50 }}>
          <TextField
            name='firstName'
            required
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
            autoComplete='lname'
            inputRef={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
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
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            inputRef={register({
              required: 'Password is required',
              pattern: {
                value: passwordRegex,
                message: 'Invalid Password'
              }
            })}
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name='confirmedPassword'
            label='Confirm Password'
            type='password'
            id='password'
            inputRef={register({
              required: 'Password is required',
              pattern: {
                value: passwordRegex,
                message: 'Invalid Password'
              }
            })}
            // error={!!errors?.confirmedPassword?.message}
            // helperText={errors?.confirmedPassword?.message}
          />
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*	<FormControlLabel*/}
        {/*		control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
        {/*		label="I want to receive inspiration, marketing promotions and updates via email."*/}
        {/*	/>*/}
        {/*</Grid>*/}
      </Grid>
      <Grid container justify='center'>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Next
        </Button>
      </Grid>
      <Grid container justify='center'>
        <Link href='/signin' variant='body2' style={{ fontFamily: 'Poppins' }}>
          Already have an account? Sign in.
        </Link>
      </Grid>
    </form>
  )
}

export default PersonalDetails
