"use client"
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import Link from "next/link";

const OurTeam = () => {
    return (
        <div>
            <Header />
            <section className="w-full flex justify-center mt-[150px]">
                <div className="w-full max-w-7xl flex flex-col justify-center items-center px-2">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h1 className="lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">Meet The Team</h1>
                    </div>
                    <div className="md:w-[65%] w-full flex flex-col justify-center items-center mt-8">
                        <p className="md:text-xl text-lg text-center font-[system-ui] text-gray-600">
                            Our mission is to take your social media to the next level. How do we do it? By putting elite engagement services in your back pocket.
                        </p><br />
                        <p className="md:text-xl text-lg text-center font-[system-ui] text-gray-600">
                            We have a massive network of highly active social media users that can help you gain genuine growth on Instagram like few other platforms can.
                        </p><br />
                        <p className="md:text-xl text-lg text-center font-[system-ui] text-gray-600">
                            We don&apos;t just inflate your numbers and call it a day though. We also provide invaluable content that shows you exactly what it takes to build (and maintain) a community of your own.
                        </p><br />
                        <p className="md:text-xl text-lg text-center font-[system-ui] text-gray-600">
                            Our editor in chief Dan Wonder is an industry expert who has helped numerous personal brands grow online and is here to do the same for you. Have a look around, and if you have any questions, don&apos;t hesitate to get in touch.
                        </p>
                    </div>
                    <div className="md:w-[65%] w-full flex flex-col justify-center items-center py-4 md:mt-20 mt-16 gap-6 px-2">
                        <div className="w-[100px] h-[100px] flex justify-center items-center rounded-full border border-[#001F3F]">
                            <Image src="/assets/img/auth.png" width={100} height={100} alt="Auth" className="w-full h-full rounded-full" />
                        </div>
                        <h1 className="text-3xl font-bold">Dan Wonder</h1>
                        <span className="text-gray-400 text-lg">EDITOR-IN-CHIEF</span>
                        <div className="flex justify-center items-center gap-3">
                            <Link href="https://x.com/dreamwondercopy"><FaTwitter className="text-gray-400 w-7 h-7" /></Link>
                            <Link href="https://youtube.com/@dreamwondercopy"><FaYoutube className="text-gray-400 w-7 h-7" /></Link>
                        </div>
                        <div className="w-full md:text-center text-start">
                            <p className="md:text-xl text-lg text-center font-[system-ui] text-gray-600">
                                Dan is the founder of Dream & Wonder Copywriting. He is an experienced content creator who has collaborated with businesses across nearly every industry — from software and technology to real estate, finance, e-commerce, and beyond. By leveraging his passion for educating readers, his writing is able to reach audiences far and wide. His motto is simple: if you can dream it, it can be done.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default OurTeam;