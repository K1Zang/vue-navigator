export class Navigator {
  id = null;
  root = null;
  path = null; //  current route path
  isActive = false;
  history = [];
  transition = AsyncTransition.None;
  status = null;

  constructor(uri) {
    this.push((this.path = this.id = this.root = uri));
  }

  toRoot() {
    return this.to(this.root);
  }

  to(uri = null) {
    return this.setTransition(AsyncTransition.Forward, false)
      .rememberScrollY()
      .navigate(uri);
  }

  back() {
    if (this.history.length > 1) {
      // this.syncBrowserHistory().setTransition(AsyncTransition.Backward); cannot go back with this
      this.setTransition(AsyncTransition.Backward);
      history.back();
    } else this.toRoot();
    return this;
  }

  trigger() {
    return this.switch(this.id);
  }

  switch(id) {
    let [from, to] = [useNavigator(), useNavigator(id)];

    // if (isSwitchingToSamePage(to)) return from.scroll(0);

    from
      .setStatus(NavigatorStatus.SwitchingLeaving)
      .setTransition(AsyncTransition.None)
      .rememberScrollY()
      .deactivate();

    return to
      .setStatus(NavigatorStatus.SwitchingEntering)
      .activate()
      .navigate(from.id === to.id ? to.root : to.path)
      .syncBrowserHistory();
  }

  navigate(uri = null) {
    let task = new Task("navigating");
    hideAllWindows();

    document.dispatchEvent(
      new CustomEvent("navigate", { detail: { to: uri } })
    );

    navigateTo(this.push(uri ?? this.path).path);
    task.done();
    return this;
  }

  review(uri) {
    // this.setTransition(AsyncTransition.None);
    let state = this.findState(uri);
    return state ? this.push(state.uri) : this.prevent();
  }

  push(uri) {
    let state = this.findState(uri) ?? new State(uri);
    if (state.uri === this.root) this.resetHistory();
    this.cleanHistory(state).setPath(state.uri).history.push(state);
    return this;
  }

  rememberScrollY() {
    let index = this.history.findIndex((s) => s.uri === this.path);
    if (index >= 0) this.history[index].scrollY = parseInt(window.scrollY);
    return this;
  }

  syncBrowserHistory() {
    this.history.forEach((state, index) => {
      // if (index < this.history.length) cannot go back/root with this
      if (index < this.history.length - 1)
        useRouter().options.history.push(state.uri);
    });
    return this;
  }

  setPath(uri) {
    this.path = uri ?? this.root;
    return this;
  }

  findState(uri) {
    return this.history?.find((state) => state.uri === uri);
  }

  removeState(state) {
    this.history = this.history.filter((s) => s?.id !== state.id);
    return this;
  }

  resetHistory() {
    this.history = [];
    return this;
  }

  cleanHistory(state = null) {
    this.history.length =
      this.history.findIndex((s) => s.uri === this.path) + 1;
    return state ? this.removeState(state) : this;
  }

  prevent() {
    useRouter().options.history.push(this.to().path);
    return this;
  }

  scroll(to = null) {
    window.scrollTo({ top: to ?? 0, behavior: "smooth" });
    return this;
  }

  activate() {
    useRouter().navigator = this;
    app().navigators.forEach((n) => n.setIsActive(n.id === this.id));
    return this;
  }

  deactivate() {
    return this.setIsActive(false);
  }

  setIsActive(value) {
    this.isActive = value;
    return this;
  }

  setTransition(value, isAutoReset = true) {
    this.transition = value;
    // if (isAutoReset)
    setTimeout(() => (this.transition = AsyncTransition.None), 1000);

    return this;
  }

  resetStatus() {
    return this.setStatus(null);
  }

  setStatus(value) {
    this.status = value;
    return this;
  }

  get currentState() {
    return this.history.at(-1);
  }

  get lastState() {
    return this.history.at(-2);
  }

  get isRoot() {
    return this.root === this.path;
  }
}

function isSwitchingToSamePage(to) {
  return this.path === to.path && this.id === to.id;
}
