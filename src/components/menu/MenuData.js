export default [
  {
    path: '/',
    title: '首页',
    icon: 'el-icon-eleme'
  },
  {
    path: '/about',
    title: '示例',
    icon: 'el-icon-eleme',
    children: [
      {
        path: '/menu',
        title: '菜单',
        icon: 'el-icon-eleme',
        children: [
          {
            path: '/menu1',
            title: '菜单',
            icon: 'el-icon-eleme',
            children: [
              {
                path: '/menu3',
                title: '菜单',
                icon: 'el-icon-eleme'
              },
              {
                path: '/menu4',
                title: '菜单',
                icon: 'el-icon-eleme'
              }
            ]
          },
          {
            path: '/menu2',
            title: '菜单',
            icon: 'el-icon-eleme'
          }
        ]
      }
    ]
  }
];
