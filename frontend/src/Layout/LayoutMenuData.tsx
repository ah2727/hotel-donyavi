import {MonitorDot,Database,Activity,History,Settings} from "lucide-react";

const menuData: any = [
    {
        label: 'menu',
        isTitle: true,
    },
    {
        id: "dashboard",
        label: 'داشبورد',
        link: "/#",
        icon: <MonitorDot />,
    },
    {
        id: "data",
        label: 'اطلاعات پایه',
        link: "/#",
        icon: <Database />,
        subItems: [
            {
                id: 'analyticsdashboard',
                label: 'تجهیزات (نمودار درختی)',
                link: '/dashboards-analytics',
                parentId: "data"
            },
            {
                id: 'ecommercedashboard',
                label: 'اشخاص',
                link: '/dashboard',
                parentId: "data"
            },
            {
                id: 'emaildashboard',
                label: 'مکان ها',
                link: '/dashboards-email',
                parentId: "data"
            },
            {
                id: 'hrdashboard',
                label: 'انبار فنی',
                link: '/dashboards-hr',
                parentId: "data"
            },
            {
                id: 'socialdashboard',
                label: 'تعریف تجهیزات مستقر',
                link: '/dashboards-social',
                parentId: "data"
            },
            {
                id: 'emaildashboard',
                label: 'نوع تغییر',
                link: '/dashboards-email',
                parentId: "data"
            },
            {
                id: 'hrdashboard',
                label: 'نوع تجهیزات',
                link: '/dashboards-hr',
                parentId: "data"
            },
            {
                id: 'hrdashboard',
                label: 'نوع دستگاه',
                link: '/dashboards-hr',
                parentId: "data"
            },
            {
                id: 'hrdashboard',
                label: 'کاربران',
                link: '/dashboards-hr',
                parentId: "data"
            },
        ]
    },
    {
        id: "proccess",
        label: 'عملیات',
        link: "/#",
        icon: <Activity />,
        subItems: [
            {
                id: 'analyticsdashboard',
                label: 'ارجاع دستور کار',
                link: '/dashboards-analytics',
                parentId: "proccess"
            },
            {
                id: 'ecommercedashboard',
                label: 'اعلام خرابی',
                link: '/dashboard',
                parentId: "proccess"
            },
            {
                id: 'emaildashboard',
                label: 'تعریف سرویس دوره ای',
                link: '/dashboards-email',
                parentId: "proccess"
            },
            {
                id: 'hrdashboard',
                label: 'انجام تعمیرات',
                link: '/dashboards-hr',
                parentId: "proccess"
            },
            {
                id: 'socialdashboard',
                label: 'کاربران',
                link: '/dashboards-social',
                parentId: "proccess"
            },
        ]
    },
    {
        id: "history",
        label: 'گزارشات',
        link: "/#",
        icon: <History />,
        subItems: [
            {
                id: 'analyticsdashboard',
                label: 'تعمیرات',
                link: '/dashboards-analytics',
                parentId: "history"
            },
            {
                id: 'ecommercedashboard',
                label: 'سرویس های دوره ای',
                link: '/dashboard',
                parentId: "history"
            },
            {
                id: 'emaildashboard',
                label: 'ساعت نفر کارکرد پرسنل',
                link: '/dashboards-email',
                parentId: "history"
            },
            {
                id: 'hrdashboard',
                label: 'تجهیزات',
                link: '/dashboards-hr',
                parentId: "history"
            },
            {
                id: 'socialdashboard',
                label: 'موجودی انبار فنی',
                link: '/dashboards-social',
                parentId: "history"
            },
        ]
    },
    {
        id: "settings",
        label: 'تنظیمات',
        link: "/#",
        icon: <Settings />,
        subItems: [
            {
                id: 'changepassword',
                label: 'تغییر رمز عبور',
                link: '/dashboard',
                parentId: "dashboard"
            },

        ]
    },

];

export { menuData };