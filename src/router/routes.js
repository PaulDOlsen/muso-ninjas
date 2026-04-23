import { auth } from 'src/boot/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const requireAuth = async (to, from, next) => {
  // Wait for auth state to be determined before checking
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) {
        next()
      } else {
        next({ name: 'login' })
      }
      resolve()
    })
  })
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/HomePage.vue'),
        beforeEnter: requireAuth,
      },
      { path: '/login', name: 'login', component: () => import('pages/auth/LoginPage.vue') },
      { path: '/signup', name: 'signup', component: () => import('pages/auth/SignupPage.vue') },
      {
        path: '/playlists/create',
        name: 'create-playlist',
        component: () => import('pages/playlists/CreatePlaylist.vue'),
        beforeEnter: requireAuth,
      },
      {
        path: '/playlists/:id',
        name: 'playlist-details',
        component: () => import('pages/playlists/PlaylistDetails.vue'),
        beforeEnter: requireAuth,
        props: true,
      },
      {
        path: '/playlists/user',
        name: 'user-playlists',
        component: () => import('pages/playlists/UserPlaylists.vue'),
        beforeEnter: requireAuth,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
