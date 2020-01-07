<template>
  <div>
    <el-button   type="text" size="small">查看</el-button>
    <el-button type="text" size="small" @click="editPerson(data)">编辑</el-button>
  </div>
</template>

<script>
export default {
  name: "OperatorRender",
  inject:['bus'],
  props: {
    data: Object,
    required: () => true
  },
  methods: {
      editPerson(data){
          this.bus.$emit('edit-person', data)
      }
  },
};
</script>
