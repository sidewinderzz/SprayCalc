import React from 'react';
import { colors } from '../types';

interface Props { children: React.ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('App render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center"
            style={{ boxShadow: '0 4px 24px 0 rgba(73,138,90,0.12)' }}
          >
            <div className="text-4xl mb-3">⚠️</div>
            <h2 className="text-lg font-bold mb-2" style={{ color: colors.primaryDark }}>
              Something went wrong
            </h2>
            <p className="text-sm mb-5" style={{ color: colors.lightText + '99' }}>
              An unexpected error occurred. If the problem persists, resetting the app will clear saved data and restore defaults.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-lg font-medium text-white mb-2"
              style={{ backgroundColor: colors.primary }}
            >
              Try Again
            </button>
            <button
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              className="w-full py-3 rounded-lg font-medium"
              style={{ color: colors.primaryDark, border: `1px solid ${colors.primary}40` }}
            >
              Reset App &amp; Reload
            </button>
            {this.state.error && (
              <p className="mt-4 text-xs font-mono text-left break-all" style={{ color: colors.lightText + '60' }}>
                {this.state.error.message}
              </p>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
