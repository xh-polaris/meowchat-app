<template>
  <template v-if="postsData">
    <template v-for="post in postsData" :key="post.id">
      <view class="pb-1 first">
        <view class="post" @click="onClickPost(post.id)">
          <view v-if="post.isOfficial" class="official-mark" />
          <view class="upper">
            <view :class="'main ' + (post.coverUrl ? 'hasImage' : '')">
              <view class="title">
                {{ post.title }}
              </view>
              <view class="user-info">
                <template v-if="post.user">
                  <image
                    v-if="post.user.avatarUrl"
                    :src="getThumbnail(post.user.avatarUrl)"
                    class="avatar"
                  />
                  <view
                    :class="post.isOfficial ? 'username-official' : 'username'"
                  >
                    {{ post.user?.nickname }}
                  </view>
                </template>
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
              <view class="lower">
                <view class="time font-sm">
                  {{ displayTime(post.createAt) }}
                </view>
                <view v-if="post.comments" class="font-sm"
                  >{{ post.comments }}条回复</view
                >
              </view>
            </view>
            <image
              v-if="post.coverUrl"
              :src="getThumbnail(post.coverUrl)"
              class="image"
              mode="aspectFill"
              @click.stop="onClickCover(post.coverUrl)"
            />
          </view>
        </view>
      </view>
    </template>
    <view v-if="postsData.length === 0" class="no-cat-here-frame">
      <image :src="Pictures.NoCatHere" class="no-cat-here" />
    </view>
  </template>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { getPostPreviews } from "@/apis/post/post";
import { onReachBottom } from "@dcloudio/uni-app";
import { displayTime } from "@/utils/time";
import { Pictures } from "@/utils/url";
import { onClickCover, onClickPost } from "./utils";
import { Post } from "@/apis/schemas";
import { getPrefetchData, PrefetchResp } from "@/apis/prefetch";
import { getThumbnail } from "@/utils/utils";

interface Props {
  keyword?: string;
  onlyOfficial?: boolean;
}

const props = defineProps<Props>();

let postsData = reactive<Post[]>([]);
let token: string;
const fetch = async () => {
  const res = await getPostPreviews({
    paginationOption: {
      lastToken: token
    },
    onlyOfficial: props.onlyOfficial,
    searchOptions: props.keyword
      ? {
          key: props.keyword
        }
      : undefined
  });
  token = res.token;
  return res.posts;
};

const getPostPreviewsAsync = async () => {
  if (token || props.keyword || props.onlyOfficial) {
    return fetch();
  }
  let res: PrefetchResp;
  try {
    res = await getPrefetchData();
  } catch (reason) {
    return fetch();
  }
  if (!res?.firstPostPreviewsResp?.posts) {
    return fetch();
  }
  token = res.firstPostPreviewsResp.token;
  const posts = res.firstPostPreviewsResp.posts;
  res.firstPostPreviewsResp = undefined;
  return posts;
};

async function createPostsDataBatch() {
  const posts = await getPostPreviewsAsync();
  postsData.push(...posts);
}

createPostsDataBatch();

onReachBottom(() => {
  void createPostsDataBatch();
});
</script>

<style lang="scss" scoped>
@import "@/common/user-info.scss";
@import "@/common/icon.scss";

.first {
  background-color: #fafcff;
}

.post {
  background-color: #ffffff;
  border-top: 2px #f4f5f6 solid;
  border-bottom: 2px #f4f5f6 solid;
  padding: 32rpx;
  position: relative;
}

.official-mark {
  width: 220upx;
  height: 58upx;
  background-image: $official-mark;
  background-size: 100% 100%;
  position: absolute;
  right: 20upx;
  top: 20upx;
}

.upper {
  display: flex;
  //align-items: center;
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
    padding-top: 15rpx;

    .tag {
      margin-top: calc(4 / 390 * 100vw);
      font-style: normal;
      font-weight: bold;
      font-size: calc(10 / 390 * 100vw);
      box-sizing: border-box;
      /* or 170% */
      text-align: center;
      letter-spacing: calc(0.5 / 390 * 100vw);
      /* blue02 */
      color: #1fa1ff;

      min-width: calc(28 / 390 * 100vw);
      height: calc(16 / 390 * 100vw);
      padding-left: calc(6 / 390 * 100vw);
      padding-right: calc(6 / 390 * 100vw);
      border: #1fa1ff calc(1 / 390 * 100vw) solid;
      border-radius: calc(10 / 390 * 100vw);
      margin-right: calc(8 / 390 * 100vw);
    }
  }
}

.image {
  width: 280upx;
  height: 200upx;
  border-radius: calc(6 / 390 * 100vw);
  margin-left: calc(16 / 390 * 100vw);
  margin-top: 60upx;
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

.no-cat-here-frame {
  width: 100vw;
  margin-top: 20vh;
  display: flex;
  justify-content: center;

  .no-cat-here {
    width: 400upx;
    height: 222upx;
  }
}
</style>
