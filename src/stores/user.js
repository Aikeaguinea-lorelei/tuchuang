import {observable,action} from 'mobx'
import {Auth} from '../models/index.js'

class UserStore{
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