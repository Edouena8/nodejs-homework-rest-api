const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res, __) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;
  const filter = favorite ? { owner, favorite } : { owner };

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
    favorite,
  }).populate("owner", "name email subscription");

  res.json(result);
};

module.exports = ctrlWrapper(listContacts);
