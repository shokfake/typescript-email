<script lang="ts">
    import Vue from 'vue';
    import { systemModule } from '@/store'
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
            systemModule.appInit()
        }
    });
</script>

<style>
    /*每个页面公共css */
</style>
