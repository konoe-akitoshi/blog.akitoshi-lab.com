import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      alert('Logged out successfully');
      router.push('/login'); // ログインページにリダイレクト
    }
  };

  return (
    <nav>
      <button onClick={() => router.push('/')}>Home</button>
      <button onClick={() => router.push('/admin')}>Admin</button>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
