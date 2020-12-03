import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

import { post } from '../../../../utils/api'
import { setItem } from '../../../../utils/common'
import Select from '../../../Inputs/Select'
import { ISelectOption } from '../../../Inputs/Select/types'
import { useFormStyles } from '../../style'
import { useSignUpStyles } from '../style'

declare interface ITeam {
  name: string
  email: string
}

declare interface IInformationSecurityForm {
  customerDataType: string
  hostedOn: string
  standardBaseline: string
  ciso: ITeam
  dpo: ITeam
  internalSecurityTeam: Array<ITeam>
  internalAuditTeam: Array<ITeam>
}

const companyTypeOptions = [
  { label: 'Corporate', value: 'corporate' },
  { label: 'partner', value: 'partner' },
  { label: 'Adhoc', value: 'adhoc' }
]

const InformationSecurity: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IInformationSecurityForm>()
  const router = useRouter()
  const classes = useFormStyles()
  const signupClasses = useSignUpStyles()

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
    <form
      className={clsx(classes.form, signupClasses.form)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <Box display='flex' justifyContent='space-between'>
          <Select
            label='Type of Customer Data'
            options={companyTypeOptions}
            onChange={handleCompanyType}
            style={{ width: '33%' }}
          />
          <Select
            label='Hosted On'
            options={companyTypeOptions}
            onChange={handleCompanyType}
            style={{ width: '25%' }}
          />
          <Select
            label='Standard Baseline'
            options={companyTypeOptions}
            onChange={handleCompanyType}
            style={{ width: '33%' }}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' mb={1}>
          <TextField
            id='CISOName'
            label='CISO Name'
            name='ciso.name'
            inputRef={register}
            className={signupClasses.textField}
            error={!!errors?.ciso?.name?.message}
            helperText={errors?.ciso?.name?.message}
          />
          <TextField
            style={{ width: '45%' }}
            id='CISOEmail'
            label='CISO Email'
            name='ciso.email'
            inputRef={register}
            className={signupClasses.textField}
            error={!!errors?.ciso?.email?.message}
            helperText={errors?.ciso?.email?.message}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' mb={3}>
          <TextField
            id='DPOName'
            label='DPO Name'
            name='dpo.name'
            inputRef={register}
            className={signupClasses.textField}
            error={!!errors?.dpo?.name?.message}
            helperText={errors?.dpo?.name?.message}
          />
          <TextField
            id='DPOEmail'
            label='DPO Email'
            name='dpo.email'
            inputRef={register}
            className={signupClasses.textField}
            error={!!errors?.dpo?.email?.message}
            helperText={errors?.dpo?.email?.message}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' mt={3}>
          <Typography variant='subtitle1'>Internal Security Team</Typography>
          <Button style={{ textTransform: 'none' }}> + Add More </Button>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <TextField
            name='name'
            label='Name'
            id='name'
            className={signupClasses.textField}
            // error={!!errors?.regulatedBy?.message}
            // helperText={errors?.regulatedBy?.message}
          />
          <TextField
            name='email'
            label='Email'
            id='email'
            className={signupClasses.textField}
            // error={!!errors?.regulatedBy?.message}
            // helperText={errors?.regulatedBy?.message}
          />
        </Box>
        <Box display='flex' justifyContent='space-between' mt={5}>
          <Typography variant='subtitle1'>Internal Audit Team</Typography>
          <Button style={{ textTransform: 'none' }}> + Add More </Button>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <TextField
            name='name'
            label='Name'
            id='name'
            className={signupClasses.textField}
            // error={!!errors?.regulatedBy?.message}
            // helperText={errors?.regulatedBy?.message}
          />
          <TextField
            name='email'
            label='Email'
            id='email'
            className={signupClasses.textField}
            // error={!!errors?.regulatedBy?.message}
            // helperText={errors?.regulatedBy?.message}
          />
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Link href='/signin' variant='body2'>
          Already have an account? Sign in.
        </Link>
      </Box>
    </form>
  )
}

export default InformationSecurity
