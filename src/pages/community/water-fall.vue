<template>
  <view>
    <view class="free-WaterfallFlow">
      <view
        v-for="moment in moments"
        :key="moment.id"
        class="flex-wrap"
      >
        <image
          :src="moment.coverUrl"
          mode="widthFix"
        />
        <view>{{ moment.title }}</view>
        <view>{{ moment.createAt }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getMomentPreviews, MomentPreview } from "@/apis/community/community"
import { reactive } from "vue"

const moments = reactive<MomentPreview[]>([])
getMomentPreviews().then(res => {
  moments.push(...res.moments)
})
getMomentPreviews()
</script>

<style>
.free-WaterfallFlow {
  width: 96%;
  column-count: 2; /* 分隔的列数 */
}

.free-WaterfallFlow .flex-wrap {
  display: inline-block;
  width: 98%;
  margin-left: 3%;
  margin-bottom: 3%;
  padding: 5% 2% 2%;
  border: 0 solid #cc22b0; /* 边框 */
  border-radius: 10px;
  box-shadow: 0 2px 2px rgba(34, 25, 25, 0.4); /* 框阴影 */
}

.flex-wrap image {
  width: 95%;
  margin: 0 auto;
}

.flex-wrap view:nth-child(2) {
  font-size: 15px;
  padding: 2% 0;
  color: #717171;
}

.flex-wrap view:nth-child(3) {
  font-size: 13px;
  padding: 2% 0;
  color: #aaa;
  text-align: right;
}

</style>

