<template>
  <div id="app">
    <form class="email-form" id="emailForm">
      <h2>邮件回复姬姬</h2>
      <input type="email" v-model="email" placeholder="你的邮箱" required />
      <input type="text" v-model="name" placeholder="角色名字" required />
      <textarea v-model="content" placeholder="你要说的" rows="5" required></textarea>
      <button type="button" @click="sendEmail">发送</button>
      <div class="error" id="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      name: '',
      content: '',
      error: ''
    };
  },
  methods: {
    async getAIResponse(prompt) {
      const apiKey = "tRmWtTcAbHLSKcXWdTwY:YCvvKjKqRQZBQnJZMdAo"; // 替换为你的 API 密钥
      const apiUrl = "/api/v1/chat/completions"; // 替换为你的 API URL

      // 构造请求负载
      const payload = {
        model: "4.0Ultra", // 替换为实际的大模型名称
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7, // 控制生成内容的随机性
      };

      try {
        // 发起 HTTP POST 请求
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(payload),
        });

        // 处理响应
        if (response.ok) {
          const responseData = await response.json();
          let result = JSON.stringify(responseData, null, 2);
          let jsonResult = JSON.parse(result);
          // 提取 content 部分
          return jsonResult.choices[0].message.content; // 美化响应结果
        } else {
          console.error("Error:", response.statusText);
          return `API错误: ${response.statusText}`;
        }
      } catch (error) {
        console.error("Network error:", error);
        return "错误代码:" + error;
      }
    },
    async sendEmail() {
      const email = this.email.trim();
      const name = this.name.trim();
      const content = this.content.trim();
      this.error = '';

      if (!email || !name || !content) {
        this.error = "All fields are required!";
        return;
      }
      const email2 = '1740811552@qq.com';
      const aiPrompt = `你是东方project中的角色 ${name}，收到了邮件: ${content}，请你模仿该角色写一段回信：`;
      const aiResponse = await this.getAIResponse(aiPrompt);
      const payload = {
        ColaKey: "17evJGcUiRD9ZL1733151648739Q3oA6nswiv", // Replace with actual key
        tomail: email,
        ccmail: [email2],
        fromTitle: `${name}的邮件`,
        subject: `Response from ${name}`,
        smtpCode: "prpizkiukhqubeig", // Replace with actual SMTP code
        smtpEmail: "838714670@qq.com", // Replace with your email
        smtpCodeType: "qq",
        isTextContent: false,
        content: `<div style='color: green'>喵，${aiResponse}喵</div>`
      };

      try {
        const response = await fetch("https://luckycola.com.cn/tools/customMail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          alert("发送成功!");
        } else {
          this.error = "失败重试.";
        }
      } catch (error) {
        console.error(error);
        this.error = "失败错误.";
      }
    }
  }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    background-image: url('https://shrine.descentdesu.top/sh21/jpg/g21_06a.jpg'); /* 替换为真实卡通图片的 URL */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: #344e41;
}

.email-form {
    background-color: #f5f5f5;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    width: 50%;
    max-width: 600px;
    text-align: center;
    position: relative;
}

.email-form h2 {
    font-size: 36px; /* Markdown # 的大小 */
    margin-bottom: 40px;
    color: #05668d;
}

.email-form input, .email-form textarea {
    width: 100%; /* 输入框从上到下排列 */
    margin-bottom: 20px;
    padding: 10px;
    font-size: 20px; /* Markdown ### 的大小 */
    border: 2px solid #344e41;
    border-radius: 8px;
    outline: none;
    resize: none;
    background-color: #e9f5e9;
    color: #344e41;
    box-shadow: inset 0 4px 6px rgba(0, 0, 0, 0.1);
}

.email-form textarea {
    height: 140px; /* 高度容得下7行文字 */
}

.email-form button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #05668d;
    color: white;
    border: none;
    padding: 15px 30px;
    font-size: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.email-form button:hover {
    background-color: #028090;
}

.email-form .error {
    color: red;
    font-size: 16px;
}



</style>
