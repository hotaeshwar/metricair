import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "30px", backgroundColor: "#121212", color: "#ff4a4a", minHeight: "100vh", fontFamily: "monospace", zIndex: 99999, position: "relative" }}>
          <h2>React App Render Crash Catch</h2>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>{this.state.error && this.state.error.toString()}</p>
          <pre style={{ backgroundColor: "#222", padding: "15px", borderRadius: "8px", overflowX: "auto", color: "#ccc" }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
