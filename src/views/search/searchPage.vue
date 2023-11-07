<script setup>
import { Waterfall } from 'vue-waterfall-plugin-next';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import { ref, shallowRef, onMounted } from 'vue';
import 'vue-waterfall-plugin-next/dist/style.css';
import { useRoute } from 'vue-router';
import { getSearch } from '@/api/vedio';

const contentList = ref([]); // 视频数据
const vedioHeight1 = ref(300);
const vedioHeight2 = ref(300);
const route = useRoute();
const isShow = ref(false);

const getSearchContent = async () => {
  console.log('route', route);
  console.log('route.content', route.query.content);
  const keyword = route.query.content;
  const res = await getSearch(keyword);
  console.log('res', res);
  if (res.searchHits.length !== 0) {
    contentList.value = res.searchHits;
    isShow.value = true;
  }
};
onMounted(() => {
  getSearchContent();
});

</script>

<template>
    <div class="search-page">
        <div v-if="!isShow"> 暂时没有找到呢....</div>
        <div v-else>
            <div class="content">
                <Waterfall :list="contentList" :width="370" style="">
                    <template #item="{ item, url, index }">
                        <div class="card" :style="{'height':(index%2===0)? `${vedioHeight1}px`:`${vedioHeight2}px`}" style="background-color:#dfecf9;border-radius: 14px;">
                            <div>
                                <video-player
                                    ref="videoRef"
                                    :src="item.urlList[0]"
                                    :width="370"
                                    :height="((index%2===0)?vedioHeight1:vedioHeight2)-100"
                                    :poster="item.poster"
                                    controls
                                    :loop="true"
                                    :volume="0.6"
                                    @mounted="handleMounted"
                                />
                            </div>
                            <div class="text" style="height: 100px;padding-left: 20px;">
                                <h3> {{ item.title }} </h3>
                                <p style="margin-top: 20px; color: #999;">{{ item.content }}</p>
                            </div>
                        </div>
                    </template>
                </Waterfall>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped></style>
