const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

exports.authenticated = (req, res, next) => {
  let header, token;

  //check if header included and with Bearer authentication
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      error: {
        message: "Access Denied",
      },
    });
  }

  try {
    //check if token exist
    const verified = jwt.verify(token, jwtKey);

    //send the user id to req.user
    req.user = verified;

    //next to proccess
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send({
      error: {
        message: "Session invalid or token invalid plase login again",
      },
    });
  }
};
