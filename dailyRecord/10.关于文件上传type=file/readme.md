1. accept的值类型
---
```
1.accept="application/msexcel"
2.accept="application/msword"
3.accept="application/pdf"
4.accept="application/poscript"
5.accept="application/rtf"
6.accept="application/x-zip-compressed"
7.accept="audio/basic"
8.accept="audio/x-aiff"
9.accept="audio/x-mpeg"
10.accept="audio/x-pn/realaudio"
11.accept="audio/x-waw"
12.accept="image/gif"
13.accept="image/jpeg"
14.accept="image/tiff"
15.accept="image/x-ms-bmp"
16.accept="image/x-photo-cd"
17.accept="image/x-png"
18.accept="image/x-portablebitmap"
19.accept="image/x-portable-greymap"
20.accept="image/x-portable-pixmap"
21.accept="image/x-rgb"
22.accept="text/html"
23.accept="text/plain"
24.accept="video/quicktime"
25.accept="video/x-mpeg2"
26.accept="video/x-msvideo"
```
更多值类型移步这里：http://www.iana.org/assignments/media-types/media-types.xhtml

2. 上传多个文件，multiple属性，选择的时候按着 Ctrl键
---

```html
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8">
<title></title> 
</head>
<body>

<form action="demo-form.php">

  直接使用multiple，选择图片: <input type="file" name="img" multiple>
  <input type="submit">

  <br>使用multiple="multiple"，
  选择图片: <input type="file" name="img" multiple="multiple">
  <input type="submit">
</form>

<p>尝试选取一张或者多种图片。</p>

<p><strong>注意:</strong>  Internet Explorer 9及更早 IE 版本不支持 input 标签的 multiple 属性。</p>

</body>
</html>
```

3. 对于第四个例子的说明
- 美化input type=file
  - 当然原生的input可不是长的这个样子，这里我们其实是把input的透明度设置为0，然后用span标签来显示上传文件字样，然后把它们重叠到一块就行了。
- file对象
  - 这里我们获取到这个File对象之后就可以获取到上传文件的一些属性，比如：lastModified（代表文件的修改日期，而非上传日期）、name、size（单位是b）、type（例如图片就是"image/png"，然后我们可以根据image来判断是否是图片）等。

```
   var file = e.target.files[0];//获取File对象，这里是上传单张图片，[0]代表第一张图片。如果多张，就是一个var file = e.target.files;
    var type = file.type.split('/')[0];//按照惯例，不应该由前端判断格式，因为这里是根据后缀名判断的，修改后缀名仍旧可以上传，理应由后端根据文件格式来判断。
    if (type !='image') {
        alert('请上传图片');
        return;
    }
    var size = Math.round(file.size / 1024 / 1024);
    if (size > 3) {
        alert('图片大小不得超过3M');
        return;
    };
```

- fileReader对象
  - 可以看一下这里：https://developer.mozilla.org/en-US/docs/Web/API/FileReader
  - 不过归纳起来，我们依旧只需掌握几个重要的点，
    - readAsDataURL() 方法。//将文件读取为base64的格式，也就是可以当成图片的src
    - result 属性 //将读取的数据保存在result里。
    - progress 事件 //定时触发，来获取当前已上传文件的大小，如进度条
    - loade 事件 //文件上传完成时触发
    - loadend 事件 //文件上传完成时（不管成功、失败）触发
    - 其他的诸如：readAsBinaryString()方法，loadstart事件等，知道是什么意思就行了。可以参考（由于是三年前写的，有些不全，还是要以官方文档为准）。前人栽的树

```
   var reader = new FileReader(); //新建FileReader对象
    reader.readAsDataURL(file); //读取为base64
    //以下代码可以删除
    reader.onloadstart = function(){
        console.log('start');  //开始读取
    };
    reader.onprogress = function(e){
        //这个是定时触发的事件，文件较大的时候较明显
        var p = '已完成：' + Math.round(e.loaded / e.total * 100) + '%' ;
        $(".file_upload").find(".progress").html(p);
        console.log('uploading');  //文件较大，就会出现多个uploading
    };
    reader.onabort = function(){
        console.log('abort'); //用作取消上传功能
    };
    reader.onerror = function(){
        console.log('error'); //文件读取出错的时候触发，暂模拟不出
    };
    reader.onload = function(){
        console.log('load complete'); //完成
    };
    //预览代码，没在onload里面写的原因是我不想
    reader.onloadend = function (e) {
        var dataURL = reader.result，
            image = '<img src="'+dataURL+'"/>'， //预览图片
            text = '<span>"'+dataURL+'"</span>'; //测试预览text
        var name = file.name,size = Math.round(file.size / 1024);

        var div = '<p>Name: '+name+'</p><p>Size: '+size+'kb</p>';
        var imglist = '<div class="img_box"><span class="delete">X</span>'+image + div+'</div>';
     $(".img_holder").html(imglist);      
    };
```
如果一切还算顺利，那就要注意一下，删除预览图片可能存在某些问题，删除不仅仅要删除页面上展示的图片，input里面的图片也要清空，不然就会出问题。

4. 关于使用javascript-file-api实现文件上传（第六个实例）问题
---
这个实例存在问题，没时间研究了，后面再看
参考这里：http://blog.csdn.net/testcs_dn/article/details/8695532