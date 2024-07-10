---
title: JS判断所有数据类型
date: 2022-04-11 14:31:47
feature: true
tags:
  - 数据类型判断
categories:
  - JAVASCRIPT
cover: https://s3.bmp.ovh/imgs/2022/04/17/5434d51a5597ed97.jpeg
---

## Object.prototype.toString.call


``` bash
function getType(data){
    let type = typeof data
    if(type !=='object') return type
    return Object.prototype.toString.call(data).replace(/^\[object (\w+)\]$/g,'$1')
}
console.log(getType(undefined)) //undefined
```


