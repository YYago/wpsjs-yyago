#!/usr/bin/env node

const lib_build = require('./buildrc')
let p = process.cwd()
let path = require('path')
const { readFileSync, mkdirSync, writeFileSync } = require('fs')
let z = path.join(p, 'package.json')
const configs = require(z)
const defautPublishiDir = require('wpsjs/src/lib/util').GetPublishDir()

if (process.argv[2] == "build") {
	lib_build.buildWithArgs(configs.iConfigs)
}
if (process.argv[2] == "publish") {
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

if (process.argv[2] == "config") {
	require('./iconfig')
}