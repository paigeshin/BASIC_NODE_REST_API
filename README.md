# node_js_rest_api_basic

# Notion
[document](https://www.notion.so/REST-APIs-09a8f34c72b44e35a9d50459c2dec735)


# Decoupling Frontend and Backend

- What are 'REST APIs'?
- Why use/build REST APIs?
- Core REST Concepts & Principles
- First REST API!

# What & Why?

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8814f0ce-f47b-4f22-8303-1c57b119d892/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8814f0ce-f47b-4f22-8303-1c57b119d892/Untitled.png)

- Not every Frontend (UI) required HTML Pages!

⇒ Mobile Apps(e.g. Twitter)

- Single Page Web Apps

⇒ (e.g. Udemy Course Player)

- Service APIs

⇒ (e.g. Google Maps API)

# A Different Kind of Response is Needed

- **Re**presentational **S**tate **T**ransfer
- Transfer Data instead of User Interfaces

⇒ Transfer Data instead of User Interfaces

ℹ️  Important: Only the response (and the requested data) changes, NOT the general server-side logic!

# REST API Big Picture

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/22c73355-9f8d-4c0e-a84e-c1a989a947f9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/22c73355-9f8d-4c0e-a84e-c1a989a947f9/Untitled.png)

# Data Formats

- HTML

```html
<p>Node.js</p>
```

⇒ Data + Structure 

⇒ Contains User Interface

⇒ Unnecessarily difficult to parse if you just need the data 

⇒ HTML is actually a different kind of `XML`

- Plain Text

```
Node.js
```

⇒ Data 

⇒ No UI Assumptions 

⇒ Unnecessarily difficult to parse, no clear data structure 

- XML

```xml
<name>Node.js</name>
```

⇒ Data 

⇒ No UI Assumptions

⇒ Machine-readable but relatively verbose; XML-parser needed

- **JSON**

```json
{"title": "Node.js"}
```

⇒ Data 

⇒ No UI Assumptions

⇒ Machine-readable and concise; Can easily be converted to Javascript

# Understanding Routing & HTTP Methods

### Routing

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f40bfd5-ee9c-4457-8fc8-71c8e477038f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7f40bfd5-ee9c-4457-8fc8-71c8e477038f/Untitled.png)

### Http Methods (Http Verbs)

- More than just GET & POST

⇒ GET: Get a Resource from the Server

⇒ POST: Post a Resource to the Server (i.e. create or append Resource)

⇒ PUT: Put a Resource onto the Server (i.e. create or overwrite a Resource)

⇒ PATCH: Update parts of an existing Resource on the Server

⇒ DELETE: Delete a Resource on the Server 

⇒ Options: Determine whether follow-up Request is allowed (sent automatically)

# REST APIs - The Core Principles

- **Uniform Interface**

⇒ Clearly defined API endpoints with clearly defined request + response data structure

- **Stateless Interactions**

⇒ Server and client don't store any connection history, every request is handled seperately

- Cacheable

⇒ Servers may set caching headers to allow the client to cache responses

- Client-Server

⇒ Server and client are separated, client is not concerned with persistent data storage

- Layered System

⇒ Server may forward requests to other APIs 

- Code on Demand

⇒ Executable code may be transferred from server to client 

ℹ️  Package.json 분석

```json
{
  "name": "rest_api_node",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.4"
  }
}
```

⇒ `start`  node.js script

⇒ `npm start` 를 쓰면 `nodemon app.js` 가 실행된다.

⇒ devDependencies, 개발용 dependency 

```bash
npm install --save-dev nodemon
```

# First Simple REST API

ℹ️  Difference between urlencoded, parse json data 

```jsx
// x-www-form-urlencoded, <form>, for form data
app.use(bodyParser.urlencoded());

// application/json, parse json data.
app.use(bodyParser.json());
```

`x-www-form-urlencoded`

`application/json` 

⇒ 위에 모두 header에서 있는 정보.

ℹ️  `Get` Request can't hold body 

# CORS Errors

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16a0a1f7-5345-47bd-8b7e-e91c4d1e0315/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/16a0a1f7-5345-47bd-8b7e-e91c4d1e0315/Untitled.png)

```jsx
<button id="get">Get Posts</button> 
<button id="post">Create a Post</button>

<script>
const getButton = document.getElementById('get');
const postButton = document.getEelementById('post');

getButton.addEventListener('click', () => {
    fetch('http://localhost:8080/feed/posts')
        .then(res => res.json())
        .then(resData => console.log(resData))
        .catch(err => console.log(err));
});

postButton.addEventListener('click', () => {
    fetch('http://localhost:8080/feed/post', {
        method: 'POST',
        body: JSON.stringfy({
            title: 'A Codepen Post',
            content: 'Created via Codepen'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(resData => console.log(resData))
        .catch(err => console.log(err));
})

</script>
```

### What is CORS?

- **C**ross-**O**rigin **R**esource **S**haring
- CORS errors occur when using an API that does not set CORS headers

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5fc1df0-50a9-439f-8401-f654ad2fb37d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5fc1df0-50a9-439f-8401-f654ad2fb37d/Untitled.png)

⇒ You can't share resources across domains

⇒ You can only solve `CORS` error on the server.

### Set special header with middleware

```jsx
//set middleware for CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //arg2: domains. or use wild card
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); //arg2: allow methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //arg2: allow headers
    next();
});
```

# Module Summary

### REST Concepts & Ideas

- REST APIs are all about data, no UI logic is exchanged
- REST APIs are normal Node servers which expose different endpoints (Http method + path) for clients to send requests to
- JSON is the common data format that is used both for requests and responses
- REST APIs are decoupled from the clients that use them

### Requests & Responses

- Attach data in JSON format and let the other end know by setting the 'Content-Type' header
- CORS errors occur when using an API that does not set CORS headers
