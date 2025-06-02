import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { loginUserData } from '../../features/UserSlice';
import { InfinitySpin } from 'react-loader-spinner';

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: '', // can be email or username
    password: '',
  });


  const {identifier,password} = formData
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Detect if input is email
    
  };

  const dispatch = useDispatch();

  const {userSuccess,userError,userLoading} = useSelector((state)=>state.auth);
 

  useEffect(() => {
    if (userSuccess) {
      toast.success('User registered successfully!');
      setFormData({
        password:'',
        identifier:''
      });
      navigate('/home');
    }
  }, [userSuccess, navigate]);

  // Handle error toast
  useEffect(() => {
    if (userError) {
      toast.error(userError);
    }
  }, [userError]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
  

    const loginData = {
      identifier,
      password,
    }

    dispatch(loginUserData(loginData));


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20">
        <div className="px-10 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Welcome to WChat</h1>
            <p className="mt-2 text-white/80">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isEmail ? (
                    <EnvelopeIcon className="h-5 w-5 text-white/70" />
                  ) : (
                    <UserIcon className="h-5 w-5 text-white/70" />
                  )}
                </div>
                <input
                  type="text"
                  name="identifier"
                  placeholder="Email or username"
                  value={identifier}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-white" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-white/70 hover:text-black" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-white/70 hover:text-white" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded bg-white/10 border-white/20 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-white/80">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-white hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white cursor-pointer text-blue-600 flex items-center justify-center py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
            >
            {userLoading ? <InfinitySpin 
              visible={true}
              width="60"
              color="purple"
              ariaLabel="infinity-spin-loading"
              /> : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-white font-medium hover:underline focus:outline-none focus:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}