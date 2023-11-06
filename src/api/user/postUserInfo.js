import { post } from '@/utils/request';
/**
 * 获取用户信息
 *
 */
export default async function postUserInfo () {
  const response = await post('/user/userInfo');
  return response;
}
