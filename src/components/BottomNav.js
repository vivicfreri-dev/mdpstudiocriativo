import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ITEMS = [
  { path: '/', label: 'Jornada', icon: '⌂' },
  { path: '/tarefas', label: 'Tarefas', icon: '▶' },
  { path: '/calendario', label: 'Agenda', icon: '📅' },
  { path: '/metricas', label: 'Dados', icon: '📊' },
  { path: '/config', label: 'Mais', icon: '⚙' }
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {ITEMS.map(item => {
        const active = location.pathname === item.path ||
          (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <button
            key={item.path}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
