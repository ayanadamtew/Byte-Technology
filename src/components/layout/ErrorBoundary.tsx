import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { BYTE_BRAND } from '../../styles/tokens';
import { Button } from '../ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string | null;
}

/**
 * Production ErrorBoundary catching unexpected runtime exceptions and offering
 * a clean architectural recovery state with direct contact fallback.
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected rendering error occurred.',
    };
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center bg-[#F2F2EE] px-4 py-16 text-[#1A2130]"
        >
          <div className="w-full max-w-lg rounded-lg border border-[#DFDFD9] bg-[#FAF9F6] p-8">
            <div className="flex items-center gap-3 text-[#B91C1C]">
              <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="font-mono text-xs font-medium">
                Application Recovery State
              </span>
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#1A2130]">
              We encountered an unexpected interface issue.
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-[#4A5365]">
              {this.state.errorMessage}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={this.handleReset}>
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span>Reload Byte Technology</span>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${BYTE_BRAND.email}`}>
                  Contact {BYTE_BRAND.email}
                </a>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
