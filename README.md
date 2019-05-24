# wepy-f2

F2的在微信小程序原生和wepy框架下的插件，支持F2的所有功能，欢迎拍砖优化

## 快速体验在wepy的使用效果

* 微信扫码体验
 先别扫呢，打算放公司我负责的小程序，一想有点怕被人有打广告，，😂，，，稍后在贴一下自己的小程序吧，

 ***
 本文参考了微信小程序的自定义组件的结构与[echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin) 的封装思路，同样吸收了wepy的调用原生组件的方式

最最关键是借鉴了antvis/wx-f2 https://github.com/antvis/wx-f2/tree/custom-component, 感谢以上项目coder的奉献，站在的巨人的肩膀上就是一个字，爽。

## 快速使用流程

 书归正传
 1. 下载本项目，放到自己的项目的一个路径下，我就选了pages同级的目录了。提供一下我的目录供大家参考

```bash
src__
	├─ components
	├── mixins
	├── pages                			 // pages 在wepy生成的下的
	│   ├── pageA
	│   ├── pageB
	│   ├── pageC
	│   └── pageD                 
	│       ├── pageD-a.wpy  
	│       ├── pageD-b.wpy           
	│       └── pageD-c.wpy          
	├── wepy-f2 
	│                       // wepy-f2，如果下载的是wepy-f2-master,你就把文件夹名的master去掉
	├── static
```
 2. 在你所要用的wpy里，要做一下重要配置即可

	** Step1 页面config 和import f2

	```js
	 import F2 from '@/wepy-f2/lib/f2'。
	 // 下文会用到F2，第一步先引进来
	 // config的配置
	 config = {
	 	"usingComponents": {
	 		"wepy-f2": "../../../wepy-f2/wepy-f2"
	 	}
	 }
  	```
  	** Step2 template里


	```js
	 // template
	 <template>
	 	<wepy-f2 id="mycanvas" canvas-id="column" ></wepy-f2>  
	 	// id='mycanvas' 是你要自定义的，一定要定义不要名字去，此id 必须填写
	 	// 如果想要更改大小的生成的图的大小，也就是canvas大小，可以继续看
	 	<wepy-f2 id="mycanvas" canvas-id="column" width="500" height="500" ></wepy-f2>  // 这是长宽都是px单位
	 </template>
	 
  	```
  	在这一步里，**就是id最重要，为了区分页面多个情况，请设置`id`，一定要设置不一样的id， 一定要，重要的事情说多了就是管用**

  	 ** Step3 在methods方法外，记住是initChart 跟methods同级，它不在methods = {}中。
		```js
		// initchart里写自己要用的图形配置什么的，详情请参考 f2的api https://www.yuque.com/antv/f2/api-index		
	 	initChart(canvas, width, height, soucreData) {
	 		let chart = null  
		    chart = new F2.Chart({
		      el: canvas,
		      width,
		      height
		    });
		    chart.source(soucreData, {
		      date: {
		        formatter: function (val) {
		          return val.slice(val.indexOf('-') + 1)
		        },
		        range: [0,1]
		      },
		      score: {
		      }
		    });
		    chart.axis('date', {
		       grid: {
		         lineDash: null,
		         stroke: '#e8e8e8',
		         lineWidth: 1
		       }
		     }) // 坐标轴配置
		    chart.tooltip({
		      showCrosshairs: true
		    })
		    chart.line({connectNulls: true}).position('date*score').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF')
		    chart.area().position('date*score').color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
		    chart.point().position('date*score').color('red')
		    chart.render();
	    	return chart
	    }
  	```
  

	** Step4 前三都是为此步调用而存
	
	  * 可以在methods里的方法调用，也可以在methods的同级调用， 不管在哪里请用，按照以下调用

	 
		```js
	 // 调用放法 
	this.$wxpage.selectComponent('#mycanvas').init(this.initChart, sourceData)
	this.$wxpage.selectComponent('#mycanvas') ‘#mycanvas’是选择在第二步里的id，我再次又一次提及，这个id很重要吧！！
	init(this.initChart, sourceData), initChart这个函数方法携带了chart的配置，sourceData携带了原数据
	 
  	```










