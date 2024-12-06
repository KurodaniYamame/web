async function getAIResponse(prompt) {
    const apiKey = "tRmWtTcAbHLSKcXWdTwY:YCvvKjKqRQZBQnJZMdAo"; // 替换为你的 API 密钥
    const apiUrl = "https://spark-api-open.xf-yun.com/v1/chat/completions"; // 替换为你的 API URL

    // 构造请求负载
    const payload = {
        model: "lite", // 替换为实际的大模型名称
        messages: [
            { role: "user", content: prompt }
        ],
        temperature: 0.7, // 控制生成内容的随机性
    };

    try {
        // 发起 HTTP POST 请求
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        // 处理响应
        if (response.ok) {
            const responseData = await response.json();
            let result=JSON.stringify(responseData, null, 2);
            let jsonResult = JSON.parse(result);
            // 提取 content 部分
            return jsonResult.choices[0].message.content;// 美化响应结果
        } else {
            console.error("Error:", response.statusText);
            return `API错误: ${response.statusText}`;
        }
    } catch (error) {
        console.error("Network error:", error);
        return "呜呜呜ai搞不起来——。+但是我知道你发了"+prompt;
    }
}

// 调用函数并打印结果
(async () => {
    const prompt = "你是 水桥帕露西，请你模仿该角色写一段回信：收到邮件: 我喜欢你。你狠可爱。请告诉我你的符卡名字。"; // 替换为你想要发送的提示词
    const result = await getAIResponse(prompt);

console.log(result);
})();