# ecm_web搭建过程记录
## 初始化项目
```shell
    npx create-react-app ecm_web
```
## 按照可能用的npm包
```shell
    npm install @craco/craco @reduxjs/toolkit react-router-dom redux react-redux lodash --save
```
## 接入craco进行打包配置修改
打包修改可参阅`config/dev.craco.config.js`和`config/pro.craco.config.js`