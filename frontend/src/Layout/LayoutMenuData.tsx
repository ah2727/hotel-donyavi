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
                link: '/arborist',
                parentId: "data"
            },
            {
                id: 'ecommercedashboard',
                label: 'اشخاص',
                link: '/persons',
                parentId: "data"
            },
            {
                id: 'emaildashboard',
                label: 'مکان ها',
                link: '/places',
                parentId: "data"
            },
            {
                id: 'socialdashboard',
                label: 'تعریف تجهیزات مستقر',
                link: '/DEquipment',
                parentId: "data"
            },
            {
                id: 'emaildashboard',
                label: 'نوع تعمیر',
                link: '/TypeofRepair',
                parentId: "data"
            },
            {
                id: 'hrdashboard',
                label: 'نوع تجهیزات',
                link: '/TypeEquipment',
                parentId: "data"
            },
            {
                id: 'hrdashboard',
                label: 'نوع دستگاه',
                link: '/TypeDevice',
                parentId: "data"
            },
            {
                id: 'hrdashboard',
                label: 'کاربران',
                link: '/users',
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
                link: '/WorkOrder',
                parentId: "proccess"
            },
            {
                id: 'ecommercedashboard',
                label: 'اعلام خرابی',
                link: '/failure',
                parentId: "proccess"
            },
            {
                id: 'emaildashboard',
                label: 'تعریف سرویس دوره ای',
                link: '/Periodicservice',
                parentId: "proccess"
            },
            {
                id: 'hrdashboard',
                label: 'انجام تعمیرات',
                link: '/makerepairs',
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
                link: '/RepairLog',
                parentId: "history"
            },
            {
                id: 'ecommercedashboard',
                label: 'سرویس های دوره ای',
                link: '/PeriodicServiceLog',
                parentId: "history"
            },
            {
                id: 'emaildashboard',
                label: 'ساعت نفر کارکرد پرسنل',
                link: '/Person-hour',
                parentId: "history"
            },
            {
                id: 'hrdashboard',
                label: 'تجهیزات',
                link: '/EquipmentsLog',
                parentId: "history"
            },
            {
                id: 'socialdashboard',
                label: 'موجودی انبار فنی',
                link: '/warhouseInventory',
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