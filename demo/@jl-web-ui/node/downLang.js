const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

const sheets = xlsx.parse('lang.xlsx');
/**
 * sheets是一个数组，数组中的每一项对应 langes.xlsx 这个文件里的多个表格
 * 如sheets[0]对应 Sheet1 这个表格
 * sheets[1]对应 Sheet2 这个表格
 */
const sheet = sheets[0]; // 我们这里只取第一个表
const filePath = './src/locale/lang'; // 多语言生成后会存放在此目录下

const col = sheet['data'][0]; // 表格中的第一行，用来获取多语言名称以生成对应的 js 文件

for (let j = 3; j < col.length; j++) {
  // 每次都初始化新的对象，防止写入其他语言内容
  let obj = {};
  // i 对应 excel 文件里的行，根据自己的表格修改
  for (let i = 1; i < sheet['data'].length; i++) {
    let row = sheet['data'][i];
    if (row && row.length > 0) {
      let titles = row[0].split('.');
      // 遍历多级 key，递归赋值
      let current = obj;
      for (let t = 0; t < titles.length; t++) {
        let k = titles[t];
        // 如果到最后一层，是赋值，否则创建对象
        if (t === titles.length - 1) {
          current[k] = row[j];
        } else {
          if (typeof current[k] !== 'object' || current[k] === null) {
            current[k] = {};
          }
          current = current[k];
        }
      }
    }
  }
  const fileName = col[j].split('%')[1];
  creatFile(obj, fileName);
}

/**
 * 将数据写入文件
 * @param {object} con 要写入的内容
 * @param {string} name 要保存的文件名
 */
async function creatFile(con, name) {
  const str = 'export default ';
  // 使用 JSON.stringify 保证中文不乱码，带缩进美观一些
  const data = JSON.stringify(con, null, 2);
  const code = str + data + '\n';
  const isExists = await getStat(filePath); // 判断路径是否存在
  if (!isExists) {
    await mkdir(filePath); // 创建文件目录
  }
  const file = path.join(filePath, name + '.js');
  fs.writeFile(file, code, { encoding: 'utf8' }, (err) => {
    if (err) throw err;
    console.log(name + ' 保存成功！');
  });
}

/**
 * 判断目录是否存在
 *  @param {string} dir 目录
 */
function getStat(dir) {
  return new Promise((resolve) => {
    fs.stat(dir, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    });
  });
}

/**
 * 创建文件夹
 * @param {string} dir 要创建的文件夹路径
 */
function mkdir(dir) {
  return new Promise((resolve) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
