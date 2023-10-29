//configs
export const APP_NAME = "satyp";
export const APP_url = APP_NAME + ".com";
export const LANDING_PAGE = "/";
export const STRIP_HEIGHT_REM = 3; //rem
export const DEFAULT_LOCALE = "en";
export const PUBLIC_ROUTES = [
  LANDING_PAGE,
  "/sessions/create",
  "/posts/:id",
  "/shops/:unique_name",
  "/:unique_name",
  "/hashtags/:tag",
];

export default () => {
  // if (process.server) return;

  // function env(key, fallback) {
  //   return useRuntimeConfig().public?.envVars[key] ?? fallback;
  // }

  const app = defineStore("app", {
    state: () => ({
      isAuth: false,
      locale: DEFAULT_LOCALE,
      currentNavigatorId: null,

      config: {},

      socket: markRaw(instantiateSocket()),

      resources: [],

      // REQUESTING
      tasks: [],
      exceptions: [],
      validations: [],
      queues: [],

      // NAVIGATION
      navigators: [],
      explorers: [],
      windows: [],

      // INTERACTION
      notices: [],
      editors: [],

      hasBooted: false,
      hasLoaded: false,
    }),

    actions: {
      async boot() {
        this.task = new Task("booting");

        const starterPackages = await new Request("/boot").get();

        this.isAuth = starterPackages.isAuth;
        this.locale = starterPackages.locale;

        this.addConfig(starterPackages["config"]).addConfig({
          fontSize: parseFloat(
            getComputedStyle(document.documentElement).fontSize
          ),
        });

        await this.booted().loadDependencies();

        // watchQueues(this);

        // if (!this.isAuth) to('/');

        return this;
      },

      async loadDependencies() {
        let stores = [useAuthStore, useWorkspaceStore];

        let storeIndexedCount = 0;

        if (this.isAuth)
          stores.forEach((store) => {
            store()
              .onBoot()
              .then(() => {
                if (++storeIndexedCount === stores.length) this.loaded();
              });
          });
        else {
          this.setLocale(DEFAULT_LOCALE);
          this.loaded();
        }
      },

      register(type, object) {
        if (!object.id) object.id = new Date().getTime() + ":" + Math.random();
        if (!this[type].find((t) => t.id === object.id))
          this[type].push(object);
        return this;
      },

      // TODO type requires for these classes since id is required for
      //  notice/task/request/navigator/explorer/window
      remove(type, object) {
        this[type] = this[type].filter((o) => o.id !== object.id);
        return this;
      },

      addConfig(config) {
        this.config = { ...config, ...this.config };
        return this;
      },

      booted() {
        this.hasBooted = true;
        return this;
      },

      loaded() {
        navigatorLunch();
        // to(LANDING_PAGE);
        this.hasLoaded = true;
        this.task.done();
        return this;
      },

      freezeBodyScroll(bool = false) {
        if (bool) document.body.style.top = `-${window.scrollY}px`;

        let wasFixed = document.body.classList.contains("fixed");

        for (let c of ["overflow-hidden", "inset-x-0", "fixed"])
          document.body.classList[bool ? "add" : "remove"](c);

        if (!bool && wasFixed)
          window.scrollTo({
            top: Math.abs(parseInt(document.body.style.top)),
          });
      },

      async setLocale(locale) {
        let mustSet = this.isAuth
          ? (await new Request("/settings").patch({ locale })).isOk
          : true;
        if (mustSet) this.locale = locale;
        return mustSet;
      },
    },

    getters: {
      progressIndicator: () => progressIndicator(),
      hasTask: (a) => Boolean(a.tasks.length),
      hasVisibleWindow: (a) => Boolean(a.windows.find((w) => w.isShow)),
    },
  })();
  return app;
};
