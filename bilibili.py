import yaml
import requests
import json
import time
import pandas
import execjs

url = 'https://api.bilibili.com/x/v2/reply/wbi/main'
with open('./headers.yml', 'r', encoding='utf-8') as file:
    headers = yaml.load(file, Loader=yaml.FullLoader)
with open('./params.yml', 'r', encoding='utf-8') as file:
    params = yaml.load(file, Loader=yaml.FullLoader)
with open("./encode.js", 'r', encoding='utf-8') as file:
    context = execjs.compile(file.read())

conf = {
    "useAssignKey": True,
    "wbiImgKey": "839c8b697b0d44dc80e9a604592bb432",
    "wbiSubKey": "02cd020b04d64aacad6b3a08d06f8eb0"
}

result = []
session = requests.Session()

for page in range(0, 10):
    print(f"第{page + 1}页")
    print('------------------------------------------------')
    params.update(context.call("formatImgByLocalParams", params, conf))
    resp = session.get(url, headers=headers, params=params)
    data = resp.json()['data']
    replies = data['replies']
    for reply in replies:
        row = [reply['member']['uname'], reply['content']['message'], time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(reply['ctime'])), reply['like']]
        result.append(row)
        print(f"用户名：{row[0]}\n评论内容：{row[1]}\n发表时间：{row[2]}\n点赞数：{row[3]}")
        print('------------------------')

    params['pagination_str'] = json.dumps(
    {
        "offset": data["cursor"]["pagination_reply"]["next_offset"]
    }).replace(' ', '')
    del(params['w_rid'])
    del(params['wts'])
    if page == 0:
        del(params['seek_rpid'])
    time.sleep(1)

resp.close()

df = pandas.DataFrame(result, columns=['用户名', '评论内容', '发表时间', '点赞数'])
df.to_csv('./bilibili_replies.csv', index=False, encoding='utf_8_sig')