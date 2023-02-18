const {
  celebrate, Joi,
} = require('celebrate');
const { REG_LINK } = require('../utils/constants');

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REG_LINK),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REG_LINK),
  }),
});

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

const patchUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const patchAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REG_LINK),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  createCardValidation,
  idValidation,
  patchUserValidation,
  patchAvatarValidation,
};
