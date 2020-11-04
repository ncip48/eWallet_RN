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
    if (user) {
      return res.status(400).send({
        error: {
          message: "phone already taken or registered to this database",
        },
      });
    }

    const userCreate = await User.create({
      uid: uid,
      saldo: 0,
      role: 0,
    });

    //send response from login system
    res.send({
      message: "Your uid has been created",
      data: {
        user: {
          id: userCreate.id,
          uid: userCreate.uid,
        },
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
      message: "Your uid is found",
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
