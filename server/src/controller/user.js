const { User, Transaction } = require("../../models");

exports.getAllUser = async (req, res) => {
  try {
    //check user in database based on email inputed
    const user = await User.findAll({
      attributes: {
        exclude: ["pin", "createdAt", "updatedAt", "password"],
      },
    });

    //check if user existed with email inputed
    if (!user) {
      return res.status(400).send({
        error: {
          message: "User not found in this database",
        },
      });
    }

    //send response from login system
    res.send({
      message: "User successfully restored",
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

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    //check user in database based on email inputed
    const user = await User.findOne({
      include: {
        model: Transaction,
        as: "transactions",
        include: [
          {
            model: User,
            as: "sender",
            attributes: {
              exclude: [
                "role",
                "saldo",
                "email",
                "gender",
                "address",
                "pin",
                "createdAt",
                "updatedAt",
              ],
            },
          },
          {
            model: User,
            as: "receiver",
            attributes: {
              exclude: [
                "role",
                "saldo",
                "email",
                "gender",
                "address",
                "pin",
                "createdAt",
                "updatedAt",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["to", "from", "userId", "updatedAt"],
        },
      },
      where: {
        id,
      },
      attributes: {
        exclude: ["pin", "createdAt", "updatedAt", "password"],
      },
    });

    // const sender = await User.findOne({
    //   where: { id: user.transactions.from },
    //   attributes: {
    //     exclude: ["pin", "createdAt", "updatedAt", "password"],
    //   },
    // });

    //check if user existed with email inputed
    if (!user) {
      return res.status(400).send({
        error: {
          message: "User not found in this database",
        },
      });
    }

    //send response from login system
    res.send({
      message: "User successfully restored",
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

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.user;

    if (!req.file) {
      await User.update(
        { ...req.body },
        {
          where: {
            id,
          },
        }
      );
      const user = await User.findOne({
        where: {
          id,
        },
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: `User picture success updated`,
        data: {
          user,
        },
      });
    } else {
      await User.update(
        { ...req.body, photo: req.file.filename },
        {
          where: {
            id,
          },
        }
      );
      const user = await User.findOne({
        where: {
          id,
        },
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send({
        message: `User picture success updated`,
        data: {
          user,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
