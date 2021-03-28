import faker from 'faker'
import { fireEvent } from '@testing-library/react'

export const populateField = (fieldName: string, getByTestId: Function, value: string): boolean => fireEvent.input(getByTestId(fieldName), { target: { value } })

export const populateListField = (getByTestId: Function, listField: Array<{ fieldName: string, fieldValue?: string }>): void => {
  for (const field of listField) {
    populateField(field.fieldName, getByTestId, (field.fieldValue ?? faker.random.word()))
  }
}

export const simulateValidSubmit = (getByTestId: Function, listField: Array<{ fieldName: string, fieldValue?: string }>, button: string): void => {
  populateListField(getByTestId, listField)
  fireEvent.click(getByTestId(button))
}
