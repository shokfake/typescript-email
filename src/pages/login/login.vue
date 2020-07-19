<template>
  <view class="content">
    <view class="input-group">
      <text class="header">{{ $t('LOGIN.TITLE') }}</text>
      <view class="input-row">
        <text class="title">{{ $t('LOGIN.UID_TIPS') }}</text>
        <input class="m-input" type="text" clearable v-model="email" :placeholder="$t('LOGIN.UID_PLACE')" @focus="focusInput('email')" />
        <view class="password-icon"><i class="iconfont icon-icon_del" v-show="focusUserNameInput" @tap="clearInput('email')"></i></view>
      </view>
      <view class="input-row">
        <text class="title">{{ $t('LOGIN.PASSWORD_TIPS') }}</text>
        <input :type="!showPassword ? 'password' : 'text'" v-model="password" :placeholder="$t('LOGIN.PASSWORD_PLACE')" @focus="focusInput('password')" />
        <view class="password-icon">
          <i class="iconfont icon-icon_del" v-show="focusPasswordInput" @tap="clearInput('password')"></i>
          <i class="iconfont icon-iconeye" v-if="!showPassword" @tap="showPassword = true"></i>
          <i class="iconfont icon-iconeyedisable" v-else @tap="showPassword = false"></i>
        </view>
      </view>
    </view>
    <view class="btn-row">
      <button type="primary" class="primary-btn" @tap="toLogin">{{ $t('LOGIN.BTN') }}</button>
    </view>
    <view class="action-row">
    </view>
  </view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// interface DiaLog {
//   show: boolean;
//   content: string;
// }
// interface LoginParams {
//   sid: string;
//   uid: string;
//   password: string;
//   locale: string;
// }
// interface Crypt<T, U> {
//   n: T;
//   e: number;
// }
@Component({
    components: {}
})
export default class LoginVue extends Vue {

}
</script>

<style lang="scss" scoped>
.content {
  background-color: #ffffff;
  padding: 20rpx;
  .input-group {
    &::after,
    &::before {
      height: 0;
    }
    .header {
      font-size: 36rpx;
      display: block;
    }
    .input-row {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      margin-top: 30rpx;
      border-bottom: 1px solid #f1f1f1;
      background: #fff;
      position: relative;
      > input {
        width: 100%;
        padding-right: 80rpx;
        color: $uni-login-font-color;
      }
      .title {
        width: 100rpx;
        padding: 0;
      }
      .password-icon {
        position: absolute;
        right: 20rpx;
        display: flex;
        align-items: center;
        > i {
          font-size: 32px;
          color: $uni-login-font-color;
        }
      }
      .icon-icon_del {
        color: #d2d2d2 !important;
      }
    }
  }
  .btn-row .primary-btn {
    background-color: $uni-btn-bg-color;
  }
}
.action-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.action-row navigator {
  color: #007aff;
  padding: 0 10px;
}
</style>
