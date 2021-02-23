export default [
  {
    path: '/goto-emoji/:emojiCode',
    name: 'goto-emoji',
    // meta: {
    //   requiresAuth: false
    // },
    component: () =>
      import(/* webpackChunkName: "landing" */ '@/components/Landing.vue')
  }
]
