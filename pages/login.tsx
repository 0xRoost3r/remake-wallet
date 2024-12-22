import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    router.push('/');
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Button 
          onClick={handleLogin}
          className="px-8 py-2"
        >
          Login
        </Button>
      </div>
    </div>
  );
} 