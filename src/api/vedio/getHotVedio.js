import { get } from '@/utils/request';
/**
* 获取热门视频
*@returns
 */
export default async function getHotVedio () {
  const response = await get('/article/getHotArticle');
  return response;
}
