# JS 工具函数

> some utils and skills for javascript

## 时间

### 时间格式化

```jsx
const dateFormatter = (formatter, date) => {
  date = date ? new Date(date) : new Date();
  const Y = date.getFullYear() + "",
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formatter
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? "0" : "") + M)
    .replace(/DD/g, (D < 10 ? "0" : "") + D)
    .replace(/HH|hh/g, (H < 10 ? "0" : "") + H)
    .replace(/mm/g, (m < 10 ? "0" : "") + m)
    .replace(/ss/g, (s < 10 ? "0" : "") + s);
};

dateFormatter("YYYY-MM-DD HH:mm", "1995/02/15 13:55"); // 1995-02-15 13:55
```

## 颜色

### RGB 色值生成 16 进制色值

```jsx
const rgb2Hex = (r, g, b) => {
  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;
  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;
  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;
  r = ("0" + (Math.round(r) || 0).toString(16)).slice(-2);
  g = ("0" + (Math.round(g) || 0).toString(16)).slice(-2);
  b = ("0" + (Math.round(b) || 0).toString(16)).slice(-2);
  return "#" + r + g + b;
};

rgb2Hex(100, 50, 0); // "#ff7f00"
```

### 颜色混合

```jsx
const colourBlend = (c1, c2, ratio) => {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  let r1 = parseInt(c1.substring(1, 3), 16);
  let g1 = parseInt(c1.substring(3, 5), 16);
  let b1 = parseInt(c1.substring(5, 7), 16);
  let r2 = parseInt(c2.substring(1, 3), 16);
  let g2 = parseInt(c2.substring(3, 5), 16);
  let b2 = parseInt(c2.substring(5, 7), 16);
  let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  let b = Math.round(b1 * (1 - ratio) + b2 * ratio);
  r = ("0" + (r || 0).toString(16)).slice(-2);
  g = ("0" + (g || 0).toString(16)).slice(-2);
  b = ("0" + (b || 0).toString(16)).slice(-2);
  return "#" + r + g + b;
};

colourBlend("#ff0000", "#3333ff", 0.5); // "#991a80"
```

## 数组

### 无 loop 生成指定长度的数组

```jsx
const List = (len) => [...new Array(len).keys()];
const list = List(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 一行代码去重数组

```jsx
const list = [1, 1, 2, 3, 6, 45, 8, 5, 4, 6, 5];
const uniqueList = [...new Set(list)]; // [1, 2, 3, 6, 45, 8, 5, 4]
```

## 其它

### 判断是否为质数

```jsx
const mathIsPrime = (n) => {
  if (n === 2 || n === 3) {
    return true;
  }
  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 || n % 3 == 0) {
    return false;
  }
  for (let x = 6; x <= Math.sqrt(n) + 1; x += 6) {
    if (n % (x - 1) == 0 || n % (x + 1) == 0) {
      return false;
    }
  }
  return true;
};

mathIsPrime(0); // true
```

### 遍历类数组对象

```jsx
const elements = document.querySelectorAll(selector);
[].prototype.forEach.call(elements, (el, idx, list) => {    console.log(el) // 元素节点})
```

### 判断对象类型

```jsx
const type = (data) =>
  Object.prototype.toString
    .call(data)
    .replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase();
type({}); // object
```

### 优化多层判断条件

```jsx
const getScore = (score) => {
  const scoreData = new Array(101)
    .fill(0)
    .map((data, idx) => [idx, () => (idx < 60 ? "不及格" : "及格")]);
  const scoreMap = new Map(scoreData);
  return scoreMap.get(score) ? scoreMap.get(score)() : "未知分数";
};

getScore(30); // 不及格
```

### 把获取到的数据过滤一遍

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

### 生成随机 UID

```jsx
const genUid = () => {  
    const length = 20;  
    const soupLength = genUid.soup_.length;
    const id = [];  
    for (let i = 0; i < length; i++) {
        id[i] = genUid.soup_.charAt(Math.random() * soupLength);  
    }  

    return id.join('');
};

genUid.soup_ = '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'genUid() // ;l`yCPc9A8IuK}?N6,%}
```


### 将数值格式化成中文数字
```js
export function digitUppercase(n) {
  const fraction = ["角", "分"];
  const digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
  let num = Math.abs(n);
  let s = "";
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(
      /零./,
      ""
    );
  });
  s = s || "整";
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = "";
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, "元")
    .replace(/(零.)+/g, "零")
    .replace(/^整$/, "零元整");
}
```

### 连字符转驼峰
```js
export function hyphenToHump() {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase();
  });
}
```

### 驼峰转连字符
```js
export function humpToHyphen() {
  return this.replace(/([A-Z])/g, "-$1").toLowerCase();
}
```

### 是否为完整的 http 接口
```js
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}
```


## 参考文档
- [js容易忘记的操作](https://github.com/17764092501/js-always-forget-operation)
