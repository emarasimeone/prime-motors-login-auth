
import LoginForm from '@/components/LoginForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(156,146,172,0.1)_0%,transparent_50%)] bg-[length:60px_60px]"></div>
      </div>
      
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;
