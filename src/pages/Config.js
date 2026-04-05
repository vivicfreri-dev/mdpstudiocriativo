import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Config() {
  const navigate = useNavigate();
  const { user, cerebro, perfil } = useApp();
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');
  const [salvouKey, setSalvouKey] = useState(false);

  function salvarKey() {
    localStorage.setItem('gemini_key', apiKey);
    setSalvouKey(true);
    setTimeout(() => setSalvouKey(false), 2000);
  }

  async function sair() {
    await signOut(auth);
    navigate('/login');
  }

  const oferta = cerebro?.oferta;

  return (
    <div>
      <Header titulo="Configurações" />
      <div className="page">

        {/* API */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Chave API Gemini
          </div>
          <div className="form-group">
            <label>Gemini API Key</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="password"
                placeholder="AIza..."
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                style={{ flex: 1 }}
              />
              <button onClick={salvarKey} className="btn btn-rose btn-sm">
                {salvouKey ? '✓' : 'Salvar'}
              </button>
            </div>
          </div>
          {apiKey && (
            <div style={{ background: '#E1F5EE', border: '0.5px solid #9FE1CB', borderRadius: '6px', padding: '6px 10px' }}>
              <p style={{ fontSize: '10px', color: '#085041' }}>✓ Chave API salva</p>
            </div>
          )}
        </div>

        {/* Segundo cérebro */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Segundo cérebro
          </div>

          <div
            onClick={() => navigate('/base/cerebro?bloco=2')}
            style={{
              border: '0.5px solid #D4537E', background: '#FBEAF0',
              borderRadius: '8px', padding: '12px', marginBottom: '6px', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#993556' }}>✏️ Editar oferta atual</div>
              <div style={{ fontSize: '10px', color: '#D4537E', marginTop: '2px' }}>
                {oferta?.produto || 'Nenhuma oferta configurada'}
              </div>
            </div>
            <span style={{ color: '#D4537E' }}>→</span>
          </div>

          <div
            onClick={() => navigate('/base/cerebro')}
            style={{
              border: '0.5px solid rgba(0,0,0,0.1)', background: 'white',
              borderRadius: '8px', padding: '12px', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>Editar identidade completa</div>
              <div style={{ fontSize: '10px', color: '#888' }}>Crenças, tom, referências</div>
            </div>
            <span style={{ color: '#888' }}>→</span>
          </div>
        </div>

        {/* Perfil */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Perfil
          </div>
          <div style={{ border: '0.5px solid rgba(0,0,0,0.1)', background: 'white', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: '#FBEAF0', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#D4537E',
                overflow: 'hidden'
              }}>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  (user?.displayName?.[0] || user?.email?.[0] || 'V').toUpperCase()
                )}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{user?.displayName || 'Usuária'}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{user?.email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Links das outras etapas */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
            Revisitar etapas de base
          </div>
          {[
            { label: 'Bio magnética', path: '/base/bio' },
            { label: 'Linha editorial', path: '/base/editorial' },
            { label: 'Interesses e repertório', path: '/base/interesses' },
            { label: 'Autopercepção', path: '/base/autopercepcao' }
          ].map(item => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                border: '0.5px solid rgba(0,0,0,0.08)', background: 'white',
                borderRadius: '8px', padding: '10px 12px', marginBottom: '4px', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '13px' }}>{item.label}</span>
              <span style={{ color: '#888', fontSize: '13px' }}>→</span>
            </div>
          ))}
        </div>

        {/* Sair */}
        <button onClick={sair} className="btn btn-outline" style={{ color: '#D4537E', borderColor: '#F4C0D1' }}>
          Sair da conta
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ fontSize: '10px', color: '#aaa', fontStyle: 'italic' }}>
            "Autoridade não se inventa. Se organiza."
          </p>
          <p style={{ fontSize: '9px', color: '#ccc', marginTop: '4px' }}>
            Projeto 30 Dias · Dignidade Digital 40+
          </p>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}
