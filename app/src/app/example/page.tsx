import {db} from '@/db/db'
import {User} from '@/db/schema'
import { auth } from '@/auth'

export default async function() {
    // const users = await db.select().from(User)
    const session = await auth()

    return (
        <div>
            <p>{JSON.stringify(session)}</p>
        </div>
    )
}