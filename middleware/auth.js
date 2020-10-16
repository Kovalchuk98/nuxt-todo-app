export default function (context) {
  if (!context.store.getters['auth/activeUser']) {
    context.redirect('/signin')
  }
}
