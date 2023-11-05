<template>
    <!-- <div style="width: 370px;
  height:600px;background-color: #333;">
        <video-player
            ref="veo"
            class="testPlay"
            src="http://vjs.zencdn.net/v/oceans.mp4"
            poster="https://p9-pc-sign.douyinpic.com/image-cut-tos-priv/c7c7ff0dbc715f4e91c196974aec2745~tplv-dy-resize-origshort-autoq-75:330.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_DOUYIN_WEB_NEW_PAGE&sc=cover&se=false&x-expires=2014416000&x-signature=GS7dC1gBqFm0DqMip%2Ff1digSN24%3D"
            width="370"
            height="500"
            controls
            :control="false"
            :loop="true"
            :volume="0.6"
            @mounted="handleMounted"
            @ready="handleEvent($event)"
        />
    </div> -->
    <div class="home-page">
        <Waterfall :list="contentList" :width="370" style="">
            <template #item="{ item, url, index }">
                <div class="card" :style="{'height':(index%2===0)? `${vedioHeight1}px`:`${vedioHeight2}px`}" style="background-color:#dfecf9;border-radius: 14px;">
                    <div>
                        <video-player
                            ref="videoRef"
                            src="http://vjs.zencdn.net/v/oceans.mp4"
                            :width="370"
                            :height="((index%2===0)?vedioHeight1:vedioHeight2)-100"
                            poster="https://p9-pc-sign.douyinpic.com/image-cut-tos-priv/c7c7ff0dbc715f4e91c196974aec2745~tplv-dy-resize-origshort-autoq-75:330.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_DOUYIN_WEB_NEW_PAGE&sc=cover&se=false&x-expires=2014416000&x-signature=GS7dC1gBqFm0DqMip%2Ff1digSN24%3D"
                            controls
                            muted
                            :loop="true"
                            :volume="0.6"
                            @mouseover="mouseOver(index)"
                            @mouseleave="mouseLeave"
                        />
                    </div>
                    <div class="text" style="height: 100px;padding-left: 20px;">
                        <h3> 谁要的壁纸，专门拍的 </h3>
                        <p style="margin-top: 20px; color: #999;">来源: 抖音视频</p>
                    </div>
                </div>
            </template>
        </Waterfall>
        <InfiniteLoading @infinite="loadData" style="display: flex;justify-content: center;" />
    </div>
</template>
<script setup>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import { ref, shallowRef, onMounted } from 'vue';
import 'vue-waterfall-plugin-next/dist/style.css';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

const contentList = [{
  content: '666661'
}, {
  content: '666662'
}, {
  content: '666663'
}, {
  content: '666664'
}, {
  content: '666665'
}, {
  content: '666666'
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
// 18
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

const vedioHeight1 = ref(300);
const vedioHeight2 = ref(500);
// const autoPlayIndex = ref('');
// const timer = '';

const player = shallowRef([]);

const handleMounted = async (payload) => {
  player.value.push(payload.player);
  console.log('Basic player mounted', player.value);
  // console.log('plaer.value[0]', player.value[0]);
  // await player.value[0].play();
};

const handleEvent = (log) => {
  console.log('Basic player event', log);
};

const loadData = async $state => {
  // 书写add函数
  console.log('底部');
  // calling the api
};

const mouseOver = async (index) => {
  // console.log('videoRef', 111);
  // timer = setTimeout(() => {
  //   // autoPlayIndex.value = index;
  //   console.log('222', 222);
  // }, 1500);
  // // await player.value[0].play();
};

const mouseLeave = () => {
  // clearTimeout(timer);
  // console.log('222', 222);
};

</script>

<style scoped>
.home-page{
  :deep(.video-js .vjs-big-play-button) {
    visibility: hidden;
  }
}
</style>
