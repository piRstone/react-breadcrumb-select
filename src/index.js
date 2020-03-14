import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  buildChildrenOptions,
  buildBreadcrumbFromId,
  hierarchizeTree,
  searchTree,
} from './utils';
import Select from './Select';
import styles from './styles';

function BreadcrumbSelect({
  data,
  value,
  placeholder,
  onChange,
  noOptionsMessage,
  disabledIds,
}) {
  const [choices, setChoices] = useState([]);
  const [initialOptions, setInitialOptions] = useState([]);

  // Init breadcrumb
  useEffect(() => {
    let hierarchizedList = [];
    if (Array.isArray(data)) {
      hierarchizedList = data.map(branch =>
        hierarchizeTree(branch, disabledIds),
      );
      hierarchizedList = hierarchizedList.reduce(
        (acc, val) => acc.concat(val),
        [],
      );
    } else {
      hierarchizedList = hierarchizeTree(data);
    }

    const sortedHierarchizedList = hierarchizedList.sort((a, b) =>
      a.depth > b.depth ? 1 : -1,
    );

    setInitialOptions(sortedHierarchizedList);
    setChoices([{ options: sortedHierarchizedList }]);
  }, [data]);

  // Fill breadcrumb if value is filled
  useEffect(() => {
    if (
      data.length &&
      initialOptions.length &&
      value !== null &&
      value !== undefined
    ) {
      const breadcrumbData = buildBreadcrumbFromId(value, data);
      breadcrumbData[0].options = initialOptions; // Set initialOptions for the first select
      setChoices(breadcrumbData);
    }
  }, [value, data, initialOptions]);

  const getChildrenOptions = id => {
    const node = searchTree(id, data);
    return buildChildrenOptions(node);
  };

  const handleChoice = (choice, index) => {
    if (choice === null) {
      const newChoices = choices.slice(0, index + 1);
      newChoices[index].value = undefined;
      setChoices(newChoices);

      if (typeof onChange === 'function') {
        if (newChoices[index - 1]) {
          onChange(newChoices[index - 1].value);
        } else {
          onChange(undefined);
        }
      }
      return;
    }

    if (index === 0 && choice.depth !== 0) {
      const breadcrumbData = buildBreadcrumbFromId(choice.value, data);
      breadcrumbData[0].options = initialOptions; // Set initialOptions for the first select
      setChoices(breadcrumbData);
    } else {
      const newChoices = choices.slice(0, index + 1);
      newChoices[index].value = { label: choice.label };
      setChoices([
        ...newChoices,
        { value: undefined, options: getChildrenOptions(choice.value) },
      ]);
    }

    if (typeof onChange === 'function') onChange(choice);
  };

  return (
    <div style={styles.container}>
      {choices.map(
        (choice, index) =>
          !!choice.options.length && (
            <div
              key={index} // eslint-disable-line
              style={styles.childWrapper}
            >
              <Select
                index={index}
                value={choice.value}
                options={choice.options}
                onChange={handleChoice}
                placeholder={placeholder}
                noOptionsMessage={noOptionsMessage}
              />
            </div>
          ),
      )}
    </div>
  );
}

BreadcrumbSelect.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  noOptionsMessage: PropTypes.func,
  disabledIds: PropTypes.arrayOf(PropTypes.number),
};

export default BreadcrumbSelect;
