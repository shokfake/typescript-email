import { Module, VuexModule, Mutation } from 'vuex-class-modules'

interface UserAccount  {
    email:string;
    password: string;
}

@Module
export default class UserModule extends VuexModule {
    userAccout = new Map<string,string>()

    @Mutation
    SAVE_USER_ACCOUNT(user:UserAccount) {
        this.userAccout.set(user.email, user.password)
    }
}