import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
interface LoginFormProps {
  onSwitchToRegister: () => void;
}
const LoginForm = ({
  onSwitchToRegister
}: LoginFormProps) => {
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (email === 'admin@primemotors.com' && password === '123456') {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao sistema Prime Motors"
        });
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
  return <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <img src="https://plataformaweb-sites.s3.amazonaws.com/prime-motors-mt/img/logo-PRIME-MOTORS-MT-1030x113.png" alt="Prime Motors" className="h-16 mx-auto mb-6 object-contain" />
      </div>

      <Card className="bg-transparent border-0 shadow-none">
        <CardContent className="p-0 space-y-4">
          {error && <Alert className="border-red-500/20 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20" disabled={loading} />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type={showPassword ? "text" : "password"} placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:ring-yellow-500/20" disabled={loading} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors" disabled={loading}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition-all duration-200 disabled:opacity-50" disabled={loading}>
              {loading ? <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Entrando...</span>
                </div> : 'Entrar'}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <button type="button" className="text-sm text-yellow-500 hover:text-yellow-400 font-medium transition-colors" onClick={() => {
            toast({
              title: "Funcionalidade em desenvolvimento",
              description: "A recuperação de senha estará disponível em breve"
            });
          }}>
              Esqueceu sua senha?
            </button>

            <p className="text-sm text-gray-400">
              Não tem uma conta?{' '}
              <button type="button" onClick={onSwitchToRegister} className="transition-colors text-slate-50 mx-[18px] my-[6px] py-[11px] px-[9px] font-medium text-base">
                Criar conta
              </button>
            </p>
          </div>

          <div className="pt-6 text-center">
            <div className="text-xs text-gray-500 space-y-1">
              <p>© 2024 Prime Motors. Todos os direitos reservados.</p>
              <p>Suporte: Bruno Bocardi (66) 99255-7948</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default LoginForm;