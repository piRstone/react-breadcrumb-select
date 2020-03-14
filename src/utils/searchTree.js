/**
 * Finds and returns an object in a tree
 *
 * @param {id} nodeId Node to find id
 * @param {Object} tree Tree to read
 * @return {Object | null} Found node
 */
export default function(nodeId, tree) {
  function search(element, id) {
    if (element.id === id) return element;

    let result = null;
    if (element.children) {
      for (let i = 0; result == null && i < element.children.length; i += 1) {
        result = search(element.children[i], id);
      }
    }
    return result;
  }

  for (let i = 0; i < tree.length; i += 1) {
    let res = null;
    res = search(tree[i], nodeId);
    if (res !== null) return res;
  }
  return null;
}
