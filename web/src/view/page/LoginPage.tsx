import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Login } from '../auth/Login'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface LoginPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LoginPage(props: LoginPageProps) {
  return (
    <Page>
      <Login />
    </Page>
  )
}
