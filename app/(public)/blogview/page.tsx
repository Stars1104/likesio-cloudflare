import Image from "next/image";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Link from "next/link";

const BlogView = () => {
    return (
        <div>
            <Header />
            <section className="w-full flex justify-center items-center mt-[80px] px-2">
                <div className="max-w-[50rem] w-full flex flex-col justify-start items-start pt-10 gap-6">
                    <Image src="/assets/img/blog/blog-1.jpg" width={800} height={500} alt="Blog" className="w-full md:h-[28rem] rounded-3xl" />
                    <h1 className="text-3xl text-[#001F3F] font-medium text-start cursor-pointer hover:text-[#3b7bfe]">Free Instagram Reporting: Tips for Analytics Success</h1>
                    <span className="text-xl text-gray-400 uppercase">published on 11th october 2024</span>
                    <span className="text-[#001F3F] text-xl">
                        You may not realize it, but Instagram has many free reporting and analytic features built right into the app. Using these features will give you important insights into your Instagram marketing strategy. From there, you can more easily determine what changes you need to make and when to make them. <br /><br />
                        The following information should help you get the most out of the free reporting and analytics already included in Instagram.
                    </span>
                    <Link href="../blog" className="px-8 py-3 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] text-white rounded-lg">Go to back Blog</Link>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default BlogView;