<template>
	<general-status-bar title="申请领养" back-icon="true" />
	<web-view :webview-styles="webviewStyles" src="https://www.wjx.cn/vj/mBnSgB8.aspx "></web-view>
</template>

<script>
import GeneralStatusBar from "@/pages/tabbar/general_status_bar";

export default {
	data() {
		return {
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		}
	}
}
</script>

<style>

</style>