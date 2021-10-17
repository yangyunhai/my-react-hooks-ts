import React,{ FC, lazy, Suspense } from 'react'
import { Route,Redirect, Switch, BrowserRouter } from 'react-router-dom'
import routes from '@/routes/index'
import Loading from '@/Compoents/Loading';

const Login = lazy(() => import('@/pages/login/Login'))
const NoMatch = lazy(() => import('@/pages/NoMatch'))

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  )
}

const App: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading></Loading>}>
      <Switch>
        <Route path="/login" key="login">
          <Login></Login>
        </Route>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.key} {...route} />
        ))}
        <Redirect path="*" to="/login"></Redirect>
      </Switch>
    </Suspense>
  </BrowserRouter>
)

export default App