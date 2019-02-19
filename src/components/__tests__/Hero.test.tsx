import 'jest-dom/extend-expect'
import React from 'react'
import { act, cleanup, fireEvent, render } from 'react-testing-library'
import { Hero } from '..'
import '../../i18n'

afterEach(cleanup)

test('should have languages and dictionary', () => {
  const setOrder = jest.fn()
  const setSearch = jest.fn()
  const setResults = jest.fn()
  const { getByText } = render(
    <Hero
      order={['english', 'estonian']}
      setResults={setResults}
      setSearch={setSearch}
      setOrder={setOrder}
    />,
  )

  expect(getByText('english')).toBeInTheDocument()
  expect(getByText('estonian')).toBeInTheDocument()
  expect(getByText('change direction')).toBeInTheDocument()
  expect(getByText('dictionary')).toBeInTheDocument()
})

test('should call set props on click', () => {
  const setOrder = jest.fn()
  const setSearch = jest.fn()
  const setResults = jest.fn()
  const { getByText } = render(
    <Hero
      order={['english', 'estonian']}
      setOrder={setOrder}
      setSearch={setSearch}
      setResults={setResults}
    />,
  )

  act(() => {
    fireEvent.click(getByText('change direction'))
  })

  expect(setOrder).toHaveBeenCalled()
  expect(setSearch).toHaveBeenCalled()
  expect(setResults).toHaveBeenCalled()
})
