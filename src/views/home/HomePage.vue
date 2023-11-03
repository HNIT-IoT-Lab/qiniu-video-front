<template>
    <Waterfall :list="contentList" style="">
        <template #item="{ item, url, index }">
            <div class="card" style="background-color: aquamarine;">
                <!-- <LazyImg :url="url" /> -->
                <div :style="{'height':(index%2===0)?'400px':'700px'}">{{ item }}</div>
                <p class="text">这是具体内容</p>
            </div>
        </template>
    </Waterfall>
    <InfiniteLoading @infinite="loadData" style="display: flex;justify-content: center;" />
</template>
<script setup>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import 'vue-waterfall-plugin-next/dist/style.css';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
const contentList = [{
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}, {
  content: '66666'
}];
const loadData = async $state => {
  // 书写add函数
  console.log('底部');
  // calling the api
};
</script>

<style scoped>
</style>
