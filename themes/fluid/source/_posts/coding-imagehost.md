---
title: Coding 免费图床方案
date: 2022-03-11 23:47:47
index_img: https://rmt.ladydaily.com/fetch/fluid/storage/coding-imagehost/cover.png?w=480&fmt=webp
categories: 功能增强
tags:
  - 用户经验
  - Hexo
excerpt: 通过 Coding 持续集成同步 GitHub 仓库，实现自建图床功能
---

{% note success %}
本文由 Fluid 用户授权转载，版权归原作者所有。

本文作者：千泷
原文地址：<https://www.myql.xyz/post/92e90c46/>
{% endnote %}

现在绝大多数自建博客用的图床方案都是 GitHub + jsDelivr + PicGo，包括作者的站点也是一样，优点在于零成本，简单的搭建方式以及不错的访问速度，但随着 jsDelivr 备案被取消，国内访问不再稳定，我开始考虑更好的代替品。

之前其实也试过 Coding 或 Gitee 作为自建图床，但是体验都不是特别完美，Coding 图床支持的软件太少了，不管是管理还是上传都并不是很方便，而 Gitee 图床超过 1M 就必须登录才能查看，之前试过使用类似于 [Sync Repo to Coding](https://github.com/marketplace/actions/sync-repo-to-coding) 将同步到 Coding，但是效果不太理想。

## 🤔 思路

通过 Coding 持续集成自动将 GitHub 仓库实时同步到 Coding 仓库，并且替换 `PicGo` 中自定义网址。

相同方法适用于 Gitee，不过更建议使用 Coding。

## 🧐 优势

Coding 每月 1000 分钟，单任务 30 分钟，并且不限次数，仅用来同步完全够用，并且构建速度极快，每次构建 7~8 秒左右，通过 PicGo 上传图片后几乎感觉不到太大的延迟就可以显示出图片。

相比于直接使用 Coding 或 Gitee 当图床的优势在于：

- 支持的软件和项目变多
- 可以通过 vscode 等一键替换已有链接，达成无感迁移
- 不改变原有基于 GitHub + jsDelivr + PicGo 方案的使用方式
- 可以搭配类似于 [Imgbot](https://github.com/apps/imgbot) 或 [action-tinify](https://github.com/namoscato/action-tinify) 完成图片的**自动压缩优化**
- 管理方面可以使用 [picx](https://github.com/XPoet/picx) 或 [boomb](https://github.com/xjh22222228/boomb) 类似的项目进行在线管理

## 🪛 需要的准备

- GitHub 账号
- Coding 账号
- VScode / Typora
- [PicGo](https://github.com/Molunerfinn/PicGo) / [vs-picgo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo) / [Markdown Image](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image)

## 🛠️ 部署

打开 [Coding](https://e.coding.net/login) 后创建一个项目。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-16-35-57.png)

选择按需选择，勾选`代码托管`和`构建流水线&自动化测试`完成创建。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-17-00-37.png)

进入项目后先创建项目令牌，记录下用户名和密码备用。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-17-03-48.png)

接下来导入 GitHub 中你选择当图床的仓库。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-16-54-24.png)

完成后点击`持续集成`选择`构建计划`划到最下方选择自定义构建过程，代码仓库选择`GitHub`选择你刚刚导入的仓库。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-17-18-30.png)

点击`确定`后会自动跳转到配置流程，点击`文本编辑器` 输入以下代码，记得替换成自己的 Coding 仓库 Url：

```sh
pipeline {
  agent any
  stages {
    stage("检出") {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: GIT_BUILD_REF]],
          userRemoteConfigs: [[
            url: GIT_REPO_URL,
            credentialsId: CREDENTIALS_ID
        ]]])
      }
    }
    stage('拉取到Coding') {
      steps {
        echo "正在拉取"
        sh 'git push -f https://$CODING_NAME:$CODING_TOKEN@e.coding.net/你的团队名/项目名称/代码仓库名称.git HEAD:main'
        echo "拉取完成"
      }
    }
  }
}
```

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-17-31-41.png)

在环境变量里输入`CODING_NAME`和`CODING_TOKEN`值就是刚刚申请的项目令牌的用户名和密码，完成后记得保存。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-17-41-09.png)

在`触发规则`里修改触发方式为推送到`main`分支时触发，并且将手动触发改为`main`（可根据自己实际需求选择）。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-17-46-15.png)

完成后点击`立即构建`, 从现在起，你在 GitHub 上的仓库会自动同步到 Coding 仓库上，到此部署结束。

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-19-02-15.png)

## 🚀 实际使用

开打 [PicGo](https://github.com/Molunerfinn/PicGo) / [vs-picgo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo) / [Markdown Image](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image) 中的任意一个，配置GitHub图床，将自定义网址替换为：
`https://你的团队名.coding.net/p/你的项目名称/d/你的代码仓库名称/git/raw/main`。

以 [vs-picgo](https://marketplace.visualstudio.com/items?itemName=Spades.vs-picgo) 为例：

![](https://myql.coding.net/p/owo/d/img/git/raw/main/posts/2022-03-12-18-07-36.png)

现在直接使用快捷键上传图像，图片会自动将 GitHub 的链接替换为 Coding 的链接，请开始愉快的写作吧！
