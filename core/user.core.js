require("dotenv").config();

const jwt = require("jsonwebtoken");
const {
  createUserValidation,
  loginValidation,
} = require("../validations/user.validation");
const UserModel = require("../models/User.model");
const UserOtpModel = require("../models/Otp.model");
const {
  hashPassword,
  generateOtp,
  comparePasswords,
} = require("../utils/_helper.util");
const { v4: uuidv4 } = require("uuid");

const createNewUser = async (req, res) => {
  const { error } = createUserValidation(req.body);
  if (error !== undefined)
    return res
      .status(400)
      .json({ status: true, error: error.details[0].message });

  try {
    const { username, firstName, lastName, email, password, phone } = req.body;
    if (!username || !firstName || !lastName || !email || !password || !phone) {
      return res
        .status(400)
        .json({ status: false, error: "All fields are required" });
    }
    const isAlreadyExist = await UserModel.findAll({
      attributes: ["email", "phone"],
      where: {
        $or: [{ email }, { phone }],
      },
    });
    if (isAlreadyExist.length > 0) {
      return res
        .status(400)
        .json({ status: false, error: "Email or phone already exists" });
    }

    const { hash, salt } = await hashPassword(password);
    const userId = uuidv4();
    await UserModel.create({
      userId,
      username,
      firstName,
      lastName,
      email,
      password_hash: hash,
      password_salt: salt,
      phone,
      isActive: true,
    });

    const _otp = generateOtp(6);
    const dataToInsert = {
      otp_id: userId,
      otp: _otp,
      email_or_phone: email,
      otp_expiry: new Date(Date.now() + 60 * 1000),
    };
    await UserOtpModel.create(dataToInsert);

    // Send OTP to the user via email or SMS
    // await sendEmailOrSms(email, `Your OTP is ${_otp}`);

    res
      .status(201)
      .json({ status: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error !== undefined)
    return res
      .status(400)
      .json({ status: true, error: error.details[0].message });

  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ status: false, error: "All fields are required" });
    }
    const user = await UserModel.findOne({ where: { email } });
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ status: false, error: "Invalid credentials" });
    }
    const isPasswordMatch = await comparePasswords(
      password,
      user.password_hash
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ status: false, error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: user.email, userId: user.userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ status: true, message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal Server Error" });
  }
};

module.exports = { createNewUser, loginUser };