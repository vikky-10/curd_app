// controlLer for CURD OPERATION

//require the schema
var Userdb = require("../model/model");

// create and save new user

exports.create = (req, res) => {
  //validate request
  //when we sumbmit the form with post request it save in the body

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new user
  //OBJECT
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in the database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      //after submit the form it come here add data to the database then redirect to 👇 this url '/' you can add any url you want to eg 'add_user page itself
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occured while creating a create operation",
      });
    });
};

//retrieve and return all user//retrieve and return a single user

exports.find = (req, res) => {
  //get the data from database

  //specific user
  //query parameter
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `not found with id ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "error retriving user with id" + id });
      });
  } else {
    //find() method return all the recods from the database
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error occurred while retrieving user information",
        });
      });
  }
};

//update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }
  //url parameter
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update user with${id} Maybe user not found`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `error Update user information` });
    });
};

//Delete a user by user id
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with ${id} maybe wrong` });
      } else {
        res.send({ message: `User was deleted successfully` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: `Could not delete user with ${id}` });
    });
};
