import { memo } from 'react'

const Header = memo(function Header({ 
  title = '贝塔眼镜',
  subtitle = 'AR试戴'
}) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
        </div>
        <h1 className="brand-title">{title}</h1>
        <span className="brand-badge">{subtitle}</span>
      </div>
    </header>
  )
})

export default Header
