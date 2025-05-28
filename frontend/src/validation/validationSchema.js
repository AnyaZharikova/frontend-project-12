import * as yup from 'yup';

const loginSchema = (message) => yup.object().shape({
  username: yup.string().required(message),
  password: yup.string().required(message),
});

const registrationSchema = (nameMessage, passwordMessage, required, equal) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, nameMessage)
    .max(20, nameMessage)
    .required(required),
  password: yup
    .string()
    .trim()
    .min(6, passwordMessage)
    .required(required),
  passwordConfirmation: yup
    .string()
    .trim()
    .required(required)
    .oneOf(
      [yup.ref('password'), null],
      equal,
    ),
});

const messageSchema = (message) => yup.object().shape({
  body: yup.string().trim().required(message),
});

const newChannelSchema = (channels, doubleMessage, lengthMessage) => yup.object().shape({
  channelName: yup
    .string()
    .trim()
    .min(3, lengthMessage)
    .max(20, lengthMessage)
    .required(lengthMessage)
    .notOneOf(channels.map((channel) => channel.name), doubleMessage),
});

export {
  loginSchema,
  registrationSchema,
  messageSchema,
  newChannelSchema,
};
