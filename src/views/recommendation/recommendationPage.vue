<template>
    <SwiperVideo :data-array="dataList"/>
</template>
<script setup>
import SwiperVideo from '@/components/SwiperVideo/SwiperVideo.vue';
const dataList = [{
  url: 'https://vjs.zencdn.net/v/oceans.mp4'
}, {
  url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
}, {
  url: 'https://www.w3schools.com/html/movie.mp4'
}];
</script>
<style scoped lang="less">
.my-swiper {
  width: 100%;
  // height: 100%;
}
</style>
