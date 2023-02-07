const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserProfile,
  patchUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const {
  idValidation,
  patchUserValidation,
  patchAvatarValidation,
} = require('../middlewares/requetsValidation');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:_id', idValidation, getUserById);

router.patch('/me', patchUserValidation, patchUserProfile);

router.patch('/me/avatar', patchAvatarValidation, patchUserAvatar);

module.exports = router;
