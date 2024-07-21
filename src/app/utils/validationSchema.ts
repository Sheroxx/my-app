import * as yup from 'yup';

// Login form validation schema
export const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

// User detail form validation schema
export const userDetailSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  phone: yup.string().required('Phone is required'),
});
