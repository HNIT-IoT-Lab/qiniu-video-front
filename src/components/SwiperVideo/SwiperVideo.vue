<template>
    <swiper :direction="'vertical'" :slidesPerView="1" :spaceBetween="30" :mousewheel="true" :loop="true"
            :modules="modules" :allowSlidePrev="(realIndex===0)? false:true"
            class="my-swiper" :auto-height="true" @swiper="onSwiper" @slideChangeTransitionEnd="onSlideChangeEnd" @slideNextTransitionEnd="onSlideNextTransitionEnd"
            @slidePrevTransitionEnd="onSlidePrevTransitionEnd">
        <template v-for="(item, index) in dataArray" :key="index">
            <swiper-slide>
                <!-- <div>{{ index }}</div> -->
                <video-player class="swiper-no-swiping" :id="index.toString()" :src="item.url" controls :loop="true"
                              :volume="0.6"
                              preload="auto" style="width: 100%;height: 100%;" @mounted="handleMounted" :muted="false" :userActions="{
                                  doubleClick: false
                              }"
                              @play="handlePlay(index)"
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
// import { data } from './test';
import { getSwiperUrl } from '@/api/vedio';
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
const loading = ref(true);
// const currentIndex = ref(0);
// 获取视频实例
const handleMounted = async (payload) => {
  console.log('dataArray.value.length', dataArray.value.length);
  // const index = player.value.length;
  player.value.push(payload.player);
  // payload.player.on('volumechange', (events) => {
  //   for (let i = 0; i < dataArray.value.length; i++) {
  //     if (index !== i) {
  //       if (!player.value[index].muted()) {
  //         player.value[i].muted(false);
  //       }
  //       player.value[i].volume(player.value[index].volume());
  //     }
  //   }
  // });
  payload.player.on('play', (events) => {

    // player.value[1].update();
  });
};

const muteOtherVideos = () => {
  dataArray.value.forEach((vedio, index) => {
    if (index !== realIndex.value) {
      player.value[index].muted(true);
      console.log('其他的静音');
    } else {
      player.value[index].muted(false);
    }
  });
};

const handlePlay = async (index) => {
  console.log('当前视频的index', index);
  realIndex.value = index;
  muteOtherVideos();
};

const modules = [Mousewheel, Autoplay];
const onSwiper = (swiper) => {
  // console.log('onSwiper', swiper);
};
const realIndex = ref(0);
const slidDirection = ref();
const theFirstFlag = ref(true);

const getUrlList = async () => {
  const res = await getSwiperUrl();
  loading.value = false;
  // console.log('res111', res);
  const data = res;
  const ids = data?.map(item => ({ url: item.urlList[0] }));
  // dataArray.value.push({..ids});
  dataArray.value = [...dataArray.value, ...ids];
  // console.log(dataArray.value, '-k');
  // console.log('dataArray.value', dataArray.value);
  previousArray.value = dataArray.value;
  // console.log('dataArray.value', dataArray.value);
  // console.log(previousArray.value, '-k');
  if (theFirstFlag.value) {
    // player.value[0].play();
    theFirstFlag.value = false;
  }
};
getUrlList();

// 滑动结束事件,获取当前，并开始自动播放
const onSlideChangeEnd = async (swiper) => {
  // console.log(swiper.realIndex, '==k swiper.realIndex');
  realIndex.value = swiper.realIndex;
  await player.value[realIndex.value].play();
  console.log('当前自动播放');
  for (let i = 0; i < dataArray.value.length; i++) {
    if (i !== realIndex.value) {
      await player.value[i].pause();
    }
  }
};

const onSlideNextTransitionEnd = async (swiper) => {
  slidDirection.value = 1;
  const index1 = dataArray.value.length - 1;
  if (swiper.realIndex === index1) {
    console.log('获取用户信息');
    getUrlList();
  }
};

const onSlidePrevTransitionEnd = async (swiper) => {
  slidDirection.value = -1;
};

onMounted(async () => {
  await player.value[0].play();
});

</script>
<style scoped lang="less">
.my-swiper {
  width: 100%;
  // height: 100%;
  .swiper-slide{height:0px}
  .swiper-slide-active { height:auto}
}
</style>
