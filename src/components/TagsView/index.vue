<template>
  <div class="tags-view-container">
    <hamburger  :toggle-click="toggleSideBar" :is-active="sidebar.opened"  class="hamburger-container"/>
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <template  v-for="tag in visitedViews">
        <router-link
          v-if="tag.meta.map=='full'?false:true"
          ref="tag"
          :class="isActive(tag)?'active':''"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          :key="tag.path"
          tag="span"
          class="tags-view-item"
          @click.middle.native="closeSelectedTag(tag)"
          @contextmenu.prevent.native="openMenu(tag,$event)">
          {{ generateTitle(tag.title) }}
          <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
        </router-link>
      </template>
    </scroll-pane>
    <map-button></map-button>   
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane'
import { generateTitle } from '@/utils'
import Hamburger from '@/components/Hamburger'
import MapButton from '@/components/MapButton'
export default {
  components: { ScrollPane,Hamburger ,MapButton},
  data() {
    return {
      visible: true,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    sidebar(){
        return this.$store.getters.sidebar
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    toggleSideBar() {
      const store = this.$store;
      this.$store.dispatch('toggleSideBar').then(function(){
        Object.keys(store.state.app.chartListener).forEach((key) => {
          store.state.app.chartListener[key].resize();
        });
      });
    },
    generateTitle, 
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }

            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left 
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - menuMinWidth 
      const left = e.clientX - offsetLeft + 15 

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY

      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .hamburger-container{
    width: 25px;
    float: left;
    text-align: center;
    vertical-align: middle;
    height: 34px;
  }
  .scroll-container {
    width: calc(100% - 46px);
    float: left;
  }
.tags-view-container {
  height: 34px;
  width: calc(100% - 20px);
  background: #fff;
  padding: 0 10px;
  // border-bottom: 5px solid #eee;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &:hover
      {
        background-color: #409EFF;
        border-color: #409EFF;
        transition: 0.3s ease-in;
        color: #fff;
      }
      &.active {
        background-color: #29a7e1;
        color: #fff;
        border-color: #29a7e1;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
      }
    }
  }
}
</style>
