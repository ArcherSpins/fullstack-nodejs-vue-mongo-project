import { createWebHistory, createRouter } from 'vue-router';
import Auth from '../pages/autorization.vue';
import Main from '../pages/main.vue';
import Profile from '../pages/profile.vue';
import Posts from '../pages/posts.vue';
import CreatePost from '../pages/createPost.vue';

// const checkUser = () => {
//   const user = localStorage.getItem('user');
//   return Boolean(user);
// }

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/create',
    name: 'CreatePost',
    component: CreatePost
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;


