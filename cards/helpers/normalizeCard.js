const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId) => {
  return {
    ...rawCard,
    image: {
      url:
        rawCard.image.url ||
        "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
      alt: rawCard.image.alt || `${rawCard.title} card image`,
    },
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: rawCard.user_id || userId,
  };
};

module.exports = normalizeCard;
