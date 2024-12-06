import requests

url = "https://spark-api-open.xf-yun.com/v1/chat/completions"
data = {
        "model": "lite", # 指定请求的模型
        "messages": [
            {
                "role": "user",
                "content": "你是谁"
            }
        ]
    }
header = {
    "Authorization": "Bearer kTyOXcrXavZAswJQLNrD:VwqUlrkNmmxzolrPVxag" # 注意此处替换自己的APIPassword
}
response = requests.post(url, headers=header, json=data)
print(response.text)