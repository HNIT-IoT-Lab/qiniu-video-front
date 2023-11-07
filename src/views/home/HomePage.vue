<template>
    <div class="home-page">
        <Waterfall :list="contentList" :width="370" style="">
            <template #item="{ item, url, index }">
                <div class="card" :style="{'height':(index%2===0)? `${vedioHeight1}px`:`${vedioHeight2}px`}" style="background-color:#dfecf9;border-radius: 14px;">
                    <div>
                        <video-player
                            ref="videoRef"
                            :src="item.urlList[0]"
                            :width="370"
                            :height="((index%2===0)?vedioHeight1:vedioHeight2)-100"
                            :poster="item.cover === '' ? item.urlList[0] + '?vframe/jpg/offset/0' : item.cover"
                            controls
                            :loop="true"
                            :volume="0.6"
                            @mounted="handleMounted"
                            @mouseenter="mouseEnter(index)"
                            @mouseleave="mouseLeave(index)"
                        />
                    </div>
                    <div class="text" style="position: relative;height: 100px;padding-left: 20px;">
                        <h3> {{ item.title }} </h3>
                        <p style=" color: #999;">{{ item.content }}</p>
                        <p class="likeAndCollect" style="position: absolute;left: 18px;top: 44px;color: #666;font-size: 14px">
                            <span class="action" key="heart" @click="onLikeChange(item.id,item?.islike)">
                                <span v-if="item?.islike">
                                    <IconHeartFill :style="{fontSize: 20, color: '#f53f3f' }" />
                                </span>
                                <span v-else>
                                    <IconHeart :style="{fontSize: 20,color: '#999'}" />
                                </span>
                                <span class="count" style="margin-left: 2px;">{{ item.likeCounts }}</span>
                            </span>
                            <span class="action" key="star" @click="onStarChange(item.id,item?.isCollect)">
                                <span v-if="item?.isCollect">
                                    <IconStarFill :style="{marginLeft: 8,fontSize: 20,transform: 'scale(1.1)', color: '#ffb400' }" />
                                </span>
                                <span v-else>
                                    <IconStar :style="{marginLeft: 8,fontSize: 18,transform: 'scale(1.1)',color: '#999'}" />
                                </span>
                                <span class="count" style="margin-left: 2px;">{{ item.collectionCounts }}</span>
                            </span>
                        </p>
                    </div>
                </div>
            </template>
        </Waterfall>
        <InfiniteLoading @infinite="loadData" style="display: flex;justify-content: center;" />
    </div>
</template>
<script setup>
import { Waterfall } from 'vue-waterfall-plugin-next';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import { ref, shallowRef, onMounted } from 'vue';
import 'vue-waterfall-plugin-next/dist/style.css';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import { getVedeioList, startOrCollectArticle } from '@/api/vedio';
import {
  IconHeart,
  IconStar,
  IconStarFill,
  IconHeartFill
} from '@arco-design/web-vue/es/icon';
;

const contentList = ref([]); // 视频数据
const vedioHeight1 = ref(300);
const vedioHeight2 = ref(300);
// const autoPlayIndex = ref('');
let timer = '';
// 18
// #region
// const options = reactive({
//   color: '#dfecf9', // 主题色
//   muted: true, // 静音
//   webFullScreen: false,
//   speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], // 播放倍速
//   loop: false, // 循环播放
//   mirror: false, // 镜像画面
//   ligthOff: false, // 关灯模式
//   volume: 0.3, // 默认音量大小
//   control: false, // 是否显示控制器
//   title: '' // 视频名称
// });
// #endregion
const player = shallowRef([]);
const curPage = ref(1);
const pageSize = 10;
const videoRef = ref('');
// const like = ref([]);
// const star = ref([]);

const getVedioListFn = async (page) => {
  const res = await getVedeioList(page, pageSize);
  contentList.value = [...contentList.value, ...res.result];
  console.log('contentList.value', contentList.value);
  // console.log('res', res);
};
getVedioListFn(curPage.value);

const handleMounted = async (payload) => {
  player.value.push(payload.player);
  // console.log('Basic player mounted', player.value);
  // console.log('plaer.value[0]', player.value[0]);
  // await player.value[0].play();
};

const loadData = async ($state) => {
  console.log('底部');
  curPage.value = curPage.value + 1;
  getVedioListFn(curPage.value);
  // 书写add函数
  // calling the api
};
//  ref 是用来获取属性的
const mouseEnter = (index) => {
  // console.log('videoRef', videoRef.value);
  timer = setTimeout(() => {
    // autoPlayIndex.value = index;
    player.value[index].play();
    console.log('222', 222);
  }, 1500);
  // // await player.value[0].play();
};

const mouseLeave = (index) => {
  // console.log('222', 222);
  player.value[index].pause();
  clearTimeout(timer);
};

const onLikeChange = async (id, isLike) => {
  // like.value = !like.value;
  isLike = !isLike;
  const res = await startOrCollectArticle(id, 'COLLECTION', isLike);
  console.log('res', res);
  getVedioListFn();
};
const onStarChange = async (id, isCollect) => {
  // star.value = !star.value;
  // console.log('item222', item);
  // console.log('item.id', item.id);
  isCollect = !isCollect;
  const res = await startOrCollectArticle(id, 'COLLECTION', isCollect);
  console.log('res', res);
  getVedioListFn();
};

</script>

<style scoped>
.home-page{
  :deep(.video-js .vjs-big-play-button) {
    visibility: hidden;
  }
}
</style>
