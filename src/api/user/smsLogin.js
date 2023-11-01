import { post } from '@/utils/request';
/**
 * 验证码登陆
 *
 * @param phoneNumber 用户手机号
 * @param code 验证码
 */
export default async function smsLogin (phoneNumber, code) {
  const respons = await post('/user/login', { loginSign: 'PHONE_NUMBER_LOGIN_STRATEGY', phoneNumber, code });
  return respons;
}
