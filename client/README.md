# Chatbot Messenger

![Chatbot messenger](src/assets/images/chatbot_messenger.png)

---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [Features](#features)
- [API References](#api-references)
- [License](#license)
- [Author Info](#author-info)

---

## Description

This is a web application for chatting with a chat bot

#### Technologies

- React JS
- Redux
- Local Storage
- React Router
- Firebase

[Back To The Top](#chatbot-messenger)

---

## How To Use

The website is published at [Chatbot Messenger](https://chat-bot-messenger-app.herokuapp.com/)

Clone the project 

```bash
  git clone https://github.com/pras306/chatbot-messenger.git
```

Go to the project directory

```bash
  cd chatbot-messenger/client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

---

## Features

- User Authentication
- Google Signin by Firebase
- Simple Chatbot that responds to user queries
- Ability to create and delete different chat rooms

---

## API References

- [Firebase API](https://firebase.google.com/)
- [Chatbot Server](https://chat-proxy-server.herokuapp.com/query)

#### Send message

```http
  POST /${term}
```

| Parameter   | Type     | Description                                                           |
| :---------- | :------- | :-------------------------------------------------------------------- |
| `term`      | `string` | **Required**. the message sent by user to which the bot will respond  |



[Back To The Top](#chatbot-messenger)

---

## License

MIT License

Copyright (c) [2021] [Prasanna Sriram]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#chatbot-messenger)

---

## Author Info

- Github - [pras306](https://github.com/pras306)
- LinkedIn - [Prasanna Sriram](https://www.linkedin.com/in/prasanna-sriram/)

[Back To The Top](#chatbot-messenger)