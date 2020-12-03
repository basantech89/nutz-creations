import { Box, Button, Grid, Link, TextField } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'

import { emailRegex, passwordRegex } from '../../../../constants/regex'
import { useFormStyles } from '../../style'

declare interface IPersonalDetailsForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmedPassword: string
}

declare interface IPersonalDetailsProps {
  onSubmit: (details: IPersonalDetailsForm) => void
}

const PersonalDetails: React.FC<IPersonalDetailsProps> = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    errors
  } = useForm<IPersonalDetailsForm>()
  const classes = useFormStyles()

  return (
    <form className={classes.form} onSubmit={handleSubmit(props.onSubmit)}>
      <Box display='flex' flexDirection='column' justifyContent='space-between'>
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
                  value === getValues('password') || "Password don't match"
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
  )
}

export default PersonalDetails
