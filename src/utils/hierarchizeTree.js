/**
 * Receives a tree node and return a list of react-select options
 *
 * @param {Object} parentNode Node to be read
 * @param {Number[]} disabledIds Ids of options to disable
 * @return {Object[]} Array of react-select options
 */
export default function(parentNode, disabledIds) {
  const list = [];
  function getName(node, concatName, depth = 0) {
    const hierarchicalName = concatName
      ? `${node.name} < ${concatName}`
      : node.name;

    const isDisabled = disabledIds && disabledIds.includes(node.id);
    list.push({
      label: hierarchicalName,
      value: node.id,
      depth,
      isDisabled,
    });

    if (node.children) {
      for (let i = 0; i < node.children.length; i += 1) {
        getName(node.children[i], hierarchicalName, depth + 1);
      }
    }
    return list;
  }

  return getName(parentNode);
}
