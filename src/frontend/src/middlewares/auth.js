export default function auth({ next, store, nextMiddleware }) {
  if (!store.state.Auth.user) {
    if (store.$jwt.getToken()) {
      store.actions.Auth.setUser();
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}