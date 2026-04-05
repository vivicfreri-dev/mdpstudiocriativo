import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cerebro, setCerebro] = useState(null);
  const [progresso, setProgresso] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await carregarDados(u.uid);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function carregarDados(uid) {
    try {
      const perfilDoc = await getDoc(doc(db, 'usuarios', uid, 'dados', 'perfil'));
      if (perfilDoc.exists()) setPerfil(perfilDoc.data());

      const cerebroDoc = await getDoc(doc(db, 'usuarios', uid, 'dados', 'cerebro'));
      if (cerebroDoc.exists()) setCerebro(cerebroDoc.data());

      const progressoDoc = await getDoc(doc(db, 'usuarios', uid, 'dados', 'progresso'));
      if (progressoDoc.exists()) setProgresso(progressoDoc.data());
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    }
  }

  async function salvarCerebro(dados) {
    if (!user) return;
    await setDoc(doc(db, 'usuarios', user.uid, 'dados', 'cerebro'), dados);
    setCerebro(dados);
  }

  async function salvarPerfil(dados) {
    if (!user) return;
    await setDoc(doc(db, 'usuarios', user.uid, 'dados', 'perfil'), dados);
    setPerfil(dados);
  }

  async function concluirEtapa(etapa) {
    if (!user) return;
    const novo = { ...progresso, [etapa]: true };
    await setDoc(doc(db, 'usuarios', user.uid, 'dados', 'progresso'), novo);
    setProgresso(novo);
  }

  async function concluirTarefa(tarefaId) {
    if (!user) return;
    const key = `tarefa_${tarefaId}`;
    const novo = { ...progresso, [key]: { concluida: true, data: new Date().toISOString() } };
    await setDoc(doc(db, 'usuarios', user.uid, 'dados', 'progresso'), novo);
    setProgresso(novo);
  }

  const baseCompleta = () => {
    return progresso.cerebro && progresso.bio && progresso.editorial && 
           progresso.interesses && progresso.autopercepcao;
  };

  const etapaBase = () => {
    if (!progresso.cerebro) return 1;
    if (!progresso.bio) return 2;
    if (!progresso.editorial) return 3;
    if (!progresso.interesses) return 4;
    if (!progresso.autopercepcao) return 5;
    return 6; // base completa
  };

  const proximaTarefa = () => {
    for (let i = 6; i <= 30; i++) {
      if (!progresso[`tarefa_${i}`]?.concluida) return i;
    }
    return null;
  };

  return (
    <AppContext.Provider value={{
      user, perfil, cerebro, progresso, loading,
      salvarCerebro, salvarPerfil, concluirEtapa, concluirTarefa,
      baseCompleta, etapaBase, proximaTarefa,
      recarregar: () => user && carregarDados(user.uid)
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
