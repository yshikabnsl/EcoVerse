function shortestPathBetween(graph, source, target) {
  if (!graph[source] || !graph[target]) {
    return null;
  }

  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  for (const node of unvisited) {
    distances[node] = Number.POSITIVE_INFINITY;
  }
  distances[source] = 0;

  while (unvisited.size > 0) {
    let current = null;
    let smallest = Number.POSITIVE_INFINITY;
    for (const node of unvisited) {
      if (distances[node] < smallest) {
        smallest = distances[node];
        current = node;
      }
    }

    if (!current || current === target) {
      break;
    }
    unvisited.delete(current);

    for (const [neighbor, weight] of Object.entries(graph[current])) {
      if (!unvisited.has(neighbor)) {
        continue;
      }
      const newDistance = distances[current] + Number(weight);
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = current;
      }
    }
  }

  if (distances[target] === Number.POSITIVE_INFINITY) {
    return null;
  }

  const path = [];
  let pointer = target;
  while (pointer) {
    path.unshift(pointer);
    pointer = previous[pointer];
  }

  return {
    source,
    target,
    path,
    distance: distances[target],
    fuelSavedPercent: Math.min(35, Math.round((1 / Math.max(distances[target], 1)) * 100)),
  };
}

module.exports = { shortestPathBetween };
