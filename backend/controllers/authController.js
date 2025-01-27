import User from "../models/userModel.js";

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

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const Login = (req, res) => {
  res.send("Login");
};

export const logOut = (req, res) => {
  res.send("Log Out");
};
