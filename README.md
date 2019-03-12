# jquery-upload-file
jquery文件上传插件


## How to use


input[type=file]   onchange时执行下面的方法
```js
/**
 * 上传附件数据
 */
function upload(id,pId,type,fileType,fn){
    attachment.nowUpLoadIsFinish = false
    uploadFile({
        id: '#'+id,  // 上传按钮id
        type: fileType,  // 上传文件的后缀名
        maxSzie: 20 * 1024,       // 文件最大大小，单位KB
        progressCtn: '#' + pId,  // 显示进度条的容器id，样式自己写
        url: attachmentDomain + '/minstone/attachment/uploadFileList',
        nameMaxLen:80,    //名字最长字符数
        data: {   // 要带过去的参数

        },
        // 上传成功后执行
        success: function (data) {

        }
    })
}




// 预览


            previewImage(){
                let files = document.getElementById('uploadZJ').files
                for (let i = 0;i<files.length;i++){
                    this.fileList.push(files[i]);
                    console.log(this.fileList)
                    let reader = new FileReader();
                    //读取文件过程方法
                    reader.onloadstart = (e) => {
                        console.log("开始读取....");
                    }
                    reader.onprogress = (e) => {
                        console.log("正在读取中....");
                    }
                    reader.onabort = (e) => {
                        console.log("中断读取....");
                    }
                    reader.onerror = (e) => {
                        console.log("读取异常....");
                    }
                    reader.onload = (e) => {
                        console.log("成功读取....");
                            let src = e.target.result;
                            this.fileListP.push(src)
                    }

                    reader.readAsDataURL(files[i])
                }
            },


```
