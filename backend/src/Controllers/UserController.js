import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/UserMode.js';

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: '15d' });
};

// Register Controller
export const Register = async (req, res) => {
  try {
    const { name, email, password, gender, avatar } = req.body;

    // Validation
    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: 'Please enter all required fields!' });
    }

    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Check if username exists
    const existingName = await User.findOne({ name });
    if (existingName) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default Avatar based on gender (if no custom avatar provided)
    const avatarUrl =
      avatar && avatar !== ''
        ? avatar
        : gender === 'male'
        ? `https://avatar.iran.liara.run/public/boy?username=${name}`
        : `https://avatar.iran.liara.run/public/girl?username=${name}`;

    // Create User
    const registerUser = await User.create({
      name,
      gender,
      avatar: avatarUrl,
      password: hashedPassword,
      email,
    });

    // Send response
    res.status(201).json({
      _id: registerUser._id,
      name: registerUser.name,
      email: registerUser.email,
      gender: registerUser.gender,
      avatar: registerUser.avatar,
      token: generateToken(registerUser._id),
    });

  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Login:


export const LoginUser = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Please fill both fields" });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  const findUser = await User.findOne(
    isEmail ? { email: identifier } : { name: identifier }
  );

  if (!findUser) {
    return res.status(400).json({ message: "User not found." });
  }

  const isMatch = await bcrypt.compare(password, findUser.password); // ✅ Add await

  if (!isMatch) {
    return res.status(400).json({ message: "Password not match." });
  }

  res.status(200).json({
    id: findUser._id,
    name: findUser.name,
    email: findUser.email,
    avatar: findUser.avatar,
    gender: findUser.gender,
    token: generateToken(findUser._id),
  });
};




// ALl-Users:



export const GetAllUsers = async(req,res)=>{

  const AllUsers = await User.find();
if (!AllUsers) {
  res.status(400).json({ message: "Users not found." });
}
  res.status(200).json(AllUsers);

}




// Update username ;

export const updateUsername = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newUsername } = req.body;

    // ✅ Validate input
    if (!userId || !newUsername?.trim()) {
      return res.status(400).json({ message: 'User ID and new username are required.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating username:', err.message);
    res.status(500).json({
      message: 'Failed to update username.',
      error: err.message,
    });
  }
};

