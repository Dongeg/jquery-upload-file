// 文件上传
function uploadFile(params) {
    if (!params.url || !params.id){
        console.error('上传路径和id是必填的！')
        return
    }
    let formData = new FormData();
    let maxSize = params.maxSize * 1000 || 1024 * 1000
    let type = params.type
    let fileList = document.getElementById(params.id).files
    if (!fileList[0]) {
        return
    }
    for (let k in params.data) {
        formData.append(k, params.data[k])
    }
    console.log(fileList)
    for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].size > maxSize) {
            console.error('上传文件大小超了！')
            return
        }
        if (type) {
            let suffix = fileList[i].name.substr(fileList[i].name.lastIndexOf(".")+1)
            let result = new RegExp(suffix,'i').test(type)
            if (!result) {
                console.error('上传的文件格式有毛病！')
                return
            }
        }
        formData.append("file", fileList[i]);
    }

    let xhr = new XMLHttpRequest();
    xhr.open('post', params.url);
    xhr.send(formData);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let res = JSON.parse(xhr.responseText)
            params.success && params.success(res)
        }
        else {
            let res = JSON.parse(xhr.responseText)
            params.error && params.error(res)
        }
    };
    function uploadFailed(evt) {
        params.error && params.error(evt)
    }
}

export default uploadFile
