import { Box, Button, Grid, Link, TextField } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'

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
  const classes = useFormStyles()

  const onSubmit = async (details) => {}

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

export default CompanyDetails
