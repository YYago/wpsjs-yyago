#!/usr/bin/env node

const lib_build = require('./buildrc')
let p = process.cwd()
let path = require('path')
const { readFileSync, mkdirSync, writeFileSync } = require('fs')
let z = path.join(p, 'package.json')
const configs = require(z)
const defautPublishiDir = require('wpsjs/src/lib/util').GetPublishDir()

let opt = process.argv[2];
if (opt == "build") {
	lib_build.buildWithArgs(configs.iConfigs)
}
if (opt == "publish") {
	if (!configs.iConfigs.serverUrl) {
		console.log(`	❌未配置发布服务器地址,无法生成 publish.html, error: iConfigs.serverUrl undefined`)
		return
	}
	let a = require('./publish').publishOptions
	console.table(a)
	let b = JSON.stringify(a)
	let temphtmlPath = path.join(__dirname, 'publishTemp.html')
	let temphtml = readFileSync(temphtmlPath, 'utf-8')
	let disthtml = temphtml.replace("{%name%}", configs.name)
	disthtml = disthtml.replace("//{%vars%}", `var addons=${b};`)
	let installer = configs.iConfigs.publishDir || defautPublishiDir
	try {
		mkdirSync(installer)
	} catch { }
	finally {
		writeFileSync(path.join(process.cwd(), installer, 'publish.html'), disthtml, { flag: 'w' })
	}

}

if (opt == "config") {
	require('./iconfig')
}

if(!["build","publish","config"].includes(opt)){
	console.log(`  ❌未知命令: ${opt}`)
	console.table([{command:"build",description:"打包"},{command:"publish",description:"发布（生成插件安装文件）"},{command:"config",description:"配置插件信息"}]);
	console.log(`\n  If you want use the commands of wpsjs package, Just run it with 'npx', like this: "npx wpsjs create". \n`)
}