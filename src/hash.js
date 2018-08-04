const creatHash = require('create-hash')
const Buffer = require('buffer').Buffer

function hash (FileJS, file, type, callback, encoding = 'hex') {
    const isType = FileJS.isType,
        readChucksProm = FileJS.readChucksProm

    if (isType(Function, callback)) {
        options = options || {}
    } else if (isType(Object, callback)) {
        options = callback
    }

    const HASH = creatHash(type)
        
    return readChucksProm(file, (data, loaded, progress) => {
        if (isType(Function, callback)) {
            callback(data, loaded, progress)
        }

        HASH.update(Buffer.from(data))
    }, {
        type: 'buffer',
        chuckSize: options && options.chuckSize
    }).then(() => {
        return HASH.digest(encoding)
    })
}

module.exports = hash