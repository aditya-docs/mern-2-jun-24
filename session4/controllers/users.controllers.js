const usersData = require("./users.json");

const getUsers = (req, res) => {
  res.send(usersData.data);
};

const getUserById = (req, res) => {
  const { uuid } = req.params;
  const reqUser = usersData.data.find(({ login }) => login.uuid === uuid);
  if (reqUser) return res.send(reqUser);
  res.status(404).send({ message: "User not found" });
};

const searchUsers = (req, res) => {
  const { gender, age } = req.query;

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
