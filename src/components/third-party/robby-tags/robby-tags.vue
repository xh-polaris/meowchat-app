<template>
  <view class="tagController">
    <view class="tagContainer mb-2">
      <view
          v-for="(tagText, index) in nowValue"
          v-bind:key="index"
          :class="tagBgColor"
          class="tagItem"
      >
        <text :data-text="tagText" style="color: white" @tap="tapTag">{{
            tagText
          }}
        </text>
        <text
            v-if="isShowDelIcon"
            :data-text="tagText"
            class="tagDelIcon"
            style="color: white"
            @tap="delTag"
        >x
        </text
        >
      </view>
    </view>
    <view v-if="isShowAdd" class="tagInput">
      <input
          v-model="tagString"
          class="tag"
          placeholder="输入逗号分隔的标签"
          type="text"
      />
      <image
          mode="widthFix"
          src="/static/images/add.png"
          style="width: 60rpx"
          @tap="createTags"
      ></image>
    </view>
  </view>
</template>

<script>
export default {
  name: "robby-tags",
  props: {
    enableAdd: {
      type: Boolean,
      default: true,
    },
    bgColorType: {
      type: String,
      default: "",
    },
    value: {
      type: Array,
      default: [],
    },
    enableDel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tagString: "",
      isShowDelIcon: this.enableDel || false,
      isShowAdd: this.enableAdd || false,
      nowValue: this.value,
    };
  },
  watch: {
    value: {
      handler(newval, oldval) {
        this.nowValue = newval;
      },
    },
  },
  computed: {
    tagBgColor() {
      if (this.bgColorType === null) {
        return "tagBgDefault";
      } else if (this.bgColorType === "primary") {
        return "tagBgPrimary";
      } else if (this.bgColorType === "success") {
        return "tagBgSuccess";
      } else if (this.bgColorType === "warn") {
        return "tagBgWarning";
      } else if (this.bgColorType === "error") {
        return "tagBgError";
      } else {
        return "tagBgDefault";
      }
    },
  },
  methods: {
    createTags() {
      const tempTagArr = [];
      if (this.tagString.length > 0) {
        const newvalue = this.tagString.split(/,|，/u);
        for (let i = 0; i < newvalue.length; i++) {
          const newTag = newvalue[i].trim();
          if (newTag.length > 6) {
            uni.showToast({
              title: '每个标签最多6个字',
              icon: "none"
            });
            return;
          }
          if (newTag !== "" && this.value.indexOf(newTag) < 0) {
            tempTagArr.push(newTag);
          }
        }
      }
      this.tagString = "";
      this.nowValue.splice(this.value.length, 0, ...tempTagArr);
      this.$emit("add", {
        currentTag: tempTagArr,
        allTags: this.value,
      });
      this.$emit("input", this.value);
    },
    delTag(e) {
      const delTagText = e.currentTarget.dataset.text;
      const delTagIndex = this.value.indexOf(delTagText);
      this.nowValue.splice(delTagIndex, 1);
      this.$emit("delete", {
        currentTag: delTagText,
        allTags: this.value,
      });
      this.$emit("input", this.value);
    },
    tapTag(e) {
      const selTagText = e.currentTarget.dataset.text;
      this.$emit("click", selTagText);
    },
  },
};
</script>

<style>
.tag {
  /* 		border: none;
		border-bottom: 1px solid #1FA1FF; */
  font-size: 30rpx;
}

.tagController {
  padding: 10upx;
}

.tagContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.tagItem {
  padding: 10upx 20upx;
  margin: 10upx;
  border-radius: 40upx;
  color: white;
}

.tagBgDefault {
  background-color: #cfcfcf;
  color: black;
  background-color: #007aff;
}

.tagBgPrimary {
  background-color: #007aff;
}

.tagBgSuccess {
  background-color: #4cd964;
}

.tagBgWarning {
  background-color: #f0ad4e;
}

.tagBgError {
  background-color: #dd524d;
}

.tagDelIcon {
  padding-left: 20upx;
}

.tagInput {
  padding: 10upx;
}

.tagInput input {
  width: 70%;
  display: inline-block;
}
</style>
