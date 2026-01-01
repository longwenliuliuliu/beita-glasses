# 贝塔眼镜 - React + Vite 集成演示

> 贝塔科技 AR虚拟试戴组件的 React 现代化集成示例

## 📦 环境要求

- Node.js 18+ (推荐使用 20.x LTS)
- npm 9+ 或 pnpm 8+

## 🚀 快速开始

### 设置 Node.js 版本

如果使用 nvm 管理 Node.js 版本：

```bash
nvm use 18
# 或
nvm use 20
```

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看演示

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
reactViteIntegrationDemo/
├── src/
│   ├── components/
│   │   └── AppCanvas.jsx    # 试戴组件
│   ├── assets/
│   │   └── target512.jpg    # 人脸检测引导图
│   ├── App.jsx              # 主应用
│   ├── main.jsx             # 入口文件
│   └── index.css            # 全局样式
├── index.html               # HTML模板
├── package.json             # 依赖配置
└── vite.config.js           # Vite配置
```

## 🎨 自定义

### 更换眼镜模型

在 `AppCanvas.jsx` 中修改 SKU：

```jsx
<button onClick={set_glassesModel.bind(this, 'your_sku_here')}>
  自定义款式
</button>
```

### 修改主题颜色

编辑 `index.css` 中的 CSS 变量：

```css
:root {
  --primary: #2563eb;
  --accent: #f59e0b;
  /* ... */
}
```

## 📖 API 参考

| 方法 | 说明 |
|------|------|
| `JEELIZVTOWIDGET.start(options)` | 初始化组件 |
| `JEELIZVTOWIDGET.load(sku)` | 加载眼镜模型 |
| `JEELIZVTOWIDGET.enter_adjustMode()` | 进入调整模式 |
| `JEELIZVTOWIDGET.exit_adjustMode()` | 退出调整模式 |

## 🔗 相关链接

- [贝塔眼镜官网](#)
- [完整API文档](../doc.pdf)
- [可用SKU列表](../glassesSKU.csv)

---

<p align="center">
  <strong>贝塔科技</strong> | 让科技更懂时尚
</p>
