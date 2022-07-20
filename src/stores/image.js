import {observable,action,makeObservable} from 'mobx'
import {Uploader} from '../models/index.js'
import { message } from 'antd'

class ImageStore{
    constructor(){
        makeObservable(this)
    }
    // 默认状态
    @observable filename=''  // 文件名
    @observable file=null  // 点击调用的文件
    @observable isUploading=false
    @observable serverFile=null

    @action setFilename(newFilename){
        this.filename=newFilename
    }

    @action setFile(newFile){
        this.file=newFile
    }

    @action upload(){  // 上传图片函数
        this.isUploading=true
        this.serverFile=null
        return new Promise((resolve,reject)=>{
            Uploader.add(this.file,this.filename)
            .then((serverFile)=>{
                this.serverFile=serverFile
                resolve(serverFile)
            }).catch((error)=>{
                message.error('上传失败')
                reject(error)
            }).finally(()=>{
                this.isUploading=false
            })
        })
    }
    @action reset(){  // 重置页面数据的函数
        this.isUploading=false
        this.serverFile=null
    }
}

export default new ImageStore()