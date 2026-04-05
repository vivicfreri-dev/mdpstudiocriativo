import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Header({ titulo, subtitulo, back, direita }) {
  const navigate = useNavigate();
  const { user } = useApp();

  const inicial = user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'V';
  const foto = user?.photoURL;

  return (
    <div className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {back && (
          <button className="header-back" onClick={() => navigate(back === true ? -1 : back)}>
            ←
          </button>
        )}
        <div>
          {titulo ? (
            <>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>{titulo}</div>
              {subtitulo && <div style={{ fontSize: '9px', color: '#888', marginTop: '1px' }}>{subtitulo}</div>}
            </>
          ) : (
            <>
              <div className="header-logo">Projeto 30 dias</div>
              <div className="header-sub">Dignidade Digital 40+</div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {direita}
        <div className="header-avatar" onClick={() => navigate('/config')}>
          {foto ? <img src={foto} alt="" /> : inicial}
        </div>
      </div>
    </div>
  );
}
