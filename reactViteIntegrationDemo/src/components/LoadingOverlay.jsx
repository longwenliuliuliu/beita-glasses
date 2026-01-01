import { memo } from 'react'

const LoadingOverlay = memo(function LoadingOverlay({ 
  isVisible, 
  message = '正在加载...',
  subMessage = '贝塔科技 · AR虚拟试戴'
}) {
  if (!isVisible) return null

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-message">{message}</p>
      <p className="loading-sub">{subMessage}</p>
    </div>
  )
})

export default LoadingOverlay
