<template>
    <SwiperVideo/>
</template>
<script setup>
import SwiperVideo from '@/components/SwiperVideo/SwiperVideo.vue';
const dataList = [{
  url: 'https://vjs.zencdn.net/v/oceans.mp4'
}, {
  url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
}];

const previousArray = [];
const nextArray = [];
</script>
<style scoped lang="less">
.my-swiper {
  width: 100%;
  height: 100%;
}
</style>
