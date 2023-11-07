import { get } from '@/utils/request';
/**
* 搜索页
* @param keyword 关键字
*@returns
 */
export default async function getSearch (keyword) {
  const response = await get('/article/search', { keyword });
  return response;
}
