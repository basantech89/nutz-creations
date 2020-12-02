import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'

import { ISelectOption, ISelectProps } from './types'

const Select: React.FC<ISelectProps> = ({
  label,
  onChange,
  options,
  ...rest
}) => {
  const defaultProps = {
    options: options,
    getOptionLabel: (option: ISelectOption) => option.label,
    getOptionSelected: (option: ISelectOption, selectedOption: ISelectOption) =>
      option.value === selectedOption.value,
    ...rest
  }

  const handleChange = (event: any, newValue: ISelectOption | null) => {
    setValue(newValue)
    onChange(newValue)
  }

  const [value, setValue] = React.useState<ISelectOption | null>(null)

  return (
    <Autocomplete
      {...defaultProps}
      clearOnBlur
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label={label} margin='normal' />
      )}
    />
  )
}

export default Select
