---
title: JS扁平化数组递归和非递归方法
feature: true
date: 2022-04-27 01:42:30
tags:
  - 扁平化数组
categories:
  - JAVASCRIPT
cover: https://s3.bmp.ovh/imgs/2022/04/27/26b4fd6fa80a2052.jpeg
---
请用递归和非递归的思想扁平化多维数组,下面演示两种递归方法和非递归方法，思想都是遍历每个数组元素
若为数组类型则继续调用自身，否则直接压入数组

### 递归(forEach&&concat)

```bash
        var arr = [[1,[2,3]],[4,[5,6]],[7,8,9],[[10,22,34],56]]
                function flatten(data){
                    if(!Array.isArray(arr)) return -1
                    var res =[]
                    data.forEach(item => {
                        if(Array.isArray(item)){
                            res = res.concat(flatten(item))
                        }else{
                        res.push(item)
                        }
                    });
                    return res
                }
                console.log(flatten(arr))
```

### 递归（reduce&&concat）

```bash
  var arr = [[1, [2, 3]], [4, [5, 6]], [7, 8, 9], [[10, [[22], 34]], 56]]
  const flatten = (arr) => {
        return arr.reduce((result, item) => {
            return result.concat(Array.isArray(item) ? flatten(item) : item);
        }, []);
    }
    console.log(flatten(arr))
```

### 非递归(forEach&&concat)

```bash
	var arr = [[1,[2,3]],[4,[5,6]],[7,8,9],[[10,[[22],34]],56]]
      function flatten(data){
         if(!Array.isArray(data)) return -1
         var res = []
         data.forEach(item => {
           if(Array.isArray(item)){
           res = res.concat(item.flat(Infinity))
              }
        })
        return res
    }
    console.log(flatten(arr));//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 22, 34, 56]
```

### 非递归（split&toString()）

```bash
       var arr = [[1,[2,3]],[4,[5,6]],[7,8,9],[[10,[[22],34]],56]]
        const flatten = data => data.toString().split(',').map(item => Number(item))
        console.log(flatten(arr));//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 22, 34, 56]
```