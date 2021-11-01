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
    component: './404',
  },
];
