/**
 * Returns an array of react-select formated options
 * based on node children key.
 *
 * @param {Object} node Selected tree node
 */
export default function(node) {
  if (node.children) {
    const options = [];
    for (let i = 0; i < node.children.length; i += 1) {
      options.push({
        label: node.children[i].name,
        value: node.children[i].id,
      });
    }

    // Sort options and return result
    return options.sort((a, b) => (a.label > b.label ? 1 : -1));
  }
  return [];
}
