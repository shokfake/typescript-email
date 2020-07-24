<script lang="ts">
    import Vue from 'vue';
    import { systemModule } from '@/store'
    import defaultConfig from '@/config/serverConfig'
    import { AppInitAPI } from '@/api/AppInitAPI'
    export default Vue.extend({
        globalData: {
            defaultConfig,
        },
        mpType: 'app',
        onLaunch() {
            AppInitAPI.getServerConfig()
        }
    });
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@import '@/assets/css/fonts/iconfont.css';
@import '@/uni.scss';
</style>