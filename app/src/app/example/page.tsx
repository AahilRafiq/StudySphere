import {db} from '@/db/db'
import {user} from '@/db/schema'

export default async function() {
    const users = await db.select().from(user)

    return (
        <div>
            <p>{JSON.stringify(users)}</p>
        </div>
    )
}