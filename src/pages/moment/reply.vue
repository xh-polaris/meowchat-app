<template>
  <view class="background" @touchmove.stop.prevent @click="closeSelf"></view>
  <scroll-view class="frame" scroll-y="true" @touchmove.stop>
    <view class="main">
      <view class="comment">
        <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}" class="avatar"></view>
        <view class="thread">
          <view class="content">
            <view class="left">
              <view class="upper">
                <view class="username">Username</view>
                <view class="timestamp">3小时前</view>
              </view>
              <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
            </view>
            <view class="right">
              <view class="likes-frame">
                <view class="thumb"></view>
                <view class="likes">3</view>
              </view>

            </view>
          </view>
        </view>

      </view>
      <view class="reply">
        <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}" class="avatar"></view>
        <view class="thread">
          <view class="content">
            <view class="left">
              <view class="upper">
                <view class="username">Username</view>
                <view class="timestamp">3小时前</view>
              </view>
              <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
            </view>
            <view class="right">
              <view class="likes-frame">
                <view class="thumb"></view>
                <view class="likes">3</view>
              </view>
            </view>

          </view>
          <view class="sub-replies">
            <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}"
                  class="avatar"></view>
            <view class="content">
              <view class="left">
                <view class="upper">
                  <view class="username">Username</view>
                  <view class="timestamp">3小时前</view>
                </view>
                <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
              </view>
              <view class="right">
                <view class="likes-frame">
                  <view class="thumb"></view>
                  <view class="likes">3</view>
                </view>
              </view>
            </view>
          </view>
          <view class="sub-replies">
            <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}"
                  class="avatar"></view>
            <view class="content">
              <view class="left">
                <view class="upper">
                  <view class="username">Username</view>
                  <view class="timestamp">3小时前</view>
                </view>
                <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
              </view>
              <view class="right">
                <view class="likes-frame">
                  <view class="thumb"></view>
                  <view class="likes">3</view>
                </view>
              </view>
            </view>
          </view>
          <view class="sub-replies">
            <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}"
                  class="avatar"></view>
            <view class="content">
              <view class="left">
                <view class="upper">
                  <view class="username">Username</view>
                  <view class="timestamp">3小时前</view>
                </view>
                <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
              </view>
              <view class="right">
                <view class="likes-frame">
                  <view class="thumb"></view>
                  <view class="likes">3</view>
                </view>
              </view>
            </view>
          </view>
          <view class="more-sub-replies">
            <view>展开更多回复</view>
            <view class="down-arrow"></view>
          </view>
        </view>


      </view>
      <view class="reply">
        <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}" class="avatar"></view>
        <view class="thread">
          <view class="content">
            <view class="left">
              <view class="upper">
                <view class="username">Username</view>
                <view class="timestamp">3小时前</view>
              </view>
              <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
            </view>
            <view class="right">
              <view class="likes-frame">
                <view class="thumb"></view>
                <view class="likes">3</view>
              </view>
            </view>

          </view>
          <view class="sub-replies">
            <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}"
                  class="avatar"></view>
            <view class="content">
              <view class="left">
                <view class="upper">
                  <view class="username">Username</view>
                  <view class="timestamp">3小时前</view>
                </view>
                <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
              </view>
              <view class="right">
                <view class="likes-frame">
                  <view class="thumb"></view>
                  <view class="likes">3</view>
                </view>
              </view>
            </view>
          </view>
          <view class="sub-replies">
            <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}"
                  class="avatar"></view>
            <view class="content">
              <view class="left">
                <view class="upper">
                  <view class="username">Username</view>
                  <view class="timestamp">3小时前</view>
                </view>
                <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
              </view>
              <view class="right">
                <view class="likes-frame">
                  <view class="thumb"></view>
                  <view class="likes">3</view>
                </view>
              </view>
            </view>
          </view>
          <view class="sub-replies">
            <view :style="{backgroundImage: 'url(https://dummyimage.com/100x100/000/fff&text=user)'}"
                  class="avatar"></view>
            <view class="content">
              <view class="left">
                <view class="upper">
                  <view class="username">Username</view>
                  <view class="timestamp">3小时前</view>
                </view>
                <view class="lower">你说得对，但是喵社区是一款由喵社区团队自主研发的，后面忘了</view>
              </view>
              <view class="right">
                <view class="likes-frame">
                  <view class="thumb"></view>
                  <view class="likes">3</view>
                </view>
              </view>
            </view>
          </view>
          <view class="more-sub-replies">
            <view>展开更多回复</view>
            <view class="down-arrow"></view>
          </view>
        </view>


      </view>
    </view>
  </scroll-view>

</template>

<script setup>

const emits = defineEmits(["closeReply"])

function closeSelf() {
  emits("closeReply")
}

</script>

<style lang="scss" scoped>

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #22222288;
  z-index: 100;
}

.frame {
  overflow: scroll;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  max-height: 75vh;
  z-index: 102;
  background-color: #fff;
  border-radius: 5vw 5vw 0 0;
}

.main {

  padding: calc(20 / 390 * 100vw);
  box-sizing: border-box;

  .comment, .reply {
    display: flex;
    color: #353535;
    font-size: calc(12 / 390 * 100vw);

    .avatar {
      width: calc(32 / 390 * 100vw);
      height: calc(32 / 390 * 100vw);
      border-radius: 50%;
      background-size: 100% 100%;
      margin-right: calc(11 / 390 * 100vw);
    }

    .thread {
      flex: auto;

      .content {
        display: flex;

        .left {
          flex: auto;
          width: 0;

          .upper {
            display: flex;
            color: #B8B8B8;

            .username {
              margin-right: calc(10 / 390 * 100vw);
            }
          }

          .lower {
            font-size: calc(14 / 390 * 100vw);
            margin: calc(8 / 390 * 100vw) 0;
          }
        }

        .right {
          display: flex;
          width: calc(28 / 390 * 100vw);
          justify-content: flex-end;
          padding-top: calc(22 / 390 * 100vw);


          .likes-frame {
            height: calc(20 / 390 * 100vw);
            display: flex;
            align-items: center;

            .thumb {
              background-image: url("../../static/images/like_grey_0.png");
              width: calc(12 / 390 * 100vw);
              height: calc(12 / 390 * 100vw);
              background-size: 100% 100%;
            }

            .likes {
              width: calc(12 / 390 * 100vw);
              text-align: right;
            }
          }


          color: #B8B8B8;
        }

      }

      .sub-replies {
        display: flex;
        margin: calc(10 / 390 * 100vw) 0;

        .avatar {
          width: calc(22 / 390 * 100vw);
          height: calc(22 / 390 * 100vw);
        }

        .content {
          flex: auto;
          display: flex;


          .left {
            flex: auto;
            width: 0;

          }
        }
      }

      .more-sub-replies {
        color: #696969;
        margin-left: calc(33 / 390 * 100vw);
        display: flex;
        align-items: center;

        .down-arrow {
          background-image: url("../../static/images/down-black.png");
          width: calc(8 / 390 * 100vw);
          height: calc(5 / 390 * 100vw);
          background-size: 100% 100%;
          margin-left: calc(8 / 390 * 100vw);
        }
      }
    }


  }

  .comment {
    margin-bottom: calc(20 / 390 * 100vw);
  }

  .reply {
    margin: calc(20 / 390 * 100vw) 0;
  }
}

</style>