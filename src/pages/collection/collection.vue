<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="border d-flex mx-3 a-center j-sb px-3 mt-1"
			style="height: 80rpx;border-radius: 50rpx;border-color: #A0CCE9;border-width:3rpx;">
			<input v-model="searchCatPreviewsReq.keyword" maxlength="20" placeholder="搜索猫咪" />
			<image style="width: 60rpx;" mode="widthFix" src="/static/images/search.png" @click="onClickSearch" />
		</view>
		<!-- 校区选择框   -->
		<view class="school-box">
			<view class="school-select-box">
				<image class="arrow" src="../../static/images/location.png" />
				<view class="school-name">
					{{ school.name }}
				</view>
				<view class="switch-box">
					<button class="switch" size="mini" @click="onClickSwitch">
						⇌ 切换学校
					</button>
				</view>
			</view>
			<view class="school-select-box">
				<view class="navbar">
					<view v-for="item in school.campuses" :key="item"
						:class="'navbtn ' + (currentNavBtn === item ? 'current' : '')" @click="setBranch(item)">
						{{ item }}
					</view>
				</view>
			</view>
		</view>
		<view v-if="cats.length > 0">
			<view v-for="cat of cats" :key="cat.id" class="out">
				<view class="row" @click="onClickCatBox(cat.id)">
					<cat-box :cat="cat" />
				</view>
			</view>
		</view>
		<view v-else>
			<image src="https://static.xhpolaris.com/nodata.png" />
		</view>
	</view>
	<tab-bar id="3"></tab-bar>
</template>

<script lang="ts" setup>
	import CatBox from "@/pages/collection/cat-box";
	import {
		reactive,
		ref
	} from "vue";
	import {
		onClickCatBox
	} from "@/pages/collection/utils";
	import {
		getCatPreviews,
		searchCatPreviews
	} from "@/apis/collection/collection";
	import {
		onPullDownRefresh,
		onReachBottom
	} from "@dcloudio/uni-app";
	import {
		GetCatPreviewsReq,
		SearchCatPreviewsReq
	} from "@/apis/collection/collection-interfaces";
	import {
		CatPreview
	} from "@/apis/schemas";
	import TabBar from "@/components/tab-bar/tab-bar.vue";

	const getCatPreviewsReq = reactive < GetCatPreviewsReq > ({
		page: 0,
		communityId: "637ce159b15d9764c31f9c84"
	});
	let searchCatPreviewsReq = reactive < SearchCatPreviewsReq > ({
		communityId: "637ce159b15d9764c31f9c84",
		page: 0,
		keyword: ""
	});
	const allCats = ref < CatPreview[] > ([]);
	let cats = ref < CatPreview[] > ([]);
	let whetherSearch = false;

	const getCatPreviewsHandler = () => {
		getCatPreviews(getCatPreviewsReq).then((res) => {
			allCats.value.push(...res.cats);
			cats.value.push(...res.cats);
		});
	};
	getCatPreviewsHandler();

	function pageRefresh() {
		allCats.value = [];
		cats.value = [];
		getCatPreviewsHandler();
	}

	onPullDownRefresh(() => {
		pageRefresh();
		uni.stopPullDownRefresh();
	});

	const school = reactive({
		name: "华东师范大学",
		campuses: ["中北校区", "闵行校区", "不限"],
		No: 0
	});

	const currentNavBtn = ref("中北校区");

	function setBranch(e: string) {
		currentNavBtn.value = e;
	}

	function onClickSwitch() {
		uni.navigateTo({
			url: "/pages/community/school-select"
		});
	}

	function onClickSearch() {
		searchCatPreviews(searchCatPreviewsReq).then((res) => {
			if (res.cats.length != 0) {
				cats.value = res.cats;
				whetherSearch = true;
			} else {
				cats.value = allCats.value;
				whetherSearch = false;
			}
		});
	}

	onReachBottom(() => {
		if (!whetherSearch) {
			getCatPreviewsReq.page++;
			getCatPreviews(getCatPreviewsReq).then((res) => {
				if (res.cats.length === 0) {
					uni.stopPullDownRefresh();
				} else {
					cats.value.push(...res.cats);
				}
			});
		} else {
			searchCatPreviewsReq.page++;
			searchCatPreviews(searchCatPreviewsReq).then((res) => {
				if (res.cats.length === 0) {
					uni.stopPullDownRefresh();
				} else {
					cats.value.push(...res.cats);
				}
			});
		}
	});
</script>

<style lang="scss" scoped>
	.arrow {
		width: 44rpx;
		height: 50rpx;
		margin: 25rpx 0 30rpx 20rpx;
	}

	.content {
		background-color: #fafcff;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.switch {
		border-radius: 20px;
		margin-right: 20rpx;
		color: #1fa1ff;
		font-size: 25rpx;
		background: white;
		border: solid #1fa1ff 1px;
	}

	.navbar {
		background-color: #fafcff;
		display: flex;
		color: #b8b8b8;
		font-size: calc(15 / 390 * 100vw);
		align-items: baseline;
		width: 100vw;
		margin: 0 0 0 60rpx;
		transition-duration: 0.4s;
	}

	.navbtn {
		color: #939393;
		font-size: 20rpx;
		margin: 0 20rpx;

		&.current {
			color: #ffffff;
			background-color: #1fa1ff;
			padding: 10rpx 15rpx 10rpx 15rpx;
			border-radius: 15rpx;
			font-size: 25rpx;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
		}
	}

	.switch-box {
		margin-left: auto;
		margin-top: 20rpx;
		margin-right: 10rpx;
	}

	.school-box {
		height: 12vh;
		display: flex;
		flex-direction: column;
	}

	.school-select-box {
		background-color: #fafcff;
		height: 8vh;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	.school-name {
		margin: 20rpx 10rpx 30rpx 10rpx;
		font-weight: bold;
		border-bottom: 2px solid skyblue;
		height: 55rpx;
		font-size: 40rpx;
	}

	.swiper-box {
		width: 100vw;
	}

	.swiper {
		height: 20vh;
	}

	.swiper-item {
		display: block;
		height: 20vh;
		line-height: 15vh;
		text-align: center;
	}

	.out {
		padding: 5rpx 30rpx 5rpx;

		.row {
			background-color: #ffffff;
			border-radius: 25px;
			border: 5rpx solid #f1f1f1;
			padding: 10rpx 0;
			box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.02);
		}
	}
</style>
