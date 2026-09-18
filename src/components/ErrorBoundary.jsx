import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>出錯了</h2>
            <p>
              抱歉，應用程序遇到了一個錯誤。請嘗試刷新頁面或返回首頁。
            </p>
            <div className="error-actions">
              <button className="btn btn-primary" onClick={this.handleRetry}>
                重試
              </button>
              <Link to="/" className="btn btn-secondary">
                返回首頁
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
