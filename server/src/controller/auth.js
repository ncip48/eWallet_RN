const { User } = require("../../models");

//define the jwt
const jwt = require("jsonwebtoken");

//define the encryption
const bcrypt = require("bcrypt");

//import validator
const joi = require("@hapi/joi");

//import jwt_key from .env
const jwtKey = process.env.JWT_KEY;

exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["pin", "createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User is valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.register = async (req, res) => {
  try {
    //define the body request
    const {
      uid,
      pin,
      email,
      first_name,
      last_name,
      gender,
      address,
    } = req.body;

    //---------------Start Validation--------------//
    const schema = joi.object({
      uid: joi.number().required(),
      pin: joi.number().required(),
      email: joi.string().min(10).required(),
      first_name: joi.string().min(3).required(),
      last_name: joi.string().min(3).required(),
      gender: joi.string().required(),
      address: joi.string().required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error from validation then show message error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //---------------End Validation--------------//

    //check if email already input
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    //get message when email already registered
    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already registered to this server",
        },
      });
    }

    //make password secure with bcrypt
    const hashPin = await bcrypt.hash(pin, 10);

    //create user
    const user = await User.create({
      uid,
      pin: hashPin,
      email,
      first_name,
      last_name,
      gender,
      address,
    });

    //if register success then make token from jwt
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      jwtKey
    );

    //display result from request register response
    res.send({
      message: "Congratulations, your account has been successfully created",
      data: {
        role: user.role,
        email: user.uid,
        token,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    //get email and password from request body
    const { uid } = req.body;

    //---------------Start Validation--------------//
    const schema = joi.object({
      uid: joi.number().required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error from validation then show message error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //---------------End Validation--------------//

    //check user in database based on email inputed
    const user = await User.findOne({
      where: {
        uid,
      },
    });

    //check if user existed with email inputed
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Phone not found in this database",
        },
      });
    }

    //send response from login system
    res.send({
      message: "You uid is found",
      data: {
        uid: user.uid,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};

exports.pin = async (req, res) => {
  try {
    //get email and password from request body
    const { uid, pin } = req.body;

    //---------------Start Validation--------------//
    const schema = joi.object({
      uid: joi.number().required(),
      pin: joi.number().required(),
    });

    //get error from joi validation
    const { error } = schema.validate(req.body);

    //if error from validation then show message error
    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //---------------End Validation--------------//

    //check user in database based on email inputed
    const user = await User.findOne({
      where: {
        uid,
      },
    });

    //check if user existed with email inputed
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Phone not found in this database",
        },
      });
    }

    //if user existed, check are the password same with compare input with database
    const validityPin = await bcrypt.compare(pin, user.pin);

    //if password not same when compared then
    if (!validityPin) {
      return res.status(400).send({
        error: {
          message: "Pin invalid",
        },
      });
    }

    //if email and password match or valid then create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      jwtKey
    );

    //send response from login system
    res.send({
      message: "You has been successfully loged in!",
      data: {
        role: user.role,
        uid: user.uid,
        token,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
        error: err.message,
      },
    });
  }
};
