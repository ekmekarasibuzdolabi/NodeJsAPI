const searchHelper = (searchKey, req, query) => {
  if (req.query.search) {
    const searchObject = {};

    const regex = new RegExp(req.query.search, "i");

    searchObject[searchKey] = regex;

    query = query.where(searchObject);
  }
  return query;
};

module.exports = searchHelper;
