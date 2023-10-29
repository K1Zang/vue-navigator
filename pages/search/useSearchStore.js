const SMALL_SCREEN_WIDTH = 800;

const filters = {
  tags: [],
  // window: computed(() => useWindow("filters").disableTransition()),
};

const sorts = {
  // window: computed(() => useWindow("sorts").disableTransition()),
};

export const useSearchStore = defineStore("search", {
  state: () => ({
    isTyping: false,
    value: null,
    window: useWindow("search").onBodyMounted((w) =>
      w.addBodyClassList(["flex", "flex-col-reverse"]).disableTransition()
    ),
    history: useStorage("search_history", []),

    filters: JSON.parse(JSON.stringify(filters)),
    sorts: JSON.parse(JSON.stringify(sorts)),

    result: {
      hashtags: [],
      shops: [],
    },
  }),

  actions: {
    for() {
      if (this.inputNotEmpty) {
        this.window.show();
        request(this.value);
      }
    },

    rawStartTyping() {
      this.isTyping = true;
      if (this.hasSomethingToShow) this.window.show();
      if (window.outerWidth < SMALL_SCREEN_WIDTH) useBarStore().hide();
      return this;
    },

    rawDoneTyping() {
      this.isTyping = false;
      // this.value = "";
      if (window.outerWidth < SMALL_SCREEN_WIDTH) useBarStore().show();
      return this;
    },

    addTag(t) {
      this.removeTag(t).filters.tags.unshift(t);
      return this;
    },

    removeTag(t) {
      this.filters.tags = this.filters.tags.filter((tag) => tag !== t);
      return this;
    },

    resetFilters() {
      for (const key in filters) this.filters[key] = filters[key];
      return this;
    },

    addInputValueToHistory() {
      if (this.inputNotEmpty) this.history.push(this.value);
      this.rawDoneTyping().window.hide();
    },

    setResult(value) {
      this.result = value;
      return this;
    },
  },

  getters: {
    inputNotEmpty: (s) => typeof s.value === "string" && s.value.length > 0,
    hasFilter: (s) => Boolean(s.filters.tags.length),
    hasResultToShow: (s) =>
      Boolean(s.result.hashtags.length || s.result.shops.length),
    hasSomethingToShow: (s) =>
      Boolean(s.hasResourcesToShow || s.history.length),
  },
});

const request = debounce(async (value) =>
  new Request("/search")
    .silently()
    .query({ search: value })
    .get()
    // .then((result) => useSearchStore().setResult(result))
    .then((result) => useSearchStore().setResult(result).window.refreshHeight())
);
