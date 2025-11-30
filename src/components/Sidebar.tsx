"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    ListTodo,
    Settings,
    LogOut,
    Bot,
    BarChart3
} from "lucide-react";

const routes = [
    {
        label: "Panel",
        icon: LayoutDashboard,
        href: "/",
        color: "text-sky-500",
    },
    {
        label: "Raporlar",
        icon: BarChart3,
        href: "/reports",
        color: "text-violet-500",
    },
    {
        label: "Başvurular",
        icon: Users,
        href: "/applicants",
        color: "text-pink-700",
    },
    {
        label: "Görevler",
        icon: ListTodo,
        href: "/tasks",
        color: "text-emerald-500",
    },
    {
        label: "Ayarlar",
        icon: Settings,
        href: "/settings",
        color: "text-gray-500",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full glass text-white border-r border-white/10">
            <div className="px-3 py-2 flex-1">
                <Link href="/" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Bot className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Dela Turizm
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition relative overflow-hidden",
                                pathname === route.href
                                    ? "text-white bg-white/10"
                                    : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1 z-10">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                            {pathname === route.href && (
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-50" />
                            )}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <div className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400">
                    <div className="flex items-center flex-1">
                        <LogOut className="h-5 w-5 mr-3 text-red-500" />
                        Çıkış
                    </div>
                </div>
            </div>
        </div>
    );
}
