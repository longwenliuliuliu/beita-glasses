import { useRef, useEffect, useCallback } from 'react'
import { JEELIZVTOWIDGET } from 'jeelizvtowidget'

import searchImage from '../assets/target512.jpg'

// 眼镜款式配置
const GLASSES_MODELS = [
  { id: 1, sku: 'rayban_aviator_or_vertFlash', name: '经典飞行员' },
  { id: 2, sku: 'rayban_round_cuivre_pinkBrownDegrade', name: '复古圆框' },
  { id: 3, sku: 'carrera_113S_blue', name: '时尚蓝调' },
]

function initVTOWidget(placeHolder, canvas, toggleLoading) {
  JEELIZVTOWIDGET.start({
    placeHolder,
    canvas,
    callbacks: {
      ADJUST_START: null,
      ADJUST_END: null,
      LOADING_START: toggleLoading.bind(null, true),
      LOADING_END: toggleLoading.bind(null, false),
    },
    sku: 'empty',
    searchImageMask: searchImage,
    searchImageColor: 0xf59e0b, // 贝塔品牌色
    searchImageRotationSpeed: -0.001,
    callbackReady: function () {
      console.log('✨ 贝塔眼镜试戴组件已就绪')
    },
    onError: function (errorLabel) {
      let message = '发生错误'
      switch (errorLabel) {
        case 'WEBCAM_UNAVAILABLE':
          message = '无法访问摄像头，请检查权限设置'
          break
        case 'INVALID_SKU':
          message = '无效的眼镜型号'
          break
        case 'PLACEHOLDER_NULL_WIDTH':
        case 'PLACEHOLDER_NULL_HEIGHT':
          message = '界面加载异常，请刷新页面'
          break
        case 'FATAL':
        default:
          message = '系统错误，请稍后重试'
          break
      }
      alert(message)
    },
  })
}

function AppCanvas() {
  const refPlaceHolder = useRef()
  const refCanvas = useRef()
  const refAdjustEnter = useRef()
  const refAdjust = useRef()
  const refChangeModel = useRef()
  const refLoading = useRef()

  const toggleLoading = useCallback((isLoadingVisible) => {
    if (refLoading.current) {
      refLoading.current.style.display = isLoadingVisible ? 'flex' : 'none'
    }
  }, [])

  const enterAdjustMode = useCallback(() => {
    JEELIZVTOWIDGET.enter_adjustMode()
    if (refAdjustEnter.current) refAdjustEnter.current.style.display = 'none'
    if (refAdjust.current) refAdjust.current.style.display = 'block'
    if (refChangeModel.current) refChangeModel.current.style.display = 'none'
  }, [])

  const exitAdjustMode = useCallback(() => {
    JEELIZVTOWIDGET.exit_adjustMode()
    if (refAdjustEnter.current) refAdjustEnter.current.style.display = 'flex'
    if (refAdjust.current) refAdjust.current.style.display = 'none'
    if (refChangeModel.current) refChangeModel.current.style.display = 'flex'
  }, [])

  const setGlassesModel = useCallback((sku) => {
    JEELIZVTOWIDGET.load(sku)
  }, [])

  useEffect(() => {
    const placeHolder = refPlaceHolder.current
    const canvas = refCanvas.current

    if (placeHolder && canvas) {
      initVTOWidget(placeHolder, canvas, toggleLoading)
    }

    return () => {
      // 清理逻辑
      // JEELIZVTOWIDGET.destroy()
    }
  }, [toggleLoading])

  return (
    <div ref={refPlaceHolder} className="BetaVTOWidget">
      <canvas ref={refCanvas} className="BetaVTOWidgetCanvas" />

      {/* 调整按钮 */}
      <div ref={refAdjustEnter} className="BetaVTOWidgetControls">
        <button
          className="BetaVTOWidgetButton BetaVTOWidgetAdjustEnterButton"
          onClick={enterAdjustMode}
        >
          <span>📐</span>
          调整位置
        </button>
      </div>

      {/* 调整模式提示 */}
      <div ref={refAdjust} className="BetaVTOWidgetAdjustNotice">
        <p>👆 拖动眼镜调整到合适位置</p>
        <button
          className="BetaVTOWidgetButton BetaVTOWidgetAdjustExitButton"
          onClick={exitAdjustMode}
        >
          ✓ 完成调整
        </button>
      </div>

      {/* 款式选择 */}
      <div
        ref={refChangeModel}
        className="BetaVTOWidgetControls BetaVTOWidgetChangeModelContainer"
      >
        {GLASSES_MODELS.map((model) => (
          <button
            key={model.id}
            className="BetaVTOWidgetButton"
            onClick={() => setGlassesModel(model.sku)}
          >
            {model.name}
          </button>
        ))}
      </div>

      {/* 加载动画 */}
      <div ref={refLoading} className="BetaVTOWidgetLoading">
        <div className="BetaVTOWidgetLoadingText">正在加载...</div>
      </div>
    </div>
  )
}

export default AppCanvas
