// sample dfs algo
const dfs =
  "def dfs(graph, start, visited=set()):\n" +
  "    if start in visited: return \n" +
  "    visited.add(start)\n" +
  "    for neighbor in graph[start]:\n" +
  "        dfs(graph, neighbor, visited)";
