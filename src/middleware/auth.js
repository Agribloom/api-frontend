export default function auth ({ next, router, to }) {
    if (localStorage.getItem('token') == null) {
        return next({
            name: 'sign-in',
            params: { nextUrl: to.fullPath }
        })
    }
    return next()
}
