---
title: JS含复杂数据类型的数组去重
date: 2022-04-12 14:31:47
tags:
  - 数组去重
categories:
  - JAVASCRIPT
cover: https://s3.bmp.ovh/imgs/2022/04/27/67f2745c0ea2f409.jpeg
---

##  filter + hasOwnProperty + JSON.stringify
```bash
function unique(arr) {
  let obj = {}
  return arr.filter((item, index) => {
     // 防止key重复
     let newItem = item + JSON.stringify(item)
     return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
  })
}
```
