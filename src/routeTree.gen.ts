// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LetterofthelawImport } from './routes/letterofthelaw'
import { Route as DarkandlightImport } from './routes/darkandlight'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const P11sLetterofthelawLazyImport = createFileRoute('/p11s/letterofthelaw')()
const P11sDarkandlightLazyImport = createFileRoute('/p11s/darkandlight')()
const DevSimpleaoeLazyImport = createFileRoute('/dev/simpleaoe')()
const P12sP2Classical2LazyImport = createFileRoute('/p12s/p2/classical2')()
const P12sP2Classical1LazyImport = createFileRoute('/p12s/p2/classical1')()
const P12sP2Caloric1LazyImport = createFileRoute('/p12s/p2/caloric1')()
const P12sP1Superchaintheory2bLazyImport = createFileRoute(
  '/p12s/p1/superchaintheory2b',
)()
const P12sP1Superchaintheory2aLazyImport = createFileRoute(
  '/p12s/p1/superchaintheory2a',
)()
const P12sP1Superchaintheory1LazyImport = createFileRoute(
  '/p12s/p1/superchaintheory1',
)()
const P12sP1Paradeigma3LazyImport = createFileRoute('/p12s/p1/paradeigma3')()

// Create/Update Routes

const LetterofthelawRoute = LetterofthelawImport.update({
  path: '/letterofthelaw',
  getParentRoute: () => rootRoute,
} as any)

const DarkandlightRoute = DarkandlightImport.update({
  path: '/darkandlight',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const P11sLetterofthelawLazyRoute = P11sLetterofthelawLazyImport.update({
  path: '/p11s/letterofthelaw',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/p11s/letterofthelaw.lazy').then((d) => d.Route),
)

const P11sDarkandlightLazyRoute = P11sDarkandlightLazyImport.update({
  path: '/p11s/darkandlight',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/p11s/darkandlight.lazy').then((d) => d.Route),
)

const DevSimpleaoeLazyRoute = DevSimpleaoeLazyImport.update({
  path: '/dev/simpleaoe',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/dev/simpleaoe.lazy').then((d) => d.Route))

const P12sP2Classical2LazyRoute = P12sP2Classical2LazyImport.update({
  path: '/p12s/p2/classical2',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/p12s/p2/classical2.lazy').then((d) => d.Route),
)

const P12sP2Classical1LazyRoute = P12sP2Classical1LazyImport.update({
  path: '/p12s/p2/classical1',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/p12s/p2/classical1.lazy').then((d) => d.Route),
)

const P12sP2Caloric1LazyRoute = P12sP2Caloric1LazyImport.update({
  path: '/p12s/p2/caloric1',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/p12s/p2/caloric1.lazy').then((d) => d.Route),
)

const P12sP1Superchaintheory2bLazyRoute =
  P12sP1Superchaintheory2bLazyImport.update({
    path: '/p12s/p1/superchaintheory2b',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/p12s/p1/superchaintheory2b.lazy').then((d) => d.Route),
  )

const P12sP1Superchaintheory2aLazyRoute =
  P12sP1Superchaintheory2aLazyImport.update({
    path: '/p12s/p1/superchaintheory2a',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/p12s/p1/superchaintheory2a.lazy').then((d) => d.Route),
  )

const P12sP1Superchaintheory1LazyRoute =
  P12sP1Superchaintheory1LazyImport.update({
    path: '/p12s/p1/superchaintheory1',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/p12s/p1/superchaintheory1.lazy').then((d) => d.Route),
  )

const P12sP1Paradeigma3LazyRoute = P12sP1Paradeigma3LazyImport.update({
  path: '/p12s/p1/paradeigma3',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/p12s/p1/paradeigma3.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/darkandlight': {
      preLoaderRoute: typeof DarkandlightImport
      parentRoute: typeof rootRoute
    }
    '/letterofthelaw': {
      preLoaderRoute: typeof LetterofthelawImport
      parentRoute: typeof rootRoute
    }
    '/dev/simpleaoe': {
      preLoaderRoute: typeof DevSimpleaoeLazyImport
      parentRoute: typeof rootRoute
    }
    '/p11s/darkandlight': {
      preLoaderRoute: typeof P11sDarkandlightLazyImport
      parentRoute: typeof rootRoute
    }
    '/p11s/letterofthelaw': {
      preLoaderRoute: typeof P11sLetterofthelawLazyImport
      parentRoute: typeof rootRoute
    }
    '/p12s/p1/paradeigma3': {
      preLoaderRoute: typeof P12sP1Paradeigma3LazyImport
      parentRoute: typeof rootRoute
    }
    '/p12s/p1/superchaintheory1': {
      preLoaderRoute: typeof P12sP1Superchaintheory1LazyImport
      parentRoute: typeof rootRoute
    }
    '/p12s/p1/superchaintheory2a': {
      preLoaderRoute: typeof P12sP1Superchaintheory2aLazyImport
      parentRoute: typeof rootRoute
    }
    '/p12s/p1/superchaintheory2b': {
      preLoaderRoute: typeof P12sP1Superchaintheory2bLazyImport
      parentRoute: typeof rootRoute
    }
    '/p12s/p2/caloric1': {
      preLoaderRoute: typeof P12sP2Caloric1LazyImport
      parentRoute: typeof rootRoute
    }
    '/p12s/p2/classical1': {
      preLoaderRoute: typeof P12sP2Classical1LazyImport
      parentRoute: typeof rootRoute
    }
    '/p12s/p2/classical2': {
      preLoaderRoute: typeof P12sP2Classical2LazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutRoute,
  DarkandlightRoute,
  LetterofthelawRoute,
  DevSimpleaoeLazyRoute,
  P11sDarkandlightLazyRoute,
  P11sLetterofthelawLazyRoute,
  P12sP1Paradeigma3LazyRoute,
  P12sP1Superchaintheory1LazyRoute,
  P12sP1Superchaintheory2aLazyRoute,
  P12sP1Superchaintheory2bLazyRoute,
  P12sP2Caloric1LazyRoute,
  P12sP2Classical1LazyRoute,
  P12sP2Classical2LazyRoute,
])
