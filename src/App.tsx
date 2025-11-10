import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect, useRef } from 'react'
import { selectAuthError, selectAuthRTStatus, selectAuthStatus } from './pages/auth/selectors'
import { accessTokenRefreshRequested, userLogoutRequested, userLogoutSucceeded } from './pages/auth/actions'
import RequireGuest from './routes/RequireGuest'
import RequireAuth from './routes/RequireAuth'
import { ErrorBoundary } from 'react-error-boundary'
import SimpleErrorPage from './pages/layout/SimpleErrorPage'
import LoadingSpinner from './components/LoadingSpinner'
import { notify } from './utils/helpers'
import { ROUTES } from './constants/routes'
import { STATUS } from './constants/api'
import Loading from './pages/layout/Loading'
import ErrorFallback from './pages/layout/ErrorFallback'

const Products = lazy(() => import('./pages/products/Products'))
const Header = lazy(() => import('./pages/layout/Header'))
const Cart = lazy(() => import('./pages/cart/Cart'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const kicked = useRef(false);

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const rts = useSelector(selectAuthRTStatus)

  // Kick off refresh exactly once when app starts idle
  // useEffect(() => {
  //   if (status === STATUS.IDLE && !kicked.current) {
  //     dispatch(accessTokenRefreshRequested());
  //     kicked.current = true;
  //   }

  //   if (status === "fail") {
  //     dispatch(userLogoutSucceeded())
  //     navigate(ROUTES.HOME)
  //     notify({ status, error })
  //   }
  // }, [status, dispatch, error]);

  // useEffect(() => {
  //   if (rts === "expired" && status !== "fail") {
  //     notify({ status: "fail", error: "Your session is expired, please login again" })
  //     dispatch(userLogoutRequested())
  //     navigate(ROUTES.HOME)
  //   }
  // }, [rts, dispatch, navigate, status])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner overlay size={'lg'} label='Loading'></LoadingSpinner>}>
        <Routes>
          <Route element={<RequireGuest />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Register />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path={ROUTES.HOME} element={<Home />} />
          </Route>
          <Route
            path="*"
            element={
              <SimpleErrorPage
                status={404}
                title="Page not found"
                message="The page you're looking for doesn't exist."
                homeHref="/"
              />
            }
          />
        </Routes>
      </Suspense>
      <Loading />
    </ErrorBoundary>

  )
}

function Home() {
  return <>
    <Header></Header>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Products />
    </ErrorBoundary>
    <Cart />
  </>
}


export default App
