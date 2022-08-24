# Auth


## POST `todobackend.com/auth/login`
Authenticates an user, creates sessionId and sets a 
cookie with sessionId and username
### Fields: ```username, password```

<br>

## POST `todobackend.com/auth/register`
Creates an user if username is available, and specified email is not already verified
### Fields: `username, password, email`

<br>

## GET `todobackend.com/auth/verify/:token`
This url is sent as an confirmation email, confirms email when clicked

# API v1


## POST `todobackend.com/api/v1/todo`
Creates a new todo for an user
### Fields: `title, body`

<br>

## GET `todobackend.com/api/v1/todo`
Responds with an array of all todos of the user

<br>

## GET `todobackend.com/api/v1/todo/:id`
Responds with an todo of the user at specified id

<br>

## POST `todobackend.com/api/v1/todo`
Creates a new todo
### Fields: `title, body`

<br>

## PUT `todobackend.com/api/v1/todo/:id`
Replaces a todo at id
### Fields: `title, body`

<br>

## PATCH `todobackend.com/api/v1/todo/:id`
Modifies a todo at id
### Fields: `title | body, newValue`

<br>



# Getting started

1. `npm i`

1. `cp .env.example .env`

1. create a secret in .env

