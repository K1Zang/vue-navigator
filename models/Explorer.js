export class Explorer {
  id = null;

  module = null;
  history = []; // records of uris
  tracker = 0; // points to history index
  transition = null;

  constructor(id = null) {
    this.id = id;
  }

  trigger(uri) {
    if (this.module) this.window.toggleShow();
    else this.to(uri, {}, true);
    return this;
  }

  toDisposable(uri, props = {}) {
    return this.navigate(uri, props, true);
  }

  to(uri, props = {}, isDisposable = null) {
    return this.navigate(uri, props, isDisposable);
  }

  navigate(uri, props = {}, isDisposable = null) {
    isDisposable ??= Boolean(Object.keys(props).length);

    if (!this.hasRegistered) this.register();

    this.setTransition(
      AsyncTransition[
        !this.hasModule || this.module.uri === uri ? "None" : "Forward"
      ]
    )
      .cleanOf(uri)
      .record(
        this.setModule({
          props, // props to pass to page
          ...useAsync(uri), // page itself alongside uri
          ...{ isDisposable, id: uri },
        }).module
      );

    this.resetTracker();
    this.window.show();
    return;
  }

  backward() {
    if (this.isNotBeginning)
      this.setTransition(AsyncTransition.Backward).reviewHistory(
        ++this.tracker
      );
    return this;
  }

  forward() {
    if (this.isNotEnd)
      this.setTransition(AsyncTransition.Forward).reviewHistory(--this.tracker);
    return this;
  }

  reviewHistory(index) {
    let module = this.history[index];
    if (module.isDisposable) this.setModule(useAsync(module.uri));
    else this.setModule(module);
    return this;
  }

  record(module) {
    this.history.unshift(module);
    return this;
  }

  /**
   * Here is where actually the component changes
   *
   * @param {*} module
   * @returns
   */
  setModule(module) {
    this.module = module;
    this.window.resetHeight();
    return this;
  }

  cleanOf(uri) {
    this.history = this.history.filter((module) => module.uri !== uri);
    return this;
  }

  resetTracker() {
    this.tracker = 0;
    return this;
  }

  close() {
    app().remove("explorers", this);
    this.window?.close();
    return this;
  }

  register() {
    app().register("explorers", this);
    return this;
  }

  setTransition(value) {
    this.transition = value;
    return this;
  }

  get window() {
    return useWindow(this.id);
  }

  get isNotBeginning() {
    return this?.tracker < this?.history.length - 1;
  }

  get isNotEnd() {
    return this?.tracker > 0;
  }

  get hasRegistered() {
    return Boolean(app().explorers.find((e) => e.id === this.id));
  }

  get isFresh() {
    return Boolean(!this.history.length);
  }

  get hasModule() {
    return Boolean(this.module);
  }
}
