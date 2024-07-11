import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    matricule,
    antenne,
    centre,
    fct,
    collabs,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      matricule: user.matricule,
      antenne: user.antenne,
      centre: user.centre,
      fct: user.fct,
      collabs: user.collabs,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  
  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error('No users found');
  }
});
// @desc    Assign collaborators to user
// @route   PUT /api/users/:id
// @access  Private
const assignCollaborators = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.collabs = req.body.collabs;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      matricule: user.matricule,
      antenne: user.antenne,
      centre: user.centre,
      fct: user.fct,
      collabs: user.collabs,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.matricule = req.body.matricule || user.matricule;
    user.antenne = req.body.antenne || user.antenne;
    user.centre = req.body.centre || user.centre;
    user.fct = req.body.fct || user.fct;
    user.collabs = req.body.collabs || user.collabs;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      matricule: updatedUser.matricule,
      antenne: updatedUser.antenne,
      centre: updatedUser.centre,
      fct: updatedUser.fct,
      collabs: updatedUser.collabs,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  assignCollaborators
};
