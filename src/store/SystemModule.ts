import { VuexModule, Module, Action } from 'vuex-class-modules'
import PlatformType from '@/enum/PlatformType'
import { ProviderType, Provider } from '@/enum/ProviderType'
import GetSystemInfoResult = UniApp.GetSystemInfoResult
import { AppInitAPI } from '@/api/AppInitAPI'

@Module({ generateMutationSetters: true })
export class SystemModule extends VuexModule {
    // 条件编译属性
    isApp = false
    isMpWX = true
    isH5 = false
    isNH5 = true

    // 条件编译属性
    platform = PlatformType.android
    // 登录平台
    provider:Provider = 'qq'
    systemInfo:GetSystemInfoResult | undefined

    @Action
    appInit() {
        this.getSystemInfo()
        this.AppInitAPI()
    }
    @Action
    getSystemInfo() {
        // #ifdef APP-PLUS
        this.isApp = true
        this.platform = PlatformType.android
        // #endif

        // #ifdef MP-WEIXIN
        this.isMpWX = true
        this.provider = ProviderType.wx
        // #endif

        // #ifdef h5
        this.isH5 = true
        this.platform = PlatformType.h5
        // #endif

        //判断是否为ios平台
        const systemInfo:GetSystemInfoResult = uni.getSystemInfoSync()
        this.systemInfo = systemInfo
    }

    @Action
    AppInitAPI() {
        return AppInitAPI.getServerConfig()
    }

}