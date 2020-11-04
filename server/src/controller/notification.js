const { User, Transaction, Notification } = require("../../models");

exports.getNotification = async (req, res) => {
  try {
    const { id } = req.user;
    //check user in database based on email inputed
    const notifications = await Notification.findAll({
      //   include: {
      //     model: User,
      //     as: "user",
      //     attributes: {
      //       exclude: ["pin", "userId", "updatedAt"],
      //     },
      //   },
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["userId", "updatedAt", "password"],
      },
      order: [["id", "DESC"]],
    });

    //send response from login system
    res.send({
      message: "Notification successfully restored",
      data: {
        notifications,
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
