<script>
// 创建 el-menu-item
function elMenuItem (h, menu) {
    return h('el-menu-item', { key: menu.path, props: { index: menu.path } }, [
        ...menu.icon ? [
            h('i', { attrs: { class: `${menu.icon}` } })
        ] : [],
        h('span', { slot: 'title' }, menu.title || '未命名菜单')
    ])
}

// 创建 el-submenu
function elSubmenu (h, menu) {
    return h('el-submenu', { key: menu.path, props: { index: menu.path } }, [
        ...menu.icon ? [
            h('i', { slot: 'title', attrs: { class: `${menu.icon}` } })
        ] : [],
        h('span', { slot: 'title' }, menu.title || '未命名菜单'),
        // eslint-disable-next-line max-len
        ...menu.children.map((child) => (child.children === undefined ? elMenuItem : elSubmenu).call(this, h, child))
    ])
}

export default {
    render (h) {
        console.log('>>> render', Object.entries(this), this._self, this.target)
        return h('el-menu', {
            props: { mode: 'horizontal', defaultActive: this.active },
            on: { select: this.handleMenuSelect }
            // eslint-disable-next-line max-len
        }, this.menuData.map((menu) => (menu.children === undefined ? elMenuItem : elSubmenu).call(this, h, menu)))
    },
    props: {
        menuData: {},
        active: {},
        handleMenuSelect: {}
    }
}
</script>
