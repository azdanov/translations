import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from 'react-testing-library'
import '../../i18n'
import { Hero } from '../Hero'

afterEach(cleanup)

test('should have languages and dictionary', () => {
  const { getByText } = render(<Hero />)

  expect(getByText('languages')).toBeInTheDocument()
  expect(getByText('dictionary')).toBeInTheDocument()
})
