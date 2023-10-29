export const baseNavigatorIds = [
  "/",
  "/home",
  "/workspace",
  "/notifications",
  "/sessions/create",
];

/**
 * get a navigator by its is or if id is null will return active navigator
 * if none was found will make new with given id if no id was provided will
 * create or activate default navigator which is '/'
 *
 * */
export function nav(id = null) {
  return useNavigator(id);
}

export function useNavigator(id = null) {
  return (
    app().navigators.find((n) => (id ? n.id === id : n.isActive)) ??
    findOrCreate(id ?? LANDING_PAGE)
  );
}

export function to(uri) {
  return useNavigator().to(uri);
}

export function back() {
  return useNavigator().back();
}

export function noReload() {
  if (!app().loaded) to(LANDING_PAGE);
}

export function navigatorLunch() {
  return useNavigator(
    baseNavigatorIds.includes(useRoute().path) ? useRoute().path : LANDING_PAGE
  )
    .activate()
    .to(useRoute().path);
}

export function navigatorReset() {
  return useNavigator().switch(LANDING_PAGE).to();
}

export function navigatorHooks() {
  useRouter().navigator = useNavigator(LANDING_PAGE);

  window.addEventListener("popstate", (event) =>
    useNavigator().review(event.state.current)
  );

  useRouter().options.scrollBehavior = (to, from, savedPosition) => ({
    top:
      savedPosition?.top ??
      useRouter().navigator.findState(to.path)?.scrollY ??
      undefined, // docs: if top is undefined it doesn't mess with the scroll!
  });
}

function findOrCreate(uri) {
  let [navigator, a] = [new Navigator(uri), app()];

  if (!a.navigators.find((n) => n.id === uri))
    a.register("navigators", navigator);

  return useNavigator(navigator.id);
}
