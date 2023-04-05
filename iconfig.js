const { writeFileSync } = require('fs')
const path = require('path')
const packPath = path.join(process.cwd(), 'package.json')
const pack = require(packPath)

const confs = {
    iConfigs: {
        "pluginType": "offline",
        "serverUrl": "",
        "addonType": [`${pack.addonType||'et'}`],
        "buildDir": "",
        "publishDir": "",
        "excludeFiles": []
    }
}

if(!pack.iConfigs){
    const foo = Object.assign(pack, confs)
    writeFileSync(packPath, JSON.stringify(foo,null,4))
    console.log(`   完成!`)
}else{
    console.log(`   貌似已经配置过了:\n${JSON.stringify(pack.iConfigs,null,4)}`)
}