#!/usr/bin/env node

const lib_build = require('wpsjs/src/lib/build')
let p = process.cwd()
let path = require('path')
const { readFileSync, mkdirSync, writeFileSync } = require('fs')
let z = path.join(p, 'package.json')
const configs = require(z)

if (configs.iConfigs == undefined) {
	console.log(`	未检测到配置项，请参考以下配置添加到 package.json中:\n
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
    `)
	return
}

if (process.argv[2] == "build") {
	lib_build.buildWithArgs(configs.iConfigs)
}
if (process.argv[2] == "publish") {
	if(!configs.iConfigs.serverUrl){
		console.log(`	❌未配置发布服务器地址,无法生成 publish.html, error: iConfigs.serverUrl undefined`)
		return
	}
	let a = require('./publish').publishOptions
	console.table(a)
	let b = JSON.stringify(a)
	let temphtml = readFileSync('./publishTemp.html', 'utf-8')
	let disthtml = temphtml.replace("{%name%}", configs.name)
	disthtml = disthtml.replace("//{%vars%}", `var addons=${b};`)
	let installer = configs.iConfigs.publishDir||"wps-addon-publish";
	try {
		mkdirSync(installer)
	} catch { }
	finally {
		writeFileSync(path.join(process.cwd(), installer, 'publish.html'), disthtml, { flag: 'w' })
	}

}

if (process.argv[2] == "config") {
	require('./iconfig')
}