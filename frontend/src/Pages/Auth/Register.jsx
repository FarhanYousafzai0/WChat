import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {InfinitySpin} from 'react-loader-spinner'
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';
import { createUserData } from '../../features/UserSlice';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const { name, email, password, confirmPassword, gender } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userSuccess, userLoading, userError } = useSelector((state) => state.auth);

  // Handle side effects after successful registration
  useEffect(() => {
    if (userSuccess) {
      toast.success('User registered successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: ''
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    const newData = { name, email, password, gender };
    dispatch(createUserData(newData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/20">
        <div className="px-10 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Join WChat</h1>
            <p className="mt-2 text-white/80">Create your account to start chatting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-black" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  value={name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-white/70" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-black" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-white/70" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                />
              </div>

              {/* Gender */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-white/70" />
                </div>
                <select
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white cursor-pointer placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent appearance-none"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male" className='text-black cursor-pointer'>Male</option>
                  <option value="female"  className='text-black cursor-pointer' >Female</option>
                  <option value="other" className='text-black cursor-pointer' >Other</option>
                  <option value="prefer-not-to-say" className='text-black cursor-pointer' >Prefer not to say</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={userLoading}
              className={`w-full ${
                userLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'
              } text-blue-600 py-3 px-4 rounded-lg cursor-pointer flex items-center justify-center font-medium hover:bg-gray-100 transition duration-200 focus:outline-none`}
            >
              {userLoading ?  <InfinitySpin 
  visible={true}
  width="80"
  color="purple"
  ariaLabel="infinity-spin-loading"
  /> : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              Already have an account?{' '}
              <Link
                to="/"
                className="text-white font-medium hover:underline focus:outline-none focus:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
