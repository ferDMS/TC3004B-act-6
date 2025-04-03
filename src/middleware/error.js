module.exports = (err, req, res, _) => {
  res.status(500).json({ message: err.message || 'Something went wrong!' });
};
