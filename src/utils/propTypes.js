import PropTypes from 'prop-types';

export const INGREDIENT_PROP_TYPES = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const FORM_INPUT_PROP_TYPES = PropTypes.shape({
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  tagType: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ value: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
  value: PropTypes.string,
  icon: PropTypes.string,
});

export const FORM_BUTTON_PROP_TYPES = PropTypes.shape({
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
});

export const FORM_EVENTS_PROP_TYPES = PropTypes.shape({
  onFormChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFormReset: PropTypes.func,
});

export const FORM_ACTION_PROP_TYPES = PropTypes.shape({
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

export const FORM_ERROR_PROP_TYPES = PropTypes.shape({
  errorMessage: PropTypes.string,
  handleCloseModal: PropTypes.func.isRequired,
});
