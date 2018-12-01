# vue-singlepage-m-project

## 项目介绍

本项目基于vue-cli3 + mint-ui集成的单页面应用脚手架，默认支持less

- 屏幕适配方案 flexible + postcss-px2rem
- UI库 mint-ui
- 图片懒加载插件 vue-lazyload
- 网络请求框架 axios



## 使用项目
### 安装依赖
```
npm install
```

### 调试开发
```
npm run serve
//或,使用vue-cli3界面操作
vue ui
```

### 发布代码
#### 1、执行打包命令
```
npm run build
```

#### 2、上传打包后的文件
将`/dist`目录下的文件按照文件路径发布到服务器相应位置

#### 3、配置nignx
由于单页面应用，需要将应用下面所有路径指向应用根目录的index.html文件.

例如应用访问路径为：https://m.hinabian.com/ctrip/

需要配置 `https://m.hinabian.com/` 域名 `/ctrip/`下所有页面访问到/ctrip/index.html

```
server {
    listen 443;
    server_name m.hinabian.com;

    //添加下面这段代码
    location ~* ^/ctrip/?$ {
           index index.html;
           if ( !-e $request_filename ) {
              rewrite ^/(.*)$ /ctrip/index.html;
           }
    }
}
```



