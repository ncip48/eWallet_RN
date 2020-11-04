const { User, Transaction, Notification, Topup } = require("../../models");
var async = require("express-async-await");
var fetch = require("node-fetch");
let base64 = require("base-64");

exports.getTransaction = async (req, res) => {
  try {
    //check user in database based on email inputed
    const transactions = await Transaction.findAll({
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
      //where: { type: 1 },
    });

    //send response from login system
    res.send({
      message: "Transaction successfully restored",
      data: {
        transactions,
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

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit);
    //check user in database based on email inputed
    const transactions = await Transaction.findAll({
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
      where: {
        userId: id,
      },
      attributes: {
        exclude: ["to", "from", "userId", "createdAt", "updatedAt"],
      },
      order: [["id", "DESC"]],
      limit: limit ? limit : 10,
      //group: ["date"],
      //where: { type: 1 },
    });

    //send response from login system
    res.send({
      message: "Transaction successfully restored",
      data: {
        transactions,
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

exports.getTransactionSend = async (req, res) => {
  try {
    //check user in database based on email inputed
    const transactions = await Transaction.findAll({
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
      where: { type: 1 },
    });

    //send response from login system
    res.send({
      message:
        "Transaction successfully restored, displaying the sending transaction",
      data: {
        transactions,
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

exports.detailTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    //check user in database based on email inputed
    const transaction = await Transaction.findOne({
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
        exclude: ["to", "from", "userId", "createdAt", "updatedAt"],
      },
      where: {
        id,
      },
    });

    //check if user existed with email inputed
    if (!transaction) {
      return res.status(400).send({
        error: {
          message: "transaction not found in this database",
        },
      });
    }

    //send response from login system
    res.send({
      message: `Transaction with id ${id} successfully restored`,
      data: {
        transaction,
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

exports.makeTransaction = async (req, res) => {
  try {
    const { id } = req.user;
    const { ammount, to } = req.body;
    //check user in database based on email inputed
    const checkAmmount = await User.findOne({
      where: { id },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
    });

    if (checkAmmount.saldo < ammount) {
      return res.status(500).send({
        error: {
          message: "Your balance not enough to make transaction",
        },
      });
    }

    const checkUser = await User.findOne({
      where: { uid: to },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
    });

    if (!checkUser) {
      return res.status(500).send({
        error: {
          message: "User not found to make transaction",
        },
      });
    }

    if (ammount < 10000) {
      return res.status(500).send({
        error: {
          message: "Minimal transaction is 10000",
        },
      });
    }

    const isMe = await User.findOne({
      where: { id: id },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
    });

    const transaction = await Transaction.create({
      userId: id,
      trx: "TRX-" + Math.floor(Math.random() * 1000000),
      //trx: trx,
      type: 1,
      ammount,
      from: isMe.id,
      to: checkUser.id,
      current: isMe.saldo - ammount,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { hour12: false }),
    });

    await User.update(
      { saldo: transaction.current },
      {
        where: {
          id,
        },
      }
    );

    const userTujuan = await User.findOne({
      where: { uid: to },
      attributes: {
        exclude: ["updatedAt", "userId"],
      },
    });

    const transaction2 = await Transaction.create({
      userId: userTujuan.id,
      trx: "TRX-" + Math.floor(Math.random() * 1000000),
      type: 0,
      ammount: transaction.ammount,
      from: id,
      to: userTujuan.id,
      current: userTujuan.saldo + ammount,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-US", { hour12: false }),
    });

    await User.update(
      { saldo: transaction2.current },
      {
        where: {
          uid: to,
        },
      }
    );

    const notif_sender = await Notification.create({
      userId: isMe.id,
      title: `Transaction has been succesfully sended`,
      body: `You has been send money ${ammount} to ${
        userTujuan.first_name + " " + userTujuan.last_name
      }. Txid: ${transaction.trx}`,
    });

    const notif_receiver = await Notification.create({
      userId: userTujuan.id,
      title: `Transaction has been succesfully received`,
      body: `You has been receive money ${ammount} from ${
        isMe.first_name + " " + isMe.last_name
      }. Txid: ${transaction2.trx}`,
    });

    //send response from login system
    res.send({
      message: `You has been successfully send money to ${
        userTujuan.first_name + " " + userTujuan.last_name
      }`,
      data: {
        txid: transaction.trx,
        ammount: ammount,
        date: transaction.date,
        time: transaction.time,
        sender: {
          id: isMe.id,
          uid: isMe.uid,
          photo: isMe.photo,
          first_name: isMe.first_name,
          last_name: isMe.last_name,
        },
        receiver: {
          id: userTujuan.id,
          uid: userTujuan.uid,
          photo: userTujuan.photo,
          first_name: userTujuan.first_name,
          last_name: userTujuan.last_name,
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

exports.topUpGojek = async (req, res) => {
  //const ooIfoundData = () => {
  const { ammount } = req.body;
  const { id } = req.user;
  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (ammount < 50000) {
    return res.status(500).send({
      error: {
        message: "Top-up must be above 50.000 ",
      },
    });
  }

  //define if method gopay
  const body = {
    payment_type: "gopay",
    transaction_details: {
      gross_amount: ammount,
      order_id: `gopay-${user.uid}-${Date.now()}`,
    },
    gopay: {
      enable_callback: true,
      callback_url: "someapps://callback",
    },
    customer_details: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.uid,
      address: user.address,
    },
    item_details: {
      id: "1",
      price: ammount,
      quantity: 1,
      name: `Charge e-wallet with gopay ${ammount}`,
    },
  };
  try {
    const api = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization:
          "Basic " + base64.encode(process.env.SECRET_MIDTRANS + ":" + ""),
      },
    });
    const resdata = await api.json();

    const notif = await Notification.create({
      userId: user.id,
      title: `Top-up successfully requested`,
      body: `You has been request top-up e-wallet ${ammount}`,
    });

    const topup = await Topup.create({
      userId: id,
      notifId: notif.id,
      txid: resdata.transaction_id,
      orderid: resdata.order_id,
      merchantid: resdata.merchant_id,
      ammount: resdata.gross_amount,
      date: resdata.transaction_time,
      status: resdata.transaction_status,
      qr: resdata.actions[0].url,
      deeplink: resdata.actions[1].url,
    });

    if (topup) {
      res.send({
        message: resdata.status_message,
        data: {
          transaction_id: resdata.transaction_id,
          order_id: resdata.order_id,
          merchant_id: resdata.merchant_id,
          ammount: resdata.gross_amount,
          date: resdata.transaction_time,
          status: resdata.transaction_status,
          qr: resdata.actions[0].url,
          deeplink: resdata.actions[1].url,
        },
      });
    } else {
      res.status(500).send({
        error: {
          message: "ERROR transaction",
        },
      });
    }
  } catch (err) {
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }

  //};
  // const ooIprocessData = async () => {
  //   const github = await oIfoundData();
  //   const ooiResponseData = await github.json();
  //   console.log(ooiResponseData);
  // };
  //ooIprocessData();
  //res.end;
};

exports.topUpStore = async (req, res) => {
  //const ooIfoundData = () => {
  const { type, store } = req.query;
  const { ammount } = req.body;
  const { id } = req.user;
  const user = await User.findOne({
    where: {
      id,
    },
  });

  //define if method gopay

  if (store === "indomaret") {
    const body = {
      payment_type: "cstore",
      transaction_details: {
        gross_amount: ammount,
        order_id: `indomaret-${user.uid}-${Date.now()}`,
      },
      customer_details: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.uid,
        address: user.address,
      },
      item_details: {
        id: "1",
        price: ammount,
        quantity: 1,
        name: `Charge e-wallet with indomart ${ammount}`,
      },
      cstore: {
        store: "Indomaret",
        message: `charge e-wallet ${ammount} to ${user.uid}`,
      },
    };
  } else if (store === "alfamart") {
    const body = {
      payment_type: "cstore",
      transaction_details: {
        gross_amount: 162500,
        order_id: `alfamart-${user.uid}-${Date.now()}`,
      },
      cstore: {
        store: "alfamart",
        alfamart_free_text_1: `charge e-wallet ${ammount}`,
        alfamart_free_text_2: `for ${user.uid}`,
        alfamart_free_text_3: "thanks",
      },
      customer_details: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.uid,
        address: user.address,
      },
      item_details: {
        id: "1",
        price: ammount,
        quantity: 1,
        name: `Charge e-wallet with alfamart ${ammount}`,
      },
    };
  }

  const api = await fetch("https://api.sandbox.midtrans.com/v2/charge", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " + base64.encode(process.env.SECRET_MIDTRANS + ":" + ""),
    },
  });
  const resdata = await api.json();
  console.log(resdata);
  res.send({
    resdata,
  });
};
