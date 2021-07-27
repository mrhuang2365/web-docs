# websocket
## 握手协议
### 客户端发起握手请求🤝
在客户端与服务端建立tcp链接之后，客户端以http报文的形式发送握手请求到服务器，该HTTP的请求报文需符合以下要求：
* HTTP报文必须合法,且请求的方式为GET
* HTTP报文必须包含以下消息头来标志这是一个websocket握手请求

```
Upgrade: WebSocket
Connection: Upgrade
``` 
* 请求头必须包含 `Sec-WebSocket-Key` 字段，用于WebSocket协议的校验
  * 随机生成16字节大小的字节数组，并使用Base64加密，得到字符串
* 请求头必须包含 `Sec-WebSocket-Verison` 字段，表明WebScoket的版本, 且值必须为 `13`
* 请求头必须包含 `Sec-WebSocket-Origin` 字段
* 请求头可以包含 `Sec-WebSocket-Protocol` 字段，表明客户端所希望执行的子协议
* 请求头可以包含 `Sec-WebSocket-Extensions` 字段，表明客户端所希望执行的扩展(如消息压缩插件)
  
### 服务端响应
服务端决定接受客户端握手请求之前，必须完成以下操作：
1、服务端必须向客户端证明自己处理WebSocket协议。
* 处理请求头 `Sec-WebSocket-Key` 的值， 加密得出字符串，添加到响应头 `Sec-WebSocket-Accept`
```
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```
* 客户端会对该值进行校验，来检查服务端是否能够正确处理WebSocket协议

2、服务端需要处理扩展请求 `Sec-WebSocket-Extensions` 字段
例如，如果客户端发起的请求，希望服务端加载 `permessage-deflate` 以及`client_max_window_bits`插件
```
Sec-WebSocket-Extensions: permessage-deflate;client_max_window_bits
```
如果服务端仅支持 `permessage-deflate`插件，那么服务端会返回
```
Sec-WebSocket-Extensions: permessage-deflate
```
在之后的通信中，服务端和客户端都只会加载 `permessage-deflate` 插件

3、处理 `Sec-WebSocket-Protocol` 字段，告诉客户端，服务端支持的子协议

4、服务端会返回一下几个字段表示成功建立WebSocket连接
```
HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: WebSocket
```
