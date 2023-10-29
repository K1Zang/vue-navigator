/**
 *
 * Get an explorer by id or create one.
 *
 * @param {*} id
 * @returns
 */
export function useExplorer(id = null) {
  // if (process.server) return;
  return app().explorers.find((e) => e.id === id) ?? create(id);
}

function create(id = null) {
  let explorer = new Explorer(id);
  app().register("explorers", explorer);
  return useExplorer(explorer.id);
}
