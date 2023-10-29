export function config() {
    if(process.server) return {...useRuntimeConfig().public}
    else return {...useRuntimeConfig().public,...app().config}
}

export function auth() {
    return useAuthStore();
}

