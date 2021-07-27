
// 1、数组扁平化
```javascript
function flatten(arr) {
    return arr.reduce((result, item) => {
        if (Array.isArray(item)) {
            return result.concat(...flatten(item));
        }
        return result.concat(item);
    }, [])
}
```
// 2、多重数组扁平化去重
``` javascript
Array.prototype.unique = function() {
  // Array.prototype.slice.call()
  return [...new Set(flatten(this))];
}
```

// 3、浏览器访问一个url所展示页面的流程
- 1、用户输入url，浏览器访问DNS服务器获取ip地址
  - 1、从浏览器缓存中获取ip
  - 2、操作系统中获取ip
  - 3、路由缓存
  - 4、ISP的DNS服务器:ISP是互联网服务提供商的简称(Internet Service Provider)
  - 5、根服务器查询ip，如果没有查根域名服务器，最后访问域名服务器

- 2、客户端与服务器建立tcp链接，3次握手
- 3、发送http请求
- 4、服务器响应并返回html内容
- 5、客户端接收到html,解析html并渲染
  - 1、解析HTML,获得DOM树
  - 2、解析css，获得CSS规则树
  - 3、结合DOM和CSS规则树，生成渲染树
  - 4、根据渲染树计算dom节点信息
  - 5、根据计算好的信息绘制页面
- 6、断开链接：TCP四次挥手

// 4、TCP三次握手
- 1、第一次：客户端发起请求，并携带syn=1, seq=x
- 2、第二次：服务端收到请求后，返回ACK=x+1 seq=y，表示已准备好接收数据
- 3、第三次：客户端收到请求后，再回传ACK=y+1,seq=x,表示我即将发送数据

为什么是3次：为了防止已失效的链接请求到服务器，产生错误

// 5、四次挥手
1、客户端发送报文，fin=1, ack=z, seq=x,表示数据已经发送完成，进入FIN_WAIT1
2、服务器发送报文，ack=x+1, seq=z,表示同意关闭请求,服务器进入FIN_WAIT2
3、服务器发送报文段
