<template>
  <el-container width="100%">
    <el-header></el-header>
    <el-foooter style="padding:4px;">
      <div style="height:100%" id="app">
            <p>{{messa}}</p>
            <span>
                <a herf="file:///C:\Users\Administrator\Desktop\地震项目资料/GISINFO：上海市地震应急信息智慧服务平台 建设方案（最终版）.pdf"></a> 
            </span>  
      </div>
    </el-foooter>
  </el-container>
</template>
<script>
import request from '@/utils/request'
export default {
  el: '#app',
    data(){
        return{
            isLoad:false,
            messa:"产品文件"
        }
    },
    created(){
       request({url:'/getByFeatId',method:'post',data:{featId:this.featId}}).then(res =>{
            let data=res.data.result;
            this.dataOfBasicInfo=data;
       });
    }
}
</script>