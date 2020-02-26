// 把获取到的数据过滤一遍
const replaceNull = (obj) => {
    for (let key in obj) {
        switch (Object.prototype.toString.call(obj[key]).slice(8, -1)) {
            case 'Object': 
                replaceNull(obj[key])
                break;
            case 'Array': 
                for (let i = 0; i < obj[key].length; i++){
                    replaceNull(obj[key][i])
                }
                break;
            default:
                if (obj[key] === null) obj[key] = undefined;
        }
    }
}
