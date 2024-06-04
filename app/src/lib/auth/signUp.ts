export default async function SignUp(username:string ,email:string , password:string, confirmPass: string) {
    return fetch('/api/auth/signup',{
        method:'POST',
        cache:'no-cache',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password,
            confirmPass
        })
    })
}   