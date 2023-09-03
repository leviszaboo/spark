import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../../models/user.ts";
import { IUser } from "../../../interfaces/interfaces.ts";

import { Event } from "../../../models/event.ts";

export async function createUser(_: any, args: any) {
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

    console.log({ ...savedUser, password: null })
    return { ...savedUser._doc, password: null };
  } catch (err) {
    throw err;
  }
}

export async function login(_: any, args: any) {
  try {
    const {
      email,
      password
    } = args.userInput;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist.");
    }

    const passwordsMatch = bcrypt.compare(password, user.password)

    if (!passwordsMatch) {
      throw new Error("Password is incorrect.")
    }

    const key = process.env.JWT_KEY
    const token = jwt.sign({userId: user.id, email: user.email}, key!, {
      expiresIn: '1h'
    })

    return { userId: user.id, token: token, tokenExpiration: 1}
  } catch(err) {
    throw err
  }
}

export async function getCreatedEvents(user: IUser) {
  try {
    const events = await Event.find({ creator: user._id });
    console.log("from user:", events[0]._doc)
    return events.map(event => ({ ...event._doc }));
  } catch (err) {
    throw err;
  }
}
