import { createJwt } from "../helpers/createJwt.js";
import { createUser, getUserByCredentials } from "../models/user.model.js";

export const signInCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await createJwt(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUpCtrl = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await createUser({ username, email, password });
    const token = await createJwt(newUser.id);
    res.cookie("token", token, { httpOnly: true });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signOutCtrl = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Sign out success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeCtrl = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
