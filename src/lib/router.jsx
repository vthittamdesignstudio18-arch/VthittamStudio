import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

/**
 * Minimal History API router.
 *
 * The site has two routes, so pulling in a routing library would cost more
 * bytes than the feature is worth. This exposes the small slice of the
 * react-router API the app actually uses — BrowserRouter, Routes, Route,
 * Link, useLocation, useNavigate — with identical call signatures, so
 * swapping back to react-router-dom later is an import change and nothing else.
 */

const RouterContext = createContext(null)

function useRouter(hookName) {
  const context = useContext(RouterContext)

  if (!context) {
    throw new Error(`${hookName} must be used inside <BrowserRouter>.`)
  }

  return context
}

/** `/quote/` and `/quote` should resolve to the same route. */
function normalize(pathname) {
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

function readLocation() {
  return {
    pathname: normalize(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
    // Namespaced so we never collide with history state written by anything else.
    state: window.history.state?.usr ?? null,
  }
}

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(readLocation)

  // Back / forward buttons.
  useEffect(() => {
    const handlePopState = () => setLocation(readLocation())

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to, { state = null, replace = false } = {}) => {
    // navigate(-1) / navigate(1) — delegate to the browser.
    if (typeof to === 'number') {
      window.history.go(to)
      return
    }

    window.history[replace ? 'replaceState' : 'pushState']({ usr: state }, '', to)
    setLocation(readLocation())
  }, [])

  const value = useMemo(() => ({ location, navigate }), [location, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function Routes({ children }) {
  const { location } = useRouter('<Routes>')

  const routes = Children.toArray(children).filter(isValidElement)
  const match =
    routes.find((route) => normalize(route.props.path) === location.pathname) ??
    routes.find((route) => route.props.path === '*')

  return match ? match.props.element : null
}

/** Configuration only — <Routes> reads these props and renders the match. */
export function Route() {
  return null
}

export const Link = forwardRef(function Link(
  { to, state = null, replace = false, target, onClick, ...rest },
  ref
) {
  const { navigate } = useRouter('<Link>')

  function handleClick(event) {
    onClick?.(event)

    const isModified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0

    // Let the browser handle new-tab clicks, middle clicks and external targets.
    if (event.defaultPrevented || isModified || (target && target !== '_self')) return

    event.preventDefault()
    navigate(to, { state, replace })
  }

  return <a ref={ref} href={to} target={target} onClick={handleClick} {...rest} />
})

export function useLocation() {
  return useRouter('useLocation()').location
}

export function useNavigate() {
  return useRouter('useNavigate()').navigate
}
