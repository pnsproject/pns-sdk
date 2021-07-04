## ENS SDK

### Usage

基于 Vite 运行:

```hash
npm
npm run serve
```

打包:

```bash
npm run build
```

代码格式化:

```bash
npm run fmt
```

### 业务功能

用户注册流程:

使用 signLoginMessage 让用户进行签名

使用 getLoginToken 以及刚才获得的签名换取 jwt token

在之后的 API 访问 listFav，createFav，deleteFav，listSubdomain，createSubdomain，deleteSubdomain 时需要附带 jwt token 进行鉴权

域名注册流程:

查询域名注册的价格 getRentPrice，duration 参数是秒为单位的注册时间

提交域名注册 commit

完成域名注册 register

### TypeScript API

#### 登录

```ts
let token = await tryLogin();
```

或得 token 用于后续的 API.

#### 获取账户信息

先登录, 然后调用

```ts
let account = await getAccount();
// -> HexAddress
```

#### 查询域名是否已经注册

```ts
await getOwner("eth"))
```

- 可用, 返回 `0x00000`
- 已经被占用, 返回 ??

#### 注册域名前查询加个

```ts
await getRentPrice("jiang", 86400*365); // 换算成"秒"
// -> number
```

#### 管理 favorites(暂不处理子域名收藏)

```ts
await listFav(jwt, account);
await createFav(jwt, account, "polkadot.eth");
await deleteFav(jwt, domainId);
```

#### 查询域名对应的地址

```ts
await getAddr("eth", "ETH"); // ??
```

#### 查询 Resolver

```ts
await getResolver("jieng.eth");
// -> HexAddress
```

#### 提交域名注册请求

```ts
// 先进行一次提交,再等待一分钟
await commit(label: DomainString, account: string)
// 等待一分钟
await register(label: DomainString, account: string, duration: number)
```

#### 域名详细信息

```ts
await getDomainDetails(name: DomainString)
```

#### 列出子域名(??)

```ts
await listSubdomain(token: string, account: HexAddress)
```

#### 添加新的子域名(??)

```ts
await setSubnodeOwner(node: DomainString, label: string, newOwner: HexAddress)
await createSubdomain(token: string, account: HexAddress, domain: DomainString, data: string)
```

#### 获取域名记录内容

获取 Address 部分的内容:

```ts
getAddr(name, key);
```

获取 Content 部分的内容:

```ts
getContent(name: DomainString)
```

获取 Text 部分的内容:

```ts
getText(node: DomainString, key: string)
```

#### 修改域名记录内容

Address 部分:

```ts
setAddr(name: DomainString, key: string, value: string)
```

Content 部分:

```ts
setContent(node: DomainString, value: string)
```

Text 部分:

```ts
await setText(node: DomainString, key: string, value: string)
```

#### 转义域名所有权

```ts
await setOwner(node: DomainString, newOwner: HexAddress)
```

#### 设置 Reverse Record

TODO

#### 删除域名(暂不实现)

#### TODO
