<template>
  <view class="content">
    <view class="input-group">
		<view class="header">
		{{ LOGIN.TITLE }}
		</view>
      <u-form :model="loginForm" ref="uForm" :error-type="loginForm.errorType">
        <u-form-item label-position="left" :label="LOGIN.UID_TIPS" prop="email">
          <u-input v-model="loginForm.email" :placeholder="LOGIN.UID_PLACE" type="text" />
        </u-form-item>

        <u-form-item label-position="left" :label="LOGIN.PASSWORD_TIPS" prop="password">
          <u-input
            type="password"
            v-model="loginForm.password"
            :placeholder="LOGIN.PASSWORD_PLACE"
          />
        </u-form-item>
      </u-form>
    </view>

    <view class="input-row save-username">
      <u-checkbox-group>
        <u-checkbox @change="checkSaveUserName" v-model="saveUsername">
          &nbsp;
          <text>{{LOGIN.REMEMBER_USERNAME}}</text>
        </u-checkbox>
      </u-checkbox-group>
    </view>
    <view class="btn-row">
      <u-button
        type="primary"
        class="primary-btn"
        @click="toLogin"
        shape="square"
        :plain="true"
        :loading="loginBtn.loading"
      >{{LOGIN.BTN}}</u-button>
    </view>
    <view class="action-row">
      <!-- <navigator url="../reg/reg">手机号登录</navigator> -->
    </view>
	<view class="buttom">
		<view class="loginType">
			<view class="wechat item">
				<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
				微信
			</view>
			<view class="QQ item">
				<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
				QQ
			</view>
		</view>
		<view class="hint">
			登录代表同意
			<text class="link">用户协议、隐私政策，</text>
			并授权使用您的Outlook Email账号信息（如昵称、头像、收获地址）以便您统一管理
		</view>
	</view>
  </view>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { VForm } from '@/model/VFormVO'
import { userModule } from '@/store'
import StorageUtil from '../../utils/StoregeUtil'
import { CryptUtil } from '@/utils/CryptUtil'
import { Crypt } from '@/const/CryptType'
import UniUtil from '../../utils/UniUtil'
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

@Component({})
export default class LoginVue extends Vue {
  loginForm = {
    email: '',
    password: '',
	errorType: ['message']
  }
  rules = {
    email: [
      {
        required: true,
        message: '请输入账号',
        trigger: ['blur']
      }
    ],
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }
    ]
  }
  saveUsername = true
  loginBtn = {
    loading: false
  }
  crypt:Crypt = {
	n: '',
	e: ''
  } // 加密密码
  logoSrc =  require('@/static/logo.png')

  onReady() {
    (this.$refs.uForm as VForm).setRules(this.rules)
  }
  get LOGIN() {
    return this.$t('LOGIN')
  }
  checkSaveUserName(e: any) {
    this.saveUsername = e.value
  }
  toLogin() {
    (this.$refs.uForm as HTMLFormElement).validate((valid: any) => {
      if (valid) {
		  // 是否存储用户名和密码
		  this.storageUserAccout()
		  const reqParam = this.getLoginReqParam()
		  // 密码是否需要加密
		  if(this.crypt.n && this.crypt.e) {
			  const { n , e } = this.crypt
			  reqParam.password = CryptUtil.RSAEncrypt(reqParam.password, n, e)
		  }
		  const SIGNING_IN = (this.LOGIN as any).SIGING_IN
		  UniUtil.showLoading(SIGNING_IN)
		  

      }
    })
  }
  storageUserAccout() {
	if(this.saveUsername) {
		const data = {
			email: this.loginForm.email,
			password: this.loginForm.password
		}
		userModule.SAVE_USER_ACCOUNT(data)
	}
  }

  getLoginReqParam() {
	return  {
		sid: StorageUtil.get('sid'),
		uid: this.loginForm.email,
		password: this.loginForm.password,
		locale:  'zh_CN'
	}
  }
}
</script>

<style lang="scss" scoped>
.content {
  background-color: #ffffff;
  padding: 20rpx;
  .input-group {
	.header {
		font-size: 26px;
		display: block;
		margin: 30rpx 0rpx;

	}
  }
  .save-username {
    margin: 20rpx auto 30rpx;
    color: #aaa;
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

.buttom {
	.loginType {
		display: flex;
		padding: 280rpx 150rpx 100rpx 150rpx;
		justify-content:space-between;
		
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: $u-content-color;
			font-size: 28rpx;
		}
	}
	
	.hint {
		padding: 20rpx 40rpx;
		font-size: 20rpx;
		color: $u-tips-color;
		
		.link {
			color: $u-type-warning;
		}
	}
}
</style>