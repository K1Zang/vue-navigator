export default defineComponent({
    name: "TheProgressIndicator",
    props: {
        height: {
            type: Number,
            default: 2
        },
        color: {
            type: String,
            default: "#0284c7"
            // default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
        }
    },

    setup(props, {slots}) {
        const indicator = app().progressIndicator;
        const nuxtApp = useNuxtApp();

        nuxtApp.hook("page:start", indicator.start);
        nuxtApp.hook("page:finish", indicator.finish);

        onBeforeUnmount(() => indicator.clear);

        return () => h("div", {
            class: "nuxt-loading-indicator",
            style: {
                position: "fixed",
                top: 0,
                right: 0,
                left: 0,
                pointerEvents: "none",
                width: `${indicator.progress.value}%`,
                height: `${props.height}px`,
                opacity: indicator.isShow.value ? 1 : 0,
                background: props.color,
                backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
                transition: "width 0.1s, height 0.4s, opacity 0.4s",
                zIndex: 999999
            }
        }, slots);
    }
});