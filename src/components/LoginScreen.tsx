import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [documento, setDocumento] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!documento.trim()) {
      setErrorMsg('Por favor, informe seu CPF ou CNPJ.');
      return;
    }
    if (!senha) {
      setErrorMsg('Por favor, informe sua senha.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`[Demonstração Frontend]\nLogin simulado realizado com sucesso para: ${documento}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a5c36] flex flex-col items-center justify-center p-4 relative overflow-y-auto">
      {/* Header Institucional com a logo da pasta public */}
      <div className="text-center mb-6 z-10">
        <img src="/logo-crateus.png" alt="Governo de Crateús" className="h-24 mx-auto mb-3 drop-shadow-md" />
        <h1 className="text-white text-xl font-bold tracking-wide">Bem-vindo(a)!</h1>
        <p className="text-emerald-100 text-xs mt-0.5">Faça o login para entrar no sistema</p>
      </div>

      {/* Cartão de Login */}
      <div className="bg-white w-full max-w-[420px] rounded-3xl p-8 shadow-2xl z-10 transition-all">
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
            <input
              type="text"
              placeholder="CNPJ/CPF"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-4 py-3 text-slate-700 placeholder-[#79a38c] text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36] transition"
            />
          </div>

          <div className="relative">
            <Lock className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-12 py-3 text-slate-700 placeholder-[#79a38c] text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-[#0a5c36] hover:opacity-80"
              aria-label="Alternar exibição de senha"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a5c36] hover:bg-[#074729] text-white font-bold py-3.5 rounded-xl text-base transition duration-200 shadow-md mt-2 disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="pt-2 text-center space-y-2.5">
            <Link
              to="/recuperar-senha"
              className="text-[#0a5c36] text-xs font-semibold hover:underline block w-full"
            >
              Esqueceu a senha?
            </Link>

            <Link
              to="/cadastro"
              className="text-slate-500 text-xs font-medium hover:text-[#0a5c36] block w-full"
            >
              Primeiro acesso? <span className="font-bold text-[#0a5c36] underline">Cadastre-se</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}