# 贝塔眼镜 - AR虚拟试戴平台

> **贝塔科技** 倾力打造的下一代眼镜虚拟试戴解决方案

![贝塔眼镜](https://img.shields.io/badge/贝塔科技-眼镜AR试戴-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![WebGL2](https://img.shields.io/badge/WebGL2-Supported-orange?style=for-the-badge)

## 📋 目录

- [项目简介](#项目简介)
- [核心功能](#核心功能)
- [演示](#演示)
- [快速开始](#快速开始)
- [技术文档](#技术文档)
- [兼容性](#兼容性)
- [性能优化](#性能优化)
- [许可证](#许可证)

## 项目简介

贝塔眼镜AR虚拟试戴平台是由**贝塔科技**自主研发的实时眼镜虚拟试戴解决方案。通过先进的WebGL渲染技术和AI人脸识别算法，让用户能够在线实时体验各种眼镜款式，提升购物体验，降低退换货率。

### 为什么选择贝塔眼镜？

1. **增强用户体验**：虚拟试戴技术让用户能够直观地看到不同镜框在自己脸上的效果，提高购买信心
2. **提升转化率**：更好的试戴体验意味着更高的购买决策效率，减少购物车遗弃率
3. **竞争优势**：为您的电商平台增添差异化功能，提升品牌形象和用户粘性

## 核心功能

### 渲染技术
- ✨ 基于物理的渲染（PBR）
- 🌟 实时光线追踪阴影
- 🎨 延迟着色技术
- 🔍 时间抗锯齿（TAA）

### 识别能力
- 🎯 实时人脸检测与追踪
- 💡 智能环境光重建（环境光+方向光）
- 🌙 适应各种光照条件（背光、侧光等）
- 👤 支持多种面部特征（胡须、遮挡等）

### 平台兼容
- 📱 移动端支持（iOS、Android）
- 💻 桌面端支持
- 🚀 轻量化（演示仅2.1MB）

## 演示

### 本仓库包含

- [静态集成演示](index.html) - 基础HTML/JS集成示例
- [React + Vite演示](/reactViteIntegrationDemo) - 现代React框架集成示例

### 在线体验

访问我们的官方网站体验完整功能：[贝塔眼镜官网](#)

## 快速开始

### 静态集成

```html
<!DOCTYPE html>
<html>
<head>
  <script src="dist/BetaVTOWidget.js"></script>
</head>
<body>
  <div id="BetaVTOWidget">
    <canvas id="BetaVTOWidgetCanvas"></canvas>
  </div>
  <script>
    BETAVTOWIDGET.start({
      sku: 'your_glasses_sku',
      callbackReady: function() {
        console.log('贝塔眼镜试戴组件已就绪');
      }
    });
  </script>
</body>
</html>
```

### React集成

```bash
cd reactViteIntegrationDemo
npm install
npm run dev
```

## 技术文档

详细的API文档请参阅 [doc.pdf](/doc.pdf)

### 主要API

| 方法 | 描述 |
|------|------|
| `BETAVTOWIDGET.start(options)` | 初始化试戴组件 |
| `BETAVTOWIDGET.load(sku)` | 加载指定眼镜模型 |
| `BETAVTOWIDGET.enter_adjustMode()` | 进入调整模式 |
| `BETAVTOWIDGET.exit_adjustMode()` | 退出调整模式 |
| `BETAVTOWIDGET.set_LUT(path)` | 设置滤镜效果 |
| `BETAVTOWIDGET.relieve_DOM(ms)` | 释放GPU性能 |

### 眼镜模型

眼镜3D模型存储在贝塔眼镜模型库中。可查看 [glassesSKU.csv](/glassesSKU.csv) 获取可用模型列表。

如需添加自定义眼镜模型，请联系：`contact@beita.tech`

## 兼容性

| 环境 | 要求 |
|------|------|
| WebGL2 | 优先使用，无需额外扩展 |
| WebGL1 | 需要 `OES_TEXTURE_FLOAT` 或 `OES_TEXTURE_HALF_FLOAT` 扩展 |

### 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 15+
- ✅ Edge 79+
- ✅ iOS Safari 15+
- ✅ Android Chrome 60+

## 性能优化

### 检查清单

1. 确保使用最新版本的组件脚本
2. 使用Chrome等现代浏览器
3. 更新显卡驱动
4. 在Chrome中访问 `chrome://gpu` 检查硬件加速状态

### GPU优化

```javascript
// 在DOM操作时释放GPU资源
BETAVTOWIDGET.relieve_DOM(300); // 释放300毫秒

// 持续降低渲染频率
BETAVTOWIDGET.switch_slow(true, 100); // 每100ms渲染一次
```

## 部署说明

由于需要访问摄像头（MediaStream API），应用必须部署在HTTPS服务器上（即使是自签名证书也可以）。HTTP环境下无法正常工作。

## 许可证

[贝塔科技商业许可证](/LICENSE)

---

<p align="center">
  <strong>贝塔科技</strong> | 让科技更懂时尚
</p>
