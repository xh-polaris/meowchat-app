<template>
  <template v-if="postsData">
    <template v-for="post in postsData" :key="post.id">
      <view class="post" @click="onClickPost(post.id)">
        <view class="upper">
          <view :class="'main ' + (post.coverUrl ? 'hasImage' : '')">
            <view class="title">
              {{ post.title }}
            </view>
            <view class="user-info">
              <view v-if="!post.isAnonymous">
                <image :src="post.user.avatarUrl" class="avatar" />
                <view class="username">
                  {{ post.user.nickname }}
                </view>
              </view>
			  <view v-else>
				  <image src="/static/images/anonymous.png" class="avatar" />
				  <view class="username">
				    匿名用户
				  </view>
			  </view>
            </view>
            <view class="description">
              {{ post.text }}
            </view>
            <view v-if="post.tags" class="tags">
              <template v-if="post.tags.length > 4">
                <view class="tag">
                  {{ post.tags[0] }}
                </view>
                <view class="tag">
                  {{ post.tags[1] }}
                </view>
                <view class="tag">
                  {{ post.tags[2] }}
                </view>
              </template>
              <template v-else>
                <template v-for="tag in post.tags" :key="tag.id">
                  <view class="tag">
                    {{ tag }}
                  </view>
                </template>
              </template>
            </view>
          </view>
          <view
            v-if="post.coverUrl"
            :style="{ backgroundImage: 'url(' + post.coverUrl + ')' }"
            class="image"
          />
        </view>
        <view class="lower">
          <view class="time font-sm">
            {{ displayTime(post.createAt) }}
          </view>
          <view class="font-sm">{{ post.comments }}条回复</view>
        </view>
      </view>
    </template>
    <view v-if="postsData.length === 0">
      <image src="https://static.xhpolaris.com/nodata.png" />
    </view>
  </template>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { getPostPreviews, searchPostPreviews } from "@/apis/post/post";
import { onReachBottom} from "@dcloudio/uni-app";
import { displayTime } from "@/utils/time";
import { onClickPost } from "./utils";

interface Props {
  search?: string;
  keyword?: string;
}
const props = withDefaults(defineProps<Props>(), {
  search: "default",
  keyword: "post"
});


let postsData = reactive([]);
let page = 0;
const getPostPreviewsAsync = async () => {
  let posts = [];
  if (props.search === "default") {
    posts = (
      await getPostPreviews({
        page: page
      })
    ).posts;
  } else if (props.search === "post") {
    posts = (
      await searchPostPreviews({
        page: page,
        keyword: props.keyword
      })
    ).posts;
  }
  page++;
  return posts;
};

async function createPostsDataBatch() {
  const posts = await getPostPreviewsAsync();
  postsData.push(...posts);
}

createPostsDataBatch();

onReachBottom(() => {
  createPostsDataBatch();
});
</script>

<style lang="scss" scoped>
@import "@/common/user-info.scss";

.post {
  background-color: #ffffff;
  //border-top: 2px #f4f9ff solid;
  border-bottom: 15rpx #fafcff solid;
  padding: 32rpx;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.03);
  border-radius: 5px;
}

.upper {
  display: flex;
  align-items: center;
}

.main {
  color: #353535;

  &.hasImage {
    width: calc(251 / 390 * 100vw);
  }

  .title {
    font-size: 35rpx;
    font-weight: bold;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .description {
    font-size: calc(12 / 390 * 100vw);
    line-height: calc(17 / 390 * 100vw);
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    color: #1fa1ff;
    font-size: calc(10 / 390 * 100vw);
    //height: calc(18 / 390 * 100vw);
    //line-height: calc(18 / 390 * 100vw);
    padding-top: 10rpx;

    .tag {
      margin-top: calc(4 / 390 * 100vw);
      font-style: normal;
      font-weight: bold;
      font-size: calc(10 / 390 * 100vw);
      line-height: calc(17 / 390 * 100vw);
      box-sizing: border-box;
      /* or 170% */
      text-align: center;
      letter-spacing: calc(0.5 / 390 * 100vw);
      /* blue02 */
      color: #1fa1ff;

      min-width: calc(28 / 390 * 100vw);
      height: calc(20 / 390 * 100vw);
      padding: calc(0 / 390 * 100vw) calc(8 / 390 * 100vw);
      border: #1fa1ff calc(1 / 390 * 100vw) solid;
      border-radius: calc(10 / 390 * 100vw);
      margin-right: calc(8 / 390 * 100vw);
    }
  }
}

.image {
  width: calc(142 / 390 * 100vw);
  height: calc(93 / 390 * 100vw);
  border-radius: calc(6 / 390 * 100vw);
  margin-left: calc(16 / 390 * 100vw);
  background-size: cover;
  background-position: center;

  //text-align: center;
  //line-height: calc(93 / 390 * 100vw);
}

.lower {
  margin-top: calc(12 / 390 * 100vw);
  display: flex;
  align-items: baseline;
  color: #b8b8b8;
  font-size: calc(10 / 390 * 100vw);

  .time {
    margin-right: calc(16 / 390 * 100vw);
  }
}
</style>
