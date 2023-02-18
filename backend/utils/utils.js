const userResFormat = (user) => ({
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  _id: user._id,
  email: user.email,
});

const cardResFormat = (card) => (card.owner === null
  ? {
    likes: card.likes,
    _id: card._id,
    name: card.name,
    link: card.link,
    owner: {
      name: 'deleted',
    },
    createdAt: card.createdAt,
  }
  : {
    likes: card.likes,
    _id: card._id,
    name: card.name,
    link: card.link,
    owner: {
      name: card.owner.name,
      about: card.owner.about,
      avatar: card.owner.avatar,
      _id: card.owner._id,
      email: card.owner.email,
    },
    createdAt: card.createdAt,
  });

module.exports = {
  userResFormat,
  cardResFormat,

};
