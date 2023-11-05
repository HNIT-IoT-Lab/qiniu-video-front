import { get } from '@/utils/request';
/**
* 获取上下滚动视频的url，随机返回三条数据
*@returns
 */
export default async function getSwiperUrl () {
  const response = await get('/article/getVideoUrl');
  return response;
}
