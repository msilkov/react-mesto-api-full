const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');
const {
  createCardValidation,
  idValidation,
} = require('../middlewares/requetsValidation');

router.get('/', getCards);

router.post('/', createCardValidation, createCard);

router.delete('/:_id', idValidation, deleteCard);

router.put('/:_id/likes', idValidation, setCardLike);

router.delete('/:_id/likes', idValidation, removeCardLike);

module.exports = router;
