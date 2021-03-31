import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router'
import ApiContext from '../../context/api/api-context'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext)
  return getCurrentAccount()?.accessToken
    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to="/login" />} />
}

export default PrivateRoute
