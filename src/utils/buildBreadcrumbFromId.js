import buildChildrenOptions from './buildChildrenOptions';
import flattenTree from './flattenTree';

/**
 * Return hierarchized data to build the breadcrumb thanks to the passed node id.
 * The returns array of objects contains for each node the value to set to the select
 * component and its options.
 *
 * @param {Number} id Id of the selected node
 * @param {Object | Object[]} tree Tree to parse
 * @return {Object[]} Breadcrumb data hierarchized from parent to last child
 */
export default function(id, tree) {
  let flattenedTree = [];
  if (Array.isArray(tree)) {
    flattenedTree = tree.map(branch => flattenTree(branch));
    flattenedTree = flattenedTree.reduce((acc, val) => acc.concat(val), []);
  } else {
    flattenedTree = flattenTree(tree);
  }

  // Get node and its parents
  const hierarchy = getHierarchy(id, flattenedTree);

  // Get each node options and build breadcrumb data
  const breadcrumbData = [];
  for (let i = 0; i < hierarchy.length; i += 1) {
    const selectedOption = { label: hierarchy[i].name, value: hierarchy[i].id };
    const nodeOptions = i > 0 ? buildChildrenOptions(hierarchy[i - 1]) : [];

    breadcrumbData.push({
      value: selectedOption,
      options: nodeOptions,
    });

    // Build empty select if the latest element has children
    if (i === hierarchy.length - 1 && hierarchy[i].children) {
      const options = buildChildrenOptions(hierarchy[i]);
      breadcrumbData.push({
        value: undefined,
        options,
      });
    }
  }

  return breadcrumbData;
}

/**
 * Returns an array of tree nodes from parent to last child based
 * on its id.
 *
 * @param {Number} nodeId Id of the selected node
 * @param {Object[]} list Flattened tree data
 * @return {Object[]} Hierarchized nodes from parent to last child
 */
function getHierarchy(nodeId, list) {
  const hierarchy = [];
  function findParent(parentId) {
    const node = list.find(n => n.id === parentId);
    hierarchy.unshift(node);

    if (node.parent !== null) {
      findParent(node.parent);
    }
    return hierarchy;
  }

  return findParent(nodeId);
}
