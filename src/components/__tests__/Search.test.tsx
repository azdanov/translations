/* eslint-disable @typescript-eslint/no-explicit-any */
import 'jest-dom/extend-expect'
import { noop } from 'lodash'
import React from 'react'
import { act, cleanup, fireEvent, render } from 'react-testing-library'
import { Search } from '..'
import '../../i18n'

afterEach(cleanup)

test('should have search placeholder and action', () => {
  const searchEl: any = jest.fn()
  const { getByPlaceholderText, getByTestId } = render(
    <Search searchEl={searchEl} loading={false} search="" setSearch={noop} />,
  )

  expect(getByPlaceholderText('search …')).toBeInTheDocument()
  expect(getByTestId('search-action')).toBeInTheDocument()
  expect(searchEl).toHaveBeenCalled()
})

test('should search on submit', () => {
  const searchEl: any = jest.fn()
  const mockSetSearch = jest.fn()
  const { getByPlaceholderText } = render(
    <Search searchEl={searchEl} loading={false} search="" setSearch={mockSetSearch} />,
  )

  act(() => {
    fireEvent.change(getByPlaceholderText('search …'), { target: { value: 'yo' } })
    fireEvent.submit(getByPlaceholderText('search …'))
  })

  expect(mockSetSearch).toHaveBeenCalled()
  expect(searchEl).toHaveBeenCalled()
})

test('should search on click', () => {
  const searchEl: any = jest.fn()
  const mockSetSearch = jest.fn()
  const { getByPlaceholderText, getByTestId } = render(
    <Search searchEl={searchEl} loading={false} search="" setSearch={mockSetSearch} />,
  )

  act(() => {
    fireEvent.change(getByPlaceholderText('search …'), { target: { value: 'yo' } })
    fireEvent.click(getByTestId('search-action'))
  })

  expect(mockSetSearch).toHaveBeenCalled()
  expect(searchEl).toHaveBeenCalled()
})
