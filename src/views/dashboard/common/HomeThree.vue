<template>
  <div id="HomeThree">
    <div class="heardTitle">
      <span>
        <i></i>
        {{ time }}
      </span>
      建议启动
      <b>{{ rank }}</b>
      级地震应急响应
    </div>
    <!-- <div class="boxLeft">
      <p>受伤人数(人)</p>
      <h3>
        <span>{{ injured[0] }}</span>
        <span>{{ injured[1] }}</span>
        ,
        <span>{{ injured[2] }}</span>
        <span>{{ injured[3] }}</span>
        <span>{{ injured[4] }}</span>
      </h3>
      <p>紧急安置(万人)</p>
      <h3>
        <span>{{ arrange[0] }}</span>
        <span>{{ arrange[1] }}</span>
      </h3>
    </div> -->
    <div style="width:100%;height:96%">
      <el-aside v-show="showMap" style="width:100%;height:100%;overflow: hidden;">
        <iframe
          id="mapFrameOne"
          name="mapFrameOne"
          src="http://192.168.0.46:8080/gmapServer/map/map.html?appKey=5b678ecf8ede4fb2902df303954c3d7c"
          style="border: 0;height:100%;width:100%"
        />
      </el-aside>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data() {
    return {
      time: "2018-10-29",
      rank: "Ⅱ",
      featId:this.$route.query.featId,
      // injured: "20261",
      // arrange: "23"
    };
  },
  components: {},
  methods: {
    lyPush(){
			this.$router.push({
				path: '/home/dashboard',
			});
		},
		commonPart() {
			var param = { featid: this.featId };
			request({ url: '/getTEarthquakeId', method: 'post', data: param }).then(res => {
				let data = res.data.result;
        this.time = data.list["0"].earthquakeTime;
        this.rank = data.list["0"].emergencyLevel;
			});
		}
  },
  mounted() {},
  computed: {
    showMap() {
      return this.$store.state.app.showMap;
    }
  },
  created() {
		this.lyPush();
		this.commonPart();
	}
};
</script>

<style lang="scss" scoped="scoped">
#HomeThree {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: right;
  position: relative;
  .heardTitle {
    width: 100%;
    height: 35px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
    font-size: 15px;
    span {
      color: #2dd8f2;
      font-size: 18px;
      margin: 0 5px;
      i {
        width: 15px;
        height: 15px;
        margin: 0 5px;
        display: inline-block;
        vertical-align: initial;
        background-image: url(../../../assets/home/icon_time.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
    b {
      font-size: 16px;
      color: #e73543;
      margin: 0 5px;
    }
  }
  .boxLeft {
    position: absolute;
    top: 10%;
    left: 5%;
    color: #ffffff;
    p {
      padding-left: 5px;
    }
    h3 {
      color: #2dd8f2;
      margin: 10px 0;
      span {
        width: 40px;
        height: 45px;
        display: inline-block;
        line-height: 45px;
        text-align: center;
        font-size: 23px;
        font-weight: bold;
        background-image: url(../../../assets/home/smallbox.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
  }
}

@media screen and (max-width: 1700px) and (min-width: 1500px) {
  .boxLeft {
    p {
      font-size: 17px;
    }
    h3 {
      span {
        width: 50px !important;
        height: 55px !important;
        line-height: 55px !important;
        font-size: 25px !important;
        background-size: 70% 100% !important;
      }
    }
  }
}
@media screen and (max-width: 1980px) and (min-width: 1701px) {
  .heardTitle {
    height: 40px !important;
    line-height: 30px !important;
    font-size: 20px !important;
    span {
      font-size: 20px !important;
      margin: 0 5px;
      i {
        width: 20px !important;
        height: 20px !important;
      }
    }
    b {
      font-size: 20px !important;
    }
  }
  .boxLeft {
    p {
      font-size: 18px;
    }
    h3 {
      span {
        width: 50px !important;
        height: 60px !important;
        line-height: 60px !important;
        font-size: 30px !important;
        background-size: 70% 100% !important;
      }
    }
  }
}
</style>
