import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [modo, setModo] = useState('google'); // google | email
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isNovo, setIsNovo] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function loginGoogle() {
    setLoading(true);
    setErro('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      setErro('Erro ao entrar com Google. Tente novamente.');
    }
    setLoading(false);
  }

  async function loginEmail(e) {
    e.preventDefault();
    setLoading(true);
    setErro('');
    try {
      if (isNovo) {
        await createUserWithEmailAndPassword(auth, email, senha);
      } else {
        await signInWithEmailAndPassword(auth, email, senha);
      }
    } catch (err) {
      const msgs = {
        'auth/user-not-found': 'Email não encontrado. Crie uma conta.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/email-already-in-use': 'Email já cadastrado. Faça login.',
        'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres.',
        'auth/invalid-email': 'Email inválido.'
      };
      setErro(msgs[err.code] || 'Erro ao entrar. Tente novamente.');
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', background: '#f8f6f3'
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: '16px',
          background: '#D4537E', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 12px', fontSize: '28px'
        }}>✦</div>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#D4537E', letterSpacing: '0.04em' }}>
          PROJETO 30 DIAS
        </h1>
        <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
          Dignidade Digital 40+
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: 'white', borderRadius: '16px',
        padding: '24px', width: '100%', maxWidth: '400px',
        border: '0.5px solid rgba(0,0,0,0.1)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>
          {isNovo ? 'Criar conta' : 'Entrar'}
        </h2>
        <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>
          {isNovo ? 'Crie sua conta para começar a jornada' : 'Continue sua jornada de 30 dias'}
        </p>

        {/* Google */}
        <button onClick={loginGoogle} disabled={loading} style={{
          width: '100%', padding: '12px', borderRadius: '8px',
          border: '0.5px solid rgba(0,0,0,0.15)', background: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '10px', cursor: 'pointer', marginBottom: '16px',
          fontSize: '14px', fontWeight: '500', fontFamily: 'inherit'
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          {loading ? 'Entrando...' : 'Continuar com Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.08)' }}></div>
          <span style={{ fontSize: '11px', color: '#aaa' }}>ou</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.08)' }}></div>
        </div>

        {/* Email/Senha */}
        <form onSubmit={loginEmail}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} required minLength={6} />
          </div>

          {erro && (
            <div style={{ background: '#FBEAF0', border: '0.5px solid #F4C0D1', borderRadius: '8px', padding: '8px 12px', marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', color: '#993556' }}>{erro}</p>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn btn-rose" style={{ marginBottom: '12px' }}>
            {loading ? 'Aguarde...' : (isNovo ? 'Criar conta' : 'Entrar')}
          </button>
        </form>

        <p style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>
          {isNovo ? 'Já tem conta? ' : 'Não tem conta? '}
          <button onClick={() => { setIsNovo(!isNovo); setErro(''); }} style={{
            background: 'none', border: 'none', color: '#D4537E',
            cursor: 'pointer', fontWeight: '600', fontSize: '12px'
          }}>
            {isNovo ? 'Entrar' : 'Criar conta'}
          </button>
        </p>
      </div>

      <p style={{ fontSize: '11px', color: '#aaa', marginTop: '20px', textAlign: 'center' }}>
        "Autoridade não se inventa. Se organiza."
      </p>
    </div>
  );
}
