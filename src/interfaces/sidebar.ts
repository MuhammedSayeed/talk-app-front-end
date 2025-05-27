export interface ISidebarItem {
    title: string;
    icon: React.ComponentType<React.ComponentProps<'svg'>>;
    link: string;
    desc: string; 
}