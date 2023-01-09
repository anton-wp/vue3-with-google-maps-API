export const validForm = async (func, errors) => {
  try {
    return await func;
  } catch (error) {
    if (error.code === "ERR_BAD_REQUEST") {
      errors.value = { ...errors.value, ...error.response.data.errors };
      return;
    }
  }
};

export const getRequest = async (func) => {
  try {
    return await func;
  } catch (error) {
    console.log(error);
  }
};
