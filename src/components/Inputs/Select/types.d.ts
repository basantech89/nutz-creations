export declare interface ISelectOption {
  label: string
  value: string
}

export declare interface ISelectProps {
  label: string
  options: Array<ISelectOption>
  onChange: (option: ISelectOption | null) => void
  style?: any
}
