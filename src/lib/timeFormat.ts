/* eslint-disable @typescript-eslint/no-unused-vars */
import { format , differenceInMinutes, isToday, isYesterday } from "date-fns";


export const formatTime = (createdAt: string)=>{
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffMinutes = differenceInMinutes(now , createdDate);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 10) return `${diffMinutes} min ago`;
    if (isToday(createdDate)) return format(createdDate , "h:mm a");
    if (isYesterday(createdDate)) return `Yesterday, ${format(createdDate, "h:mm a")}`;

    return format(createdDate, "dd/MM/yyyy, h:mm a");
}

export const formatTimeDifferentForm = (createdAt: string , showDay : boolean = false)=>{
    let formatString = '';
    if (showDay){
        formatString = 'EEEE - dd MMMM yyyy';
    }else{
        formatString = 'dd MMMM yyyy';
    }
    return format(new Date(createdAt), formatString)
}
