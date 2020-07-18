import http from '@/plugins/http'

export class AppInitAPI {
    static getServerConfig() {
        return http.get('/coremail/cmcu_addon/hxpInit.jsp?type=custom')
    }
}