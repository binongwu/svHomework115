import { useState } from 'react';
import { Upload, Video, FileText, File as FileIcon, CheckCircle, Edit, Trash2, Plus, List, Lock, LogIn, LogOut } from 'lucide-react';

const ADMIN_PASSWORD = 'admin';

const initialMockData = [
  { id: 1, title: '期末專題：AI 繪圖成果與心得', author: '王小明', type: 'youtube', date: '2026-03-24' },
  { id: 2, title: '自然科學探究報告：校園植物', author: '李小華', type: 'pdf', date: '2026-03-23' },
  { id: 3, title: '寒假經典閱讀心得分享', author: '陳大文', type: 'text', date: '2026-03-22' },
];

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'manage' | 'upload'>('manage');
  const [data, setData] = useState(initialMockData);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      setLoginError('密碼錯誤，請重試。');
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('確定要刪除這筆成果嗎？')) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleEditSave = (updated: any) => {
    setData(prev => prev.map(item => item.id === updated.id ? updated : item));
    setEditingItem(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 160px)' }}>
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', backgroundColor: 'var(--surface)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: 'var(--primary)', marginBottom: '1rem' }}>
              <Lock size={32} />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>管理者登入</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>請輸入管理者密碼以進入後台</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>密碼</label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setLoginError(''); }}
                placeholder="請輸入密碼..."
                style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius)', border: loginError ? '1px solid #ef4444' : '1px solid var(--border)', outline: 'none', fontSize: '1rem' }}
              />
              {loginError && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{loginError}</p>}
            </div>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.875rem' }}>
              <LogIn size={20} /> 登入
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {editingItem && (
        <EditModal item={editingItem} onSave={handleEditSave} onClose={() => setEditingItem(null)} />
      )}

      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>後台管理中心</h1>
          <p style={{ color: 'var(--text-muted)' }}>管理並新增學生的寒假自主學習成果。</p>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: 'var(--radius)', color: '#ef4444', backgroundColor: '#fee2e2', fontWeight: 600, fontSize: '0.9rem' }}>
          <LogOut size={16} /> 登出
        </button>
      </header>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
        <button onClick={() => setActiveTab('manage')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, backgroundColor: activeTab === 'manage' ? '#e0e7ff' : 'transparent', color: activeTab === 'manage' ? 'var(--primary)' : 'var(--text-muted)' }}>
          <List size={18} /> 總覽與管理
        </button>
        <button onClick={() => setActiveTab('upload')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 600, backgroundColor: activeTab === 'upload' ? '#e0e7ff' : 'transparent', color: activeTab === 'upload' ? 'var(--primary)' : 'var(--text-muted)' }}>
          <Plus size={18} /> 新增成果
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', backgroundColor: 'var(--surface)' }}>
        {activeTab === 'manage' ? (
          <ManageView data={data} onDelete={handleDelete} onEdit={setEditingItem} />
        ) : (
          <UploadView onSuccess={() => setActiveTab('manage')} />
        )}
      </div>
    </div>
  );
}

function ManageView({ data, onDelete, onEdit }: { data: any[], onDelete: (id: number) => void, onEdit: (item: any) => void }) {
  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-main)' }}>現有成果總覽</h2>
      <div style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fafc' }}>
            <tr>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-muted)' }}>類型</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-muted)' }}>標題</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-muted)' }}>作者</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-muted)' }}>日期</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>目前沒有任何成果</td></tr>
            ) : data.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>
                  {item.type === 'youtube' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#ef4444', backgroundColor: '#fee2e2', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 500 }}><Video size={14} /> 影片</span>}
                  {item.type === 'pdf' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#be185d', backgroundColor: '#fce7f3', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 500 }}><FileText size={14} /> 文件</span>}
                  {item.type === 'text' && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', color: '#0369a1', backgroundColor: '#e0f2fe', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 500 }}><FileIcon size={14} /> 文章</span>}
                </td>
                <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--text-main)' }}>{item.title}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.author}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.date}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => onEdit(item)} style={{ padding: '0.5rem', borderRadius: '6px', color: 'var(--primary)', backgroundColor: '#e0e7ff', cursor: 'pointer' }}>
                      <Edit size={16} />
                    </button>
                    <button onClick={() => onDelete(item.id)} style={{ padding: '0.5rem', borderRadius: '6px', color: '#ef4444', backgroundColor: '#fee2e2', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EditModal({ item, onSave, onClose }: { item: any, onSave: (updated: any) => void, onClose: () => void }) {
  const [title, setTitle] = useState(item.title);
  const [author, setAuthor] = useState(item.author);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...item, title, author });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className="animate-fade-in glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', backgroundColor: 'var(--surface)' }} onClick={e => e.stopPropagation()}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>編輯成果</h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>成果標題 *</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', fontSize: '1rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>作者 *</label>
            <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', fontSize: '1rem' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.75rem 1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer' }}>取消</button>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={18} /> 儲存變更
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UploadView({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState('youtube');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onSuccess(); }, 1500);
  };

  if (submitted) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', marginBottom: '1.5rem' }}>
          <CheckCircle size={40} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>上傳成功！</h2>
        <p style={{ color: 'var(--text-muted)' }}>成果已加入到總覽頁面中。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>成果標題 *</label>
          <input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="例如：AI 繪圖成果與心得" style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', fontSize: '1rem' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>作者/學生姓名 *</label>
          <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} placeholder="例如：王小明" style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', fontSize: '1rem' }} />
        </div>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, fontSize: '0.95rem' }}>成果類型 *</label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <TypeOption icon={<Video size={20} />} label="線上影片" active={type === 'youtube'} onClick={() => setType('youtube')} />
          <TypeOption icon={<FileText size={20} />} label="文件檔案" active={type === 'pdf'} onClick={() => setType('pdf')} />
          <TypeOption icon={<FileIcon size={20} />} label="文字文章" active={type === 'text'} onClick={() => setType('text')} />
        </div>
      </div>
      <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius)', border: '1px dashed var(--border)' }}>
        {type === 'youtube' && (
          <div className="animate-fade-in">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>影片網址 *</label>
            <input required type="url" value={content} onChange={e => setContent(e.target.value)} placeholder="https://www..." style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', fontSize: '1rem' }} />
          </div>
        )}
        {type === 'pdf' && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: '#fce7f3', marginBottom: '1rem' }}><Upload size={32} color="#be185d" /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>點擊上傳文件或拖曳至此處</h3>
          </div>
        )}
        {type === 'text' && (
          <div className="animate-fade-in">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>文章內容 *</label>
            <textarea required value={content} onChange={e => setContent(e.target.value)} placeholder="輸入文章..." rows={6} style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.875rem 2rem' }}>
          <Upload size={18} /> 確認送出
        </button>
      </div>
    </form>
  );
}

function TypeOption({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.25rem', borderRadius: 'var(--radius)', border: active ? '2px solid var(--primary)' : '2px solid var(--border)', backgroundColor: active ? '#eef2ff' : 'var(--surface)', color: active ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600 }}>
      {icon} <span style={{ fontSize: '0.9rem' }}>{label}</span>
    </div>
  );
}
