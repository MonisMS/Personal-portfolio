"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-8">
        <div className="flex justify-center items-center h-screen flex-col">
            <h1>I help founders turn their ideas into reality</h1>
            <h2>I am Monis Sarwar a fullstack developer</h2>
            <div>
                <Button className="-translate-x-1 cursor-pointer">Let&apos;s connect</Button>
            <Button className="cursor-pointer">monissms16@gmail.com</Button>
            </div>
            
        </div>
        
        </div>
    )
}