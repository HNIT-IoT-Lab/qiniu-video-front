<template>
    <swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :loop="true"
            :modules="modules" :allowSlidePrev="(previousArray.length===0&&realIndex===0)?false:true"
            class="my-swiper" :auto-height="true" @swiper="onSwiper" @slideChangeTransitionEnd="onSlideChangeEnd" @slideNextTransitionEnd="onSlideNextTransitionEnd"
            @slidePrevTransitionEnd="onSlidePrevTransitionEnd">
        <template v-for="(item, index) in dataArray" :key="index">
            <swiper-slide>
                <!-- <div>{{ index }}</div> -->
                <video-player class="swiper-no-swiping" :id="index.toString()" :src="item.url" controls :loop="true"
                              :volume="0.6"
                              preload="auto" style="width: 100%;height: 100%;" @mounted="handleMounted" :muted="true" :userActions="{
                                  doubleClick: false
                              }"
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
import { onMounted, shallowRef, ref } from 'vue';
import 'video.js/dist/video-js.css';

// const props = defineProps({ dataArray: Array, previousArray: Array, nextArray: Array });
const dataArray = ref([]);
dataArray.value = [{
  url: 'https://vjs.zencdn.net/v/oceans.mp4'
}, {
  url: 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
}, {
  url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
}];
const previousArray = ref([]);
const nextArray = ref([]);
nextArray.value = [{
  url: 'https://www.w3schools.com/html/movie.mp4'
}];
const player = shallowRef([]);
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
const realIndex = ref(0);
const slidDirection = ref();
// 滑动结束事件
const onSlideChangeEnd = async (swiper) => {
  realIndex.value = swiper.realIndex;
  await player.value[realIndex.value].play();
  for (let i = 0; i < 3; i++) {
    if (i !== realIndex.value) {
      await player.value[i].pause();
    }
  }
  //   videoPlayers.value[1].play();
  // console.log(player.value);
  //   console.log('slide change');
};
const tempArray = [1, 2, 0];
const preArray = [2, 0, 1];
const onSlideNextTransitionEnd = async (swiper) => {
  // 判断nextarray中是否还有数据，为空或者某个范围内开始请求数据push进去
  // do something
  slidDirection.value = 1;
  console.log('realIndex', swiper.realIndex);
  console.log('向后滑动');
  if (previousArray.value.length === 0 && realIndex.value < 2) {
    return;
  }
  previousArray.value.push(dataArray.value[tempArray[realIndex.value]]);
  dataArray.value[tempArray[realIndex.value]] = nextArray.value.shift();
  console.log(previousArray.value);
};

const onSlidePrevTransitionEnd = async (swiper) => {
  slidDirection.value = -1;
  console.log('realIndex', swiper.realIndex);
  console.log('向前滑动');
  if (previousArray.value.length === 0) {
    return;
  }
  nextArray.value.push(dataArray.value[preArray[realIndex.value]]);
  dataArray.value[preArray[realIndex.value]] = previousArray.value.pop();
};

onMounted(async () => {
  await player.value[0].play();
});
</script>
<style scoped lang="less">
.my-swiper {
  width: 100%;
  // height: 100%;
}
</style>
