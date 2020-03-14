import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

export function Select({
  index,
  value,
  options,
  placeholder,
  onChange,
  noOptionsMessage,
}) {
  const [selectedValue, setSelectedValue] = useState(undefined);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <ReactSelect
      isClearable
      value={selectedValue}
      options={options}
      placeholder={placeholder}
      onChange={choice => onChange(choice, index)}
      noOptionsMessage={noOptionsMessage}
      styles={{
        container: base => ({
          ...base,
          flex: 1,
        }),
      }}
    />
  );
}

Select.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  noOptionsMessage: PropTypes.func,
};

export default Select;
