import express from "express";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const router = express.Router();

//USER REGISTRATION

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    //checking existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered,Please login.",
      });
    }

    //securing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //saving new user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registration successfull",
      user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
});

export default router;

//USER LOGIN

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "please provide credentials",
      });
    }

    //checking user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registerd, please register ",
      });
    }

    //comparing password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Wrong credentials",
      });
    }

    //generating token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfull",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Login failed",
      error,
    });
  }
});
