import { useState, useCallback } from 'react'
import Header from './components/Header'
import AppCanvas from './components/AppCanvas'

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  return (
    <div className={`app ${isFullscreen ? 'fullscreen' : ''}`}>
      {!isFullscreen && <Header />}
      <main className="app-main">
        <AppCanvas onToggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
      </main>
    </div>
  )
}

export default App
