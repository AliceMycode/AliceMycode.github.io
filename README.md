# Cesium

[![npm version](https://img.shields.io/npm/v/gcoord.svg)](https://www.npmjs.com/package/gcoord)
[![codecov](https://codecov.io/gh/hujiulong/gcoord/branch/master/graph/badge.svg)](https://codecov.io/gh/hujiulong/gcoord)
[![gzip size](http://img.badgesize.io/https://unpkg.com/gcoord/dist/gcoord.global.prod.js?compression=gzip)](https://unpkg.com/gcoord/dist/gcoord.global.prod.js)
[![LICENSE](https://img.shields.io/npm/l/gcoord.svg)](https://www.npmjs.com/package/gcoord)
[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)

cesium是一个基于JavaScript开发的WebGL三维地球和地图可视化库。它利用了现代Web技术，如HTML5、WebGL和WebAssembly，来提供跨平台和跨浏览器的三维地理空间数据可视化。Cesium的主要特点包括：

- 跨平台、跨浏览器：无需额外插件，即可在多种操作系统和浏览器上运行。
- 海量数据支持：Cesium定义了3D Tiles数据格式，支持大规模三维模型和地形数据的加载与渲染。

- 丰富的地图模式：支持三维、二维和哥伦布视图（2.5D），提供多种地图和地形图层选择。

- 交互功能：支持地址搜索、信息属性框等用户交互功能，以及全屏模型和WebVR虚拟现实体验。

更多信息可以阅读[官网](https://cesium.com/)

## 🚨 注意

在发布、展示、传播数据时，请务必遵守相关法律规定

> （禁止）未经批准，在测绘活动中擅自采用国际坐标系统 <br> — 中华人民共和国测绘法，40 (1)

> 导航电子地图在公开出版、销售、传播、展示和使用前，必须进行空间位置技术处理。<br> — GB 20263―2006《导航电子地图安全处理技术基本要求》，4.1

## 安装

```bash
yarn install 
```

## 运行

```bash
yarn run serve
```

## 打包

```bash
yarn run build
```

## LICENSE

MIT

[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[Error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

[GeoJSON]: https://tools.ietf.org/html/rfc7946#page-6



## 功能效果图

##### 1、自定义标注类

![5.jpg](https://pic1.58cdn.com.cn/nowater/webim/big/n_v22df14bfb2b7d43c4be2c1f1241299e84.jpg)

##### 2、椭圆类

![6.jpg](https://pic8.58cdn.com.cn/nowater/webim/big/n_v2554a57ff12d544688d484cbd2ec1955b.jpg)

##### 3、墙体类

![7.jpg](https://pic5.58cdn.com.cn/nowater/webim/big/n_v2123c732a476d4f8298ed168e155c3ed5.jpg)

##### 4、沿线运动类

![8.jpg](https://pic2.58cdn.com.cn/nowater/webim/big/n_v2213f0171b6e74e8caf87c900a0a2fb5a.jpg)

##### 5、剖面分析类

![9.jpg](https://img.picui.cn/free/2024/07/10/668e8d4235e33.jpg)

## 注意事项

##### 如果要做二次开发，需要去[天地图官网](http://lbs.tianditu.gov.cn/)注册一个账号并且创建一个应用并选择相应的API，系统会给你一个token，把下图目录对应的token换成你自己的token

![10.jpg](https://img.picui.cn/free/2024/07/10/668e8da2155e9.jpg)
