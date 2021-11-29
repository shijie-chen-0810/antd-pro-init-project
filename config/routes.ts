export default [
  {
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    icon: 'home',
    path: '/home',
    component: './Home',
  },
  {
    name: '表格页',
    icon: 'table',
    path: '/table',
    component: './TableList',
  },
  {
    name: '图片编辑器',
    icon: 'highlight',
    path: '/imageEdit',
    component: './ImageEdit/index',
  },
  {
    path: '/imageEdit/crop',
    component: './ImageEdit/components/CropImage',
  },
  {
    component: './404',
  },
];
