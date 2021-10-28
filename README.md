# Chatbot Messenger API

### Table of Contents

- [Description](#description)
- [How to use](#how-to-use)
- [API Routes](#api-routes)
- [License](#license)
- [Author Info](#author-info)

---

## Description

The API for interacting with database that stores all information related to the user. <br />

The Front End for this application is published at [Chatbot Messenger](https://chat-bot-messenger-app.herokuapp.com/) <br />

To know more information about the front end, refer [Client folder](client/README.md)

#### Technologies

- Node JS
- Express JS
- Postgres
- Knex
- Bcrypt

[Back To The Top](#chatbot-messenger-api)

---

## How to use

Clone the project 

```bash
  git clone https://github.com/pras306/chatbot-messenger.git
```

Go to the project directory

```bash
  cd chatbot-messenger
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Start the server and client

```bash
  npm run dev
```

[Back To The Top](#chatbot-messenger-api)

---

## API Routes

[Production Base URL](https://chat-bot-messenger-app.herokuapp.com)
[Local Dev Base URL](http://localhost:5000)

#### POST - Sign in user 

```http
  POST /api/users/signin
```

| Parameter        | Type     | Description                                   |
| :--------------- | :------- | :-------------------------------------------- |
| `name`           | `string` | **Required**. user name of the user           |
| `email`          | `string` | **Required**. email address of the user       |
| `password`       | `string` | **Required**. password of the user            |
| `isGoogleSignIn` | `string` | **Required**. email of user                   |

#### POST - Register user

```http
  POST /api/users/register
```

| Parameter  | Type     | Description                                         |
| :--------- | :------- | :-------------------------------------------------- |
| `name`     | `string` | **Required**. user name of the user                 |
| `email`    | `string` | **Required**. email address of the user             |
| `password` | `string` | **Required**. password of the user                  |

#### GET Chat Rooms

```http
  GET /api/rooms
```

| Parameter  | Type     | Description                                                           |
| :--------  | :------- | :-------------------------------------------------------------------- |
| `email`    | `string` | **Required**. email address of the user whose rooms you need to fetch |


#### POST - Create Chat Room

```http
  POST /api/rooms
```

| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `email`    | `string` | **Required**. email address of the user     |
| `roomName` | `string` | **Required**. room name for the new room    |

#### GET Chat Messages

```http
  GET /api/messages
```

| Parameter   | Type     | Description                                                 |
| :---------- | :------- | :---------------------------------------------------------- |
| `roomName`  | `string` | **Required**. room name whose messages you need to fetch    |


#### POST - Create Chat Message

```http
  POST /api/rooms
```

| Parameter  | Type     | Description                                                           |
| :--------- | :------- | :-------------------------------------------------------------------- |
| `email`    | `string` | **Required**. email address of the user sending the message           |
| `roomName` | `string` | **Required**. room name where the message was sent                    |
| `message`  | `string` | **Required**. content of the message                                  |



[Back To The Top](#chatbot-messenger-api)

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

[Back To The Top](#chatbot-messenger-api)

---

## Author Info

- Github - [pras306](https://github.com/pras306)
- LinkedIn - [Prasanna Sriram](https://www.linkedin.com/in/prasanna-sriram/)

[Back To The Top](#chatbot-messenger-api)

