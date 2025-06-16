"use client"

const Wondering = () => {

    return (
        <div className="flex items-center flex-col justify-center mt-24 w-full">
            <p className="lg:text-5xl md:text-[2rem] text-[1.7rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                Still Wondering{" "}
                <span
                    style={{
                        background: "linear-gradient(45deg, #fabf58 13%, #f59252 40%)",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    If It&apos;s Safe?
                </span>
            </p>

            <div className="max-w-7xl w-full md:mt-24 mt-12 px-2 flex flex-col justify-center items-center text-gray-600 gap-4">
                <div className="md:w-[80%] w-full flex flex-col justify-center items-start gap-4 rounded-2xl md:text-lg">
                    <p className="text-start text-gray-600">We get it. There are a lot of sketchy services out there, and it&apos;s smart to be cautious.</p>
                    <p className="text-start text-gray-600">Here&apos;s the short version: yes, it&apos;s safe—if you&apos;re buying the right kind of likes.</p>
                    <p className="text-start text-gray-600">We only deliver likes from real users. That means your post gets natural engagement and your account stays protected. We also don&apos;t need your password or access to your account. That means there&apos;s no risk of getting locked out or hacked.</p>
                    <p className="text-start text-gray-600">Buying likes from us won&apos;t get you banned or penalized. It&apos;s a safe and proven way to grow your online presence on the Gram.</p>
                </div>
            </div>
        </div>
    );
}

export default Wondering;