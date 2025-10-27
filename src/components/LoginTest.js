import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, User, AlertTriangle, Loader } from 'lucide-react';

const LoginTest = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Validação simples
  const validateForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Nome de utilizador é obrigatório';
    }
    
    if (!formData.password) {
      errors.password = 'Palavra-passe é obrigatória';
    } else if (formData.password.length < 6) {
      errors.password = 'Palavra-passe deve ter pelo menos 6 caracteres';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Simular tentativa de login (sempre falha)
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Chamar API que sempre falha (para testes)
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      console.log('API URL being used:', API_URL); // Debug log
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Parse da resposta JSON
      const data = await response.json();

      if (!response.ok) {
        // Usar a mensagem de erro específica do backend
        throw new Error(data.error || data.message || 'Erro ao fazer login');
      }

      // Este código nunca será executado pois o backend sempre dá erro
      console.log('Login bem-sucedido:', data);
      
    } catch (err) {
      // Verificar se o erro é de rede (fetch failure)
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        setError('Erro de conectividade com o servidor');
      } else {
        setError(err.message || 'Erro de conectividade. Tente novamente.');
      }
      console.error('Erro de login:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erros quando utilizador digita
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4"
          >
            <Lock size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Login de Teste</h1>
          <p className="text-gray-400">Página escondida para testar autenticação</p>
          <p className="text-yellow-400 text-sm mt-2">⚠️ Este login sempre falha (propositadamente)</p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">
                Nome de Utilizador
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                    formErrors.username ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                  }`}
                  placeholder="Digite seu nome de utilizador"
                  disabled={isLoading}
                />
              </div>
              {formErrors.username && (
                <p className="mt-1 text-sm text-red-400">{formErrors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                    formErrors.password ? 'border-red-500' : 'border-gray-600 focus:border-purple-500'
                  }`}
                  placeholder="Digite sua palavra-passe"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-400">{formErrors.password}</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200"
              >
                <AlertTriangle size={20} />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader size={20} className="animate-spin" />
                  <span>A fazer login...</span>
                </div>
              ) : (
                'Fazer Login'
              )}
            </motion.button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            <h3 className="text-blue-200 font-semibold mb-2">💡 Para Testes:</h3>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Username: qualquer nome</li>
              <li>• Password correta: <span className="font-mono bg-blue-600/30 px-1 rounded">123456</span></li>
              <li>• ⚠️ Qualquer outra password dará erro</li>
              <li>• 🧪 Ideal para testar validação de passwords</li>
            </ul>
          </div>

          {/* Back to Portfolio */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
            >
              ← Voltar ao Portfólio
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginTest;