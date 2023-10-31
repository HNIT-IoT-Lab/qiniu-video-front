<template>
    <swiper
        :direction="'vertical'"
        :slidesPerView="1"
        :spaceBetween="30"
        :mousewheel="true"
        :pagination="{
            clickable: true,
        }"
        :modules="modules"
        class="my-swiper"
        :auto-height="true"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
        <template v-for="(item,index) in dataList" :key="index">
            <swiper-slide >
                <video-player
                    ref="videoPlayers"
                    src="https://media.w3.org/2010/05/sintel/trailer.mp4"
                    controls
                    poster="//vjs.zencdn.net/v/oceans.png"
                    :loop="true"
                    :volume="0.6"
                    preload="auto"
                    style="width: 100%;height: 100%;"
                />
            </swiper-slide>
        </template>
    </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Mousewheel, Autoplay } from 'swiper/modules';
import { VideoPlayer } from '@videojs-player/vue';
import { onMounted, ref } from 'vue';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
const modules = [Mousewheel, Autoplay];

const dataList = [{
  url: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
}, {
  url: 'https://media.w3.org/2010/05/sintel/trailer.mp4'
}];
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
//   videoPlayers.value[1].play();
  console.log(videoPlayers.value[1].pl);
//   console.log('slide change');
};

onMounted(() => {

});
const videoPlayers = ref(null);
</script>
<style scoped lang="less">
.my-swiper{
    width: 100%;
    // height: 100%;
}
</style>
