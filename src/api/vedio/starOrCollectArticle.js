import { get } from '@/utils/request';
/**
* 点赞、收藏视频
* @param articleId 文章id
* @param type 类型 LIKE / COllETION
* @returns
 */
export default async function startOrCollectArticle () {
  const response = await get('', { });
  return response;
}
