const Card = require('../models/card');
const { cardResFormat, STATUS_OK } = require('../utils/utils');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => cards.map((card) => cardResFormat(card)))
    .then((cards) => res.status(STATUS_OK).send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_OK).send(cardResFormat(card)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(new NotFoundError('card'))
    .then((card) => {
      const currnetUser = req.user._id;
      const cardOwner = card.owner._id.toString();
      if (currnetUser !== cardOwner) {
        throw new ForbiddenError('card');
      }

      return Card.findByIdAndRemove(req.params._id);
    })
    .then((card) => {
      res.status(STATUS_OK).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

const setCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('card'))
    .then((card) => {
      res.status(STATUS_OK).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

const removeCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('card'))
    .then((card) => {
      res.status(STATUS_OK).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
};
