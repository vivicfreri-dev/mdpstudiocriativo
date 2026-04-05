import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import './styles/global.css';

import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Tarefas from './pages/Tarefas';
import TarefaDetalhe from './pages/TarefaDetalhe';
import Calendario from './pages/Calendario';
import Metricas from './pages/Metricas';
import Config from './pages/Config';
import SegundoCerebro from './pages/base/SegundoCerebro';
import BioMagnetica from './pages/base/BioMagnetica';
import LinhaEditorial from './pages/base/LinhaEditorial';
import Interesses from './pages/base/Interesses';
import Autopercepcao from './pages/base/Autopercepcao';

function LoadingScreen() {
  return (
    <div style={{
      minHeight:'100vh',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',background:'#f8f6f3'
    }}>
      <div style={{
        width:'56px',height:'56px',borderRadius:'14px',
        background:'#D4537E',display:'flex',alignItems:'center',
        justifyContent:'center',fontSize:'24px',marginBottom:'16px'
      }}>✦</div>
      <div className="loading-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useApp();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  const { user, loading } = useApp();
  if (loading) return <LoadingScreen />;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
      <Route path="/base/cerebro" element={<ProtectedRoute><SegundoCerebro /></ProtectedRoute>} />
      <Route path="/base/bio" element={<ProtectedRoute><BioMagnetica /></ProtectedRoute>} />
      <Route path="/base/editorial" element={<ProtectedRoute><LinhaEditorial /></ProtectedRoute>} />
      <Route path="/base/interesses" element={<ProtectedRoute><Interesses /></ProtectedRoute>} />
      <Route path="/base/autopercepcao" element={<ProtectedRoute><Autopercepcao /></ProtectedRoute>} />
      <Route path="/tarefas" element={<ProtectedRoute><Tarefas /></ProtectedRoute>} />
      <Route path="/tarefas/:id" element={<ProtectedRoute><TarefaDetalhe /></ProtectedRoute>} />
      <Route path="/calendario" element={<ProtectedRoute><Calendario /></ProtectedRoute>} />
      <Route path="/metricas" element={<ProtectedRoute><Metricas /></ProtectedRoute>} />
      <Route path="/config" element={<ProtectedRoute><Config /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
