"use client"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Image from "next/image"

const AboutUs = () => {
    return (
        <div>
            <Header />
            <section className="w-full flex flex-col justify-center items-center mt-[80px] px-2">
                <div className="max-w-7xl w-full flex flex-col justify-center items-center">
                    <div className="max-w-7xl w-full flex flex-col justify-center items-center pt-10">
                        <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                                About Us
                            </h1>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center mt-8">
                            <h2 className="text-2xl font-[system-ui] font-bold text-[#001F3F] mb-4 text-center">
                                Connection. Engagement. Innovation.
                            </h2>
                            <p className="lg:w-[50%] md:w-[70%] w-full text-center text-xl font-[system-ui] font-medium text-gray-600">
                                These are the values that drive us. And it starts at the top. From our CEO down to every level of our organization.
                            </p>
                        </div>
                    </div>

                    {/* Our Teams Section */}
                    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-2xl border border-[#001F3F]/10">
                                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Our Research Team</h3>
                                <p className="text-lg text-gray-600">
                                    Our research team uses data to help make informed decisions. We analyze what&apos;s trending, why it&apos;s trending, and how you can get in on the conversation. We help you expand your audience by targeting all the things that matter most on social media.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-[#001F3F]/10">
                                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Our Technical Experts</h3>
                                <p className="text-lg text-gray-600">
                                    Our technical experts put these plans into action. The findings from the research team are then integrated with technical expertise and a deep understanding of the algorithms. The end result: more engagement. Genuine growth. A seamless customer experience from start to finish.
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-[#001F3F]/10">
                                <h3 className="text-xl font-bold text-[#001F3F] mb-3">Our Customer Service Team</h3>
                                <p className="text-lg text-gray-600">
                                    Last but not least our customer service team provides white-glove service to guide the process at every turn. We never leave our clients in the dark when it comes to elevating their profile. Full transparency always leads the way.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Our Promise Section */}
                    <div className="w-full flex flex-col text-center justify-center items-center mt-16 gap-8">
                        <h2 className="lg:text-[2.5rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                            Our Promise to You
                        </h2>
                        <p className="lg:w-[60%] md:w-[70%] w-full text-lg font-medium text-gray-600 text-center">
                            The social media industry isn&apos;t just a business to us. It&apos;s something we&apos;re deeply passionate about. We live and breathe this universe and want to provide the best experience possible for our customers. No matter what it takes.
                        </p>
                        <p className="lg:w-[60%] md:w-[70%] w-full text-lg font-medium text-gray-600 text-center">
                            We won&apos;t rest until we&apos;ve delivered on our promises. We strive to earn your trust and have you join the ranks of the countless other customers who rely on us to deliver a wide range of engagement services.
                        </p>
                        <p className="text-xl font-semibold text-[#296ff9] mt-4">
                            So what are you waiting for? Have a look around and place your next order today.
                        </p>
                    </div>

                    {/* Logo Section - If needed */}
                    <div className="md:flex md:justify-center md:items-center grid grid-cols-2 gap-10 mt-12">
                        <Image alt="Logo" src="/assets/icon/logo-img-3.svg" width={80} height={80} />
                        <Image alt="Logo" src="/assets/icon/logo-img-2.svg" width={120} height={120} />
                        <Image alt="Logo" src="/assets/icon/logo-img-1.svg" width={120} height={120} />
                        <Image alt="Logo" src="/assets/icon/logo-img-4.svg" width={120} height={120} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default AboutUs