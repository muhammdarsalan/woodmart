import { Component } from 'react';
import Button from './Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Wood Mart route error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
          <p className="mb-2 text-sm uppercase tracking-wide text-secondary">Something went wrong</p>
          <h1 className="mb-4 text-3xl font-semibold text-primary">We could not load this section.</h1>
          <p className="mb-6 max-w-md text-sm leading-6 text-secondary">Please return home or go back and try again.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => { window.location.href = '/'; }}>Go Home</Button>
            <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
