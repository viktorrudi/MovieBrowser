import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import '@testing-library/jest-dom/extend-expect'

import AppContainer from '../components/Shared/AppContainer'
import MetaData from '../components/Shared/MetaData'

import { initialState } from '../store'
import { MOVIE_BROWSER_TITLE } from '../constants'

const mockStore = configureMockStore()
const mockedStore = mockStore(initialState)

it('Renders the page title', () => {
  render(
    <Provider store={mockedStore}>
      <AppContainer />
    </Provider>
  )
  const appName = screen.queryByText(MOVIE_BROWSER_TITLE)
  expect(appName).toBeInTheDocument()
})

test('Meta Data line only renders when has available data', () => {
  const metaData = {
    Rating: 10,
    Birthday: null,
  }
  render(
    <Provider store={mockedStore}>
      <MetaData metaData={metaData} />
    </Provider>
  )

  expect(screen.queryByText('Rating')).toBeInTheDocument()
  expect(screen.queryByText('Birthday')).not.toBeInTheDocument()
})
