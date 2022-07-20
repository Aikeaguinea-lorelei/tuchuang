import {observable,action, makeObservable} from 'mobx'
import { message } from 'antd'
import { Uploader } from '../models'

class HistoryStore{
    constructor(){
        makeObservable(this)
    }
    @observable list=[]
    @observable isLoading=false
    @observable hasMore=true  // 是否有更多(待加载)数据
    @observable page=1
    limit=10  // 不变的值直接写

    @action append(newList){  // 获得到新list后把它接在原list后面
        this.list=this.list.concat(newList)
    }
    @action find(){
        this.isLoading=true
        Uploader.find({page:this.page, limit:this.limit})
            .then(newList=>{
                this.append(newList)
                this.page++
                if(newList.length<this.limit){
                    this.hasMore=false
                }
            }).catch(error=>{
                message.error('加载失败')
            }).finally(()=>{
                this.isLoading=false
            })
    }
    // 当调用reset()时,恢复成原始数据
    @action reset(){
        this.list=[]
        this.isLoading=false
        this.hasMore=true
        this.page=0
    }
}

export default new HistoryStore()