const auth = (req, res, next) => {
  // Fake logged-in user
  req.user = {
    _id: "64f000000000000000000001",
    role: "admin",
  };
  next();
};

module.exports = auth;
