import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SimpleForm(props) {
  const { onSubmit, fields, submitText } = props;
  const [formData, setFormData] = useState({
    ...fields.reduce((acc, field) => ({ ...acc, [field.name]: undefined }), {}),
  });

  const handleChangeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === undefined || value === '')) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label ?? field.name}</label>
          <input type={field.type} name={field.name} required={field.required ?? false} onChange={handleChangeValue} />
        </div>
      ))}
      <button type="button" onClick={handleSubmit}>{submitText}</button>
    </div>
  );
}

SimpleForm.propTypes = {
  onSubmit: PropTypes.func,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      data: PropTypes.object.isRequired,
      required: PropTypes.bool,
    }),
  ).isRequired,
  submitText: PropTypes.string,
};

SimpleForm.defaultProps = {
  onSubmit: () => {},
  submitText: 'Submit',
};
