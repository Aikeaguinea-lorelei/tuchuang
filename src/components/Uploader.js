import React,{ useRef } from 'react'
import { useStores } from '../stores'
import { observer,useLocalStore } from 'mobx-react'
import { InboxOutlined } from '@ant-design/icons';  // 图标
import { message, Upload, spin } from 'antd';  // spin: 加载中
import styled from 'styled-components'

const { Dragger } = Upload;
const Result=styled.div`
    margin-top:30px;
    border:1px dashed #ccc;
    padding:20px;
    background-color:#fafafa;
`;
const H1=styled.h1`
    margin:20px 0;
    text-align:center;
`;
const Image=styled.img`
    max-width:300px;
`;
const H2=styled.h2`
    color:grey;
`

const Component=observer(()=>{
    const { ImageStore, UserStore }=useStores()
    const ref1=useRef()  // 根据标记取到input中上传的宽/高
    const ref2=useRef()
    const bindWidthChange=()=>{  // change时,调用该函数
        store.setWidth(ref1.current.value)  // 给setWidth()传入宽
    }
    const bindHeightChange=()=>{
        store.setHeight(ref2.current.value)  // 给setHeight()传入高
    }
    const store=useLocalStore(()=>({  // 返回的是对象,所以要括号
        // 宽部分
        width:null,
        setWidth(width){  // 拿到宽,处理成url字段
            store.width=width
        },
        get widthStr(){
            return store.width ? `/w/${store.width}` : ''
        },

        // 高部分
        height:null,
        setHeight(height){  // 拿到高,处理成url字段
            store.height=height
        },
        get heightStr(){
            return store.height ? `/h/${store.height}` : ''
        },
        // 图片地址后面 + 宽高的字段就是  变尺寸后的图片的url
        get fullStr(){
            return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
        }
    }))
    const props = {
        showUploadList:false,
        beforeUpload:(file)=>{
            ImageStore.setFile(file)  // 上传文件
            ImageStore.setFilename(file.name)  // 上传文件名
            if(UserStore.currentUser===null){
                message.warning('请先登录再上传')
                return false
            }

            window.file=file
            // 格式判断: 如果不是以这些后缀结尾(忽略大小写)
            if(!/(svg$)|(png$)|(jpeg$)|(gif$)/ig.test(file.type)){
                message.error('只能上传png/svg/jpg/GIF格式的图片')
                return false
            }
            // 大小判断:
            if(file.size > 1024*1024){
                message.error('只能上传小于1M的图片')
                return false
            }

            ImageStore.upload()
                .then((serverFile)=>{
                    console.log('上传成功')
                    console.log(serverFile)
                }).catch(()=>{
                    console.log('上传失败')
                })
            return false
        }
    }    
    return(
        <div>
            {/* spin:正在加载 的组件  tip:文字 */}
            <spin tip="loading..." spinning={ImageStore.isUploading}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    点击此处或者拖拽到此处上传图片
                </p>
                <p className="ant-upload-hint">
                    仅支持.png/.gif/.jpg/.svg格式的图片,图片不能超过1M 
                </p>
            </Dragger>
            </spin>
            {
                ImageStore.serverFile ? <Result>
                    <H1>上传结果</H1>
                    <dl>
                        <H2>线上地址:</H2>
                        <dd>
                            <a target="_blank" herf={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
                        </dd>
                        <H2>文件名:</H2>
                        <dd>{ImageStore.filename}</dd>
                        <H2>图片预览:</H2>
                        <dd>
                            <Image src={ImageStore.serverFile.attributes.url.attributes.url}/>
                        </dd>
                        <H2>更多尺寸:</H2>
                        <dd>
                            <input ref={ref1} onChange={bindWidthChange} placeholder='最大宽度(可选)'/>
                            <input ref={ref2} onChange={bindHeightChange} placeholder='最大高度(可选)'/>
                        </dd>
                        <dd>
                            {/* 展示上面得到的fullStr */}
                            <a target="_blank" herf={store.fullStr}>{store.fullStr}</a>
                        </dd>
                    </dl>
                </Result> : null
            }
        </div>
    )
})

export default Component