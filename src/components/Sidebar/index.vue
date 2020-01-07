
<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            mode="vertical"
        >
            <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
        </el-menu>
    </el-scrollbar>
</template>

<script>
 
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
    components:{SidebarItem  },
    data() {
        return {
            
        }
    },
    computed: {
    ...mapGetters([
      'sidebar',
      'realname',
      'permission_routers'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss" scoped>
.header-describ{
    float: left;
    height: 20px !important;
    width: 120px;
    font-size: 3px;
}
.hamburger-container{
    float: right;
}
.el-header{
    height: 20px !important;
    border: 1px;
    background: #f4f4f5;
}
.el-main{
    padding: 0px!important;
}
.el-scrollbar{
    height: 100%;
}

</style>
<style lang="scss">
    
    div#app .sidebar-container ul.el-menu
    {
        background: #2e323d !important;
        color: #fff !important;
    }

    div#app .sidebar-container .el-menu-item.is-active
    {
        background-color: #29a7e1 !important;
    }
    div#app .sidebar-container .submenu-title-noDropdown.is-active:hover, div#app .sidebar-container .el-submenu__title.is-active:hover
    {
        background-color: #29a7e1 !important;
    }

    div#app .sidebar-container .submenu-title-noDropdown:hover, div#app .sidebar-container .el-submenu__title:hover
    {
        background-color: #4a4e5a !important;
    }

    div#app .el-menu-item, div#app .el-submenu__title{
        background: #2e323d !important;
        color: #fff !important;
    }
    div#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title, div#app .sidebar-container .el-submenu .el-menu-item
    {
        color: #fff !important;
        background: #2e323d !important;
    }
    div#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title:hover, div#app .sidebar-container .el-submenu .el-menu-item:hover
    {
        background-color: #4a4e5a !important;
    }

    div#app .sidebar-container .el-submenu .el-menu-item.is-active
    {
        background-color: #29a7e1 !important;
    }
    div#app .sidebar-container .el-submenu .el-menu-item.is-active:hover
    {
        background-color: #29a7e1 !important;
    }
    .sidebar-container .el-submenu .el-menu-item span,.sidebar-container .el-submenu__title span,.sidebar-container .el-menu-item span
    {
        font-size: 14px;
    }
    .sidebar-container .svg-icon
    {
        width: 1.5em !important;
        height: 1.5em !important;
        vertical-align: -0.45em !important;
    }
    div#app .sidebar-container a
    {
        display: block;
    }
    .sidebar-container .el-menu-item,.sidebar-container .el-submenu__title
    {
        height: 42px;
        line-height: 42px;
    }
</style>