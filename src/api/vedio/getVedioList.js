import { get } from '@/utils/request';
/**
* 请求首页视频接口
  @param  currentPage :1,
  @param  pageSize :10,
*@returns
 */
export default async function getVedioList (currentPage = 1, pageSize = 10) {
  const response = await get('/article/getArticleList', { currentPage, pageSize });
  return response;
}
