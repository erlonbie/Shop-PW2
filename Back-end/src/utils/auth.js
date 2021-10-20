const verifyAuth = (req, res, next) => {
  if (req.session.userId == 1) next();
  else res.status(401).send({ msg: "Sem autorização" });
};

export default { verifyAuth };
