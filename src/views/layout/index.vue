<template>
  <el-container :class="classObj">
    <el-header class="main-header">
      <navbar/>
    </el-header>
    <el-container>
      <el-aside :width="width">
        <sidebar class="sidebar-container"/>
      </el-aside>
      <el-container>
        <el-main style="height: 100%;overflow: hidden;">
          <el-row class="page-box" style="width: 100%;height: 100%;" :gutter="10">
            <el-col :span="mainWindowCol" class="page-center" style="height: 100%;">
                <el-main style="height: 100%;overflow: hidden;">
                  <tags-view/>
                  <app-main/>
                </el-main>
            </el-col>
            <el-col :span="mapCol" class="map-box" style="height: 100%;">
              <el-aside v-show="showMap" width="100%" style="overflow: hidden;height: 100%;">
                <iframe id="mapFrame" name="mapFrame" src="http://192.168.0.46:8080/gmapServer/map/map.html?appKey=161df9b3a6a946548d04b8834c9e5690" style="border: 0;height:100%;width:100%"/>
              </el-aside>
            </el-col>
              </el-row>
            </el-main>
            <el-footer class="footers">版权所有 © 2001-2019 GISINFO. All rights reserved
          <a href="http://www.gisinfo.com/">关于杰狮</a>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import TagsView from "@/components/TagsView";
import AppMain from "./AppMain";
export default {
  components: { Sidebar, Navbar, TagsView, AppMain },
  data() {
    return {};
  },
  computed: {
    showMap() {
      return this.$store.state.app.showMap;
    },
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    width: function() {
      return this.sidebar.width;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      };
    },
    mainWindowCol() {
      return 24 - this.$store.state.app.mapCol;
    },
    mapCol() {
      return this.$store.state.app.mapCol;
    }
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>

.el-main {
  padding: 0 !important;
}
.el-footer {
  text-align: center;
  line-height: 36px;
  a:hover {
    color: #29a7e1;
    transition: 0.3s ease-in;
  }
}
.page-box {
  margin: 0 !important;
}
.page-center {
  padding: 0 !important;
}
.footers {
  height: 40px !important;
  border-top: 5px solid #eee;
}
.page-box{
	position: relative;
}
.map-box {
  padding: 0 !important;
  float: initial !important;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
}
.map-box.el-col-10 {
  padding-right: 0px !important;
  padding-left: 5px !important;
  background: #eee;
}
</style>