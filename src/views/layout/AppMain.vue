<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <el-scrollbar style='height: 100%;'  >
        <keep-alive :include="cachedViews">
          <router-view :key="key"/>
        </keep-alive>
      </el-scrollbar>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data(){
    return {
      count:0
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  },
  mounted() {
    const that =this;
    this.$store.dispatch("addChartResizeListener",{
      id: "elscrollbar",
      resize:() => {  
        setTimeout(() => {
          that.count = that.count === 0?1:0;
          that.$el.style.width = "calc( 100% - "+that.count+"px )" 
        },300)
      }
    });
    setTimeout(() => {
        that.count = that.count === 0?1:0;
        that.$el.style.width = "calc( 100% - "+that.count+"px )" 
    },300)
  }
};
</script>

<style>
  .app-main .el-scrollbar__wrap{
      overflow-y: scroll!important;
      overflow-x:hidden
  }
</style>

<style  rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  /*114 = navbar + tags-view = 60 +38+20 */
  /* min-height: calc(100vh - 118px); */
  // height:  calc(100% - 35px);
  height:  calc(100% - 30px);
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-left: 0;
  padding-right: 0;
  background: #f4f4f4;
}

.el-scrollbar{
  height: 100%;
  .el-scrollbar__wrap{
    overflow-y: scroll!important;
    overflow-x:hidden
  }
}



</style>