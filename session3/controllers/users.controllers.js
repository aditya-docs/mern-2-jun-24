const Joi = require("joi");
const usersData = require("./users.json");
// const getQueryErrors = require("../validators/validator");

const userSearchSchema = Joi.object({
  gender: Joi.string().valid("male", "female"),
  age: Joi.number().integer().min(0).max(100),
}).or("gender", "age");

const verifyAuth = (authorization) => authorization === process.env.PASSWORD;

const getUsers = (req, res) => {
  if (!verifyAuth(req.headers.authorization)) return res.sendStatus(403);
  res.send(usersData.data);
};

const getUserById = (req, res) => {
  if (!verifyAuth(req.headers.authorization)) return res.sendStatus(403);
  const { uuid } = req.params;
  const reqUser = usersData.data.find(({ login }) => login.uuid === uuid);
  if (reqUser) return res.send(reqUser);
  res.status(404).send({ message: "User not found" });
};

const searchUsers = (req, res) => {
  if (!verifyAuth(req.headers.authorization)) return res.sendStatus(403);
  const { gender, age } = req.query;
  // validation
  // if (gender && !["male", "female"].includes(gender))
  //   return res
  //     .status(422)
  //     .send({ message: "Gender must be either 'male' or 'female'" });
  // if (age && isNaN(age))
  //   return res.status(422).send({ message: "age must be an integer" });
  // if (age && (age < 0 || age > 100))
  //   return res.status(422).send({ message: "age must be between 0 and 100" });

  const error = userSearchSchema.validate({ age, gender }).error;
  if (error) return res.status(422).send({ message: error.details[0].message });

  if (gender && age) {
    return res.send(
      usersData.data.filter(
        (user) => user.gender === gender && user.dob.age === parseInt(age)
      )
    );
  } else if (gender) {
    return res.send(usersData.data.filter((user) => user.gender === gender));
  } else if (age) {
    return res.send(
      usersData.data.filter((user) => user.dob.age === parseInt(age))
    );
  } else {
    res.status(400).send({
      message: "At least one query parameter: [gender or age] must be passed!",
    });
  }
};

module.exports = { getUsers, getUserById, searchUsers };
