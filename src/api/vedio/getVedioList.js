import { post } from '@/utils/request';
/**
* 请求首页视频接口，分页查询
  @param  currentPage :1,
  @param  pageSize :10,
*@returns
 */
export default async function getVedioList (currentPage, pageSize) {
  const response = await post('/article/getArticleList', { currentPage, pageSize });
  return response;
}
