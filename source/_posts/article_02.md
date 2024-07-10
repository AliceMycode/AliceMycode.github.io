---
title: 查找包含相同数字的较小正整数
feature: true
date: 2022-04-24 14:31:47
tags:
  - 查找最小正在数
categories:
  - JAVASCRIPT
cover: https://s3.bmp.ovh/imgs/2022/04/27/18427e1569757ce8.jpeg
---
请写编写出一个函数，该函数接受一个正整数并返回下一个包含相同数字的较小正整数，当没有包含相同数字的较小数字时返回 -1，包含相同数字但第一位为0时也返回-1，比如下面例子

## For Example

```bash
For example:
nextSmaller(21) == 12
nextSmaller(531) == 513
nextSmaller(2071) == 2017
```

## 题解

```bash
            function nextSmaller(num){
                    var PreArray = num.toString().split('');
                    var length = PreArray.length;
                    var minRange = parseInt(1+Array(length).join('0'));
                    for(var i=num-1;i>=minRange;i--){
                        var currentArray = i.toString().split('');
                        var counter = 0;
                        for(var j=0;j<currentArray.length;j++){
                            if(PreArray.indexOf(currentArray[j]) < 0)
                            break;
                            counter++;
                            PreArray.splice(PreArray.indexOf(currentArray[j]),1)
                            if(counter == length)
                            return i
                        }
                        PreArray = num.toString().split(''); 
                    }
                    return -1
                }
                console.log(nextSmaller(2071))//2017
```
