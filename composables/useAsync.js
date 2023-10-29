import Loading from "~/components/Async/AsyncLoading.vue";
import AsyncError from "~/components/Async/AsyncError.vue";

export default function (uri) {
  //   if (uri[0] !== "/") uri = `/${useRoute().name}/${uri}`;

  const Component = shallowRef(
    defineAsyncComponent({
      loader: () => loading(),

      loadingComponent: Loading,
      delay: 200,
      errorComponent: AsyncError,
      timeout: 3000,
    })
  );

  function loading() {
    const pathSegments = uri.replace(/^\/|\/$/g, "").split("/");

    let task = new Task(`async loading component: ${uri}`);

    return new Promise((resolve, reject) => {
      import(`../pages/${pathSegments[0]}/${pathSegments[1]}.vue`)
        .then((Module) => {
          Module.default.name = uri;
          Component.value = Module.default;
          resolve(Module.default);
        })
        .catch((error) => task.fail(error))
        .finally(() => task.done());
    });
  }

  return { uri, Component };
}
