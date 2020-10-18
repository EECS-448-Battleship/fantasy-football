class Router {
    route_args = undefined
    subscribers = []
    history = []

    get base_path() {
        return APP_BASE_PATH
    }

    navigate(path, args) {
        this.route_args = args
        this.history.push({path, args})
        window.history.pushState({}, path, this.build_url(path))
        this.subscribers.forEach(sub => sub(path, args))
    }

    back() {
        window.history.back()
        if ( this.history.length < 2 ) return;
        this.history.pop()
        const { path, args } = this.history[this.history.length - 1]
        this.subscribers.forEach(sub => sub(path, args))
    }

    subscribe(handler) {
        if ( !this.subscribers.includes(handler) ) {
            this.subscribers.push(handler)
        }

        return {
            unsubscribe: () => {
                this.subscribers = this.subscribers.filter(handler)
            }
        }
    }

    build_url(...parts) {
        parts = [this.base_path, ...parts].map(part => {
            if ( part.endsWith('/') ) part = part.slice(0, -1)
            if ( part.startsWith('/') ) part = part.slice(1)
            return part
        })

        return parts.join('/')
    }
}

const router = new Router()
export { router }
