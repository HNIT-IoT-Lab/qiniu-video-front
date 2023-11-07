import { get } from '@/utils/request';
/**
* 点赞、收藏视频
* @param articleId 文章id
* @param type 类型 LIKE / COllETION
@param isok bool
* @returns
 */
export default async function startOrCollectArticle (articleId, type, isok) {
  const response = await get('/article/starOrCollectArticle', { articleId, type, isok });
  return response;
}
