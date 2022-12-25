<template>
    <cover-view class="tabbar-box">
      <cover-image
        v-for="item,index in tabbarContent" :key="index"
        class="tab-con"
        :src="selectedId===item.id ? item.activeIcon : item.icon"
        @click="tabbarChange(item.url)"
      />
    </cover-view>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from "vue"
  
  const props = defineProps<{ id: string }>()
  const selectedId  = ref(props.id)
  const tabbarContent = [
      {
          id: "1",
          icon: "/static/images/nav_community_gray.svg",
          activeIcon: "/static/images/nav_community_blue.svg",
          url:"/pages/community/community"
      },
      {
          id: "2",
          icon: "/static/images/nav_collection_gray.svg",
          activeIcon: "/static/images/nav_collection_blue.svg",
          url:"/pages/collection/collection"
      },
      {
          id: "0",
          icon: "/static/images/nav_add_moment.svg",
          activeIcon: "/static/images/nav_add_moment.svg",
          url:"/pages/add_moment/add_moment"
  
      },
      {
          id: "3",
          icon: "/static/images/nav_world_gray.svg",
          activeIcon: "/static/images/nav_world_blue.svg",
          url:"/pages/world/world"
  
      },
      {
          id: "4",
          icon: "/static/images/nav_profile_gray.svg",
          activeIcon: "/static/images/nav_profile_blue.svg",
          url:"/pages/profile/profile"
  
      },
  ]
  
  const tabbarChange = (path:string) => {
              uni.switchTab({
                  url: path
              })
  }
  
  // NOTE !!!! 调用 uni.hideTabBar({}) 后原生的导航栏才会彻底消失
  onMounted(() => { 
      uni.hideTabBar({})    
  })
      
  </script>
  
  <style lang="scss">
  .tabbar-box{
      padding: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
  
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 60;
      
      background: #fff;
      box-shadow: 2px 4px 26px -8px;
  
      .tab-con{
          width: 40px;
          height: 40px;
      }
  }
  </style>