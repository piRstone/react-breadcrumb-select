/**
 *
 * @param {Object} tree Tree to flatten
 * @return {Object[]} Array of each tree nodes
 */
export default function(tree) {
  const list = [];
  function getNodes(node) {
    list.push(node);

    if (node.children) {
      for (let i = 0; i < node.children.length; i += 1) {
        getNodes(node.children[i]);
      }
    }
    return list;
  }

  return getNodes(tree);
}
