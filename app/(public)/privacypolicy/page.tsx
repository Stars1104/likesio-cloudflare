import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Privacy = () => {
    return (
        <>
            <Header />
            <div className="w-full flex justify-center items-center flex-col lg:px-16 md:px-8 sm:px-4 px-2 mt-[100px]">
                <div className="w-full max-w-7xl flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">Privacy Policy</h1>
                        <p className="lg:text-xl md:text-xl py-2 mt-2">Last Updated : August, 10, 2024</p>
                    </div>
                    <div className="w-full flex justify-center items-center mt-8">
                        <p className="lg:text-xl md:text-xl">
                            Here at likes.io, we value both privacy and security of our customers, both existing
                            and potential. On this page you will find a brief outline that contains information
                            that we generally receive from those visiting our website paired with short and
                            concise descriptions for each. If you still have any further inquiries, please do not
                            hesitate to send a message and get in touch with us using our Contact Us page.
                            Everything listed in this page applies to likes.io. By using our website,
                            you agree to give us your consent that allows the collection and storage of
                            information detailed below.
                        </p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start py-4 mt-4 space-y-4">
                        <h1 className="lg:text-2xl md:text-3xl sm:text-xl text-xl font-bold">COOKIES</h1>
                        <p className="lg:text-xl md:text-xl">
                            As one of the most common elements when browsing the World Wide Web,
                            likes.io utilizes cookies in a way that most if not all websites
                            generally do which is to store certain content based on online
                            activities and record them usually to make everything faster.
                            This is achieved using the browser of your choice, which transmits the data.
                            Google, arguably the most popular third-party vendor, uses cookies in order to
                            properly direct and advertise users to websites of interest, recommending likes.io
                            and various other types of websites online. To find out more and acquire more
                            information related to the matter, please visit : https://www.google.com/policies/technologies/ads/ It
                            is ill-advised to disable the options for the cookies but it is possible to do so. This can generally
                            be done via the options or settings page of the browser. Be advised however that tinkering with your
                            browser settings haphazardly can have negative results. To this end, please get in consult the respective
                            developer first before making any modifications. By disabling the cookies, likes.io website may not
                            run as it was intended to do so.
                        </p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start py-4 mt-4 space-y-4">
                        <h1 className="lg:text-2xl md:text-3xl sm:text-xl text-xl font-bold">LOGS</h1>
                        <p className="lg:text-xl md:text-xl">
                            Not unlike cookies, logs or log files are typically utilized by many websites online.
                            Information pertaining to the Internet Protocol or simply IP address as it is more
                            commonly referred to as contained within the logs, and this allows your Internet Service
                            Provider or ISP to better track your internet activities. The data usually isn’t linked to
                            any personally identifiable information and exists primarily to analyze trends that can make
                            browsing much more efficient.
                        </p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start py-4 mt-4 space-y-4">
                        <h1 className="lg:text-2xl md:text-3xl sm:text-xl text-xl font-bold">HOW COLLECTED AND STORED INFORMATION IS UTILIZED</h1>
                        <p className="lg:text-xl md:text-xl">
                            Any and all data acquired by your visit of a website is meant to make the process
                            of browsing easier and faster. This is done by analyzing the trends in preferences
                            and habits that then direct you to websites of interest, including but not necessarily
                            limited to our services as well as associated entities. This not only helps our own
                            business grow and develop but also allows success to find other businesses as well.
                            Data collected and stored by usually goes into helping us give you more information
                            on any of our products and services as well as those of affiliated companies. This
                            also helps us make improvements to our website that we would not have been able to
                            notice otherwise. Everything listed on this page may not necessarily apply to other
                            links and websites, and by going to the aforementioned websites you are agreeing to
                            their own policies and terms of use. Please take note that any data or information may
                            not always be secure, and we at likes.io hold no responsibility over any losses or
                            damages that could potentially stem from their corruption as well as interception by
                            unknown parties.
                        </p>
                    </div>
                    <div className="w-full flex flex-col justify-center items-start py-4 mt-4 space-y-4">
                        <h1 className="lg:text-2xl md:text-3xl sm:text-xl text-xl font-bold">CHANGES OR DELETION IN USER INFORMATION</h1>
                        <p className="lg:text-xl md:text-xl">
                            For existing customer who either want to make changes to their respective accounts or no
                            longer wish to be a part of likes.io, please send us a message through our Contact Us
                            page and we will get it done for you However, take note that any significant changes can
                            drastically affect any services that you may currently have with us.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Privacy;