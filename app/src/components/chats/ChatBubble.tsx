export default function({username , message , ownMessage = false}) {
    return(
        <div className={`flex items-start md:max-w-md max-w-xs rounded-3xl p-4 gap-4 ${ownMessage? 'ml-auto justify-end':'bg-slate-200 dark:bg-slate-700 justify-start'} ${ownMessage && 'bg-blue-500 text-white'}`}>
            <div className="grid gap-1">
              <div className="font-bold text-sm">{username}</div>
              <div>
                <pre className="text-wrap font-sans">{message.toString()}</pre>
              </div>
            </div>
        </div>
    )
}