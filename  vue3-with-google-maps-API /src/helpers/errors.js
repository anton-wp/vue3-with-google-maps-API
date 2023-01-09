export const messageErrors = ({ key, label, helper }) => {
  const errors = {
    required: `The ${label} field is required.`,
    letters: `The ${label} field must contain only letters`,
    email: `The ${label} must be a valid email address.`,
    minLength: `The ${label} must be at least ${helper ? helper : 8}.`,
    uppercase: `The ${label} must contain a uppercase letter.`,
    lowercase: `The ${label} must contain a lowercase letter.`,
    includesNumber: `The ${label} must contain a number.`,
    match: `The ${label} must coincide with the field of ${helper}.`,
    matchPasswords: `Both passwords should match each other.`,
  };
  return errors[key];
};

export const valid = {
  required: (value) => value.length > 0,
  letters: (value) => /^[A-Za-z]+$/.test(value),
  checked: (value) => value,
  email: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
  includesNumber: (value) => /\d+/.test(value),
  uppercase: (value) => /(?=.*?[A-Z])/.test(value),
  lowercase: (value) => /(?=.*?[a-z])/.test(value),
  minLength: (value, rules) =>
    rules.find((item) => item.key === "minLength")
      ? value.length > rules.find((item) => item.key === "minLength").min - 1
      : false,
  match: (value, rules) => {
    return rules.find((item) => item.key === "match")
      ? value && value === rules.find((item) => item.key === "match").matchValue
      : false;
  },
};
