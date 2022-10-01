# wpsjs-yyago

基于 [wpsjs](https://www.npmjs.com/package/wpsjs) 的更改。

更改点：

1. `publish` 不再依赖 wpsjs，支持一次性安装为多个客户端应用插件。*多个应用使用同一个插件文件(不会打包为多个 `.7z` 文件，除非你单独为单个应用开发)，我们只是在安装器上做手脚……*
2. 打包和发布不再需要询问交互。
3. 可自定义排除不打包的文件。
4. 可自定义打包、发布存放目录。
5. 在插件项目的 `package.json` 上配置即可。

> wpsjs 首次打包和发布需要通过 CLI 交互咨询配置，后续的打包发布貌似不需要，做这个更改只是为了方便自动打包。

## 安装

```sh
npm install wpsjs-yyago
```

全局安装

```sh
npm install --global wpsjs-yyago
```

## package.json 配置

添加以下内容到加载项的 `package.json` 中(示例)：

```json
"iConfigs": {
    "pluginType": "offline",
    "serverUrl": "https://www.pwedu.top/wpsAddons/",
    "addonType": [
      "wps",
      "et",
      "wpp"
    ],
    "buildDir":"docs",
    "publishDir":"docs/pub",
    "excludeFiles":[
      "test",
      "temp"
    ]
  }
```

> 说明：
>
> 1. **`pluginType`**：是离线还是在线插件（加载项）？ "`offline`"：离线，"`online`"：在线。
> 2. **`serverUrl`**：发布 URL 地址，必须以“/”结尾。
> 3. **`addonType`**：安装到哪些应用上？仅限从 `wps`、 `wpsp`、`et` 中选一个或多个，如果插件可安装多个应用上，则写多个。比如示例中的写法表示插件可以安装到文字、表格、演示文档三个应用上。*注意：它们使用同一个插件源文件，而不是打包成 3 个独立文件！！！* 这个配置仅对发布（生成 `publish.html`）有效。
> 4. **`buildDir`**: 打包后的文件存放目录，默认是 “wps-addon-build”。
> 5. **`publishDir`**: 发布文件（`publish.html`文件,相当于安装器）存放目录，默认是 “wps-addon-publish”。
> 6. **`excludeFiles`**: 打包时要排除的文件（不打包的文件）。

如果你懒得复制，可以通过命令更改 `package.json` 文件：

```sh
  rwpsjs config
```

或者

```sh
  node node_modules/wpsjs-yyago/index config
```

## 使用

如果可以，把 `package.json` 的 `scripts` 也改一下（只是示例）：

```json
"scripts": {
    "b": "node node_modules/wpsjs-yyago/index build",
    "p": "node node_modules/wpsjs-yyago/index publish",
    "c": "node node_modules/wpsjs-yyago/index config"
  }
```

然后通过 "`npm run b`" , "`npm run p`" 进行打包和分发操作。如果没有这样做，则可以：

1. 打包
    ```sh
    node node_modules/wpsjs-yyago/index build

    # global

    rwpsjs build
    ```

2. 发布
    ```sh
    node node_modules/wpsjs-yyago/index publish

    # global

    rwpsjs publish
    ```

3. 添加配置
    ```sh
    node node_modules/wpsjs-yyago/index config

    # global

    rwpsjs config
    ```

### 可引用模块

```js
const addonList = require('wpsjs-yyago/publish').publishOpstions
```

其结果结构为(示例)：

```json
[
    {
        "name":"wpsjs-yyago",
        "addonType":"wps",
        "online":"false",
        "url":"https://www.pwedu.top/wpsAddons/wpsjs-yyago.7z"
    },
    ...
]
```

## TODO

* [ ] 用 Vue、React 两种框架开发的加载项项目未做更改和测试。
* [ ] 如果要自己写安装器文件（publish.html）,可以引入 `require('wpsjs-yyago/publish').publishOpstions` 的结果作为安装参数。
