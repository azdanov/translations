import 'jest-dom/extend-expect'
import React from 'react'
import { act, cleanup, fireEvent, render } from 'react-testing-library'
import { ServiceWorkerMessage } from '..'
import '../../../i18n'

afterEach(cleanup)

test('should show install message with ok button', () => {
  const { getByText } = render(<ServiceWorkerMessage />)

  expect(getByText('sw-install')).toBeInTheDocument()
  expect(getByText('OK')).toBeInTheDocument()
})

test('should hide when button is clicked', () => {
  const { getByText, container } = render(<ServiceWorkerMessage />)

  act(() => {
    fireEvent.click(getByText('OK'))
  })

  expect(container).toBeEmpty()
})
