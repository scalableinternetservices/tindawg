import { ApolloProvider, useQuery } from '@apollo/client'
import { Redirect, Router } from '@reach/router'
import * as React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider as StyletronProvider } from 'styletron-react'
import { appContext } from '../../../common/src/context'
import { getApolloClient } from '../graphql/apolloClient'
import { FetchUserContext } from '../graphql/query.gen'
import { MainStyle } from '../style/Main'
import { fetchUser } from './auth/fetchUser'
import { UserContext, UserCtx } from './auth/user'
import { Route } from './nav/route'
import { EditProfilePage } from './page/EditProfilePage'
import { ExplorePage } from './page/ExplorePage'
import { LoginPage } from './page/LoginPage'
import { MatchPage } from './page/MatchPage'

const Styletron = require('styletron-engine-monolithic')

export function init() {
  const renderFn = appContext().serverRendered ? hydrate : render
  const engine = new Styletron.Client({
    hydrate: document.getElementsByClassName('_styletron_hydrate_'),
  })

  renderFn(
    <ApolloProvider client={getApolloClient()}>
      <StyletronProvider value={engine}>
        <App />
      </StyletronProvider>
    </ApolloProvider>,
    document.getElementById('app')
  )
}

export function App() {
  const { loading, data } = useQuery<FetchUserContext>(fetchUser)
  if (loading || data == null) {
    return null
  }

  return (
    <UserContext.Provider value={new UserCtx(data.self)}>
      <AppBody />
    </UserContext.Provider>
  )
}

export function AppBody() {
  return (
    <div style={MainStyle}>
      <Router className={bodyClass} style={{ padding: '75px' }}>
        <Redirect noThrow from="app" to="login" />
        <EditProfilePage path={Route.EDIT} />
        <LoginPage path={Route.LOGIN} />
        <ExplorePage path={Route.EXPLORE} />
        <MatchPage path={Route.MATCH} />
      </Router>
    </div>
  )
}

const bodyClass = 'flex flex-column items-center mh2 mh3-ns mh5-l pt6 min-vh-100 sans-serif'
