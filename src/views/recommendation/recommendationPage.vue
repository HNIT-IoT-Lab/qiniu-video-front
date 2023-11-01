<template>
    <swiper
        :direction="'vertical'"
        :slidesPerView="1"
        :spaceBetween="30"
        :mousewheel="true"
        :loop="true"
        :modules="modules"
        class="my-swiper"
        :auto-height="true"
        @swiper="onSwiper"
        @slideChangeTransitionEnd="onSlideChangeEnd"
    >
        <template v-for="(item,index) in dataList" :key="index">
            <swiper-slide>
                <video-player
                    class="swiper-no-swiping"
                    :id="index.toString()"
                    :src="item.url"
                    controls
                    :loop="true"
                    :volume="0.6"
                    preload="auto"
                    style="width: 100%;height: 100%;"
                    @mounted="handleMounted"
                    :muted="true"
                    :userActions="{
                        doubleClick: false
                    }"
                    :controlBar="{
                        fullscreenToggle: false
                    }
                    "
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
import { onMounted, ref, shallowRef } from 'vue';
import 'video.js/dist/video-js.css';

const player = shallowRef([]);
const dataList = [{
  url: 'https://vjs.zencdn.net/v/oceans.mp4'
}, {
  url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
}, {
  url: 'https://www.w3schools.com/html/movie.mp4'
}];
// 获取视频实例
const handleMounted = async (payload) => {
  const index = player.value.length;
  player.value.push(payload.player);
  payload.player.on('volumechange', (events) => {
    for (let i = 0; i < 3; i++) {
      if (index !== i) {
        if (!player.value[index].muted()) {
          player.value[i].muted(false);
        }
        player.value[i].volume(player.value[index].volume());
      }
      // console.log(player.value[i].volume());
    }
  });
  payload.player.on('play', (events) => {

    // player.value[1].update();
  });
};

const modules = [Mousewheel, Autoplay];
const onSwiper = (swiper) => {
  // console.log('onSwiper', swiper);
};
let realIndex = 0;
// 滑动结束事件
const onSlideChangeEnd = async (swiper) => {
  console.log('realIndex', swiper.realIndex);
  realIndex = swiper.realIndex;
  console.log(player.value[realIndex]);
  await player.value[realIndex].play();
  for (let i = 0; i < 3; i++) {
    if (i !== realIndex) {
      await player.value[i].pause();
    }
  }
  //   videoPlayers.value[1].play();
  // console.log(player.value);
//   console.log('slide change');
};

onMounted(async () => {
  await player.value[0].play();
});
</script>
<style scoped lang="less">
.my-swiper{
    width: 100%;
    // height: 100%;
}
</style>
