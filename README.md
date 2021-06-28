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

用户注册流程:

使用 signLoginMessage 让用户进行签名
使用 getLoginToken 以及刚才获得的签名换取 jwt token
在之后的 API 访问 listFav，createFav，deleteFav，listSubdomain，createSubdomain，deleteSubdomain 时需要附带 jwt token 进行鉴权

域名注册流程:

查询域名注册的价格 getRentPrice，duration 参数是秒为单位的注册时间
提交域名注册 commit
完成域名注册 register

