import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';

export function ResetPasswordScreen() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPassword(token, newPassword);
      if (response.success) {
        setIsSuccess(true);
      }
    } catch {
      setError('Token inválido ou expirado. Solicite a recuperação novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a5c36] flex flex-col items-center justify-center p-4 relative overflow-y-auto">
      {/* Header Institucional com a logo maior (h-24) */}
      <div className="text-center mb-6 z-10">
        <img src="/logo-crateus.png" alt="Governo de Crateús" className="h-24 mx-auto mb-3 drop-shadow-md" />
        <h1 className="text-white text-xl font-bold tracking-wide">Criar nova senha</h1>
        <p className="text-emerald-100 text-xs mt-0.5">Defina sua nova senha de acesso ao sistema</p>
      </div>

      {/* Cartão de Redefinição */}
      <div className="bg-white w-full max-w-[420px] rounded-3xl p-8 shadow-2xl z-10 transition-all">
        {isSuccess ? (
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 bg-emerald-100 text-[#0a5c36] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Senha Redefinida!</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sua senha foi atualizada com sucesso no frontend demonstrativo. Você pode agora voltar para a tela de login.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#0a5c36] hover:bg-[#074729] text-white font-bold py-3.5 rounded-xl text-base transition shadow-md mt-2"
            >
              Voltar para o Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">{error}</div>}

            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nova Senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-12 py-3 text-slate-700 placeholder-[#79a38c] text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-[#0a5c36] hover:opacity-80"
                aria-label="Alternar exibição da senha"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar Nova Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-4 py-3 text-slate-700 placeholder-[#79a38c] text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0a5c36] hover:bg-[#074729] text-white font-bold py-3.5 rounded-xl text-base transition duration-200 shadow-md disabled:opacity-50"
            >
              {loading ? 'Redefinindo...' : 'Salvar Nova Senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}