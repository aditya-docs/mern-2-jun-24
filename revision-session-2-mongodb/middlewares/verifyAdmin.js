const verifyAdmin = (req, res, next) => {
  if (req.headers.authorization === process.env.ADMIN_KEY) return next();
  res
    .status(403)
    .send({ message: "You do not have permission to perform this action" });
};

module.exports = verifyAdmin;
