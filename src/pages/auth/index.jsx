import React, { useState } from 'react';
import LoginForm from '../../components/auth/LoginForm';
import SignUpForm from '../../components/auth/SignUpForm';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {isSignUp ? (
          <SignUpForm onToggleMode={toggleMode} />
        ) : (
          <LoginForm onToggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;