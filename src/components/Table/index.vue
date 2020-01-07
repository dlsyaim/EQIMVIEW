<template>
  <el-table
    style="margin-left: 2px;   margin-right: 3px;"
    :height="height"
    :data="data"
    v-bind="options"
    v-loading="listLoading"
    @selection-change="$emit('selection-change', $event)"
  >
    <template v-for="(column , index ) in columns">
      <el-table-column v-bind="column" :key="index" v-if="column.render!=null">
          <template slot-scope="scope" >
            <component :is="column.render.name" :data="scope"/>
          </template>
      </el-table-column>
      <el-table-column v-bind="column" :key="index" v-else>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    height: Number,
    columns: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    data: Array,
    listLoading: Boolean
  },
  beforeCreate: function() {
    const _self = this;
    _self.$options.propsData.columns.forEach(column => {
      var component = column.render;
      if (component && !_self.$options.components[component.name]) {
        _self.$options.components[component.name] = component;
      }
    });
  }
};
</script>
<style scope>
.pagination-container[data-v-72233bcd] {
  padding: 16px 16px !important;
}
</style>