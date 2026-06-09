import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FDFAF4',
          fontFamily: 'Jost, sans-serif',
          gap: '1rem',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '4rem' }}>🪵</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#1C0A00', fontSize: '2rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#6B4C2A' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.href = '/'
              }}
              style={{
                background: '#C49A2A',
                color: '#1C0A00',
                border: 'none',
                padding: '12px 32px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px',
                fontSize: '14px',
                letterSpacing: '1px'
              }}
            >
              GO HOME
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.history.back()
              }}
              style={{
                background: 'transparent',
                color: '#1C0A00',
                border: '1px solid #1C0A00',
                padding: '12px 32px',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '2px',
                fontSize: '14px',
                letterSpacing: '1px'
              }}
            >
              GO BACK
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
