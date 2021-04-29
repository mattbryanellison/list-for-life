module.exports = (err, req, res) => {
  console.log("Triggered Error Handler");
  console.log(err);
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res
    .status(err.statusCode || 500)
    .send(err.message || "Internal server error");
};
