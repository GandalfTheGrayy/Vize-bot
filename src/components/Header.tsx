"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/MobileSidebar";

export function Header() {
    return (
        <div className="flex items-center p-4 border-b border-white/5 glass sticky top-0 z-50">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <Button variant="ghost" size="icon" className="hover:bg-white/10">
                    <Bell className="h-5 w-5 text-zinc-400" />
                </Button>
                <div className="ml-4 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-sm font-medium text-white">A</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
