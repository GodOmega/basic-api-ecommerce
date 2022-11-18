module.exports = (page, size) => {
  const limit = size ? parseInt(size) : 2;
  const offset = page ? parseInt((page - 1) * limit) : 0;

  return { limit, offset };
};
