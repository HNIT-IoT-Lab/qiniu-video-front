import { post } from '@/utils/request';
/**
 * 获取用户信息
 *
 * @param phoneNumber 用户手机号
 * @param code 验证码
 */
export default async function postUserInfo (phoneNumber, code) {
  const response = await post('/user/userInfo', { phoneNumber, code });
  return response;
}
