import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Play, X, Image, ChevronLeft, ChevronRight } from 'lucide-react';

const mockData: any[] = [
  { id: 4, title: '陳崇名', author: '陳崇名', type: 'canva', url: 'https://docs.google.com/presentation/d/1jkvaxyUxGtm8wF_xFBGYYYdcLbN98lDI/embed?start=false&loop=false&delayms=3000', thumbnail: 'https://drive.google.com/thumbnail?id=1jkvaxyUxGtm8wF_xFBGYYYdcLbN98lDI&sz=w800' },
  { id: 9, title: '李承翰', author: '李承翰', type: 'pdf', url: 'https://drive.google.com/file/d/11a5zkMSzl8uL0qpJetueuvF2ttr9flxX/preview', thumbnail: 'https://drive.google.com/thumbnail?id=11a5zkMSzl8uL0qpJetueuvF2ttr9flxX&sz=w800' },
  { id: 31, title: '謝棋芝', author: '謝棋芝', type: 'canva', url: 'https://docs.google.com/presentation/d/1qC_NQ1pnAIM1G3SEyTtkSP7HFZgMGr-sDFbByljwTOA/embed?start=false&loop=false&delayms=3000', thumbnail: 'https://drive.google.com/thumbnail?id=1qC_NQ1pnAIM1G3SEyTtkSP7HFZgMGr-sDFbByljwTOA&sz=w800' },
  { id: 34, title: '連晨希', author: '連晨希', type: 'pdf', url: 'https://drive.google.com/file/d/1mUpPXuYYaggMxteUvQZgffATDrXwAd3p/preview', thumbnail: 'https://drive.google.com/thumbnail?id=1mUpPXuYYaggMxteUvQZgffATDrXwAd3p&sz=w800' }
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);


  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <div style={{ display: 'inline-block', padding: '0.25rem 1rem', background: '#e0e7ff', color: 'var(--primary)', borderRadius: '20px', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
          608專屬
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          115暑假自主學習成果展
        </h1>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {mockData.map((item) => (
          <ResultCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

function ItemModal({ item, onClose }: { item: any; onClose: () => void }) {
  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const modal = (
    <div
      className="animate-fade-in"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        style={{ 
          height: item.type === 'pdf' ? '82vh' : '85vh', 
          width: item.type === 'pdf' ? 'calc(82vh * 4.1 / 3)' : 'calc(85vh * 16 / 9)', 
          maxWidth: '95vw', 
          backgroundColor: 'var(--surface)', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' 
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1.5rem', borderBottom: '1px solid var(--border)', backgroundColor: '#fff', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{item.author} 的作品</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.1rem' }}>點擊視窗外背景即可關閉</p>
          </div>
          <button onClick={onClose} style={{ padding: '0.4rem', backgroundColor: '#f1f5f9', borderRadius: '50%', color: 'var(--text-muted)', transition: 'all 0.2s' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'hidden', backgroundColor: item.type === 'pdf' ? '#fff' : '#000', display: 'flex', flexDirection: 'column' }}>
          {(item.type === 'youtube' || item.type === 'video' || item.type === 'canva' || (item.type === 'pdf' && item.url)) && (
            <iframe width="100%" height="100%" src={item.type === 'youtube' ? `${item.url}?autoplay=1` : item.url} title={item.author} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ flex: 1 }}></iframe>
          )}
          {item.type === 'images' && <ImageCarousel images={item.images} />}
          {item.type === 'pdf' && !item.url && (
            <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <FileText size={80} color="#be185d" style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '1.2rem' }}>文件檢視器載入中...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a', height: '100%' }}>
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img 
          key={images[currentIndex]}
          src={`https://drive.google.com/thumbnail?id=${images[currentIndex]}&sz=w1200`} 
          alt={`作品 ${currentIndex + 1}`}
          className="animate-fade-in"
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
        
        <button 
          onClick={prev}
          style={{ position: 'absolute', left: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={next}
          style={{ position: 'absolute', right: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
        >
          <ChevronRight size={32} />
        </button>

        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem' }}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div style={{ height: '80px', background: '#000', display: 'flex', gap: '0.5rem', padding: '0.5rem', overflowX: 'auto', borderTop: '1px solid #333' }}>
        {images.map((id, idx) => (
          <img 
            key={id}
            src={`https://drive.google.com/thumbnail?id=${id}&sz=w200`} 
            onClick={() => setCurrentIndex(idx)}
            style={{ 
              height: '100%', 
              aspectRatio: '1', 
              objectFit: 'cover', 
              cursor: 'pointer', 
              opacity: currentIndex === idx ? 1 : 0.5,
              border: currentIndex === idx ? '2px solid var(--primary)' : 'none',
              borderRadius: '4px',
              transition: 'opacity 0.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ item, onClick }: { item: any, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="glass-panel"
      onClick={onClick}
      style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', transform: isHovered ? 'translateY(-8px)' : 'none', boxShadow: isHovered ? 'var(--shadow-lg)' : 'var(--shadow-md)', cursor: 'pointer', backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', height: '180px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
        {(item.type === 'youtube' || item.type === 'video') && (
          <div style={{ width: '100%', height: '100%' }}>
            {(isHovered && item.type === 'youtube') ? (
              <iframe width="100%" height="100%" src={`${item.url}?autoplay=1&mute=1&controls=0&modestbranding=1`} title="預覽影片" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" style={{ pointerEvents: 'none' }}></iframe>
            ) : (
              <>
                <img src={item.thumbnail} alt={item.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '50%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: isHovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s', color: '#ef4444' }}>
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        
        {(item.type === 'pdf' || item.type === 'images' || item.type === 'canva') && (
          <div style={{ width: '100%', height: '100%' }}>
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', background: item.type === 'canva' ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' : 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' }}>
                {item.type === 'canva' ? <Image size={60} color="#0ea5e9" strokeWidth={1.5} /> : <FileText size={60} color="#be185d" strokeWidth={1.5} />}
              </div>
            )}
          </div>
        )}
        
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(255,255,255,0.95)', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 10 }}>
          {item.type === 'youtube' && <><Play size={10} fill="currentColor" color="#ef4444" /> 影片</>}
          {item.type === 'video' && <><Play size={10} fill="currentColor" color="#ef4444" /> 影片</>}
          {item.type === 'pdf' && <><FileText size={10} color="#be185d" /> 文件</>}
          {item.type === 'images' && <><Image size={10} color="#0369a1" /> 相簿 ({item.images.length})</>}
          {item.type === 'canva' && <><Image size={10} color="#0ea5e9" /> 簡報</>}
        </div>
      </div>

      <div style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{item.author}</h3>
      </div>
    </div>
  );
}
