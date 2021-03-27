import { fireEvent } from '@testing-library/react'

export const populateField = (fieldName: string, getByTestId: Function, value: string): boolean => fireEvent.input(getByTestId(fieldName), { target: { value } })

export const simulateValidSubmitLogin = (getByTestId: Function, email: string, password: string): void => {
  populateField('email', getByTestId, email)
  populateField('password', getByTestId, password)
  fireEvent.click(getByTestId('submit'))
}
