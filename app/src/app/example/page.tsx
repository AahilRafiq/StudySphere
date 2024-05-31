import { db } from '@/db/db'
import {User} from '@/db/schema'
import { log } from 'console'

export default async function() {
    const users = await db.select().from(User)
    console.log(users)

    await new Promise((resolve) => 
        setTimeout(() => {
            console.log('done')
            resolve('gg')
        }, 5000)
    )

    return (
        <div>
            <p>elloH</p>
        </div>
    )
}