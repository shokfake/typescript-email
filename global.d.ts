import VueI18n, { IVueI18n } from "vue-i18n";

//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
    interface Vue {
        // $i18n: any;
        // $t:  IVueI18n.t;
        // $tc:  typeof IVueI18n.tc;
        // $te: typeof IVueI18n.te;
        // $d: typeof IVueI18n.d;
        // $n: typeof IVueI18n.n;
    }
}