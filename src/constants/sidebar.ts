import { ISidebarItem } from "@/interfaces/sidebar";
import { ChevronLeft, Cloud, KeyRound, Mail,  User } from "lucide-react";
const sidebarItems : ISidebarItem[]= [
    {
        title : 'Chats',
        icon : ChevronLeft,
        link : '/chats',
        desc : 'Back to chats.'
    },
    {
        title: 'Account',
        icon: User,
        link: '/settings/account',
        desc: 'Update your account information like your username and name.'
    },
    {
        title: 'Email',
        icon: Mail,
        link: '/settings/email',
        desc: 'Update your email address.'
    },
    {
        title: 'Password',
        icon: KeyRound,
        link: '/settings/password',
        desc: 'Update your password.'
    },
    {
        title: 'Bio',
        icon: Cloud, 
        link: '/settings/bio',
        desc: 'Update your bio.'
    },
]

export {
    sidebarItems
}