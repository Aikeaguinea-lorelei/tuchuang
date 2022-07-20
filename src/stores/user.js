import {observable,action, makeObservable} from 'mobx'
import {Auth} from '../models/index.js'

class UserStore{
    constructor(){
        makeObservable(this)
    }
    // 默认状态
    @observable currentUser=null

    @action pullUser(){  // 读取用户信息
        this.currentUser=Auth.getCurrent()
    }

    @action resetUser(){  // 注销用户信息
        this.currentUser=null
    }
}

export default new UserStore()