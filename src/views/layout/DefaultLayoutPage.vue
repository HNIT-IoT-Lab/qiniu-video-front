<template>
    <a-layout class="layout">
        <a-layout-sider collapsible>
            <div class="logo"></div>
            <MenuTree />
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="layout-header">
                <div class="header-logo" >
                    <img src="../../assets/img/vedio.png" alt=""/>
                    <div>vedio</div>
                </div>
                <div class="search">
                    <a-input-search v-model="searchContent" allow-clear @search="onSearch" @press-enter="onSearch" :style="{width:'100%'}"
                                    placeholder="试着搜些什么吧"/>
                </div>
                <div class="user-info">
                    <a-image width="50" height="50" :preview="false" :src="avatar" style="border-radius: 50%;">
                        <template #loader>
                            <img width="150" :src="userInfo?.avatar || avatar" style="filter: blur(5px);border-radius: 50%;" />
                        </template>
                    </a-image>
                    <span class="user-name">{{ userInfo?.userName || '理香' }}</span>
                </div>
            </a-layout-header>
            <a-layout style="padding: 0 24px;">
                <a-layout-content class="layout-content">
                    <RouterView/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script setup>
import MenuTree from '@/components/MenuTree/MenuTree.vue';
import avatar from '@/assets/img/avatar.jpg';
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const userInfo = ref({});
const store = useUserStore();
userInfo.value = store.userInfo;

const searchContent = ref('');

const router = useRouter();
const onSearch = () => {
  console.log('searchContent', searchContent.value);
  router.push({
    path: '/search',
    query: {
      content: searchContent.value
    },
    replace: true
  });
  searchContent.value = '';
};
</script>
<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;
@header-margin: 100px;
@font-color-2: #666;
@font-color-3: #999;
@background-color: #dfecf9;

@font-face {
     font-family: 'logoFont';
     src: url('../../assets/font/包图小白体.ttf') format('woff');
}

   body {
     font-family: 'CustomFont', Arial, sans-serif;
   }

.layout {
  width: 100%;
  height: 100%;
  background: @background-color;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-header{
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 70px;
  line-height: 70px;
  background: @background-color;
}

.header-logo{
  display: flex;
  margin-left: 20px;
  margin-right: @header-margin;
  img{
    width: 50px;
    height: 60px;
  }
  div{
    font-family: 'logoFont';
    color: #9baee1;
    font-size: 30px;
    font-weight: 700;
  }
}

.search{
  flex: 1;
  // max-width: 500px;
}

:deep(.search .arco-input-wrapper){
    background-color: rgba(255,255,255,.7);
}
:deep(.search .arco-input-wrapper:focus-within){
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }

.user-info{
  width: 150px;
  margin-left: @header-margin;
  .user-name{
    margin-left: 10px;
    font-size: 16px;
    color: @font-color-2;
  }
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;

  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}

.layout-content {
    display: flex;
    flex-direction: column;
  }
</style>
