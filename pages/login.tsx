import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button'; // Giả sử bạn đang dùng shadcn/ui

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    // Thêm logic xử lý đăng nhập ở đây
    router.push('/'); // Chuyển hướng về trang chủ sau khi đăng nhập
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
        <Button 
          onClick={handleLogin}
          className="px-8 py-2"
        >
          Log In
        </Button>
      </div>
    </div>
  );
} 