## 项目简介

##### 调用讯飞星火对话大模型实现API自己的chatgpt。

## 技术栈

- ##### 前端框架：[uni-app](https://uniapp.dcloud.net.cn/) (Vue3 + TS + Setup)
- ##### 云函数：[uniCloud-aliyun](https://doc.dcloud.net.cn/uniCloud/)

## 运行程序

1. ##### 安装依赖

```shell
# npm
npm i --registry=https://registry.npmmirror.com

# pnpm
pnpm i --registry=https://registry.npmmirror.com
```

2. ##### 运行程序

```shell
# 微信小程序端
npm run dev:mp-weixin

# H5端
npm run dev:h5

# App端
需 HbuilderX 工具，运行 - 运行到手机或模拟器
```

3. ##### 微信开发者工具导入 `/dist/dev/mp-weixin` 目录

## 工程结构解析

```
├── .husky                     # Git Hooks
├── .vscode                    # VS Code 插件 + 设置
├── dist                       # 打包文件夹（可删除重新打包）
├── src                        # 源代码
│   ├── pages                  # 主包页面
│       ├── index              # 首页
│   ├── static                 # 存放应用引用的本地静态资源的目录
│       ├── images             # 普通图片
│   ├── App.vue                # 入口页面
│   ├── main.ts                # Vue初始化入口文件
│   ├── pages.json             # 配置页面路由等页面类信息
│   ├── manifest.json          # 配置appid等打包信息
│   └── uni.scss               # uni-app 内置的常用样式变量
├── .editorconfig              # editorconfig 配置
├── .eslintrc.cjs              # eslint 配置
├── .prettierrc.json           # prettier 配置
├── .gitignore                 # git 忽略文件
├── index.html                 # H5 端首页
├── package.json               # package.json 依赖
├── tsconfig.json              # typescript 配置
└── vite.config.ts             # vite 配置
```

## 微信扫码浏览体验版

##### 注意：因为发布上线需要各种资质证明所以暂无发布，浏览体验版是需要开启本地调试才可以

### ![oiYwi7QxJx3nPa9SunEZxKhJaXvg.jpg](https://pic8.58cdn.com.cn/nowater/webim/big/n_v22ce903df828a42f29fe2f7dfe15ca874.jpg)

## 开启本地调试步骤

##### 1、扫上面的二维码进入体验版，点击“前往体验版”

![1.jpg](https://pic5.58cdn.com.cn/nowater/webim/big/n_v29249c0c4452b401b822b4ab99793d69c.jpg)

##### 2、点击右上角胶囊的“三个点”按钮

![2.jpg](https://pic8.58cdn.com.cn/nowater/webim/big/n_v29623fa4f18004814aeb1f3e6e89570c2.jpg)

##### 3、点击开启调试(我的微信是英文版所以显示的是英文)

![3.jpg](https://pic4.58cdn.com.cn/nowater/webim/big/n_v2216057dbfe3940939d5dfa281da195de.jpg)

##### 4、再次点击“前往体验版”就可以愉快的访问啦

![1.jpg](https://pic5.58cdn.com.cn/nowater/webim/big/n_v29249c0c4452b401b822b4ab99793d69c.jpg)
