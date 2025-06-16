"use client"
import { FC, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogCategoryData {
    id: number,
    title: string,
    isActive: boolean
}

const Blog: FC = () => {
    const [isBlogParentID, setIsBlogParentID] = useState<number>(0);
    const router = useRouter();
    const [blogCategory, setBlogCategory] = useState<BlogCategoryData[]>([
        {
            id: 0,
            title: "All Articles",
            isActive: true
        },
        {
            id: 1,
            title: "Instagram",
            isActive: false
        },
        {
            id: 2,
            title: "How To is",
            isActive: false
        },
        {
            id: 3,
            title: "Tips & Tricks",
            isActive: false
        }
    ])

    const blogTemplate = [
        {
            id: 0,
            parentID: 1,
            img: "/assets/img/blog/blog-1.png",
            title: "Instagram Privacy: Can Others See You Watching Their Profile?",
            date: "11th of june 2024",
            content: "Are you secretly scrolling through Instagram profiles and wondering, Can you see who views your Instagram profile? The short answer is no - Instagram does not allow users to see who views their profile. If you look through someone's profile without liking or commenting on a post, there's no way for them to know who sees their pictures. This article will delve into Instagram's privacy features and address common myths related to profile views, ultimately equipping you with the knowledge to browse with confidence."
        },
        {
            id: 1,
            parentID: 1,
            img: "/assets/img/blog/blog-2.png",
            title: "Increase Brand Engagement with Instagram Stories",
            date: "15th of october 2024",
            content: "One of your ultimate goals with Instagram marketing is to boost customer engagement with your brand. The good news is that Instagram Stories is an excellent way of improving engagement with customers within the stories themselves and your overall Instagram profile. Take a look at how you can use Instagram Stories to improve the rate at which customers engage with your brand."
        },
        {
            id: 2,
            parentID: 2,
            img: "/assets/img/blog/blog-1.png",
            title: "Free Instagram Reporting: Tips for Analytics Success",
            date: "11th of october 2024",
            content: "You may not realize it, but Instagram has many free reporting and analytic features built right into the app. Using these features will give you important insights into your Instagram marketing strategy. From there, you can more easily determine what changes you need to make and when to make them. The following information should help you get the most out of the free reporting and analytics already included in Instagram."
        },
        {
            id: 3,
            parentID: 3,
            img: "/assets/img/blog/blog-2.png",
            title: "Maximize Your Next Instagram Live: Top Tips",
            date: "18th of october 2024",
            content: "Instagram Live can be an excellent way to boost engagement with your brand and expand your reach. But there is more to a successful Instagram Live than just logging into your Instagram account and starting a live video. To get the most from this type of content, you will want to keep a few tips in mind."
        }
    ]

    const BlogRendering = (id: number) => {
        const filteredBlogs = id === 0 
            ? blogTemplate 
            : blogTemplate.filter(blog => blog.parentID === id);
        
        return (
            <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-8">
                {filteredBlogs.map((item, index) => (
                    <div key={index} className="flex flex-col justify-start gap-4 px-4 w-full max-w-md mx-auto">
                        <div className="w-full aspect-[4/3] relative overflow-hidden rounded-lg">
                            <Image 
                                src={item.img} 
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                        </div>
                        <h2 className="text-xl md:text-2xl font-semibold text-[#001F3F] hover:text-[#3b7bfe] hover:underline cursor-pointer" 
                            onClick={() => blogViewDetail()}>
                            {item.title}
                        </h2>
                        <p className="text-gray-400 uppercase text-sm md:text-base">{item.date}</p>
                        <p className="text-[#001F3F] text-sm md:text-base line-clamp-3">
                            {item.content}
                        </p>
                        <button 
                            onClick={() => blogViewDetail()}
                            className="text-white px-6 py-2 md:px-10 md:py-3 bg-gradient-to-r from-[#296FF9] to-[#59CEFC] rounded-lg mt-2 w-fit">
                            Continue Reading
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    const blogCategoryHandle = (id: number) => {
        if (blogCategory[id].isActive === true) {
            const item = blogCategory.map((temp) => (
                temp.id === id
                    ? { ...temp, isActive: temp.isActive }
                    : { ...temp, isActive: false }
            ))
            setBlogCategory(item);
        } else {
            const item = blogCategory.map((temp) => (
                temp.id === id
                    ? { ...temp, isActive: true }
                    : { ...temp, isActive: false }
            ))
            setBlogCategory(item);
        }

        setIsBlogParentID(id);
    }

    const blogCategorySelect = (id: number) => {
        setIsBlogParentID(id);
    }

    const blogViewDetail = () => {
        router.push("/blogview");
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <section className="flex-1 w-full flex justify-center mt-[80px]">
                <div className="max-w-7xl w-full flex flex-col py-10 px-4 md:px-6 lg:px-8">
                    <div className="w-full flex flex-col justify-center items-center mb-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#001F3F]">
                            Blog
                        </h1>
                    </div>
                    
                    <div className="flex justify-center items-center flex-col md:flex-row gap-4 mb-12">
                        <div className="lg:flex hidden justify-center items-center border p-1 rounded-lg">
                            {blogCategory.map((item, index) => (
                                <button 
                                    key={index} 
                                    className={`px-4 md:px-6 lg:px-10 py-2 rounded-lg transition-colors ${
                                        item.isActive 
                                            ? "text-white bg-gradient-to-r from-[#296FF9] to-[#59CEFC]" 
                                            : "text-gray-600 hover:text-[#001F3F]"
                                    }`} 
                                    onClick={() => blogCategoryHandle(item.id)}
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                        
                        <div className="flex w-full md:w-auto justify-between md:justify-center items-center gap-4">
                            <div className="lg:hidden block">
                                <select 
                                    className="w-40 block h-12 py-2.5 px-4 text-base text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg focus:outline-none" 
                                    onChange={(e) => blogCategorySelect(Number(e.target.value))}
                                    value={isBlogParentID}
                                >
                                    {blogCategory.map((item, index) => (
                                        <option key={index} value={item.id}>{item.title}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <select 
                                    className="w-40 block h-12 py-2.5 px-4 text-base text-[#192d5a] bg-transparent border border-[#192d5a] rounded-lg focus:outline-none"
                                >
                                    <option value="Latest">Latest</option>
                                    <option value="Trending">Trending</option>
                                    <option value="Popular">Most Popular</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    {BlogRendering(isBlogParentID)}
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Blog;