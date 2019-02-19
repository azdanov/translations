import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import { Footer } from '..'

afterEach(cleanup)

test('should have current year', () => {
  const year = String(new Date().getFullYear())

  const { getByText } = render(<Footer />)

  expect(getByText(year)).toBeInTheDocument()
})
