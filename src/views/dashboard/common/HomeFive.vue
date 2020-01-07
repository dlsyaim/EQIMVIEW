<template>
	<div id="HomeFive">
		<h3>{{ Title }}</h3>
		<div class="rlt"></div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			Title: '热力图'
		};
	},
	components: {},
	methods: {},
	mounted() {}
};
</script>
<style lang="scss" scoped="scoped">
#HomeFive .rlt {
	width: 90%;
	height: 75%;
	margin: 0 auto;
	background-image: url(../../../assets/home/rlt.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center;
}
</style>
