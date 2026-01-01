import { useRef, useEffect, useCallback, useState } from 'react'
import { JEELIZVTOWIDGET } from 'jeelizvtowidget'

import searchImage from '../assets/target512.jpg'

// 眼镜款式配置
const GLASSES_MODELS = [
  { id: 1, sku: 'rayban_aviator_or_vertFlash', name: '经典飞行员', color: '#10b981' },
  { id: 2, sku: 'rayban_round_cuivre_pinkBrownDegrade', name: '复古圆框', color: '#2563eb' },
  { id: 3, sku: 'carrera_113S_blue', name: '时尚蓝调', color: '#8b5cf6' },
]

function initVTOWidget(placeHolder, canvas, callbacks) {
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: callbacks.onAdjustStart,
      ADJUST_END: callbacks.onAdjustEnd,
      LOADING_START: () => callbacks.setLoading(true),
      LOADING_END: () => callbacks.setLoading(false),
    },
    sku: 'empty',
    searchImageMask: searchImage,
    searchImageColor: 0xf59e0b,
    searchImageRotationSpeed: -0.001,
    callbackReady: () => {
      console.log('✨ 贝塔眼镜试戴组件已就绪')
      callbacks.onReady?.()
    },
    onError: (errorLabel) => {
      const messages = {
        'WEBCAM_UNAVAILABLE': '无法访问摄像头，请检查权限设置',
        'INVALID_SKU': '无效的眼镜型号',
        'PLACEHOLDER_NULL_WIDTH': '界面加载异常，请刷新页面',
        'PLACEHOLDER_NULL_HEIGHT': '界面加载异常，请刷新页面',
        'FATAL': '系统错误，请稍后重试',
      }
      callbacks.onError?.(messages[errorLabel] || '发生未知错误')
    },
  })
}

function AppCanvas({ onToggleFullscreen, isFullscreen }) {
  const refPlaceHolder = useRef()
  const refCanvas = useRef()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const [currentModel, setCurrentModel] = useState(null)
  const [error, setError] = useState(null)

  const handleModelSelect = useCallback((model) => {
    setCurrentModel(model.id)
    JEELIZVTOWIDGET.load(model.sku)
  }, [])

  const enterAdjustMode = useCallback(() => {
    JEELIZVTOWIDGET.enter_adjustMode()
    setIsAdjusting(true)
  }, [])

  const exitAdjustMode = useCallback(() => {
    JEELIZVTOWIDGET.exit_adjustMode()
    setIsAdjusting(false)
  }, [])

  useEffect(() => {
    const placeHolder = refPlaceHolder.current
    const canvas = refCanvas.current

    if (placeHolder && canvas) {
      initVTOWidget(placeHolder, canvas, {
        setLoading,
        onAdjustStart: () => setIsAdjusting(true),
        onAdjustEnd: () => setIsAdjusting(false),
        onReady: () => setIsLoading(false),
        onError: (msg) => {
          setError(msg)
          setIsLoading(false)
        },
      })
    }

    return () => {
      // JEELIZVTOWIDGET.destroy()
    }
  }, [])

  return (
    <div ref={refPlaceHolder} className="vto-container">
      <canvas ref={refCanvas} className="vto-canvas" />

      {/* 错误提示 */}
      {error && (
        <div className="error-overlay">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              重新加载
            </button>
          </div>
        </div>
      )}

      {/* 顶部控制栏 */}
      {!isAdjusting && !isLoading && (
        <div className="controls-top">
          <button className="btn btn-primary" onClick={enterAdjustMode}>
            <span>📐</span> 调整位置
          </button>
          <button className="btn" onClick={onToggleFullscreen}>
            <span>{isFullscreen ? '🔲' : '⛶'}</span> 
            {isFullscreen ? '退出全屏' : '全屏模式'}
          </button>
        </div>
      )}

      {/* 调整模式提示 */}
      {isAdjusting && (
        <div className="adjust-overlay">
          <div className="adjust-content">
            <p>👆 拖动眼镜调整到合适位置</p>
            <button className="btn btn-accent" onClick={exitAdjustMode}>
              ✓ 完成调整
            </button>
          </div>
        </div>
      )}

      {/* 底部款式选择 */}
      {!isAdjusting && !isLoading && (
        <div className="controls-bottom">
          {GLASSES_MODELS.map((model) => (
            <button
              key={model.id}
              className={`btn model-btn ${currentModel === model.id ? 'active' : ''}`}
              onClick={() => handleModelSelect(model)}
              style={{ '--model-color': model.color }}
            >
              {model.name}
            </button>
          ))}
        </div>
      )}

      {/* 加载动画 */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">正在加载...</p>
          <p className="loading-sub">贝塔科技 · AR虚拟试戴</p>
        </div>
      )}
    </div>
  )
}

export default AppCanvas
