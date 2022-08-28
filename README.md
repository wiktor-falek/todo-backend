# Auth


## POST `todobackend.com/auth/login`
Authenticates an user, creates sessionId and sets a 
cookie with sessionId and username
### Fields 
```
username: string
password: string
```

<br>

## POST `todobackend.com/auth/register`
Creates an user if username is available, and specified email is not already verified
### Fields
```
username:string
password:string
email:string
```

<br>

## GET `todobackend.com/auth/verify/:token`
This url is sent as in an confirmation email, confirms email when requested

# API v1


## POST `todobackend.com/api/v1/todo`
Creates a new todo for an user
### Fields
```
title: string
body: string
id: string
timestamp: number
```

<br>

## GET `todobackend.com/api/v1/todo`
Responds with an array of all todos of the user

<br>

## GET `todobackend.com/api/v1/todo/:id`
Responds with an todo of the user at specified id

<br>

## POST `todobackend.com/api/v1/todo`
Creates a new todo
### Fields 
```
title: string
body: string
id: string
timestamp: number
```

<br>

## PUT `todobackend.com/api/v1/todo/:id`
Replaces a todo at id
### Fields
```
title: string
body: string
id: string
timestamp: number
```

<br>

## PATCH `todobackend.com/api/v1/todo/:id`
Modifies a todo at id
### Fields 
```
id: string
fields: { 
    // one or more
    title: string
    body: string
    
    }
```

<br>

## DELETE `todobackend.com/api/v1/todo/:id`
Deletes a todo at id
### Fields 
```
id: string
```



# Getting started

1. `npm i`

1. `cp .env.example .env`

1. create a secret in .env

