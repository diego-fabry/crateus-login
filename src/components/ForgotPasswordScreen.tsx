import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { validateEmail } from '../utils/validators';
import { authService } from '../services/authService';

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Por favor, informe o seu e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setLoading(true);
    try {
      await authService.requestPasswordReset(email);
      // Navega diretamente para a etapa demonstrativa de redefinição de senha
      navigate('/redefinir-senha');
    } catch {
      setErrorMsg('Erro ao processar a solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a5c36] flex flex-col items-center justify-center p-4 relative overflow-y-auto">
      {/* Header Institucional com a Logo Maior */}
      <div className="text-center mb-6 z-10">
        <img src="/logo-crateus.png" alt="Governo de Crateús" className="h-24 mx-auto mb-3 drop-shadow-md" />
        <h1 className="text-white text-xl font-bold">Recuperar senha</h1>
        <p className="text-emerald-100 text-xs max-w-xs mx-auto mt-1">
          Informe seu e-mail para continuar com a recuperação de senha
        </p>
      </div>

      {/* Cartão de Recuperação */}
      <div className="bg-white w-full max-w-[420px] rounded-3xl p-8 shadow-2xl z-10">
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
            <input
              type="email"
              placeholder="E-mail cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0a5c36] hover:bg-[#074729] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md mt-2 disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Continuar'}
          </button>

          <div className="text-center pt-2">
            <Link to="/login" className="text-slate-600 text-xs font-semibold hover:underline flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar para o login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}