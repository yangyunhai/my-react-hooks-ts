import React, { FC, lazy, Suspense } from 'react';
import { Route, Switch,Redirect, HashRouter } from 'react-router-dom';
import { StoreState } from '@/store/StoreState';
import { useSelector } from 'react-redux';

const AppLayout = lazy(() => import('@/pages/AppLayout'));
const Login = lazy(() => import('@/pages/Login/Login'));
const MainLayout = lazy(() => import('@/pages/MainLayout'));

const App: FC = () => {
  const isLogin = useSelector<StoreState, boolean>(
    (state: StoreState) => state.isLogin
  );
  return (
    <HashRouter>
      <Suspense fallback={<></>}>
        <AppLayout>
          <Switch>
            <Route path="/login" key="login">
              <Login></Login>
            </Route>
            { isLogin ? <MainLayout /> : null }
            <Redirect from="/*" to="/login" />
          </Switch>
        </AppLayout>
      </Suspense>
    </HashRouter>
  );
};

export default App;
