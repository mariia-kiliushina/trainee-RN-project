import * as yup from 'yup';

const validation = /^[a-zA-Z0-9]+$/g;

export const validationSchema = yup.object().shape({
  login: yup.string().required('Login is a required field'),
  password: yup
    .string()
    .min(6, 'Password should consts of at least 6 chars')
    .matches(validation, 'Password includes chars that are not allowed')
    .required('Password is a required field'),
  confirmPassword: yup
    .string()
    .min(6, 'Password should consts of at least 6 chars')
    .matches(validation, 'Password includes chars that are not allowed')
    .test('password-match', 'Passwords do not match', function (value) {
      let ref = yup.ref('password');
      return value === this.resolve(ref);
    })
    .required('Password is a required field'),
});
