import { useState } from 'react';
import { Link, Links, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you're using Lucide icons
import { pb } from '@/hooks/pb/main';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login(email, password);
      navigate("/dashboard")
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  async function loginWithGithub() {
    await pb.collection('users').authWithOAuth2({ provider: 'google' });
    navigate("/dashboard")
  }

  async function loginWithGoogle() {
    await pb.collection('users').authWithOAuth2({ provider: 'github' });
    navigate("/dashboard")
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/signup" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
            <div className='w-full bg-border rounded borde ' ></div>
            <Button variant="neutral" className="w-full" onClick={loginWithGoogle} >
              Login with Google
            </Button>
            <Button variant="neutral" className="w-full" onClick={loginWithGithub} >
              Login with Github
            </Button>
            <Link to={'/auth-with-otp'} >
              <Button variant="neutral" className="w-full">
                Login with OTP
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
