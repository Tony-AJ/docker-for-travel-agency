import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

export const signup = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateToken(user.id);
};
