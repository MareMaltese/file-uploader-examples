import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';
import '@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css';
import * as uploadcare from 'uploadcare';

import './assets/main.css'

import FormView from './views/FormView/FormView.vue';
import MinimalView from './views/MinimalView/MinimalView.vue';
import RegularView from './views/RegularView/RegularView.vue';
import VideoView from './views/VideoView/VideoView.vue';

import App from './App.vue';

const routes = [
  {
    path: '/',
    redirect: '/form',
  },
  {
    path: '/form',
    component: FormView,
  },
  {
    path: '/minimal',
    component: MinimalView,
  },
  {
    path: '/regular',
    component: RegularView,
  },
  {
    path: '/video',
    component: VideoView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

window.uploadcare = uploadcare;

const app = createApp(App);
app.use(router);
app.mount('#app');
