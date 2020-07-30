export default [
  {
    path: '/',
    title: '首页',
    icon: 'el-icon-eleme'
  },
  {
    path: '/test',
    title: 'TEST',
    icon: 'el-icon-eleme'
  },
  {
    path: '/zujian',
    title: 'ZUJIAN',
    icon: 'el-icon-eleme',
    children: [
      {
        path: '/imageViewer',
        title: 'IMAGEVIERER',
        icon: 'el-icon-eleme',
      }
    ]
  },
];
