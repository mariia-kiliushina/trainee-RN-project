import * as yup from 'yup';

const validation = /^[a-zA-Z0-9]+$/g;

export const passwordValidationSchema = yup.object().shape({
  login: yup.string().required('Login is a required field'),
  password: yup
    .string()
    .min(6, 'Password should consts of at least 6 chars')
    .matches(validation, 'Password includes chars that are not allowed')
    .required('Password is a required field'),
});

passwordValidationSchema
  .validate({
    login: 'login',
    password: '2Dsdasdasddf2',
  })
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    console.log(err);
  });
