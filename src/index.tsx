import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './app/app'
import { PokeClient } from './services/PokeClient'
import { serverEntryPoint } from './shared/constants/serverEntryPoint'
import { configureStore } from './store/store'
import './styles/index.css'

export const pokeClient = new PokeClient(serverEntryPoint)

export const store = configureStore()

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
)
