const productSortHelper = (query, req) => {
  const sortKey = req.query.sortBy;
  if (sortKey === "most-price") {
    return query.sort("-price");
  }

  return query.sort("price");
};

module.exports = productSortHelper;
