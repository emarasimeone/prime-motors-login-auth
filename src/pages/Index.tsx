
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const Index = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {isLoginMode ? (
        <LoginForm onSwitchToRegister={() => setIsLoginMode(false)} />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLoginMode(true)} />
      )}
    </div>
  );
};

export default Index;
