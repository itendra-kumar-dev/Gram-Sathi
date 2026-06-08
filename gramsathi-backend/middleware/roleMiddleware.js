const sellerOnly = (
  req,
  res,
  next
) => {

  if (
    req.user.role !== "seller"
  ) {

    return res.status(403).json({
      message:
        "Seller access only",
    });

  }

  next();
};

const clientOnly = (
  req,
  res,
  next
) => {

  if (
    req.user.role !== "client"
  ) {

    return res.status(403).json({
      message:
        "Client access only",
    });

  }

  next();
};

module.exports = {
  sellerOnly,
  clientOnly,
};