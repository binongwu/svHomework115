# 508 寒假自主學習成果展維護指南 (Skill)

本技能庫包含維護「508寒假自主學習成果展」所需的所有技術細節、設計準則與維護規範。

## 🎨 UI 設計準則 (Design System)
- **視覺風格**：玻璃擬態 (Glassmorphism)，使用 `#ffffffCC` (白色 80% 透明) 背景配合 `backdrop-filter: blur(8px)`。
- **色彩板塊**：
  - 主色 (Primary)：`#4f46e5` (Indigo-600)
  - 輔助色：`#be185d` (Pink-700, 用於文件標籤)
  - 警告色：`#ef4444` (Red-500, 用於影片標籤)
- **卡片配置**：統一僅顯示「學生姓名」，字體加粗 (`fontWeight: 800`)，大小為 `1.25rem`。

## 🛠️ 技術實作細節

### 1. Google Drive 整合連結 (必讀)
- **預覽連結** (用於 iframe): `https://drive.google.com/file/d/文件ID/preview`
- **縮略圖連結** (用於照片輪播): `https://drive.google.com/thumbnail?id=照片ID&sz=w1200`
- **相簿直連**: 當 `type` 為 `images` 時，在 `src/pages/Home.tsx` 中填入照片 ID 陣列即可觸發原生輪播。

### 2. 影片懸停預覽
- 僅支援 YouTube 影片 (`type: 'youtube'`)。
- 連結格式需為嵌入式網址：`https://www.youtube.com/embed/影片ID`。
- 程式會自動附加 `?autoplay=1&mute=1&controls=0` 參數以實現懸停自動播放。

### 3. 縮略圖生成規範 (Thumbnail Generation)
- **存放路徑**: `/public/thumbnails/`。
- **建議解析度**: **1280x720 (16:9)**。
- 若未來使用 AI 助手更新，請要求 AI 擷取作品第一頁畫面並儲存至該路徑。

---

## 📈 維護清單 (Checkpoint)
- [ ] 檢查 `mockData` 中 `id` 是否重複。
- [ ] 確認所有圖片路徑均以 `/thumbnails/` 開頭。
- [ ] 驗證新加入的作品連結（YouTube/Drive）是否已開啟公開分享。
- [ ] 推送程式碼後，至 [Vercel 控制台](https://vercel.com/) 確認部署狀態。
