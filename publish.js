const fs = require('node:fs')
const path = require('node:path')
const package = require(path.join(process.cwd(), 'package.json'))

let iconfigs = package.iConfigs;
let url = package.iConfigs.serverUrl || undefined

function publishOption() {
    let addonUrl = package.iConfigs.pluginType == "offline" ? `${url}${package.name}_${package.version}.7z` : `${url}`
    let addonTypes = iconfigs.addonType || package.addonType;
    let addonName = package.name
    let online = iconfigs.pluginType == "offline" ? 'false' : 'true'
    let addInfos;
    if (typeof (addonTypes) == "object") {
        addInfos = addonTypes.map(o => {
            let item = {
                "name": addonName,
                "addonType": o,
                "online": online,
                "url": addonUrl,
                "version":package.version
            }
            return item
        });
    } else {
        addInfos = [{
            "name": addonName,
            "addonType": addonTypes,
            "online": online,
            "url": addonUrl,
            "version":package.version
        }]
    }

    return addInfos;
}

module.exports={
    publishOptions:publishOption()
}