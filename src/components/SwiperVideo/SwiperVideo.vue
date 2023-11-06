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
const theFirstFlag = ref(true);

// const tempArray = [1, 2, 0];
// const preArray = [2, 0, 1];

const getUrlList = async () => {
  const res = await getSwiperUrl();
  loading.value = false;
  console.log('res111', res);
  const data = res;
  const ids = data?.map(item => ({ url: item.urlList[0] }));
  // dataArray.value.push({..ids});
  dataArray.value = [...dataArray.value, ...ids];
  // console.log(dataArray.value, '-k');
  console.log('dataArray.value', dataArray.value);
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
  console.log(swiper.realIndex, '==k swiper.realIndex');
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

const onSlideNextTransitionEnd = async (swiper) => {
  // 判断nextarray中是否还有数据，为空或者某个范围内开始请求数据push进去
  // do something
  // console.log('swiper', swiper);
  slidDirection.value = 1;
  console.log('realIndex向后', swiper.realIndex);
  // console.log('向后滑动');
  // console.log('previousArray.value', previousArray.value);

  const index1 = dataArray.value.length - 1;
  if (swiper.realIndex === index1) {
    //
    console.log('获取用户信息');
    getUrlList();
  }
  // if ()

  // if (previousArray.value.length === 0 && realIndex.value < 2) {
  //   return;
  // }
  // previousArray.value.push(dataArray.value[tempArray[realIndex.value]]);
  // console.log(previousArray.value);

  // // console.log('',);
  // dataArray.value[tempArray[realIndex.value]] = nextArray.value.shift();
  // console.log(dataArray.value);
};

const onSlidePrevTransitionEnd = async (swiper) => {
  slidDirection.value = -1;
  console.log('dataArray.value', dataArray.value);
  console.log('realIndex向前', swiper.realIndex);
  // console.log('向前滑动');
  // if (previousArray.value.length === 0) {
  //   return;
  // }
  // nextArray.value.push(dataArray.value[preArray[realIndex.value]]);
  // dataArray.value[preArray[realIndex.value]] = previousArray.value.pop();
};

</script>
<style scoped lang="less">
.my-swiper {
  width: 100%;
  // height: 100%;
  .swiper-slide{height:0px}
  .swiper-slide-active { height:auto}
}
</style>
