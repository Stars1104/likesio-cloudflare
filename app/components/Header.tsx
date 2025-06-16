"use client";
import Image from "next/image";
import Logo from "../../public/assets/img/logo.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser, FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiShoppingBag } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { getUserNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../service/dashboard-service";

const Header: React.FC = () => {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const toggleMenu = () => setIsToggleOpen((prev) => !prev);
    const router = useRouter();
    const { user, isLoggedIn, logout } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            fetchNotifications();
        }
    }, [isLoggedIn]);

    const fetchNotifications = async () => {
        if (!isLoggedIn) return;
        
        try {
            setIsLoading(true);
            const response = await getUserNotifications();
            if (response?.data) {
                setNotifications(response.data);
                setUnreadCount(response.unreadCount || 0);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNotificationClick = async (notification) => {
        try {
            if (!notification.read) {
                await markNotificationAsRead(notification._id);
                // Update the notification in the local state
                setNotifications(prev => 
                    prev.map(n => n._id === notification._id ? { ...n, read: true } : n)
                );
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
            
            // If the notification has a link, navigate to it
            if (notification.link) {
                router.push(notification.link);
            }
            
            // Close the dropdown
            setShowNotifications(false);
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllNotificationsAsRead();
            // Update all notifications in the local state
            setNotifications(prev => 
                prev.map(n => ({ ...n, read: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
        }
    };

    const toggleNotifications = () => {
        setShowNotifications(prev => !prev);
    };

    const Signup = () => {
        router.push("/auth/signup");
    }

    const Login = () => {
        router.push("/auth/signin");
    }

    const PageRouter = (route: string) => {
        if (route === "Buy Instagram Likes") router.push("/instagramlikes");
        else if (route === "Contact Us" || route === "Contact") router.push("/contactus");
        else if (route === "FAQ") router.push("/faq");
        else if (route === "Buy Instagram Followers") router.push("/instagramfollowers");
        // else if (route === "Buy Instagram Comments") router.push("/instagramcomments");
        else if (route === "Buy Instagram Views") router.push("/instagramviews");

        // for tiktoks
        else if (route === "Buy TikTok Followers") router.push("/tiktokfollowers");
        else if (route === "Buy TikTok Likes") router.push("/tiktoklikes");
        else if (route === "Buy TikTok Views") router.push("/tiktokviews");

        // for youtubes
        else if (route === "Buy YouTube Subscribers") router.push("/youtubesubscribers");
        else if (route === "Buy YouTube Likes") router.push("/youtubelikes");
        else if (route === "Buy YouTube Views") router.push("/youtubeviews");


        else if (route === "About Us") router.push("/aboutus");
        else if (route === "Blog") router.push("blog");
        else if (route === "Our Team") router.push("ourteam");
        else if (route === "Term of Service") router.push("termofservice");
        else if (route === "Privacy Policy") router.push("privacypolicy");

        setIsToggleOpen(false);
    }

    const Instagram = [
        {
            id: 1,
            title: "Buy Instagram Likes",
        },
        {
            id: 2,
            title: "Buy Instagram Followers",
        },
        {
            id: 4,
            title: "Buy Instagram Views",
        }
    ]

    const TikTok = [
        {
            id: 1,
            title: "Buy TikTok Likes",
        },
        {
            id: 2,
            title: "Buy TikTok Followers",
        },
        {
            id: 4,
            title: "Buy TikTok Views",
        }
    ]

    const YouTube = [
        {
            id: 1,
            title: "Buy YouTube Likes",
        },
        {
            id: 2,
            title: "Buy YouTube Subscribers",
        },
        {
            id: 4,
            title: "Buy YouTube Views",
        }
    ]

    const Useful = [
        {
            id: 1,
            title: "FAQ",
            path: "faq"
        },
        {
            id: 2,
            title: "Contact",
            path: "contactus"
        },
        {
            id: 3,
            title: "About Us",
            path: "aboutus",
        },
        {
            id: 4,
            title: "Blog",
            path: "blog"
        }
        ,
        {
            id: 5,
            title: "Our Team",
            path: "ourteam"
        },
        {
            id: 6,
            title: "Term of Service",
            path: "termofservice"
        },
        {
            id: 7,
            title: "Privacy Policy",
            path: "privacypolicy"
        },
    ]

    const LandingPage = () => {
        router.push("/");
    }

    const LogOut = async () => {
        try {
            await logout();
            toast.success("Logout Successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    }

        // broo update ho ja
    const handleProfile = () => {
        router.push("/profile");
    }

    const handleDashboard = () => {
        router.push("/dashboard");
    }

    const formatNotificationTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInMins < 60) {
            return `${diffInMins} min${diffInMins !== 1 ? 's' : ''} ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        } else if (diffInDays < 7) {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <header className="w-full h-[60px] md:h-[80px] fixed top-0 left-0 z-50 flex transition-all duration-150 justify-between items-center px-4 xl:px-8 lg:px-2 bg-white/5 backdrop-blur-lg animate__animated animate__fadeIn animate__delay-0.5s">
            <Image
                onClick={() => LandingPage()}
                src={Logo}
                alt="Company Logo"
                className="w-[120px] h-[26px] md:w-[140px] md:h-[30px] lg:w-[153px] lg:h-[33px] cursor-pointer"
                priority
            />

            <nav className="w-auto flex justify-center items-center">
                <ul className="lg:flex hidden justify-center items-center xl:gap-10 gap-4 cursor-pointer font-medium xl:text-base lg:text-[13px] font-[system-ui]">
                    {["Buy Instagram Likes", "Buy Instagram Followers",   "Buy Instagram Views", "FAQ", "Contact Us"].map((item) => (
                        <li key={item} className="hover:text-[#2563EB] text-[#001F3F] transition duration-300" onClick={() => PageRouter(item)}>{item}</li>
                    ))}
                    {
                        isLoggedIn && user
                            ? <>
                                <li className="flex gap-2 justify-center items-center from-[#296FF9] to-[#59CEFC] bg-gradient-to-r border-[#3b7bfe] rounded-lg text-white px-4 py-2">
                                    <span>Available balance</span>
                                    <span>${user.balance ? user.balance.toFixed(2) : '0.00'}</span>
                                </li>
                                {/* Notifications Bell */}
                                <li className="relative">
                                    <button 
                                        className="flex items-center justify-center p-2 hover:text-[#2563EB] transition-all duration-300 relative"
                                        onClick={toggleNotifications}
                                    >
                                        <FaBell className="text-xl" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {unreadCount > 9 ? '9+' : unreadCount}
                                            </span>
                                        )}
                                    </button>
                                    
                                    {/* Notifications Dropdown */}
                                    {showNotifications && (
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                                            <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                                                <h3 className="font-semibold">Notifications</h3>
                                                {unreadCount > 0 && (
                                                    <button 
                                                        className="text-xs text-blue-600 hover:text-blue-800"
                                                        onClick={handleMarkAllAsRead}
                                                    >
                                                        Mark all as read
                                                    </button>
                                                )}
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {isLoading ? (
                                                    <div className="p-4 text-center">
                                                        <div className="animate-spin h-6 w-6 border-t-2 border-blue-500 rounded-full mx-auto"></div>
                                                    </div>
                                                ) : notifications.length > 0 ? (
                                                    notifications.map((notification) => (
                                                        <div 
                                                            key={notification._id}
                                                            className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                                            onClick={() => handleNotificationClick(notification)}
                                                        >
                                                            <div className="flex justify-between">
                                                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                                                <span className="text-xs text-gray-500">{formatNotificationTime(notification.createdAt)}</span>
                                                            </div>
                                                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-gray-500">
                                                        No notifications
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-2 border-t border-gray-200 text-center">
                                                <button 
                                                    className="text-xs text-blue-600 hover:text-blue-800"
                                                    onClick={() => router.push("/dashboard")}
                                                >
                                                    View all notifications
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                                <li className="text-[#001F3F] flex items-center justify-center gap-2 group relative py-2 pl-3">
                                    <span className="hover:text-[#2563EB] transition-all duration-300 flex gap-2 items-center">
                                        <FaUser />
                                        {user.username || user.name}
                                    </span>
                                    <div className="hidden flex-col justify-center items-center absolute w-[150px] top-10 right-0 rounded-lg shadow-sm group-hover:flex bg-white">
                                        <span className="w-full flex justify-center gap-4 items-center py-2 relative transition-all duration-300 hover:text-[#2563EB]" onClick={() => handleProfile()}>
                                            <FaUser className="absolute left-2" />
                                            My Profile
                                        </span>
                                        <span className="w-full flex justify-center gap-4 items-center py-2 relative transition-all duration-300 hover:text-[#2563EB]" onClick={() => handleDashboard()}>
                                            <FiShoppingBag className="absolute left-2" />
                                            Dashboard
                                        </span>
                                        <span className="w-full flex justify-center gap-4 items-center py-2 relative transition-all duration-300 hover:text-[#2563EB]" onClick={() => LogOut()}>
                                            <FaSignOutAlt className="absolute left-2" />
                                            LogOut
                                        </span>
                                    </div>
                                </li>
                            </>
                            : <>
                                <li className="hover:text-[#2563EB] transition duration-300 text-[#001F3F]" onClick={() => Login()}>Login</li>
                                <li className="px-4 py-2 border bg-transparent text-[#192d5a] from-[#296FF9] to-[#59CEFC] hover:bg-gradient-to-r border-[#3b7bfe] rounded-lg hover:text-white transition duration-300" onClick={() => Signup()}>
                                    Sign Up
                                </li>
                            </>
                    }
                </ul>

                <div className="lg:hidden flex items-center">
                    {isLoggedIn && user && (
                        <button 
                            className="mr-4 relative"
                            onClick={toggleNotifications}
                        >
                            <FaBell className="text-xl" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>
                    )}
                    <button className="text-gray-600 focus:outline-none" onClick={toggleMenu}>
                        {isToggleOpen ? (
                            <svg className="w-8 h-8 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-8 h-8 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Notification Dropdown */}
            {showNotifications && (
                <div className="lg:hidden fixed top-[60px] right-0 w-full sm:w-80 bg-white shadow-lg rounded-b-lg z-50">
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                            <button 
                                className="text-xs text-blue-600 hover:text-blue-800"
                                onClick={handleMarkAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {isLoading ? (
                            <div className="p-4 text-center">
                                <div className="animate-spin h-6 w-6 border-t-2 border-blue-500 rounded-full mx-auto"></div>
                            </div>
                        ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div 
                                    key={notification._id}
                                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="flex justify-between">
                                        <h4 className="font-medium text-sm">{notification.title}</h4>
                                        <span className="text-xs text-gray-500">{formatNotificationTime(notification.createdAt)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500">
                                No notifications
                            </div>
                        )}
                    </div>
                    <div className="p-2 border-t border-gray-200 text-center">
                        <button 
                            className="text-xs text-blue-600 hover:text-blue-800"
                            onClick={() => router.push("/dashboard")}
                        >
                            View all notifications
                        </button>
                    </div>
                </div>
            )}

            <div
                className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-40 ${isToggleOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={toggleMenu}
            ></div>

            <div
                className={`fixed top-0 left-0 w-full h-screen sm:w-[300px] bg-white shadow-lg transform transition-transform duration-300 overflow-y-auto z-50 ${isToggleOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
               <div className="w-full h-[60px] md:h-[80px] flex justify-between items-center px-4">
                    <Image
                        src={Logo}
                        alt="Company Logo"
                        className="w-[120px] h-[26px] md:w-[140px] md:h-[30px]"
                        priority
                    />
                    <button className="text-gray-600" onClick={toggleMenu}>
                        <svg className="w-8 h-8 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <ul className="flex flex-col items-start px-4 sm:px-6 space-y-4 sm:space-y-6 text-[14px] sm:text-[15px] font-medium mt-4 sm:mt-6">
                    <div className="flex flex-col gap-2 sm:gap-3 w-full">
                        <span className="font-bold text-[#7e819c] text-[11px] sm:text-xs font-[system-ui]">
                            INSTAGRAM SERVICES
                        </span>
                        {Instagram.map((item, index) => (
                            <li key={item.id} onClick={() => PageRouter(item.title)} className={`w-full py-2 hover:text-indigo-500 transition duration-300 font-[system-ui] cursor-pointer flex justify-start items-center gap-3 ${item.id === index - 1 ? "" : "border-b"}`}>
                                {item.title}
                            </li>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 sm:gap-3 w-full">
                        <span className="font-bold text-[#7e819c] text-[11px] sm:text-xs font-[system-ui]">
                            TikTok SERVICES
                        </span>
                        {TikTok.map((item, index) => (
                            <li key={item.id} onClick={() => PageRouter(item.title)} className={`w-full py-2 hover:text-indigo-500 transition duration-300 font-[system-ui] cursor-pointer flex justify-start items-center gap-3 ${item.id === index - 1 ? "" : "border-b"}`}>
                                {item.title}
                            </li>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 w-full">
                        <span className="font-bold text-[#7e819c] text-[11px] sm:text-xs font-[system-ui]">
                            YouTube SERVICES
                        </span>
                        {YouTube.map((item, index) => (
                            <li key={item.id} onClick={() => PageRouter(item.title)} className={`w-full py-2 hover:text-indigo-500 transition duration-300 font-[system-ui] cursor-pointer flex justify-start items-center gap-3 ${item.id === index - 1 ? "" : "border-b"}`}>
                                {item.title}
                            </li>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 sm:gap-3 w-full">
                        <span className="font-bold text-[#7e819c] text-[11px] sm:text-xs font-[system-ui]">
                            USEFUL LINKS
                        </span>
                        {Useful.map((item, index) => (
                            <li key={item.id} onClick={() => PageRouter(item.title)} className={`w-full py-2 hover:text-indigo-500 transition duration-300 font-[system-ui] cursor-pointer flex justify-start items-center gap-3 ${item.id === index - 1 ? "" : "border-b"}`}>
                                {item.title}
                            </li>
                        ))}
                    </div>

                    {isLoggedIn && user ? (
                        <>
                            <li className="w-full">
                                <button 
                                    onClick={() => handleProfile()}
                                    className="w-full px-4 py-2.5 text-sm sm:text-base border bg-transparent text-[#192d5a] from-[#296FF9] to-[#59CEFC] hover:bg-gradient-to-r hover:text-white transition duration-300 font-[system-ui] rounded-md"
                                >
                                    My Profile
                                </button>
                            </li>
                            <li className="w-full">
                                <button 
                                    onClick={() => handleDashboard()}
                                    className="w-full px-4 py-2.5 text-sm sm:text-base border bg-transparent text-[#192d5a] from-[#296FF9] to-[#59CEFC] hover:bg-gradient-to-r hover:text-white transition duration-300 font-[system-ui] rounded-md"
                                >
                                    Dashboard
                                </button>
                            </li>
                            <li className="w-full">
                                <button 
                                    className="w-full px-4 py-2.5 text-sm sm:text-base font-[system-ui]" 
                                    onClick={() => LogOut()}
                                >
                                    LogOut
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="w-full">
                                <button 
                                    onClick={() => Signup()}
                                    className="w-full px-4 py-2.5 text-sm sm:text-base border bg-transparent text-[#192d5a] from-[#296FF9] to-[#59CEFC] hover:bg-gradient-to-r hover:text-white transition duration-300 font-[system-ui] rounded-md"
                                >
                                    SIGN UP
                                </button>
                            </li>
                            <li className="w-full">
                                <button 
                                    className="w-full px-4 py-2.5 text-sm sm:text-base font-[system-ui]" 
                                    onClick={() => Login()}
                                >
                                    LOG IN
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;