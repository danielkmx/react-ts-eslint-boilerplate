import React ,{ useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
  event.target.readOnly = false
}
const Input: React.FC<Props> = (props: Props) => {
  const value = useContext(Context)
  const error = value[`${props.name}Error`]
  const getStatus = (): string => {
    return error
  }
  const getTitle = (): string => {
    return error
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span data-testid={`${props.name}-status`} title={getTitle()}>{getStatus()}</span>
    </div>
  )
}

export default Input
