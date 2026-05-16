import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact | Daf Printing",
  description: "Get in touch with Daf Printing. We are here to help with your printing needs.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-secondary text-sm font-medium tracking-[0.2em] uppercase mb-3">
                  Get in Touch
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-6">
                  Let's Talk About Your Project
                </h1>
                <p className="text-primary/70 text-lg leading-relaxed mb-12">
                  Have a project in mind? Reach out to us and we'll help you 
                  find the perfect printing solution. Free quotes and consultation.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-primary mb-2">
                      Email
                    </h3>
                    <p className="text-primary/70">info@dafprinting.com</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-primary mb-2">
                      Phone
                    </h3>
                    <p className="text-primary/70">+251 911 234 567</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-primary mb-2">
                      Location
                    </h3>
                    <p className="text-primary/70">Addis Ababa, Ethiopia</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-wide uppercase text-primary mb-2">
                      Hours
                    </h3>
                    <p className="text-primary/70">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-primary/10 p-8 md:p-10">
                <h2 className="text-xl font-bold text-primary mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-primary/20 bg-white text-primary placeholder-primary/40 focus:outline-none focus:border-primary-brown transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-primary/20 bg-white text-primary placeholder-primary/40 focus:outline-none focus:border-primary-brown transition-colors"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-primary/20 bg-white text-primary placeholder-primary/40 focus:outline-none focus:border-primary-brown transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-primary/20 bg-white text-primary placeholder-primary/40 focus:outline-none focus:border-primary-brown transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-white text-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
