'use client'

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Grid2X2Icon, Menu, Package, ReceiptIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function SideBar() {
    const [open, setOpen] = useState(false)

    interface NavItem {
        title: string
        href: string
        icon: React.ComponentType<{ className?: string }>
    }

    const navItems: NavItem[] = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>,
        },
        {
            title: "Analytics",
            href: "/dashboard/analytics",
            icon: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
        },
        {
            title: "Customers",
            href: "/dashboard/customers",
            icon: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        },
        {
            title: "Products",
            href: "/dashboard/products",
            icon: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>,
        },
        {
            title: "Settings",
            href: "/dashboard/settings",
            icon: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>,
        },
    ]
    return (
        <div className="bg-gray-100/90">
            <aside className="hidden w-64 border-r lg:block h-max">
                <div className="flex h-full flex-col">
                    <div className="flex h-14 items-center border-b px-7 my-1">
                        <Link className="flex items-center gap-2 font-semibold" href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                            </svg>
                            <span>Acme Inc</span>
                        </Link>
                    </div>
                    <ScrollArea className="h-[600px] rounded-md ">
                        <nav className="grid gap-1 px-2">
                         
                                <Link
                                    href="/facturas"
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                                        "focus:bg-gray-100 dark:focus:bg-gray-800",
                                        "active:bg-gray-100 dark:active:bg-gray-800"
                                    )}
                                >
                                    <ReceiptIcon className="h-4 w-4" />
                                    Facturas
                                </Link>
                                <Link
                                    href="/productos"
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                                        "focus:bg-gray-100 dark:focus:bg-gray-800",
                                        "active:bg-gray-100 dark:active:bg-gray-800"
                                    )}
                                >
                                    <Package className="h-4 w-4" />
                                    Productos
                                </Link>
                                <Link
                                    href="/categorias"
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                                        "focus:bg-gray-100 dark:focus:bg-gray-800",
                                        "active:bg-gray-100 dark:active:bg-gray-800"
                                    )}
                                >
                                    <Grid2X2Icon className="h-4 w-4" />
                                    Categorias
                                </Link>
                                
                          
                        </nav>
                    </ScrollArea>
                </div>
            </aside>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="lg" className="lg:hidden">
                        <Menu className="h-6 w-10" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    <div className="flex h-full flex-col">
                        <div className="flex h-14 items-center border-b px-4">
                            <Link className="flex items-center gap-2 font-semibold" href="#" onClick={() => setOpen(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                                </svg>
                                <span>Acme Inc</span>
                            </Link>
                        </div>
                        <ScrollArea className="flex-1">
                            <nav className="grid gap-1 px-2 py-2">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                                            "hover:bg-gray-100 dark:hover:bg-gray-800",
                                            "focus:bg-gray-100 dark:focus:bg-gray-800",
                                            "active:bg-gray-100 dark:active:bg-gray-800"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.title}
                                    </Link>
                                ))}
                            </nav>
                        </ScrollArea>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}