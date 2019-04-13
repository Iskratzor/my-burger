export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) { isValid = value.trim() !== '' && isValid }
  if (rules.minLength) { isValid = value.length >= rules.minLength && isValid }
  if (rules.maxLength) { isValid = value.length <= rules.maxLength && isValid }
  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid
  }
  return isValid;
}

export const elementSettings = (elType, elConfig, value, validation) => (
  {
    elementType: elType,
    elementConfig: elConfig,
    value: value,
    validation: validation,
    valid: validation ? false : true,
    touched: false
  }
);
