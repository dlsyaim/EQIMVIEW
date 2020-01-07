<template id="component">
        <!-- <el-row :gutter="20" style="height:950px;padding:5px;margin:0;">
            <el-col :span="6" style="height:100%;">
                <div class="grid-content bg-purple-dark" style="background-color:red;height:100%;">sfdasfasf</div>
            </el-col>
            <el-col :span="12" style="height:100%;">
                <div class="grid-content bg-purple-dark" style="background-color:yellow;height:100%;">sfdasfasf</div>
            </el-col>
            <el-col :span="6" style="height:100%;">
                <div class="grid-content bg-purple-dark" style="background-color:green;height:100%;">sfdasfasf</div>
            </el-col>
        </el-row> -->
        <!-- type="application/x-google-chrome-pdf" -->
        <iframe
    :src="url"
    width="100%"
    height="100%" />
</template>
<script>
import request from "@/utils/request";
    export default {    
    data() {
        return {
            url: '',
        };
    },      
    mounted() {
        this.url='http://192.168.1.6:8083/EQIM_Bis/doc/test.pdf';
        request({url:"/addEQinfoData",method:"post"})
    }
}
</script>