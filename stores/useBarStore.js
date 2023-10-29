const disallowedRoutes = [
  // "/workspace/settings",
  "/posts/create",
  "/shops/validation",
  // "/workspace/Fund",
  // "/home/Fund",
];

const allowedRoutes = [
  "/home",
  "/workspace",
  "/posts",
  "/sessions",
  "/shops",
  "/notifications",
  "/cart",
];

export default defineStore("bar", {
  state: () => ({
    isShow: true,
  }),

  actions: {
    hide() {
      this.isShow = false;
    },

    show() {
      this.isShow = true;
    },
  },

  getters: {
    options: () =>
      [
        {
          icon: "home",
          uri: "/home",
          qualifier: () => auth().check(),
          priority: 0,
          isNavigator: true,
        },
        {
          icon: "magnifying-glass",
          uri: "/",
          qualifier: () => true,
          priority: 0,
          isNavigator: true,
        },

        {
          icon: "x",
          uri: "/orders/index",
          qualifier: () => useOrderStore().hasOrder,
          priority: 0,
          isNavigator: false,
        },
        {
          icon: "shopping-cart",
          uri: "/cart",
          qualifier: () =>
            auth().check() && useCartStore().pendingOrders.length,
          priority: 0,
          isNavigator: true,
        },

        {
          icon: "megaphone",
          uri: "/notifications",
          qualifier: () => auth().check(),
          priority: 0,
          isNavigator: true,
        },

        {
          icon: "user-circle",
          uri: "/sessions/create",
          qualifier: () => !auth().check(),
          priority: 0,
          isNavigator: true,
        },
        {
          icon: "building-storefront",
          uri: `/workspace`,
          qualifier: () => auth().check(),
          priority: 0,
          isNavigator: true,
        },
      ].filter((option) => option.qualifier()),

    mustShow: (s) => {
      let isRouteOneOfThese = false;

      allowedRoutes.forEach((r) => {
        if (useRoute().path.startsWith(r) || useRoute().path === LANDING_PAGE)
          isRouteOneOfThese = true;
      });

      disallowedRoutes.forEach((r) => {
        if (useRoute().path.startsWith(r)) isRouteOneOfThese = false;
      });

      return isRouteOneOfThese && s.isShow;
    },
  },
});
