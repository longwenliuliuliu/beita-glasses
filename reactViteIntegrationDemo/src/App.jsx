import { useState, useCallback } from 'react'
import AppCanvas from './components/AppCanvas'

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(console.error)
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      }).catch(console.error)
    }
  }, [])

  return (
    <main className="app">
      <AppCanvas 
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </main>
  )
}

export default App
