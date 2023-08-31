import bcrypt from "bcryptjs";

import { User } from "../../../../models/user.js";


export async function createUser(_, args) {
  try {
    const {
      email,
      password
    } = args.userInput;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword
    });

    const savedUser = await user.save();

    return { ...savedUser._doc, password: null };
  } catch (err) {
    throw err;
  }
}