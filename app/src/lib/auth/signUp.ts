export default async function SignIn(username:string , password:string) {
    return fetch('/api/auth/signin',{
        method:'POST',
        cache:'no-cache',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
}   