import Footer from "../../components/Footer";
import Header from "../../components/Header";

const TermsOfService = () => {
    return (
        <div>
            <Header />
            <section className="w-full flex justify-center mt-[100px]">
                <div className="w-full max-w-7xl flex flex-col justify-center items-center px-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <h1 className="lg:text-[3.2rem] md:text-[2rem] text-[1.6rem] font-[system-ui] font-[700] text-center text-[#001F3F]">
                            Terms of Service
                        </h1>
                    </div>
                    <div className="flex flex-col justify-center items-center mt-8">
                        <span className="text-center text-xl font-[system-ui] font-medium text-gray-600">
                            Last Updated: May 3, 2025
                        </span>
                    </div>
                    
                    <div className="w-full flex flex-col justify-start items-start mt-8 gap-8">
                        <div className="flex flex-col gap-4">
                            <p className="text-xl">
                                These terms explain how you can use our services and anything else we provide. By using the site you agree to everything below. If you don&apos;t agree please don&apos;t use our site.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">USE LICENSE</h2>
                            <p className="text-xl">
                                You&apos;re allowed to download one copy of the content from this site but only for your own personal use. That means you&apos;re not allowed to:
                            </p>
                            <ul className="text-xl list-disc ml-6">
                                <li>Edit or copy anything.</li>
                                <li>Use the content for business or public purposes.</li>
                                <li>Try to break down or reverse-engineer any of the software here.</li>
                                <li>Remove copyright notes or legal notices from anything.</li>
                                <li>Share or post the content somewhere else.</li>
                            </ul>
                            <p className="text-xl">
                                If you break these rules your permission to use the site ends automatically. You&apos;ll also need to delete anything you downloaded.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">NO UNAPPROVED BUSINESS USE</h2>
                            <p className="text-xl">
                                This site is intended for personal use. That means:
                            </p>
                            <ul className="text-xl list-disc ml-6">
                                <li>You can&apos;t use our services to promote your business if it is not an approved business type.</li>
                                <li>You can&apos;t use our tools to boost your image or influence in a way that helps an unapproved brand or company.</li>
                                <li>You can&apos;t use fake followers/likes/views from us to mislead anyone in a business setting.</li>
                            </ul>
                            <p className="text-xl">
                                Businesses and people acting for unapproved businesses are not allowed to use our services.
                            </p>
                            <p className="text-xl">
                                If you use our services for unapproved business use or break these rules we can stop your access right away.
                            </p>
                            <p className="text-xl">
                                You&apos;re also responsible for following the laws in your area. If you use this service you&apos;re saying you understand and accept all of this.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">DISCLAIMER</h2>
                            <p className="text-xl">
                                Everything on this site is provided &quot;as is.&quot; We don&apos;t make any promises about how accurate or reliable it is. We don&apos;t guarantee it will work perfectly for you. You use it at your own risk.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">LIMITS OF LIABILITY</h2>
                            <p className="text-xl">
                                We&apos;re not responsible for any kind of damage. That includes data loss, lost profits, or problems running your business if something goes wrong using our site.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">PAYMENTS</h2>
                            <p className="text-xl">
                                We use secure systems to handle all payments. Your financial details aren&apos;t stored or processed on our website directly. Everything runs through other payment gateways.
                            </p>
                            <p className="text-xl">
                                When you make a purchase you&apos;re saying you understand what you&apos;re buying and that you&apos;re allowed to use the payment method. If you make a false chargeback we can:
                            </p>
                            <ul className="text-xl list-disc ml-6">
                                <li>Remove any followers or likes we sent you.</li>
                                <li>Cancel your account.</li>
                                <li>Block your access.</li>
                                <li>Share proof with your bank or payment company.</li>
                            </ul>
                            <p className="text-xl">
                                Please contact our support team first if you have a problem before filing any dispute.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">UPDATES AND CHANGES</h2>
                            <p className="text-xl">
                                Sometimes there might be small mistakes on the site. Typos, outdated info, or other small errors. We can change or update anything on the site at any time without warning. We don&apos;t promise to keep everything updated all the time.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">LINKS TO OTHER SITES</h2>
                            <p className="text-xl">
                                We might link to other websites. We don&apos;t control them and we&apos;re not responsible for what&apos;s on any other site. If you click a link you&apos;re doing it at your own risk.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">CHANGES TO THESE TERMS</h2>
                            <p className="text-xl">
                                We may update these Terms whenever we need to. If you keep using the site that means you agree to the latest version.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">LAWS THAT APPLY</h2>
                            <p className="text-xl">
                                Any legal issues related to this site will be handled under the laws of the United Arab Emirates. Disputes will be resolved in the United States.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">SUPPORT</h2>
                            <p className="text-xl">
                                Need help? Have questions? Reach out to our support team by email. We&apos;re happy to assist with anything you need.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">OUR SERVICE</h2>
                            <p className="text-xl">
                                We aren&apos;t connected to Instagram, Meta, or any official partners of those companies.
                            </p>
                            <p className="text-xl">
                                It&apos;s your job to follow Instagram&apos;s rules and any laws that apply to you. If your Instagram account gets banned for any reason we&apos;re not responsible.
                            </p>
                            <p className="text-xl">
                                We&apos;ll ask for your Instagram username to deliver the service. We don&apos;t share or sell your info.
                            </p>
                            <p className="text-xl">
                                We do our best to give you the likes/views/followers you asked for. If something isn&apos;t delivered right please let us know and we&apos;ll make our best effort to fix it.
                            </p>
                            <p className="text-xl">
                                Sometimes there might be interruptions. If you make your Instagram private or change your username while we&apos;re working on your order it could affect your service.
                            </p>
                            <p className="text-xl">
                                If you open a chargeback after we delivered your order we can take back what we sent and close your account.
                            </p>
                            <p className="text-xl">
                                We may pause or stop the service at any time without notice or explanation.
                            </p>
                            <p className="text-xl">
                                It is up to you to check for updates to these Terms.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h2 className="lg:text-2xl text-xl font-medium">Refunds</h2>
                            <p className="text-xl">
                                If you&apos;re not happy with our service you can ask for a full refund within 30 days of your first purchase. Just contact our support team with your order number and tell us why you want a refund.
                            </p>
                            <p className="text-xl font-medium">
                                You can&apos;t get a refund if:
                            </p>
                            <ul className="text-xl list-disc ml-6">
                                <li>You&apos;re asking about a free or promo service.</li>
                                <li>The service was already fully delivered as agreed to.</li>
                                <li>You broke our Terms in the course of your order.</li>
                            </ul>
                            <p className="text-xl font-medium">
                                How our refund process works:
                            </p>
                            <ol className="text-xl list-decimal ml-6">
                                <li>Email us with your request.</li>
                                <li>We&apos;ll respond in 3-5 business days.</li>
                                <li>If approved we&apos;ll send the refund to your original payment method within 7-10 business days.</li>
                            </ol>
                            <p className="text-xl font-medium">
                                We might say no if:
                            </p>
                            <ul className="text-xl list-disc ml-6">
                                <li>You&apos;re abusing the refund policy.</li>
                                <li>You&apos;ve made multiple refund requests already.</li>
                                <li>You haven&apos;t followed these Terms.</li>
                            </ul>
                            <p className="text-xl">
                                If you&apos;ve received everything you paid for and it worked as expected we won&apos;t offer a refund. But if something didn&apos;t go right contact us within 30 days and we&apos;ll try to make it right.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 mt-8">
                            <p className="text-xl font-medium">
                                If you have any questions about these Terms please email our support team.
                            </p>
                            <p className="text-xl font-medium">
                                By using this site you agree to everything in the above.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default TermsOfService;