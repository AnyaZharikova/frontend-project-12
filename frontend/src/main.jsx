import React from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import leoProfanity from 'leo-profanity'

import App from './Components/App.jsx'
import setupSocketHandlers from './services/socketHandlers.js'
import store from './services/index.js'
import resources from './locales/index.js'

leoProfanity.add(leoProfanity.getDictionary('ru'))
leoProfanity.list()

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'testenv',
}

const initApp = (socket) => {
  const i18n = i18next.createInstance()
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    })

  setupSocketHandlers(socket, store)

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default initApp
