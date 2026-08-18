---
description: 如何新增、修改或刪除「508寒假自主學習成果展」的作品
---

# 508 成果展作品管理工作流

本工作流旨在指引開發者（或 AI 助手）如何維護及更新展示網站內容。

## 1. 核心檔案位置
- **資料與邏輯中心**：`src/pages/Home.tsx`
- **縮略圖目錄**：`public/thumbnails/`

## 2. 新增作品步驟

### A. 準備素材
1. **影片**：上傳至 YouTube 並取得嵌入代碼（如 `/embed/ID`），或上傳至 Google Drive 並取得預覽網址（`/file/d/ID/preview`）。
2. **封面截圖**：如果是文件或相簿，請擷取首頁截圖並縮放為 **16:9** 比例，命名為 `姓名.png` 並存入 `public/thumbnails/`。

### B. 修改 `mockData`
在 `src/pages/Home.tsx` 的 `mockData` 陣列中新增物件：

```typescript
{
  id: 新唯一ID,
  title: '學生姓名',
  author: '學生姓名',
  type: 'youtube' | 'video' | 'pdf' | 'images',
  url: '資源連結', // YouTube 嵌入連結、雲端影片連結或相簿連結
  thumbnail: '/thumbnails/姓名.png',
  images: ['GoogleDriveID1', 'ID2', ...] // 僅 'images' 類型需要
}
```

## 3. 內容類型說明
- **`youtube`**: 支援滑鼠懸停自動播放。
- **`video`**: 雲端影片，顯示播放按鈕，開啟 Modal 播放影片。
- **`images`**: 原生相簿輪播，需提供一個包含所有照片 Google Drive ID 的陣列。
- **`pdf`**: 文件預覽，支援 PDF、PPT 或 Google Drive 資料夾嵌入。

## 4. 部署生效
1. 執行 `git add .`
2. 執行 `git commit -m "Add new project for [Name]"`
3. 執行 `git push origin master:main`
4. 網頁將在約 1 分鐘後自動完成更新。
