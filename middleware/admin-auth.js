export default function({ store, redirect }) {
  if (!store.getters['auth/isLogged']) {
    redirect('/admin/login?message=login')
  }
}
