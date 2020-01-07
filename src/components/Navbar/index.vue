<template>
  <div class="navbar">
    <div class="logo"></div>
    <div v-show="mapCol == 24" class="map-but">
      <hamburger
        :toggle-click="toggleSideBar"
        :is-active="sidebar.opened"
        class="hamburger-container"
      />
      <map-button></map-button>
    </div>
    <div class="right-menu">

      <!-- <el-dropdown trigger="click" class="avatar-container right-menu-item"  @command="changLang">
        <div class="right-menus" style="width: 20px;padding-left: 0px;"> 
          <svg-icon style="height: 50px;width: 20px"  icon-class="yuyan" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="language==='zh'" command="zh">{{ $t('lang.chinese') }}</el-dropdown-item>
          <el-dropdown-item :disabled="language==='en'" command="en">{{ $t('lang.english') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->

      <!-- <el-badge class="item" :value="dot_value" :hidden="hidden">
        <div class="right-menus icon_message">
          <a>{{ $t('navbar.message') }}</a>
        </div>
      </el-badge> -->

      <el-dropdown class="avatar-container right-menu-item" trigger="hover">
        <div class="right-menus icon_user">
          <a>{{realname}}</a>
        </div>
        <el-dropdown-menu slot="dropdown">
          
            <el-dropdown-item>
              <span style="display:block;" @click="goToHome">{{ $t('navbar.dashboard') }}</span>
            </el-dropdown-item>

          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import logo_png from "@/assets/logo.png";
import user_png from "@/assets/user.png";
import Hamburger from "@/components/Hamburger";
import MapButton from "@/components/MapButton";
import { mapGetters } from "vuex";
export default {
  components: { Hamburger, MapButton },
  data() {
    return {
      logo_png: logo_png,
      user_png: user_png
    };
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
    sidebar() {
      return this.$store.getters.sidebar;
    },
    dot_value: function() {
      return this.$store.getters.notice;
    },
    hidden: function() {
      return !this.dot_value > 0;
    },
    mapCol() {
      return this.$store.state.app.mapCol;
    },
    ...mapGetters(["sidebar", "realname"])
  },
  methods: {
    //首页
    goToHome(){
      this.$router.push({ path:"/home",name:'首页' });
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        this.$router.push({ path:"/"});
        // location.reload();

      });
    },
    changLang:function(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch("setLanguage",lang)
        //this.$router.go(0)
    },
    toggleSideBar() {
      const store = this.$store;
      this.$store.dispatch("toggleSideBar").then(function() {
        Object.keys(store.state.app.chartListener).forEach(key => {
          store.state.app.chartListener[key].resize();
        });
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .logo {
    width: 339px;
    height: 50px;
    float: left;
    background: url(../../assets/logo.png) center no-repeat;
  }
  .map-but {
    height: 100%;
    float: left;
  }
  .el-dropdown {
    padding: 0 10px;
    height: 100%;
  }

  .hamburger-container {
    line-height: 50px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 50px;
    &:focus {
      outline: none;
    }
    .el-badge {
      vertical-align: inherit;
    }

    .right-menus {
      float: left;
      padding-left: 25px;
      opacity: 0.8;
      transition: 0.3s ease-in;
      margin: 0 10px;
      height: 50px;
      position: relative;
      a {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        position: relative;
        height: 50px;
        line-height: 50px;
      }
      span {
        position: absolute;
        width: 22px;
        height: 22px;
        line-height: 22px;
        background: #ff0500;
        border-radius: 50%;
        color: #fff;
        font-size: 12px;
        text-align: center;
        top: 0;
        left: -11px;
      }
    }
    .right-menus:hover {
      opacity: 1;
    }
    .right-menus.icon_message {
      background: url(../../assets/ico_message.png) left center no-repeat;
    }
    .right-menus.icon_user {
      background: url(../../assets/ico_me.png) left center no-repeat;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss" >
.right-menu .el-badge__content.is-fixed {
  right: auto;
  left: 23px;
  top: 0;
  transform: none;
}
.right-menu .el-badge {
  cursor: pointer;
}
.right-menu .el-badge:hover .right-menus {
  opacity: 1;
}
.right-menu .el-badge__content {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 0;
  border-radius: 50%;
  padding: 0;
}
.navbar svg.hamburger {
  vertical-align: middle;
  fill: #fff;
  opacity: 0.8;
  transition: 0.3s ease-in;
  transition-property: opacity;
}
.navbar svg.hamburger:hover {
  opacity: 1;
}
.navbar .el-dropdown svg.svg-icon {
  vertical-align: middle;
  color: #fff;
  opacity: 0.8;
  transition: 0.3s ease-in;
  transition-property: opacity;
}
.navbar .el-dropdown svg.svg-icon:hover {
  opacity: 1;
}
</style>