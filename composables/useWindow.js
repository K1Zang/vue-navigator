export function useWindow(id = null) {
  return app().windows.find((w) => w.id === id) ?? create(id);
}

export function hideAllWindows() {
  app().windows.forEach((w) => w.hide());
}

export function getAllOpenWindows() {
  return app().windows.filter((w) => w.isShow);
}

function create(id = null) {
  let w = new Window(id);
  app().register("windows", w);
  return useWindow(w.id);
}
