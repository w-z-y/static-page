/* 

  npm i adm-zip -D

*/

const fs = require('fs');
const path = require('path');
const https = require('https');
const AdmZip = require('adm-zip');

function downloadZip(url, cookie) {
  return new Promise((resolve, reject) => {
    console.log('✨ iconfont start downloading...');
    const options = {
      headers: {
        Cookie: cookie,
      },
    };

    https
      .get(url, options, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          const redirectUrl = response.headers.location;
          if (redirectUrl?.includes('/errors')) {
            const errorData = JSON.parse(decodeURIComponent(redirectUrl.split('data=')[1]));
            reject(new Error(`❌ download error: ${errorData.message}`));
            return;
          }
          if (redirectUrl) {
            downloadZip(new URL(redirectUrl, url).toString()).then(resolve).catch(reject);
            return;
          }
        }

        if (response.statusCode !== 200) {
          reject(new Error(`❌ download error: ${response.statusCode}`));
          return;
        }

        const chunks = [];
        response.on('data', (chunk) => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          if (buffer.length < 4 || buffer[0] !== 0x50 || buffer[1] !== 0x4b) {
            reject(new Error('❌ 无效的 ZIP 文件'));
            return;
          }
          resolve(buffer);
        });
        response.on('error', reject);
      })
      .on('error', reject);
  });
}

function extractAndReplace(zipBuffer, cwdDir) {
  try {
    const zip = new AdmZip(zipBuffer);
    console.log('下载目录：', cwdDir);
    if (!fs.existsSync(cwdDir)) {
      fs.mkdirSync(cwdDir, { recursive: true });
    }

    const entries = zip.getEntries();
    entries.forEach((entry) => {
      if (entry.entryName.includes('/')) {
        entry.entryName = entry.entryName.replace(/^[^/]+/, 'iconfont');
      }
    });

    zip.extractAllTo(cwdDir, true);
    console.log('✅ iconfont updated');
  } catch (error) {
    throw new Error(`解压失败: ${error.message}`);
  }
}

async function updateIconfont(url, cookie, dir) {
  try {
    const cwdDir = path.resolve(process.cwd(), dir);
    const zipBuffer = await downloadZip(url, cookie, cwdDir);
    extractAndReplace(zipBuffer, dir);
  } catch (error) {
    console.error('❌ iconfont update error:', error.message);
    process.exit(1);
  }
}
module.exports = updateIconfont;
