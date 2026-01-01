import { memo } from 'react'

// 眼镜款式数据
export const GLASSES_CATALOG = [
  {
    id: 1,
    sku: 'rayban_aviator_or_vertFlash',
    name: '经典飞行员',
    category: '太阳镜',
    color: '#10b981',
    description: '经典飞行员款式，永不过时',
  },
  {
    id: 2,
    sku: 'rayban_round_cuivre_pinkBrownDegrade',
    name: '复古圆框',
    category: '太阳镜',
    color: '#2563eb',
    description: '复古风格圆框设计',
  },
  {
    id: 3,
    sku: 'carrera_113S_blue',
    name: '时尚蓝调',
    category: '太阳镜',
    color: '#8b5cf6',
    description: '现代时尚蓝色系',
  },
]

const GlassesSelector = memo(function GlassesSelector({ 
  currentSku, 
  onSelect,
  className = '' 
}) {
  return (
    <div className={`glasses-selector ${className}`}>
      {GLASSES_CATALOG.map((glasses) => (
        <button
          key={glasses.id}
          className={`glasses-item ${currentSku === glasses.sku ? 'active' : ''}`}
          onClick={() => onSelect(glasses.sku)}
          style={{ '--item-color': glasses.color }}
          title={glasses.description}
        >
          <span className="glasses-name">{glasses.name}</span>
          <span className="glasses-category">{glasses.category}</span>
        </button>
      ))}
    </div>
  )
})

export default GlassesSelector
