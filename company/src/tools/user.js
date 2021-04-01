function Singleton () {
    this.data = null
}

Singleton.getInstance = (function () {
    var instance
    return function () {
        instance = instance ? instance : new Singleton
        return instance
    }
})()

export function userManager () {
    return Singleton.getInstance()
}
