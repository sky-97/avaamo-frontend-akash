import { required, integer, email } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';


/*
Custom validators
 */
const isURL = (str) => !!str.match(/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/);

const isEmail =(str) => !!str.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});

extend('url', {
  validate: value => isURL(value),
  message: 'Invalid URL format.',
});


extend('integer', {
  ...integer,
  message: 'field must be a number.',
});

extend('email', {
    validate: value => isEmail(value),
    message: 'please enter valid email.',
  });
  




