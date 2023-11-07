<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {postUserInfo, sendSms, smsLogin} from '@/api/user';
import {useUserStore} from '@/store/user';
import {useRoute, useRouter} from 'vue-router';
import {Message} from '@arco-design/web-vue';

const isgx = ref(false); // 大div的类名
const istxr = ref(false);
const ishidden = ref(false);
const istxl = ref(false);
const isz = ref(false);
const codeDisabled = ref(false); // 验证码按钮禁用
const isSendCode = ref(false);
const form = reactive({
  phoneNumber: '',
  code: ''
});

const store = useUserStore();
const route = useRoute();
const router = useRouter();

const toggle = (className) => {
  className.value = !className.value;
};

const changeForm = () => {
  console.log('改变');
  isgx.value = true;
  setTimeout(() => {
    isgx.value = false;
  }, 1500);
  //   istxr.value = !istxr.value;
  //   ishidden.value = !ishidden.value;
  toggle(istxr); // 大的switch-ctn 东西切换
  toggle(ishidden);
  toggle(istxl);
  toggle(isz);
};

const sendCode = async () => {
  if (!form.phoneNumber) return null;
  codeDisabled.value = true;
  setTimeout(() => {
    codeDisabled.value = false;
    isSendCode.value = true;
    // console.log('keyi');
  }, 30000);
  //   console.log('form.phoneNumber', form.phoneNumber);
  await sendSms(form.phoneNumber);
  isSendCode.value = true;
};
const getUserInfo = async () => {
  const res = await postUserInfo();
  console.log('getUserInfo', res);
  // store.setUserInfo(res1.data);
  store.setUserInfo(res);
};

const getLoginBtn = async () => {
  if (!form.phoneNumber || !form.code) return null;
  const res = await smsLogin(+form.phoneNumber, form.code);
  // console.log('res 登录yonghu', res1);
  Message.success('恭喜您登录成功')
  store.setToken(res.token);
  await router.push({
    path: (route.query.returnUrl as string) ? (route.query.returnUrl as string) : '/'
  });
  await getUserInfo()
};

const getRegisterBtn = (e) => {
  e.preventDefault();
  console.log('注册');
};
onMounted(() => {

});

</script>

<template>
  <div class="login-page">
    <div class="shell">

      <div :class="['container', 'a-container',istxl ? 'is-txl':'']" id="a-container">
        <form action="" method="" class="form" id="a-form">
          <h2 class="form_title title">登录</h2>
          <div class="form_icons">
            <i class="iconfont icon-QQ"></i>
            <i class="iconfont icon-weixin"></i>
            <i class="iconfont icon-bilibili-line"></i>
          </div>
          <span class="form_span">手机验证码登录</span>
          <!-- <input type="text" class="form_input" placeholder="手机号"/>
          <input type="text" class="form_input" placeholder="Password"/>
          <a class="form_link">忘记密码？</a>
          <button class="form_button button submit" @click="getLoginBtn">登录</button> -->
          <a-form :model="form" :style="{ width: '600px' }" @submit="getLoginBtn">
            <a-form-item field="phoneNumber">
              <a-input
                  v-model="form.phoneNumber"
                  placeholder="手机号"
                  class="form_input phoneNumber"
              />

            </a-form-item>
            <a-form-item field="code" class="code-item">
              <a-input v-model="form.code" placeholder="验证码" class="form_input"/>
              <a-link @click="sendCode" class="form_link code" :disabled="codeDisabled">
                {{ isSendCode ? '已发送' : '发送验证码' }}
              </a-link>
            </a-form-item>
            <a-form-item>
              <a-link href="link" class="form_link forget-pwd">忘记密码？</a-link>
            </a-form-item>
            <!-- <a-form-item>
                <a class="form_link">忘记密码？</a>
            </a-form-item> -->
            <a-form-item class="loginItem">
              <a-button class="form_button button submit login" html-type="submit">登录</a-button>
            </a-form-item>
          </a-form>
        </form>
      </div>
      <div :class="['container','b-container',istxl ? 'is-txl':'',isz ? 'is-z': '']" id="b-container">
        <form action="" method="" class="form" id="a-form">
          <h2 class="form_title title">创建账号</h2>
          <div class="form_icons">
            <i class="iconfont icon-QQ"></i>
            <i class="iconfont icon-weixin"></i>
            <i class="iconfont icon-bilibili-line"></i>
          </div>
          <span class="form_span">选择注册方式活电子邮箱注册</span>
          <input type="text" class="form_input" placeholder="Name"/>
          <input type="text" class="form_input" placeholder="Email"/>
          <input type="text" class="form_input" placeholder="Password"/>
          <button class="form_button button submit" @click="getRegisterBtn">注册</button>
        </form>
      </div>
      <!-- 点击 is-gx -->
      <div :class="['switch',isgx ? 'is-gx': ''
                          ,istxr ? 'is-txr': '']" id="switch-cnt">
        <div :class="['switch_circle',istxr ? 'is-txr': '']"></div>
        <div :class="['switch_circle','switch_circle-t',istxr ? 'is-txr': '']"></div>
        <!-- switch-c2 -->
        <div :class="['switch_container', ishidden ? '':'is-hidden']" id="switch-c2">
          <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
          <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
          <button class="switch_button button switch-btn" @click="changeForm">登录</button>
        </div>
        <!-- switch-c1 -->
        <div :class="['switch_container',ishidden ? 'is-hidden':'']" id="switch-c1">
          <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
          <p class="switch_description description">去注册一个账号吧，让我们一起探索奇妙的旅途！</p>
          <button class="switch_button button switch-btn" @click="changeForm">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/icon/loginFont/iconfont.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* 字体无法选中 */
  user-select: none;
}

.login-page {
  --font--color: #a0a5a8;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: #ecf0f3;
  color: #a0a5a8;

  .shell {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
  }

  /* 设置响应式 */
  @media (max-width: 1200px) {
    .shell {
      transform: scale(0.7);
    }
  }

  @media (max-width: 1000px) {
    .shell {
      transform: scale(0.6);
    }
  }

  @media (max-width: 800px) {
    .shell {
      transform: scale(0.5);
    }
  }

  @media (max-width: 600px) {
    .shell {
      transform: scale(0.4);
    }
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: 1.25s;
  }

  .form {
    display: flex;
    justify-content: center;

    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  :deep(.form) {
    align-items: center;
  }

  .iconfont {
    margin: 0 5px;
    border: rgba(0, 0, 0, 0.5) 2px solid;
    border-radius: 50%;
    font-size: 25px;
    padding: 3px;
    opacity: 0.5;
    transition: 0.1s;
  }

  .iconfont:hover {
    opacity: 1;
    transition: 0.15s;
    cursor: pointer;
  }

  .form_input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
  }

  .form_input:focus {
    box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
  }

  .form_span {
    margin-top: 30px;
    margin-bottom: 12px;
  }

  // link 的标准样式
  .form_link {
    box-sizing: border-box;
    color: #181818;
    font-size: 15px;
    // margin-top: 25px;
    // line-height: 2;
  }

  .code-item {
    position: relative;
  }

  .code {
    position: absolute;
    top: 50%;
    right: 150px;
    transform: translateY(-50%);
    color: var(--font--color);
  }

  .forget-pwd {
    margin-top: 25px;
  }

  .arco-link:hover {
    color: #95b0c5;
    background-color: #ecf0f3;
  }

  .title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
    letter-spacing: 10px;
  }

  .description {
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
  }

  .button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: #4B70E2;
    color: #f9f9f9;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    border: none;
    outline: none;
  }

  .a-container {
    z-index: 100;
    left: calc(100% - 600px);
  }

  .b-container {
    left: calc(100% - 600px);
    z-index: 0;
  }

  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
  }

  .switch_circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: #ecf0f3;
    box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
  }

  .switch_circle-t {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
  }

  .switch_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;
    transition: 1.25s;
  }

  .switch_button {
    cursor: pointer;
  }

  .switch_button:hover,
  .submit:hover {
    box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
  }

  // 登录
  :deep(.loginItem .arco-form-item-content-flex) {
    position: relative;
  }

  .login {
    position: absolute;
    left: 20%;
  }

  .switch_button:active,
  .switch_button:focus {
    box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
    transform: scale(0.97);
    transition: 0.25s;
  }

  .is-txr {
    left: calc(100% - 400px);
    transition: 1.25s;
    transform-origin: left;
  }

  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }

  .is-z {
    z-index: 200;
    transition: 1.25s;
  }

  .is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
  }

  .is-gx {
    animation: is-gx 1.25s;
  }

  @keyframes is-gx {

    0%,
    10%,
    100% {
      width: 400px;
    }

    30%,
    50% {
      width: 500px;
    }
  }
}

</style>
