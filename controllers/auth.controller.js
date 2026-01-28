import * as authService from "../services/auth.service.js";

export const signup = async (req, res) => {
  console.log("Signup request body:", req.body);
  console.log("Signup request headers:", req.headers);
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    res.json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};
