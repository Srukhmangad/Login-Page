const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register endpoint
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { name }]
    });

    if (existingUser) {
      return res.json({
        message: "User already exists",
      });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // Create the new user object
    const newUser = new UserModel({
      name: name,
      email: email,
      password: encryptedPassword
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      return res.json({
        message: "User created successfully",
      });
    }

    return res.json({
      message: "User creation failed",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Some error occurred",
    });
  }
};


//JWT Authorization
function Authorization() {
  payload ={
    name: "Sumit",
    id:1234
  }
  const token = jwt.sign(payload, "jwtprivatekey");
  console.log(token);
  return token; 
}

// Login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ error: 'Invalid password' });
    }

    const JSToken = Authorization();
    res.setHeader('Authorization', JSToken);
    res.json({ message: "Logged in Successfully!" });
    
  } catch (error) {
    console.error(error);
    return res.json({
      message: 'Some error occurred',
    });
  }
};


// Find user endpoint
const finduser = async (req, res) => {
  const { email } = req.body;

  try {
    const data = await UserModel.find({ email });
    if (data) {
      return res.json({
        message: "Data exists",
      });
    }
    return res.json({
      message: "Data does not exist",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      message: "Error occurred",
    });
  }
};

module.exports = {
  register,
  finduser,
  loginUser
};
