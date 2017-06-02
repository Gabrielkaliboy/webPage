查看：http://www.css88.com/archives/5206
1. 单行文本溢出
大家应该都知道用text-overflow:ellipsis属性来实现单行文本的溢出显示省略号(…)。当然部分浏览器还需要加宽度width属性。
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>单行超出隐藏</title>
	<style>
		.container{
			margin:100px auto;
			width:500px;
			background: #f0f0f0;
		}
		#main{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width:400px;
			background: #f0f;
		}
	</style>
</head>
<body>
	<div class="container">
		<div id="main">掘金是一个高质量的技术社区，从 ECMAScript 6 到 Vue.js，性能优化到开源类库，让你不错过前端开发的每一个技术干货。各大应用市场搜索「掘金」即可下载APP，技术干货尽在掌握..</div>
	</div>
</body>
</html>
```

2. WebKit浏览器或移动端的页面多行文本溢出
在WebKit浏览器或移动端（绝大部分是WebKit内核的浏览器）的页面实现比较简单，可以直接使用WebKit的CSS扩展属性(WebKit是私有属性)-webkit-line-clamp ；注意：这是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。

常见结合属性：
- display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
- -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
- text-overflow: ellipsis;，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 

这个属性比较合适WebKit浏览器或移动端（绝大部分是WebKit内核的）浏览器具体例子可以查看http://www.css88.com/webkit/-webkit-line-clamp/

**补充：-webkit-line-clamp**
- -webkit-line-clamp 是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
- 限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：
- display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
- -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
- text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>webkit浏览器或者移动端(webkit内核)</title>
	<style>
		.container{
			margin:100px auto;
			width:500px;
			background: #f0f0f0;
		}
		#main{
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	</style>
</head>
<body>
	<div class="container">
		<div id="main">掘金是一个高质量的技术社区，从 ECMAScript 6 到 Vue.js，性能优化到开源类库，让你不错过前端开发的每一个技术干货。各大应用市场搜索「掘金」即可下载APP，技术干货尽在掌握..</div>
	</div>
</body>
</html>
```

3. 跨浏览器兼容的方案(待定)
比较靠谱简单的做法就是设置相对定位的容器高度，用包含省略号(…)的元素模拟实现；
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>兼容解决方案</title>
	<style>
		.container{
			margin:100px auto;
			width:500px;
			background: #f0f0f0;
		}
		p {
		    position:relative;
		    line-height:1.4em;
		    /* 3 times the line-height to show 3 lines */
		    height:4.2em;
		    overflow:hidden;
		}
		p::after {
		    content:"...";
		    font-weight:bold;
		    position:absolute;
		    bottom:0;
		    right:0;
		    padding:0 20px 1px 45px;
		    background:url(http://css88.b0.upaiyun.com/css88/2014/09/ellipsis_bg.png) repeat-y;
		}
	</style>
</head>
<body>
	<div class="container">
		<p id="main">掘金是一个高质量的技术社区，从 ECMAScript 6 到 Vue.js，性能优化到开源类库，让你不错过前端开发的每一个技术干货。各大应用市场搜索「掘金」即可下载APP，技术干货尽在掌握掘金是一个高质量的技术社区，从 ECMAScript 6 到 Vue.js，性能优化到开源类库，让你不错过前端开发的每一个技术干货。各大应用市场搜索「掘金」即可下载APP，技术干货尽在掌握</p>
	</div>
</body>
</html>
```

**这里需要注意**
- height高度真好是line-height的3倍；
- 结束的省略好用了半透明的png做了减淡的效果，或者设置背景颜色；
- IE6-7不显示content内容，所以要兼容IE6-7可以是在内容中加入一个标签，比如用<span class="line-clamp">...</span>去模拟；
- 要支持IE8，需要将::after替换成:after；

4. javascript解决方案
用js也可以根据上面的思路去模拟，实现也很简单，推荐几个做类似工作的成熟小工具：
- Clamp.js

下载及文档地址：https://github.com/josephschmitt/Clamp.js

- jQuery插件-jQuery.dotdotdot