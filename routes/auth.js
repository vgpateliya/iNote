const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

//ROUTE 1: Create a User using : POST "/api/auth/createuser". No Login Required.

router.post(
  "/createuser",
  [
    body("name", "Enter A Valid Name.").isLength({ min: 2 }),
    body("email", "Enter A Valid Email.").isEmail(),
    body("password", "Password Must Contain Atleast 5 Characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // Check weather the User with this email exists already
    let newUser = await User.findOne({ email: req.body.email });
    if (newUser) {
      return res.status(400).json({
        success,
        error: "User With This Email Address Already Exists!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user
    newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: newUser.id,
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
    // } catch (error) {
    //   console.error(error.message);
    //   res.status(500).send(success, "Ineternal Server Error");
    // }
  }
);

//ROUTE 2: Authenticate User using : POST "/api/auth/login". No login Required.
router.post(
  "/login",
  [
    body("email", "Enter A Valid Email.").isEmail(),
    body("password", "Password cannot be blank.").exists(),
  ],
  async (req, res) => {
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please Try Correct Login Credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please Try Correct Login Credentials" });
      }
      const data = {
        user: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(success, "Ineternal Server Error");
    }
  }
);

//ROUTE 3: Get Loggedin User details using : POST "/api/auth/getuser". Login Required.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Ineternal Server Error");
  }
});

module.exports = router;
