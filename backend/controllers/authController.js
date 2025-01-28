import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateTokens.js";

//@desc register user
//@route public api/auth/signup
//@access public
export const signUp = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Password is not matching" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username is alredy exist" });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //avatar creation  https://avatar-placeholder.iran.liara.run/avatars
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //generate tokens
      generateToken(res, newUser._id);

      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(404).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc login user
//@route public api/auth/login
//@access public

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });
    if (!user) {
      // Send an error response if the user doesn't exist
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      // Send an error response if the password is incorrect
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate token and set it in an HTTP-only cookie
    generateToken(res, user._id);

    // Send a success response with user details
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    // Catch unexpected errors and send a 500 status
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//@desc register user
//@route public api/auth/logout
//@access private

export const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
