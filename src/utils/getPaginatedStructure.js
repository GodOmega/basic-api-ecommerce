module.exports = (query, page, limit) => {
  const { count: totalItems, rows: data } = query;

  const currentPage = page ? parseInt(page) : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, data, totalPages, currentPage };
};
