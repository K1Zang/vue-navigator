export class Task {
  id = null;
  name = null;
  hasFailed = false;

  constructor(name) {
    this.id = this.name = name;
    if (this.countTasks) app().progressIndicator?.start();
    app().tasks?.push(this);
  }

  done() {
    return this.finish();
  }

  fail(errors = {}) {
    // collect exceptions errors info and send to server
    return this.finish().setHasFailed(true);
  }

  countTasks() {
    return app().tasks.length;
  }

  setHasFailed(value) {
    this.hasFailed = value;
    return this;
  }

  finish() {
    let a = app();
    a.remove("tasks", this);
    // if (!this.countTasks) {
    a.progressIndicator.finish();
    //     setTimeout(() => a.progressIndicator.clear(), 500);
    // }
    return this;
  }
}
