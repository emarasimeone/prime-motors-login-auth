import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, Car, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const {
    toast
  } = useToast();
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações básicas
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }
    try {
      // Simular chamada para API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular sucesso para demonstração
      if (email === 'admin@primemotors.com' && password === '123456') {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao sistema Prime Motors"
        });

        // Aqui você redirecionaria para o dashboard
        console.log('Login bem-sucedido - redirecionando para dashboard...');
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Erro interno do servidor. Tente novamente.');
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };
  return <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/95 shadow-2xl border-0 animate-fade-in">
      <CardHeader className="space-y-4 text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <Car className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">FACE-PRIME</CardTitle>
        <CardDescription className="text-gray-600">
          Faça login para acessar o sistema
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {error && <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500" disabled={loading} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500" disabled={loading} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors" disabled={loading}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 disabled:opacity-50" disabled={loading}>
            {loading ? <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Entrando...</span>
              </div> : 'Entrar'}
          </Button>
        </form>

        <div className="text-center">
          <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors" onClick={() => {
          toast({
            title: "Funcionalidade em desenvolvimento",
            description: "A recuperação de senha estará disponível em breve"
          });
        }}>
            Esqueceu sua senha?
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-400 text-center space-y-1">
              <p>© 2024 Prime Motors. Todos os direitos reservados.</p>
              <p>Suporte: Bruno Bocardi (66) 99255-7948</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default LoginForm;