
/**
 * 简单爬虫 demo
 * request负责请求页面信息
 * cheerio 负责解析 html 文本所有 api 与 jq 保持一致
 */
const request = require('request');
const cheerio = require('cheerio');
request('https://cnodejs.org/',(err,response,body)=>{
    if (!err && response.statusCode == 200) {
        // 输出网页内容
        let $ = cheerio.load(body);
        let target = $('.cell');
        let arr = [];
        for(let i=0;i<target.length;i++){
            arr.push({
                title:target.eq(i).find('.topic_title').attr('title'),
                date:target.eq(i).find('.last_active_time').text()
            })
        }
        console.log(arr)
      }
})