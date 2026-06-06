import { Component, type ErrorInfo, type ReactNode } from 'react'

// ErrorBoundary must be a class component — React has no hook equivalent for
// getDerivedStateFromError/componentDidCatch. Fast refresh cannot HMR class components.
/* eslint-disable react-refresh/only-export-components */

interface ErrorBoundaryProps {
  children: ReactNode
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

/**
 * Catches synchronous render errors in the component subtree.
 * Without this, any panel throw propagates to React's root and
 * blanks the entire app with no user-facing message.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomePanelThatMightThrow />
 *   </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
    this.reset = this.reset.bind(this)
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (import.meta.env?.DEV) {
      console.error('[ErrorBoundary] Caught render error:', error, info.componentStack)
    }
  }

  reset(): void {
    this.setState({ error: null })
  }

  render(): ReactNode {
    const { error } = this.state
    const { children, fallback } = this.props

    if (error) {
      if (fallback) return fallback(error, this.reset)
      return <DefaultErrorFallback error={error} reset={this.reset} />
    }

    return children
  }
}

function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div
      role="alert"
      className="flex min-h-[20rem] w-full flex-col items-center justify-center gap-4 rounded-md border border-red-500/20 bg-red-500/5 p-8 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-md border border-red-500/30 bg-red-500/10 text-red-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div>
        <h3 className="font-serif text-lg font-bold text-parchment-100">Something went wrong</h3>
        <p className="mt-1 text-sm text-parchment-200/70">
          This section encountered an error and could not be displayed.
        </p>
        {import.meta.env?.DEV && (
          <p className="mt-2 font-mono text-xs text-red-300/70">{error.message}</p>
        )}
      </div>
      <button
        type="button"
        onClick={reset}
        title="Try rendering this section again"
        className="cathedral-button-secondary rounded-md px-4 py-2 text-xs uppercase tracking-[0.22em]"
      >
        Try Again
      </button>
    </div>
  )
}
