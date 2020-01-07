<template>
	<div id="HomeFour">
		<h3>{{ Title }}</h3>
		<div class="select">
			<h6>时间:</h6>
			<p>
				{{ time }}上海徐汇区
				<b>{{ jibie }}</b>
				级地震
			</p>
			<h6>地震基础参数:</h6>
			<p>
				北京时间{{ time }}{{ mintime }},在上海市徐汇区天平路街道(北纬31.2度，东经121.44度) 发生
				<b>{{ jibie }}</b>
				级地震，震源深度约
				<b>{{ TenNumber }}</b>
				公里。
			</p>
			<p>
				本次地震震中位于上海市徐汇区天平路街道，极震区面积为50平方公里， 总人口约
				<b>{{ personal }}万人</b>
				，年度GDP为xx万元至xx万元，灾区总面积xxx平方公里，涉及人口xxx万人。
			</p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			Title: '地图基本信息',
			time: '2018年10月29日',
			mintime: '10:20:20',
			jibie: '5.7',
			TenNumber: '10',
			personal: '5'
		};
	},
	components: {},
	methods: {},
	mounted() {}
};
</script>
<style lang="scss" scoped="scoped">
#HomeFour {
	.select {
		width: 90%;
		height: 75%;
		overflow-y: scroll;
		color: #e8e8e8;
		padding: 0 15px;
		font-size: 0.875rem;
		p {
			line-height: 20px;
			text-align: justify;
			b {
				font-weight: normal;
				color: #f19759;
			}
		}
	}
}
.select h6 {
	font-weight: normal;
	font-size: 0.9375rem;
	line-height: 20px;
	position: relative;
}
.select h6:after {
	position: absolute;
	top: 5px;
	left: -5px;
	content: '';
	width: 2px;
	height: 9px;
	background: #fcca11;
}

/*滚动条样式*/
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
	background-color: transparent;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	border-radius: 10px;
	background-color: transparent;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #067086;
}



@media screen and (max-width: 1700px) and (min-width: 1500px) {
	.select {
		p {
			line-height: 25px !important;
			font-size: 14px !important;
		}
		h6 {
			font-size: 14px !important;
			line-height: 25px !important;
		}
	}
	.select h6:after {
		top: 8px !important;
	}
}
@media screen and (max-width: 1980px) and (min-width: 1701px) {
	.select {
		p {
			font-size: 16px !important;
			line-height: 30px !important;
		}
		h6 {
			font-size: 16px !important;
			line-height: 30px !important;
		}
	}
	.select h6:after {
		top: 9px !important;
		height: 12px !important;
	}

}
</style>
