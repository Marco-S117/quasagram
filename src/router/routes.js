
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Home', path: '', icon: 'eva-home-outline', component: () => import('pages/HomePage.vue') },
      { name: 'Create', path: '/create', icon: 'eva-camera-outline', component: () => import('pages/CreatePage.vue') },
      { name: 'Profile', path: '/profile', icon: 'eva-person-outline', component: () => import('pages/ProfilePage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
