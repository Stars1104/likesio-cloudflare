"use client"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GetStarted from "../../components/checkout/GetStarted";
import PayOut from "../../components/checkout/PayOut";
import { useState } from "react";
import SelectedPost from "../../components/checkout/SelectedPost";

const CheckOut = () => {

    const [isCheckOut, setIsCheckOut] = useState<boolean>(false);
    const [isPayOut, setIsPayOut] = useState<boolean>(false);
    const [isGetStarted, setIsGetStarted] = useState<boolean>(false);

    return (
        <div>
            <Header />
            <section className="w-full flex flex-col justify-center items-center mt-[150px]">
                <GetStarted isGetStarted={isGetStarted} setIsCheckOut={setIsCheckOut} setIsGetStarted={setIsGetStarted} />
                <SelectedPost isCheckOut={isCheckOut} setIsCheckOut={setIsCheckOut} setIsPayOut={setIsPayOut} setIsGetStarted={setIsGetStarted} />
                <PayOut isPayOut={isPayOut} setIsPayOut={setIsPayOut} setIsCheckOut={setIsCheckOut} />
            </section>
            <Footer />
        </div>
    )
}

export default CheckOut;