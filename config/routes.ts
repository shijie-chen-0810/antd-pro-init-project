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
    path: '/home',
    component: './Home',
  },
  {
    name: '表格页',
    path: '/table',
    component: './TableList',
    stillness: true,
  },
  {
    name: '图片编辑器',
    path: '/imageEdit',
    component: './ImageEdit/index',
  },
  {
    path: '/imageEdit/crop',
    component: './ImageEdit/components/CropImage',
  },
  {
    path: '/imageEdit/watermaker',
    component: './ImageEdit/components/WatermakerImage',
  },
  {
    path: '/imageEdit/editImageWithKonva',
    component: './ImageEdit/components/EditImageWithKonva',
  },
  {
    path: '/imageEdit/makeWarReport',
    component: './ImageEdit/components/MakeWarReport',
  },
  {
    path: '/imageEdit/makeWarReportTwo',
    component: './ImageEdit/components/MakeWarReportTwo',
  },
  {
    path: '/imageEdit/dragDropWarReport',
    component: './ImageEdit/components/DragDropWarReport',
    layout: false,
  },
  {
    name: '案例库',
    path: '/smallDemo',
    component: './SmallDemo',
  },
  // {
  //   name: '富文本编辑器',
  //   path: '/textEditor',
  //   component: './TextEditor',
  // },
  // {
  //   name: 'Quill富文本编辑器',
  //   path: '/quillTextEditor',
  //   component: './QuillTextEditor',
  // },
  {
    name: '合并单元格表格',
    path: '/MergeCellTable',
    component: './MergeCellTable',
  },
  {
    component: './404',
  },
];
