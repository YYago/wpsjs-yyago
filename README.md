# wpsjs-yyago

基于 [wpsjs](https://www.npmjs.com/package/wpsjs) 的更改。

更改点：

1. `publish` 不再依赖 wpsjs，支持一次性安装为多个客户端应用插件。*多个应用使用同一个插件文件(不会打包为多个 `.7z` 文件，除非你单独为单个应用开发)，我们只是在安装器上做手脚……*
2. 打包和发布不再需要询问交互。
3. 可自定义排除不打包的文件。
4. 可自定义打包、发布存放目录。
5. 在插件的 `package.json` 文件上做一些配置即可。

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
>
> 2. **`serverUrl`**：发布 URL 地址，必须以“/”结尾。
>
> 3. **`addonType`**：安装到哪些应用上？仅限从 `wps`、 `wpsp`、`et` 中选一个或多个，如果插件可安装多个应用上则写多个。比如示例中的写法表示插件可以安装到文字、表格、演示文档三个应用上。*注意：它们使用同一个插件源文件，而不是打包成 3 个独立文件！！！* 这个配置仅对发布有效，（这一步生成 `publish.html`文件）。
>
> 4. **`buildDir`**: 打包后的文件存放目录，默认是 “wps-addon-build”。
>
> 5. **`publishDir`**: 发布文件（`publish.html`文件,相当于安装器）存放目录，默认是 “wps-addon-publish”。
>
> 6. **`excludeFiles`**: 打包时要排除的文件（不打包的文件）。
>

如果你懒得复制，可以通过命令更改 `package.json` 文件：

```sh
  rwpsjs config

  # npx wpsjs-yyago config
```

## 使用

1. 打包
    ```sh
    npx wpsjs-yyago build

    # global
    rwpsjs build
    ```

2. 发布
    ```sh
    npx wpsjs-yyago publish
    ```

3. 添加配置
    ```sh
    npx wpsjs-yyago config
    ```

### 可引用模块

```js
const addonList = require('wpsjs-yyago/publish').publishOpstions

/* addonList:
 [{
        "name":"wpsjs-yyago",
        "addonType":"wps",
        "online":"false",
        "url":"yourURL"
    },
    ...]
*/
// 如果要自己写安装器文件（publish.html）,可以其结果作为安装参数。
```

## 继续使用 wpsjs

wpsjs 已随本包一起作为依赖被安装，可以用 `npx` 执行 wpsjs 包的命令。 如果提示需要安装依赖，允许安装即可。

> 你应该能在 `node_modules/.bin/` 中找到它。
