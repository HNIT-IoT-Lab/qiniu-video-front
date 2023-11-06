import { get } from '@/utils/request';
/**
* 搜索页
* @param keyWord 关键字
*@returns
 */
export default async function getSearch (keyWord) {
  const response = await get('/article/search', { keyWord });
  return response;
}
