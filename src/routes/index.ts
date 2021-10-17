import { lazy, LazyExoticComponent } from 'react'

const Layout = lazy(() => import('@/pages/Layout'))
const Home = lazy(() => import('@/pages/home/Home'))

interface RouterType {
  path: string,
  key: string,
  component: LazyExoticComponent<any>,
  routes?: Array<RouterType>
}

const Routers: RouterType[] = [{
    path: '/layout',
    key: 'layout',
    component: Layout,
    routes: [
      {
        path: '/home',
        key: 'lome',
        component: Home
      }
    ]
  }
]

export default Routers
