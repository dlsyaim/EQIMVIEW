<template>
	<div id="HomeSix">
		<h3>{{ Title }}</h3>
		<div class="box">
			<div class="boxAlls">
				<div class="boxLeft one"></div>
				<div class="boxright">
					<p>救援队伍(万人)</p>
					<h3>{{ wzData.rescueStaffDemand }}</h3>
				</div>
			</div>
			<div class="boxAlls">
				<div class="boxLeft two"></div>
				<div class="boxright">
					<p>医务人员(人)</p>
					<h3>{{ wzData.medicalStaffDemand }}</h3>
				</div>
			</div>
			<div class="boxAlls">
				<div class="boxLeft three"></div>
				<div class="boxright">
					<p>帐篷(万顶)</p>
					<h3>{{ wzData.tentDemand }}</h3>
				</div>
			</div>
			<div class="boxAlls">
				<div class="boxLeft four"></div>
				<div class="boxright">
					<p>应急饮水(瓶)</p>
					<h3>{{ wzData.emergencyWaterDemand }}</h3>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import request from '@/utils/request';
export default {
	inject:['reload'],
	data() {
		return {
			Title: '救援力量和物资的需求统计',
			// jydw: this.$route.query.rescueStaffDemand,
			// ywry: this.$route.query.medicalStaffDemand,
			// zpsl: this.$route.query.tentDemand,
			// yjys: this.$route.query.emergencyWaterDemand,
			wzData:{
			featId:this.$route.query.featId,
			rescueStaffDemand:'0',
			medicalStaffDemand:'0',
			tentDemand:'0',
			emergencyWaterDemand:'0'
			},		
					
		};
	},
	components: {},
	methods: {
		lyPush(){
		this.$router.push({
				path: '/home/dashboard',
		});
		},
		getAidDec(){
			var param = { earthquakeFeatId: this.wzData.featId };
			request({ url: '/getGoodsMaterials', method: 'post', data: param })
			.then(res => {
				this.wzData = res.data.result;									
		})
		
		}
	},
	mounted() {
		
	},
	created(){
		this.lyPush();
		this.$nextTick(function(){	
		this.getAidDec();
      })
	}
};
</script>
<style lang="scss" scoped="scoped">
#HomeSix {
	.box {
		width: 100%;
		height: 80%;
		.boxAlls {
			float: left;
			width: 45%;
			height: 42%;
			margin: 5px 0 10px 10px;
			background-image: url(../../../assets/home/icon_jy.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-position: center;
			.boxLeft {
				float: left;
				width: 30%;
				height: 20px;
				margin: 25px 0 15px 5px;
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;
			}
			.one {
				background-image: url(../../../assets/home/icon_person.png);
			}
			.two {
				background-image: url(../../../assets/home/icon_yiwu.png);
			}
			.three {
				background-image: url(../../../assets/home/icon_zhangp.png);
			}
			.four {
				background-image: url(../../../assets/home/icon_yinshui.png);
			}
			.boxright {
				float: right;
				width: 65%;
				color: #00c2f9;
				p {
					font-size: 12px;
					margin-top: 15px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				h3 {
					font-size: 15px;
					padding-left: 0px;
				}
			}
		}
	}
}

@media screen and (max-width: 1700px) and (min-width: 1500px) {
	#HomeSix .box .boxAlls .boxLeft {
		height: 25px;
		margin: 25px 0 15px 5px;
	}
	#HomeSix .box .boxAlls .boxright {
		p {
			font-size: 12px;
			margin-top: 15px;
		}
		h3 {
			font-size: 16px;
		}
	}
	.boxAlls {
		height: 43% !important;
		}
}
@media screen and (max-width: 1980px) and (min-width: 1701px) {
	#HomeSix .box .boxAlls .boxLeft {
		height: 30px;
		margin: 35px 0 15px 5px;
	}
	#HomeSix .box .boxAlls .boxright {
		p {
			font-size: 15px;
			margin-top: 25px;
		}
		h3 {
			font-size: 20px;
		}
	}
	.boxAlls {
		height: 45% !important;
		}
}
</style>
