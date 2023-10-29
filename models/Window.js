export const WINDOW_MIN_HEIGHT_REM = 1.75;
export const WINDOW_MAX_HEIGHT_REM = 30;
export const WINDOW_MOUSE_CATCH_TOLERANCE = 2; //px
const WINDOW_CLOSING_HEIGHT_REM = 10;
const IS_MULTI_WINDOW_ALLOWED = false;
const IS_AUTO_HIDE_ENABLED = true;

export class Window {
  id = null;
  color = null;
  triggerEl = null;
  height = null;
  initialHeight = null;
  hasSqueezed = null;
  hasTransition = true;

  isOpen = false;
  isShow = false;

  isAutoHide = IS_AUTO_HIDE_ENABLED;

  onBodyMountedCallbacks = [];

  constructor(id = null) {
    this.id = id;
  }

  onClickAway() {
    if (this.isAutoHide) this.hide();
    return this;
  }

  enableAutoHide() {
    if (IS_AUTO_HIDE_ENABLED) setTimeout(() => (this.isAutoHide = true), 0);
    return this;
  }

  disableAutoHide() {
    this.isAutoHide = false;
    return this;
  }

  close() {
    this.hide();
    app().remove("windows", this);
    // document.querySelector("#" + this.id).remove();
    setTimeout(() => this.reset(), 1000); // was conflicting transitions
    delete this;
    // return this;
  }

  show() {
    return this.setIsShow(true);
  }

  open() {
    return !this.isOpen ? this.setIsOpen(this.isShow) : this;
  }

  hide() {
    return this.setIsShow(false);
  }

  toggleShow() {
    return this.setIsShow(!this.isShow);
  }

  scroll(y) {
    this.body.scrollTo(0, y);
  }

  reset() {
    this.initialHeight = null;
    this.closingHeight = null;
    return this.resetHeight()
      .resetColor()
      .setIsShow(false)
      .setIsOpen(false)
      .setHasSqueezed(null);
  }

  setIsShow(value) {
    if (value && !IS_MULTI_WINDOW_ALLOWED) hideAllWindows();

    this.isShow = value;
    // if (value) this.initiateHeight();

    app().freezeBodyScroll(
      Boolean(this.isShow || app().windows.find((w) => w.isShow))
    );
    return this;
  }

  setIsOpen(bool) {
    this.isOpen = bool;
    return this;
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  resetColor() {
    return this.setColor(null);
  }

  initialize() {
    this.initialHeight ??= this.body?.offsetHeight;
    this.closingHeight ??= remToPx(WINDOW_CLOSING_HEIGHT_REM);
    return this;
  }

  onBodyMounted(callback) {
    this.onBodyMountedCallbacks.push(callback);
    return this;
  }

  addBodyClassList(classes) {
    for (let c of classes) this.body.classList.add(c);
    return this;
  }

  initiateHeight() {
    return this.height === null
      ? setTimeout(() => this.refreshHeight(), 1000)
      : this;
  }

  refreshHeight() {
    this.resetHeight();
    setTimeout(() => this.setHeight(this.body.clientHeight), 1000);
    return this;
  }

  resetHeight() {
    return this.setHeight(null);
  }

  setHeight(value) {
    this.height = value;
    if (this.body)
      this.body.style.height = value === null ? null : value + "px";
    return this;
  }

  setHasSqueezed(value) {
    this.hasSqueezed = value;
    return this;
  }

  disableTransition() {
    this.hasTransition = false;
    return this;
  }

  get body() {
    return document.querySelector("#" + this.id + " .overflow-y-auto");
  }
}
