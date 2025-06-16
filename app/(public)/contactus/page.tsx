"use client"

import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ContactUs = () => {
    return (
        <div>
            <Header />
            <section className="w-full flex flex-col justify-center items-center mt-[80px] px-2">
                <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-10">
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                            Contact Us</h1>
                    </div>
                    <div className="flex w-full flex-col justify-center items-center mt-8">
                        <span className="lg:w-[50%] md:w-[70%] text-center md:text-xl text-lg font-[system-ui] font-medium text-gray-600">
                            At Likes.io, we pride ourselves on our expert, best-in-the-industry customer care. There are two reasons why.
                        </span>
                    </div>
                    <div className="lg:w-1/2 w-full flex justify-center items-center mt-8">
                        <form action="" className="h-fit bg-transparent border border-[#192d5a] rounded-2xl p-4 lg:w-[80%] w-full mx-auto">
                            <div className="relative mb-4">
                                <label className="flex items-center mb-2 text-[#192d5a] text-base leading-6 font-medium font-[system-ui]">Your Name </label>
                                <div className="relative text-[#192d5a] focus-within:text-[#192d5a]">
                                    <input type="text" id="username" className="w-full block h-12 pr-5 py-2.5 text-base font-medium leading-7 shadow-xs text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg placeholder-[#192d5a] focus:outline-none" placeholder="Your Name" />
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <label className="flex  items-center mb-2 text-[#192d5a] text-base leading-6 font-medium font-[system-ui]">Email </label>
                                <div className="relative text-[#192d5a] focus-within:text-[#192d5a]">
                                    <input type="text" id="email" className="w-full block h-12 pr-5 py-2.5 text-base font-medium leading-7 shadow-xs text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg placeholder-[#192d5a] focus:outline-none" placeholder="Email Address" />
                                </div>
                            </div>
                            <div className="relative mb-4">
                                <label className="flex  items-center mb-2 text-[#192d5a] text-base leading-6 font-medium font-[system-ui]">Message </label>
                                <div className="relative ">
                                    <textarea className="block w-full h-40 px-4 py-2.5 text-base leading-7 font-medium shadow-xs text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg placeholder-[#192d5a] focus:outline-none resize-none" placeholder="Message"></textarea>
                                </div>
                            </div>
                            <button className="w-full h-12 rounded-lg bg-gradient-to-r from-[#296FF9] to-[#59CEFC] hover:bg-[#234183] transition-all duration-700 shadow-sm text-white text-sm font-semibold leading-6 flex items-center justify-center uppercase font-[system-ui]">Send</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ContactUs;