import { post } from '@/utils/request';
/**
* 获取用户收藏夹
*@returns
 */
export default async function getCollectArticle () {
  const response = await post('/article/getCollectArticle');
  return response;
}
