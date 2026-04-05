import React, { useState } from 'react';

const CORES = [
  { bg: '#D4537E', texto: '#FFFFFF' },
  { bg: '#1a1a1a', texto: '#FFFFFF' },
  { bg: '#7F77DD', texto: '#FFFFFF' },
  { bg: '#1D9E75', texto: '#FFFFFF' },
  { bg: '#BA7517', texto: '#FFFFFF' },
  { bg: '#FFFFFF', texto: '#1a1a1a' },
  { bg: '#FBEAF0', texto: '#993556' },
  { bg: '#E1F5EE', texto: '#085041' }
];

export default function SlideVisual({ slide, foto, dimensao, onEditar, onRegerar }) {
  const [editando, setEditando] = useState(false);
  const [textoEdit, setTextoEdit] = useState('');
  const [corSel, setCorSel] = useState(CORES[0]);
  const [mostraCores, setMostraCores] = useState(false);
  const [regerando, setRegerando] = useState(false);

  function iniciarEdicao() {
    setTextoEdit(slide.corpo);
    setEditando(true);
  }

  function salvarEdicao() {
    onEditar(textoEdit);
    setEditando(false);
  }

  async function regerarSlide() {
    setRegerando(true);
    await onRegerar();
    setRegerando(false);
  }

  function baixarPNG() {
    const canvas = document.createElement('canvas');
    const isVertical = dimensao === '9:16';
    canvas.width = 1080;
    canvas.height = isVertical ? 1920 : 1080;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = corSel.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Foto se tiver
    if (foto) {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(canvas.width, canvas.height) * 0.35;
        const x = canvas.width - size - 60;
        const y = canvas.height - size - 60;
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, x, y, size, size);
        ctx.restore();
        renderTexto(ctx, canvas, isVertical);
        download(canvas);
      };
      img.src = foto;
    } else {
      renderTexto(ctx, canvas, isVertical);
      download(canvas);
    }
  }

  function renderTexto(ctx, canvas, isVertical) {
    const padding = 80;
    ctx.fillStyle = corSel.texto;
    
    // Número do slide
    ctx.font = '600 32px -apple-system, sans-serif';
    ctx.fillStyle = corSel.texto + '80';
    ctx.fillText(`${slide.num < 10 ? '0' : ''}${slide.num}`, padding, padding + 30);

    // Título
    ctx.fillStyle = corSel.texto;
    ctx.font = 'bold 72px -apple-system, sans-serif';
    const titulo = slide.titulo || '';
    const palavras = titulo.split(' ');
    let linha = '';
    let y = isVertical ? 400 : 280;
    
    for (const p of palavras) {
      const test = linha + p + ' ';
      if (ctx.measureText(test).width > canvas.width - padding * 2 && linha) {
        ctx.fillText(linha.trim(), padding, y);
        linha = p + ' ';
        y += 85;
      } else {
        linha = test;
      }
    }
    if (linha) ctx.fillText(linha.trim(), padding, y);

    // Corpo
    if (slide.corpo) {
      ctx.font = '400 44px -apple-system, sans-serif';
      ctx.fillStyle = corSel.texto + 'CC';
      const linhasCorpo = slide.corpo.split('\n').slice(0, 6);
      let yCorpo = y + 100;
      for (const lc of linhasCorpo) {
        ctx.fillText(lc.substring(0, 45), padding, yCorpo);
        yCorpo += 54;
      }
    }
  }

  function download(canvas) {
    const link = document.createElement('a');
    link.download = `slide-${slide.num}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  const isVertical = dimensao === '9:16';

  return (
    <div style={{ marginBottom: '12px' }}>
      {/* Canvas visual */}
      <div style={{
        background: corSel.bg,
        borderRadius: '8px',
        padding: '5%',
        aspectRatio: isVertical ? '9/16' : '1/1',
        maxHeight: isVertical ? '260px' : '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Foto no canto */}
        {foto && (
          <div style={{
            position: 'absolute', bottom: '8%', right: '5%',
            width: '30%', aspectRatio: '1',
            borderRadius: '50%', overflow: 'hidden',
            border: `2px solid ${corSel.texto}40`
          }}>
            <img src={foto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ fontSize: '8px', color: corSel.texto + '60' }}>
          {String(slide.num).padStart(2, '0')}/{slide.num}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: foto ? '35%' : '0' }}>
          {slide.titulo && (
            <div style={{
              fontSize: isVertical ? '13px' : '14px',
              fontWeight: '700',
              color: corSel.texto,
              lineHeight: '1.3',
              marginBottom: '6px'
            }}>
              {slide.titulo}
            </div>
          )}
          {slide.subtitulo && (
            <div style={{ fontSize: '10px', color: corSel.texto + 'CC', marginBottom: '4px' }}>
              {slide.subtitulo}
            </div>
          )}
          {slide.corpo && (
            <div style={{
              fontSize: '9px',
              color: corSel.texto + 'CC',
              lineHeight: '1.5',
              whiteSpace: 'pre-line'
            }}>
              {slide.corpo.substring(0, 150)}{slide.corpo.length > 150 ? '...' : ''}
            </div>
          )}
        </div>

        <div style={{ fontSize: '7px', color: corSel.texto + '40' }}>@perfil · MDP</div>
      </div>

      {/* Cores */}
      {mostraCores && (
        <div style={{ display: 'flex', gap: '6px', padding: '8px 0', flexWrap: 'wrap' }}>
          {CORES.map((c, i) => (
            <div
              key={i}
              onClick={() => { setCorSel(c); setMostraCores(false); }}
              style={{
                width: '28px', height: '28px', borderRadius: '6px',
                background: c.bg, cursor: 'pointer',
                border: corSel.bg === c.bg ? '2px solid #D4537E' : '0.5px solid rgba(0,0,0,0.15)'
              }}
            />
          ))}
        </div>
      )}

      {/* Edição */}
      {editando && (
        <div style={{ marginTop: '6px' }}>
          <textarea
            value={textoEdit}
            onChange={e => setTextoEdit(e.target.value)}
            style={{ minHeight: '80px', marginBottom: '6px' }}
          />
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setEditando(false)} className="btn btn-outline btn-sm">Cancelar</button>
            <button onClick={salvarEdicao} className="btn btn-rose btn-sm">Salvar</button>
          </div>
        </div>
      )}

      {/* Ações */}
      <div style={{ display: 'flex', gap: '5px', marginTop: '6px' }}>
        <button onClick={iniciarEdicao} style={{
          flex: 1, padding: '6px', background: '#f8f6f3',
          border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px',
          fontSize: '10px', color: '#666', cursor: 'pointer'
        }}>✏️ Editar</button>

        <button onClick={() => setMostraCores(!mostraCores)} style={{
          flex: 1, padding: '6px', background: '#f8f6f3',
          border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px',
          fontSize: '10px', color: '#666', cursor: 'pointer'
        }}>🎨 Cores</button>

        <button onClick={regerarSlide} disabled={regerando} style={{
          flex: 1, padding: '6px', background: '#f8f6f3',
          border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: '6px',
          fontSize: '10px', color: '#666', cursor: 'pointer'
        }}>{regerando ? '...' : '↻ Regerar'}</button>

        <button onClick={baixarPNG} style={{
          flex: 1, padding: '6px', background: '#D4537E',
          border: 'none', borderRadius: '6px',
          fontSize: '10px', color: 'white', cursor: 'pointer', fontWeight: '600'
        }}>⬇ PNG</button>
      </div>
    </div>
  );
}
