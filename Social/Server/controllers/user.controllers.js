import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  const userId = req.userId;
  if (userId === undefined) {
    return res.status(401).json({ message: "Not authorized , no token" });
  }
  try {
    const verifiedUser = await User.findById(userId).select("-password");
    res.json(verifiedUser);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;

    const user = await User.findOne({ userName }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" }); // Missing return statement
  }
};