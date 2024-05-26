import jwt , { Jwt } from "jsonwebtoken";

const token = jwt.sign({ foo: 'bar'} , 'your_secret_key');
console.log(token);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MTY2MjMyNzZ9.6m3eBIZBB6GOwaUfHPc-6dHltX4goIbKfCpxmAe1m8E