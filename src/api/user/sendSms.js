import { post } from '@/utils/request';
/**
 * 验证码发送
 *
 * @param phoneNumber 用户手机号
 */
export default async function sendSms (phoneNumber) {
  const response = await post('/user/sendSmsCode', { phoneNumber });
  return response;
}
