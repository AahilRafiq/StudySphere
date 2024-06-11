import { useToast } from "@/components/ui/use-toast"

export function actionResponseObj<T>(success:boolean , err?:string , res?: T) {
    return {
        success,
        err: err,
        res: res
    }
}

export function displayToast(toast:any, err: string) {
    toast({
        title: "Error",
        variant: "destructive",
        description: err
    })
}