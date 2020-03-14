export default function(list) {
  function getHierarchicalName(category, depth = 0) {
    let ret = category.name;
    let newDepth = depth + 1;
    if (category.parent !== null) {
      const parent = list.find(c => c.id === category.parent);
      const [name, dpt] = getHierarchicalName(parent, newDepth);
      ret += ` < ${name}`;
      newDepth = dpt;
    }
    return [ret, newDepth];
  }

  const hierarchizedList = list.map(category => {
    const opt = { value: category.id };
    let label = category.name;
    let depth = 0;
    if (category.parent !== null) {
      const [lbl, dpt] = getHierarchicalName(category, -1); // Depth = -1 to start from 0
      label = lbl;
      depth = dpt;
    }
    opt.label = label;
    opt.depth = depth;
    return opt;
  });

  const sorted = hierarchizedList.sort((a, b) => (a.depth > b.depth ? 1 : -1));

  return sorted;
}
