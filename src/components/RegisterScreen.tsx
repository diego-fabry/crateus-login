import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Mail, Phone, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { maskCpfCnpj, maskPhone } from '../utils/masks';
import { validateDoc, validateEmail } from '../utils/validators';

export function RegisterScreen() {
  const navigate = useNavigate();
  const [docType, setDocType] = useState<'CPF' | 'CNPJ'>('CPF');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    documento: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDocumentChange = (val: string) => {
    setFormData({ ...formData, documento: maskCpfCnpj(val) });
  };

  const handlePhoneChange = (val: string) => {
    setFormData({ ...formData, telefone: maskPhone(val) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome completo é obrigatório.';
    }

    if (!formData.documento) {
      newErrors.documento = `${docType} é obrigatório.`;
    } else if (!validateDoc(docType, formData.documento)) {
      newErrors.documento = `${docType} digitado é inválido.`;
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Informe um endereço de e-mail válido.';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória.';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'A senha deve conter no mínimo 6 caracteres.';
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirme sua senha.';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a5c36] flex flex-col items-center justify-center p-4 py-8 relative overflow-y-auto">
      <div className="text-center mb-5 z-10">
        <img src="/logo-crateus.png" alt="Governo de Crateús" className="h-24 mx-auto mb-2 drop-shadow-md" />
        <h1 className="text-white text-xl font-bold">Primeiro Acesso</h1>
        <p className="text-emerald-100 text-xs">Preencha seus dados para solicitar acesso ao sistema</p>
      </div>

      <div className="bg-white w-full max-w-[460px] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-auto">
        {isSuccess ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-[#0a5c36] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Demonstração de Cadastro Concluída!</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Os dados foram validados com sucesso no frontend. Esta é uma simulação demonstrativa e nenhum dado real foi gravado.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-[#0a5c36] hover:bg-[#074729] text-white font-bold py-3 rounded-xl text-sm transition shadow-md mt-2"
            >
              Ir para a Tela de Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <div className="relative">
                <User className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
                <input
                  type="text"
                  placeholder="Nome Completo"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
                />
              </div>
              {errors.nome && <p className="text-red-600 text-[11px] mt-1 pl-2">{errors.nome}</p>}
            </div>

            <div>
              <div className="flex gap-4 mb-1.5 pl-1">
                <label className="flex items-center space-x-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="docType"
                    checked={docType === 'CPF'}
                    onChange={() => { setDocType('CPF'); setFormData({ ...formData, documento: '' }); }}
                    className="accent-[#0a5c36]"
                  />
                  <span>CPF</span>
                </label>
                <label className="flex items-center space-x-1.5 text-xs text-slate-700 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="docType"
                    checked={docType === 'CNPJ'}
                    onChange={() => { setDocType('CNPJ'); setFormData({ ...formData, documento: '' }); }}
                    className="accent-[#0a5c36]"
                  />
                  <span>CNPJ</span>
                </label>
              </div>

              <div className="relative">
                <FileText className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
                <input
                  type="text"
                  placeholder={docType === 'CPF' ? '000.000.000-00' : '00.000.000/0001-00'}
                  value={formData.documento}
                  onChange={(e) => handleDocumentChange(e.target.value)}
                  className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
                />
              </div>
              {errors.documento && <p className="text-red-600 text-[11px] mt-1 pl-2">{errors.documento}</p>}
            </div>

            <div>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
                />
              </div>
              {errors.email && <p className="text-red-600 text-[11px] mt-1 pl-2">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <Phone className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
                <input
                  type="text"
                  placeholder="Telefone (opcional)"
                  value={formData.telefone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                  className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-12 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-[#0a5c36]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.senha && <p className="text-red-600 text-[11px] mt-1 pl-2">{errors.senha}</p>}
            </div>

            <div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-3.5 text-[#0a5c36]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar senha"
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({ ...formData, confirmarSenha: e.target.value })}
                  className="w-full bg-[#f1f8f4] border border-[#d2e8db] rounded-xl pl-12 pr-12 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a5c36]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-[#0a5c36]"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmarSenha && <p className="text-red-600 text-[11px] mt-1 pl-2">{errors.confirmarSenha}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#0a5c36] hover:bg-[#074729] text-white font-bold py-3.5 rounded-xl text-sm transition shadow-md mt-2"
            >
              Cadastrar
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-slate-600 text-xs font-semibold hover:underline flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Já possui uma conta? Entrar
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}