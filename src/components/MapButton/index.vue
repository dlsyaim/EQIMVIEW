<template>
    <el-dropdown trigger="hover" v-show="showMap&&!isOnlyMap" @command="handleCommand" > 
        <div>
            <svg-icon class-name="size-icon" icon-class="map" style="height: 35px;cursor: pointer;width: 20px;" />
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="close">{{ $t('map.close') }}</el-dropdown-item>
            <el-dropdown-item command="open">{{ $t('map.open') }}</el-dropdown-item>
            <el-dropdown-item command="full">{{ $t('map.full') }}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>  
</template>

<script>
export default {
    computed: {
        isOnlyMap(){
          return 'full' == this.$route.meta.map;
        },
        showMap(){
          return this.$store.state.app.showMap
        }
    },
    methods:{
        handleCommand(command){
          const store = this.$store;
          this.$store.dispatch("controlMap",command).then(function(){
            Object.keys(store.state.app.chartListener).forEach((key) => {
              store.state.app.chartListener[key].resize();
            });
          });
        }
    }
}
</script>