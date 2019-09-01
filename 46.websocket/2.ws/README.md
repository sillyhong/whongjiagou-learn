## 请求头
```js
GET ws://localhost:8888/ HTTP/1.1
Host: localhost:8888
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: gTX0hoZZnbfZWQbo6Zf6bA==
```

```js
GET ws://localhost:9999/ HTTP/1.1
Host: localhost:9999
Connection: Upgrade
Pragma: no-cache
Cache-Control: no-cache
Upgrade: websocket
Origin: http://localhost:3000
Sec-WebSocket-Version: 13
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
Cookie: Webstorm-a327319a=af8a9676-6ece-46bb-8072-05ee18ac8029; _qddaz=QD.2l17xl.gws76s.jhafcvnd; Hm_lvt_418b1c90fa35dc210dd5d2284d9f9f29=1526554874
Sec-WebSocket-Key: CXsnRuN0cIsoecC9RsQlFg==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

## 响应头
```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: yLqEX4nJeYlC3eOsw2JDc/hY5vo=
```

```js
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: GmLcr6oJMK4SJDAG2mQiYh21jIw=


```