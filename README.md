# Auth


## POST `https://todoapi-dfk7.onrender.com/auth/login`
Authenticates an user, creates sessionId and sets a 
cookie with sessionId and username
### Body 
```
username: string
password: string
```

<br>

## POST `https://todoapi-dfk7.onrender.com/auth/register`
Creates an user if username is available, and specified email is not already verified
### Body
```
username: string
password: string
email: string
```

<br>

## GET `https://todoapi-dfk7.onrender.com/auth/verify/:token`
This url is sent as in an confirmation email, confirms email when requested

# API v1


## POST `https://todoapi-dfk7.onrender.com/api/v1/todo`
Creates a new todo for an user
### Body
```
id: string
title: string
body: string
timestamp: number
```

<br>

## GET `https://todoapi-dfk7.onrender.com/api/v1/todo`
Responds with an array of all todos of the user

<br>

## GET `https://todoapi-dfk7.onrender.com/api/v1/todo/:id`
Responds with an todo of the user at specified id

### Query
```
id: string
```

<br>

## POST `https://todoapi-dfk7.onrender.com/api/v1/todo`
Creates a new todo
### Body 
```
id: string
title: string
body: string
timestamp: number
```

<br>

## PUT `https://todoapi-dfk7.onrender.com/api/v1/todo`
Replaces a todo at id
### Body
```
id: string
title: string
body: string
timestamp: number
```

<br>

## DELETE `https://todoapi-dfk7.onrender.com/api/v1/todo/:id`
Deletes a todo at id
### Query 
```
id: string
```

<br>

## PATCH `https://todoapi-dfk7.onrender.com/api/v1/todo/:id`
~~Modifies a todo at id~~ NOT IMPLEMENTED
### Body 
```
{ 
    // one or more
    title: string
    body: string
}   
```

<br>


# Getting started

1. `npm i`

1. `cp .env.example .env`

1. create a secret in .env
