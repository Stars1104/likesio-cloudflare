"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const FooterItems = [
    {
        title: "FAQ",
        path: "faq"
    },
    { 
        title: "Blog",
        path: "blog"
    },
    { 
        title: "About Us",
        path: "aboutus"
    },
    { 
        title: "Our Team",
        path: "ourteam"
    },
    { 
        title: "Contact Us",
        path: "contactus"
    },
    { 
        title: "Term of Service",
        path: "termofservice"
    },
    { 
        title: "Privacy Policy",
        path: "privacypolicy"
    },
];

const Footer = () => {
    const router = useRouter();
    
    const PageDirectory = (route: string) => {
        if (route === "About Us") router.push("/aboutus");
    }
    
    return (
        <footer className="w-full mt-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="w-full flex flex-col justify-center items-start">
                    {/* Navigation Links */}
                    <div className="w-full flex flex-row flex-wrap justify-start items-center gap-8 py-10">
                        {
                            FooterItems.map((item) => (
                                <Link key={item.title} href={"/" + item.path} className="text-[#192d5a] md:text-lg text-base hover:text-[#2563EB] transition duration-300" onClick={() => PageDirectory(item.title)}>{item.title}</Link>
                            ))
                        }
                    </div>
                    
                    {/* Service Sections - Fixed to be in a single row with equal spacing */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 py-8">
                        {/* Instagram Services */}
                        <div className="flex flex-col justify-start items-start gap-6">
                            <h1 className="font-medium font-[system-ui] lg:text-xl text-xl h-8 text-[#192d5a]">Instagram Services</h1>
                            <div className="flex flex-col justify-start items-start gap-3 font-[system-ui] text-[#192d5a] lg:text-[1rem]">
                                <Link href="/instagramlikes" className="hover:text-[#2563EB] transition duration-300">Buy Instagram Likes</Link>
                                {/* <Link href="/instagramcomments" className="hover:text-[#2563EB] transition duration-300">Buy Instagram Comments</Link> */}
                                <Link href="/instagramfollowers" className="hover:text-[#2563EB] transition duration-300">Buy Instagram Followers</Link>
                                <Link href="/instagramviews" className="hover:text-[#2563EB] transition duration-300">Buy Instagram Views</Link>
                                <Link href="/instagramviews" className="hover:text-[#2563EB] transition duration-300">Automatic Instagram Likes</Link>
                            </div>
                        </div>
                        
                        {/* TikTok Services */}
                        <div className="flex flex-col justify-start items-start gap-6">
                            <h1 className="font-medium font-[system-ui] lg:text-xl text-xl h-8 text-[#192d5a]">TikTok Services</h1>
                            <div className="flex flex-col justify-start items-start gap-3 font-[system-ui] text-[#192d5a] lg:text-[1rem]">
                                <Link href="/tiktoklikes" className="hover:text-[#2563EB] transition duration-300">Buy TikTok Likes</Link>
                                <Link href="/tiktokfollowers" className="hover:text-[#2563EB] transition duration-300">Buy TikTok Followers</Link>
                                <Link href="/tiktokviews" className="hover:text-[#2563EB] transition duration-300">Buy TikTok Views</Link>
                            </div>
                        </div>
                        
                        {/* YouTube Services */}
                        <div className="flex flex-col justify-start items-start gap-6">
                            <h1 className="font-medium font-[system-ui] lg:text-xl text-xl h-8 text-[#192d5a]">YouTube Services</h1>
                            <div className="flex flex-col justify-start items-start gap-3 font-[system-ui] text-[#192d5a] lg:text-[1rem]">
                                <Link href="/youtubeviews" className="hover:text-[#2563EB] transition duration-300">Buy YouTube Views</Link>
                                <Link href="/youtubesubscribers" className="hover:text-[#2563EB] transition duration-300">Buy YouTube Subscribers</Link>
                                <Link href="/youtubelikes" className="hover:text-[#2563EB] transition duration-300">Buy YouTube Likes</Link>
                            </div>
                        </div>
                        
                        {/* Coming Soon */}
                        <div className="flex flex-col justify-start items-start gap-6">
                            <h1 className="font-medium font-[system-ui] lg:text-xl text-xl h-8 text-[#192d5a]">Tools & Resources</h1>
                            <div className="flex flex-col justify-start items-start gap-3 font-[system-ui] text-[#192d5a] lg:text-[1rem]">
                                <Link href="/instagramvideodownloader" className="hover:text-[#2563EB] transition duration-300">Instagram Video Downloader</Link>
                                <Link href="/instagramprofilepictureviewer" className="hover:text-[#2563EB] transition duration-300">Instagram Profile Picture Viewer</Link>
                                <Link href="/instagramstorydownloader" className="hover:text-[#2563EB] transition duration-300">Instagram Story Downloader</Link>
                            </div>
                        </div>
                        
                        {/* My Account */}
                        <div className="flex flex-col justify-start items-start gap-6">
                            <h1 className="font-medium font-[system-ui] lg:text-xl text-xl h-8 text-[#192d5a]">My Account</h1>
                            <div className="flex flex-col justify-start items-start gap-3 font-[system-ui] text-[#192d5a] lg:text-[1rem]">
                                <Link href="/auth/signin" className="hover:text-[#2563EB] transition duration-300">Log In</Link>
                                <Link href="/auth/signup" className="hover:text-[#2563EB] transition duration-300">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Copyright and Payment Methods */}
                <div className="py-7 border-t border-gray-200">
                    <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                        <span className="text-sm text-[#192d5a] ">Copyright © 2025 Likes.io. All Rights Reserved</span>
                        <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                            <Image src="assets/icon/payment.svg" width={250} height={50} className="w-[250px] h-[50px]" alt="Payment" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;