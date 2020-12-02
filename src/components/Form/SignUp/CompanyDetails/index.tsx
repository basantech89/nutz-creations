import { Button, Grid, Link, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

import { emailRegex, passwordRegex } from '../../../../constants/regex'
import { post } from '../../../../utils/api'
import { setItem } from '../../../../utils/common'
import Select from '../../../Inputs/Select'
import { ISelectOption } from '../../../Inputs/Select/types'
import { useFormStyles } from '../../style'

declare interface ICompanyDetailsForm {
  name: string
  type: string
  incorporatedIn: string
  regulatedBy: string
  address: string
}

const companyTypeOptions = [
  { label: 'Corporate', value: 'corporate' },
  { label: 'partner', value: 'partner' },
  { label: 'Adhoc', value: 'adhoc' }
]

const CompanyDetails: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<ICompanyDetailsForm>()
  const router = useRouter()
  const classes = useFormStyles()

  const handleClick = () => {
    // props.onOpen(true)
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

  const handleCompanyType = (selectedOption: ISelectOption | null) => {
    console.log(selectedOption)
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name='name'
            required
            fullWidth
            id='companyName'
            label='Company Name'
            inputRef={register({ required: 'Company Name is required' })}
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            label='Company Type'
            options={companyTypeOptions}
            onChange={handleCompanyType}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='incorporatedIn'
            label='Incorporated In'
            name='incorporatedIn'
            inputRef={register}
            error={!!errors?.incorporatedIn?.message}
            helperText={errors?.incorporatedIn?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name='regulatedBy'
            label='Regulated By'
            id='regulatedBy'
            inputRef={register}
            error={!!errors?.regulatedBy?.message}
            helperText={errors?.regulatedBy?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name='address'
            label='Address'
            id='address'
            inputRef={register}
            error={!!errors?.address?.message}
            helperText={errors?.address?.message}
          />
        </Grid>
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

export default CompanyDetails
