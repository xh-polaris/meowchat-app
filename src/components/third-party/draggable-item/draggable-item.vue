<template>
  <view class="draggable-wrapper" @touchmove.stop.prevent="dummy" :style="[containerSize]">
    <view
        v-for="(image, index) in imagesData" :key="index"
        class="_item"
        :style="{
      transition: currentControlsIndex === index ? 'initial' : '.3s',
      'z-index': currentControlsIndex === index ? 1 : 0,
      top: controlsPositionArray[index].top + 'px',
      left: controlsPositionArray[index].left + 'px'}">
      <view
          @touchstart="handleTouchstart($event, index)"
          @touchmove="handleTouchmove"
          @touchend="handleTouchend">
        <slot name="content" :image="image" :index="index"></slot>
      </view>
    </view>
    <view
        class="_item"
        :style="{
        top: controlsPositionArray[imagesData.length].top + 'px',
        left: controlsPositionArray[imagesData.length].left + 'px'}">
      <slot name="addImage"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "DraggableItem",
  props: {
    containerSize: {
      type: Object,
      default: () => ({width: '100vw', height: '100vh'}),
    },
    // 控件的大小
    controlsSize: {
      type: Object,
      default: () => ({width: 0, height: 0, margin: 0})
    },
    // 数据列表
    imagesData: {
      type: Array,
      default: () => []
    },
    photos: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 每行最大存放的个数
      maxWidthCount: 3,
      // 记录所有控件的初始位置
      recordInitControlsPositionList: [],
      // 控件的数据
      controlsPositionArray: [{top: 0, left: 0}],
      // 记录当前手指的位置
      recordPosition: {
        x: 0,
        y: 0
      },
      // 记录当前操作的控件数据
      recordControlsPositionItem: {},
      // 当前操作的控件的下标
      currentControlsIndex: -1,
      // 是否在移动中
      isMobile: false
    };
  },
  computed: {
    localImageData() {
      return JSON.parse(JSON.stringify(this.imagesData));
    }
  },
  watch: {
    localImageData: {
      handler: function (newValue, oldValue) {
        if (newValue.length !== oldValue.length) {
          this.controlsPositionArray = this.initControlsPosition();
        }
      },
      deep: true
    }
  },
  mounted() {
    // 初始化控件的位置
    this.controlsPositionArray = this.initControlsPosition();
  },
  methods: {
    dummy() {
      // do nothing
    },
    /** 初始化各个控件的位置 */
    initControlsPosition() {
      // 用于返回出去的新数组
      let tempArray = [];

      // 设置控件位置 - 这边多记录一个位置 之后会用到
      for (let i = 0, j = 0, k = 0; i < this.imagesData.length + 2; i++) {
        tempArray[i] = {
          left: j * (this.controlsSize.width + this.controlsSize.margin),
          top: k * (this.controlsSize.height + this.controlsSize.margin)
        };
        k = j + 1 === this.maxWidthCount ? ++k : k;
        j = j + 1 === this.maxWidthCount ? 0 : ++j;
      }

      // 记录数据 - 进行深拷贝
      this.recordInitControlsPositionList = [...tempArray];
      // 返回数据
      return tempArray;
    },

    /** 处理手指触摸后移动 */
    handleTouchmove(event) {
      const {pageX, pageY} = event.touches[0];

      // 获取移动的差
      this.$set(this.controlsPositionArray, this.currentControlsIndex, {
        left: this.controlsPositionArray[this.currentControlsIndex].left + (pageX - this.recordPosition.x),
        top: this.controlsPositionArray[this.currentControlsIndex].top + (pageY - this.recordPosition.y)
      });
      // 记录位置
      this.recordPosition = {x: pageX, y: pageY};
      // 判断当前移动的位置是否需要进行排序
      // 向右移动
      if (
          this.currentControlsIndex + 1 !== this.imagesData.length &&
          (this.currentControlsIndex + 1) % this.maxWidthCount !== 0 &&
          this.controlsPositionArray[this.currentControlsIndex].left + this.controlsSize.width >=
          this.recordInitControlsPositionList[this.currentControlsIndex].left + this.controlsSize.width + this.controlsSize.margin + this.controlsSize.width / 2
      ) {
        this._handleChangeControlsPosition(this.currentControlsIndex + 1);
      }
      // 向左移动
      else if (
          this.currentControlsIndex % this.maxWidthCount !== 0 &&
          this.controlsPositionArray[this.currentControlsIndex].left <=
          this.recordInitControlsPositionList[this.currentControlsIndex - 1]
              .left +
          this.controlsSize.width / 2 &&
          this.controlsPositionArray[this.currentControlsIndex].top <
          this.recordInitControlsPositionList[this.currentControlsIndex].top +
          this.controlsSize.height / 3 +
          this.controlsSize.margin &&
          this.controlsPositionArray[this.currentControlsIndex].top >
          this.recordInitControlsPositionList[this.currentControlsIndex].top -
          this.controlsSize.height / 3 -
          this.controlsSize.margin
      ) {
        this._handleChangeControlsPosition(this.currentControlsIndex - 1);
      }
      // 向下拖动
      else if (
          Math.ceil(this.currentControlsIndex / this.maxWidthCount) !==
          Math.ceil(this.imagesData.length / this.maxWidthCount) &&
          this.controlsPositionArray[this.currentControlsIndex].top +
          this.controlsSize.height >
          this.recordInitControlsPositionList[this.currentControlsIndex].top +
          this.controlsSize.height +
          this.controlsSize.margin +
          this.controlsSize.height / 2
      ) {
        this._handleChangeControlsPosition(
            this.currentControlsIndex + this.maxWidthCount >=
            this.imagesData.length
                ? this.imagesData.length - 1
                : this.currentControlsIndex + this.maxWidthCount
        );
      }
      // 向上拖动
      else if (
          parseInt(this.currentControlsIndex / this.maxWidthCount) !== 0 &&
          this.controlsPositionArray[this.currentControlsIndex].top <
          this.recordInitControlsPositionList[this.currentControlsIndex].top -
          this.controlsSize.margin -
          (this.controlsSize.height / 3) * 2
      ) {
        this._handleChangeControlsPosition(
            this.currentControlsIndex - this.maxWidthCount
        );
      }
    },

    /** 处理手指触摸开始事件 */
    handleTouchstart(event, index) {
      const {pageX, pageY} = event.touches[0];

      // 记录一些数据
      this.currentControlsIndex = index;
      this.recordPosition = {x: pageX, y: pageY};
      this.recordControlsPositionItem = this.controlsPositionArray[index];
    },

    /** 处理手指松开事件 */
    handleTouchend(event) {
      // 将操控的控件归位
      this.controlsPositionArray[this.currentControlsIndex] =
          this.recordInitControlsPositionList[this.currentControlsIndex];
      this.currentControlsIndex = -1;
    },

    /**
     * 处理交换控件位置的方法 -
     * @param {number} index  需要与第几个下标交换位置
     * */
    _handleChangeControlsPosition(index) {
      // 判断是否在交换中
      if (this.isMobile) {
        return;
      }
      this.isMobile = true;

      // 交换位置
      let tempControls = this.imagesData[this.currentControlsIndex];
      this.imagesData[this.currentControlsIndex] = this.imagesData[index];
      this.imagesData[index] = tempControls;

      // 交换photos中的位置
      let tempPhotos = this.photos[this.currentControlsIndex];
      this.photos[this.currentControlsIndex] = this.photos[index];
      this.photos[index] = tempPhotos;

      // 调整控件位置数据
      this.controlsPositionArray[index] = this.controlsPositionArray[this.currentControlsIndex];
      this.controlsPositionArray[this.currentControlsIndex] = this.recordControlsPositionItem;

      // 改变当前选中的位置
      this.currentControlsIndex = index;

      // 记录新位置的数据
      this.recordControlsPositionItem = this.recordInitControlsPositionList[this.currentControlsIndex];

      // 交换结束
      this.isMobile = false;
    }
  }
};
</script>

<style scoped lang="scss">
.draggable-wrapper {
  position: relative;
  width: 100%;

  ._item {
    position: absolute;
  }
}
</style>
