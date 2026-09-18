import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function NotFoundPage() {
  const { t, lang } = useApp()

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-404">404</div>
        <div className="not-found-icon">🏸</div>
        <h1>{lang === 'zh' ? '頁面未找到' : 'Page Not Found'}</h1>
        <p>
          {lang === 'zh'
            ? '抱歉，你訪問的頁面不存在或已被移除。讓我們回到首頁繼續探索吧！'
            : "Sorry, the page you're looking for doesn't exist or has been removed. Let's go back to the homepage and keep exploring!"}
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            {lang === 'zh' ? '返回首頁' : 'Back to Home'}
          </Link>
          <Link to="/discover" className="btn btn-secondary">
            {lang === 'zh' ? '探索球場' : 'Discover Courts'}
          </Link>
        </div>
      </div>
    </div>
  )
}
