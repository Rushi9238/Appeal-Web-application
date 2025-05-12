import React from 'react'
import { LayoutDashboard, Bubbles } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
    return (
        <>
        {/* Regular Device */}
        <div className="hidden sm:flex">
            <Link href="/dashboard" className="flex items-center gap-2 font-light">
                <LayoutDashboard color='#3fc3ac' className="h-6 w-6" />
                <div className='relative'>
                    <Bubbles color="#3fc3ac" strokeWidth={2.75} className="absolute -top-4 -right-5" />
                    <span className='text-[#3fc3ac]'>Property Tax Plus</span>
                    <span className='text-[#3fc3ac] text-[8px] absolute -bottom-2 -right-1'>APPEALS</span>
                </div>
            </Link>
        </div>

        {/* Mobile Device */}
        <div className="flex sm:hidden">
            <Link href="/dashboard" className="flex items-center gap-2 font-light">
                {/* <LayoutDashboard color='#3fc3ac' className="h-5 w-5" /> */}
                <div className='relative'>
                    <Bubbles color="#3fc3ac" size={15} strokeWidth={2.75} className="absolute -top-2 -right-3" />
                    <span className='text-[#3fc3ac] text-sm'>Property Tax Plus</span>
                    <span className='text-[#3fc3ac] text-[8px] absolute -bottom-2 -right-1'>APPEALS</span>
                </div>
            </Link>
        </div>
    </>
    )
}

export default Logo