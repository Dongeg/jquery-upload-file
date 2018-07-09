function uploadFile(obj) {
    var formData = new FormData();  //创建FormData 对象用于存储数据
    var maxSize = obj.maxSzie || 9999999999999999;  // 文件最大容量
    maxSize = maxSize * 1000;  // 将单位转化成 B


    var type = obj.type;  //规定的文件的类型

    var fileList = $(obj.id).get(0).files;    // 获取上传的文件对象
    console.log(fileList)
    if(!fileList[0]){
        attachment.nowUpLoadIsFinish = true;
        return
    }


    for(var k in obj.data){   // 将附带参数放入formData对象中
        formData.append(k,obj.data[k]);
    }

    for(var i=0; i< fileList.length; i++){   //判断上传的文件是否符合需求，然后将文件也放入formData对象中
        if (fileList[i].size > maxSize){
            layer.msg('单个文件大小不得大于规定值！',{icon:0})
            attachment.nowUpLoadIsFinish = true;
            return
        }
        if (fileList[i].name.length > obj.nameMaxLen){
            layer.msg('上传文件名不得超过'+obj.nameMaxLen+'个字符！',{icon:0})
            attachment.nowUpLoadIsFinish = true;
            return
        }
        var thisFileType1 = (fileList[i].type.split('/'))[0]
        var thisFileType2 = (fileList[i].type.split('/'))[1]
        var result1 = new RegExp(thisFileType1).test(type)
        var result2 = new RegExp(thisFileType2).test(type)
        if (!result1 || !result1){
            layer.msg('请上传指定格式的文件！',{icon:0})
            attachment.nowUpLoadIsFinish = true;
            return
        }
        formData.append("file" , fileList[i] );
    }
    this.nowUpLoadIsFinish = false;
    // 上传数据
    $.ajax({
        type:'post',
        dataType:'json',
        url:obj.url,
        data:formData,
        contentType: false,
        processData: false,
        xhr: function(){ // 获取原生的xhr对象
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.upload.addEventListener("progress", onprogress, false);  // 监听上传进度
            xhr.addEventListener("error", uploadFailed, false);    // 监听上传失败
            return xhr;
        },
        success: function (data) {
            if(data && data[0]){
                obj.success(data);
                attachment.nowUpLoadIsFinish = true;
            }

        },
    });

    function uploadFailed(evt) {
        obj.error()
    }
    /**
     * 侦查附件上传情况,生成进度条
     */
    function onprogress(evt){
        var loaded = evt.loaded;       //已经上传大小情况
        var tot = evt.total;       //附件总大小
        var per = Math.floor(100*loaded/tot);   //已经上传的百分比
        $(obj.progressCtn).css("width" , per +"%");
        $(obj.progressCtn).html( per +"%" );
    }
}
