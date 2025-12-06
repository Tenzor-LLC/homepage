"use client";

import {
  Menu,
  X,
  Code,
  Cloud,
  Shield,
  Zap,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
// Reusable parallax wrapper
function ParallaxSection({
  children,
  speed = -120,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed]); // tweak 1000 or speed to taste

  return (
    <motion.div style={{ y }} className="relative w-full">
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    challenge: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    nda: false,
    privacy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Validate required fields
    if (!formData.challenge || !formData.name || !formData.email) {
      setSubmitMessage("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Discord webhook URL - replace with your actual webhook URL
    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      setSubmitMessage("Discord webhook is not configured.");
      setIsSubmitting(false);
      return;
    }

    // Create Discord embed message
    const discordPayload = {
      embeds: [
        {
          title: "🆕 New Contact Form Submission",
          color: 0x3b82f6, // Blue color
          fields: [
            {
              name: "📝 Challenge/Goal",
              value: formData.challenge,
              inline: false,
            },
            {
              name: "👤 Name",
              value: formData.name,
              inline: true,
            },
            {
              name: "📧 Email",
              value: formData.email,
              inline: true,
            },
            {
              name: "📞 Phone",
              value: formData.phone || "Not provided",
              inline: true,
            },
            {
              name: "🏢 Company",
              value: formData.company || "Not provided",
              inline: true,
            },
            {
              name: "🔒 NDA Required",
              value: formData.nda ? "Yes" : "No",
              inline: true,
            },
            {
              name: "✅ Privacy Consent",
              value: formData.privacy ? "Yes" : "No",
              inline: true,
            },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "Tenzor LLC Contact Form",
          },
        },
      ],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordPayload),
      });

      if (response.ok) {
        setSubmitMessage("✅ Message sent successfully! We'll be in touch soon.");
        // Reset form
        setFormData({
          challenge: "",
          name: "",
          email: "",
          phone: "",
          company: "",
          nda: false,
          privacy: false,
        });
      } else {
        setSubmitMessage("❌ Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending to Discord:", error);
      setSubmitMessage("❌ An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation (fixed, no parallax) */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img
                src={"/TenzorLLC_Logo_full.svg"}
                alt="Tenzor LLC"
                className="w-30 h-30"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-gray-700 hover:text-[#1e293b] transition"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-gray-700 hover:text-[#1e293b] transition"
              >
                Products
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-[#1e293b] transition"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-[#1e293b] transition"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-[#1e293b] transition"
              >
                Contact
              </a>
              <button className="bg-[#1e293b] text-white px-6 py-2 rounded-lg hover:bg-[#334155] transition">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-[#1e293b] transition"
                >
                  Home
                </a>
                <a
                  href="#products"
                  className="text-gray-700 hover:text-[#1e293b] transition"
                >
                  Products
                </a>
                <a
                  href="#services"
                  className="text-gray-700 hover:text-[#1e293b] transition"
                >
                  Services
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-[#1e293b] transition"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-[#1e293b] transition"
                >
                  Contact
                </a>
                <button className="bg-[#1e293b] text-white px-6 py-2 rounded-lg hover:bg-[#334155] transition w-full">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section (light parallax) */}
      <ParallaxSection speed={-80}>
        <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-[#B8D8D8] text-[#1e293b] px-4 py-2 rounded-full mb-6">
                  Software Publishing Excellence
                </div>
                <h1 className="text-5xl md:text-6xl text-gray-900 mb-6">
                  Empowering Businesses With Smarter Software
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  We build modern, scalable digital solutions designed to help
                  teams work faster, smarter, and with less friction.
                  <strong> Early-stage. Fast-moving. Built for impact. </strong>
                  Join us as we create tools that simiplify operations and
                  unlock real business efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="#products"
                    className="inline-flex items-center justify-center bg-[#1e293b] text-white px-8 py-3 rounded-lg hover:bg-[#334155] transition gap-2"
                  >
                    Explore Products
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center justify-center border-2 border-[#B8D8D8] text-[#1e293b] px-8 py-3 rounded-lg hover:bg-[#B8D8D8] transition"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1643881079052-11e752e3ae16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwb2ZmaWNlfGVufDF8fHx8MTc2NDcyMDMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Software development workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#B8D8D8] p-6 rounded-xl shadow-xl">
                  <div className="text-4xl text-[#1e293b] mb-1">Recognized</div>
                  <div className="text-[#1e293b]">By Wolf Fitness</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Contact / Gradient Block (stronger parallax) */}
      <ParallaxSection speed={-140}>
        <div className="w-full bg-white dark:bg-gray-900" id="contact">
          <div className="bg-linear-to-b from-white to-teal-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row rounded-3xl bg-white dark:bg-gray-850 shadow-xl overflow-hidden">
                <section className="w-full">
                  <div className="min-h-[480px] flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                    {/* Left Section */}
                    <div className="w-full md:w-2/5 bg-[#B8D8D8]/20 dark:bg-gray-800 p-10 flex flex-col justify-center">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                      >
                        Let us connect
                      </motion.h2>

                      <p className="text-gray-700 dark:text-gray-300 mb-6 text-base">
                        Fill out the form, and we have got you covered.
                      </p>

                      <div className="space-y-6 mt-4">
                        {[
                          "Our expert will follow up after reviewing your needs.",
                          "If required, we'll sign an NDA to ensure privacy.",
                          "Our Pre-Sales Manager will send you a proposal.",
                          "Then we get started on your project.",
                        ].map((text, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="flex items-start"
                          >
                            <span className="w-4 h-4 rounded-full bg-blue-600 mt-1 mr-3" />
                            <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                              {text}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-3/5 p-10 flex flex-col justify-center bg-white dark:bg-gray-850">
                      <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3"
                      >
                        Contact Us
                      </motion.h2>

                      <p className="text-gray-600 dark:text-gray-300 mb-8">
                        Our team would love to hear from you.
                      </p>

                      <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                      >
                        <textarea
                          name="challenge"
                          value={formData.challenge}
                          onChange={handleInputChange}
                          placeholder="Your challenge / goal *"
                          required
                          className="col-span-1 md:col-span-2 p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                        />

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Name *"
                          required
                          className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                        />

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Corporate email *"
                          required
                          className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                        />

                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone number"
                          className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                        />

                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Company"
                          className="p-4 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200"
                        />

                        <label className="flex items-center space-x-2 col-span-1 md:col-span-2 text-gray-700 dark:text-gray-300">
                          <input
                            type="checkbox"
                            name="nda"
                            checked={formData.nda}
                            onChange={handleInputChange}
                          />{" "}
                          <span>Secure data with NDA first</span>
                        </label>

                        <label className="flex items-center space-x-2 col-span-1 md:col-span-2 text-gray-700 dark:text-gray-300">
                          <input
                            type="checkbox"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleInputChange}
                          />
                          <span>
                            I consent to the processing of personal data as per
                            the Privacy Policy.
                          </span>
                        </label>

                        {submitMessage && (
                          <div
                            className={`col-span-1 md:col-span-2 p-4 rounded-xl ${
                              submitMessage.includes("✅")
                                ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                            }`}
                          >
                            {submitMessage}
                          </div>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Send message"}
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Services Section (medium parallax) */}
      <ParallaxSection speed={-100}>
        <section
          id="services"
          className="py-20 bg-[#B8D8D8]/20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive software publishing solutions tailored to your
                needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition hover:border-2 hover:border-[#B8D8D8]">
                <div className="w-12 h-12 bg-[#B8D8D8] rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-[#1e293b]" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">
                  Software Development
                </h3>
                <p className="text-gray-600">
                  Custom software solutions built with the latest technologies
                  and best practices.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition hover:border-2 hover:border-[#B8D8D8]">
                <div className="w-12 h-12 bg-[#B8D8D8] rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-[#1e293b]" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">Cloud Solutions</h3>
                <p className="text-gray-600">
                  Scalable cloud-based applications that grow with your business
                  needs.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition hover:border-2 hover:border-[#B8D8D8]">
                <div className="w-12 h-12 bg-[#B8D8D8] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#1e293b]" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">Security First</h3>
                <p className="text-gray-600">
                  Enterprise-grade security measures to protect your data and
                  users.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition hover:border-2 hover:border-[#B8D8D8]">
                <div className="w-12 h-12 bg-[#B8D8D8] rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#1e293b]" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">Performance</h3>
                <p className="text-gray-600">
                  Optimized solutions delivering lightning-fast performance and
                  reliability.
                </p>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Products Showcase (medium-strong parallax) */}
      <ParallaxSection speed={-120}>
        <section id="products" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl text-gray-900 mb-4">Featured Products</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover our portfolio of innovative software solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-[#B8D8D8]/30 to-[#B8D8D8]/50 p-8 rounded-2xl border-2 border-[#B8D8D8]">
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Code className="w-8 h-8 text-[#1e293b]" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-3">WOLF POS</h3>
                <p className="text-gray-700 mb-6">
                  Partnered with Wolf Fitness to offer a centralized, complete
                  business management platform with CRM, analytics, and
                  automation tools.
                </p>
                <button className="text-[#1e293b] flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* About Section (medium parallax) */}
      <ParallaxSection speed={-100}>
        <section
          id="about"
          className="py-20 bg-[#B8D8D8]/20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0NzA5NjgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Modern workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-4xl text-gray-900 mb-6">
                  About Tenzor LLC
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  <strong>
                    We design, develop, and publish software products that solve
                    real problems for real businesses.
                  </strong>
                </p>

                <p className="text-lg text-gray-600 mb-6">
                  Founded with a vision to revolutionize software publishing,
                  Tenzor LLC has become a trusted partner for businesses
                  nationwide. We combine technical expertise with innovative
                  thinking to deliver solutions that make a difference.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Our team of experienced developers, designers, and strategists
                  work collaboratively to publish software that exceeds
                  expectations and drives real business value.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl text-[#1e293b] mb-2">8+</div>
                    <div className="text-gray-600">Years Experienced</div>
                  </div>
                  <div>
                    <div className="text-3xl text-[#1e293b] mb-2">4</div>
                    <div className="text-gray-600">Team Members</div>
                  </div>
                  <div>
                    <div className="text-3xl text-[#1e293b] mb-2">1</div>
                    <div className="text-gray-600">Vision</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section (subtle parallax) */}
      <ParallaxSection speed={-60}>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join Tenzor LLC on our mission to redefine what modern software
              can do.
            </p>
            <button className="bg-[#1e293b] text-white px-10 py-4 rounded-lg hover:bg-[#334155] transition text-lg">
              Contact Us Today
            </button>
          </div>
        </section>
      </ParallaxSection>

      {/* Footer (very subtle parallax) */}
      <ParallaxSection speed={-40}>
        <footer className="bg-[#1e293b] text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    viewBox="0 0 1490 479"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-40 h-auto shrink-0"
                  >
                    <path
                      d="M217.193 10.0027C229.649 46.7203 255.79 65.6079 288.587 81.3969"
                      stroke="white"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M24.8409 82.0027H289.841"
                      stroke="white"
                      strokeWidth="20"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5.48363e-06 478.094V114.457H84.0909V142.298H31.8182V450.253H84.0909V478.094H5.48363e-06ZM307.99 114.457V478.094H223.899V450.253H276.172V142.298H223.899V114.457H307.99Z"
                      fill="white"
                    />
                    <path
                      d="M140.421 211.706H96.4757L87.3936 236.608L72.8917 235.29L75.089 192.809H233.585L235.636 235.29L221.28 236.608L212.052 211.706H168.253V371.667L190.665 376.647L187.735 391.003H120.939L118.009 376.647L140.421 371.667V211.706Z"
                      fill="white"
                    />
                    <path
                      d="M533.378 174.483V210.103H485.018V357.003H440.558V210.103H392.198V174.483H533.378ZM697.651 282.123C697.651 286.283 697.391 290.616 696.871 295.123H596.251C596.945 304.136 599.805 311.069 604.831 315.923C610.031 320.603 616.358 322.943 623.811 322.943C634.905 322.943 642.618 318.263 646.951 308.903H694.271C691.845 318.436 687.425 327.016 681.011 334.643C674.771 342.269 666.885 348.249 657.351 352.583C647.818 356.916 637.158 359.083 625.371 359.083C611.158 359.083 598.505 356.049 587.411 349.983C576.318 343.916 567.651 335.249 561.411 323.983C555.171 312.716 552.051 299.543 552.051 284.463C552.051 269.383 555.085 256.209 561.151 244.943C567.391 233.676 576.058 225.009 587.151 218.943C598.245 212.876 610.985 209.843 625.371 209.843C639.411 209.843 651.891 212.789 662.811 218.683C673.731 224.576 682.225 232.983 688.291 243.903C694.531 254.823 697.651 267.563 697.651 282.123ZM652.151 270.423C652.151 262.796 649.551 256.729 644.351 252.223C639.151 247.716 632.651 245.463 624.851 245.463C617.398 245.463 611.071 247.629 605.871 251.963C600.845 256.296 597.725 262.449 596.511 270.423H652.151ZM814.706 210.363C831.693 210.363 845.213 215.909 855.266 227.003C865.493 237.923 870.606 253.003 870.606 272.243V357.003H826.406V278.223C826.406 268.516 823.893 260.976 818.866 255.603C813.84 250.229 807.08 247.543 798.586 247.543C790.093 247.543 783.333 250.229 778.306 255.603C773.28 260.976 770.766 268.516 770.766 278.223V357.003H726.306V211.923H770.766V231.163C775.273 224.749 781.34 219.723 788.966 216.083C796.593 212.269 805.173 210.363 814.706 210.363ZM948.302 320.343H1011.22V357.003H898.642V321.643L958.962 248.583H899.162V211.923H1009.92V247.283L948.302 320.343ZM1106.93 359.083C1092.71 359.083 1079.89 356.049 1068.45 349.983C1057.18 343.916 1048.25 335.249 1041.67 323.983C1035.25 312.716 1032.05 299.543 1032.05 284.463C1032.05 269.556 1035.34 256.469 1041.93 245.203C1048.51 233.763 1057.53 225.009 1068.97 218.943C1080.41 212.876 1093.23 209.843 1107.45 209.843C1121.66 209.843 1134.49 212.876 1145.93 218.943C1157.37 225.009 1166.38 233.763 1172.97 245.203C1179.55 256.469 1182.85 269.556 1182.85 284.463C1182.85 299.369 1179.47 312.543 1172.71 323.983C1166.12 335.249 1157.02 343.916 1145.41 349.983C1133.97 356.049 1121.14 359.083 1106.93 359.083ZM1106.93 320.603C1115.42 320.603 1122.61 317.483 1128.51 311.243C1134.57 305.003 1137.61 296.076 1137.61 284.463C1137.61 272.849 1134.66 263.923 1128.77 257.683C1123.05 251.443 1115.94 248.323 1107.45 248.323C1098.78 248.323 1091.59 251.443 1085.87 257.683C1080.15 263.749 1077.29 272.676 1077.29 284.463C1077.29 296.076 1080.06 305.003 1085.61 311.243C1091.33 317.483 1098.43 320.603 1106.93 320.603ZM1256.09 236.103C1261.29 228.129 1267.79 221.889 1275.59 217.383C1283.39 212.703 1292.06 210.363 1301.59 210.363V257.423H1289.37C1278.28 257.423 1269.96 259.849 1264.41 264.703C1258.87 269.383 1256.09 277.703 1256.09 289.663V357.003H1211.63V211.923H1256.09V236.103Z"
                      fill="white"
                    />
                    <path
                      d="M1331.65 348.483H1356.29V363.003H1312.84V285.783H1331.65V348.483ZM1384.08 348.483H1408.72V363.003H1365.27V285.783H1384.08V348.483ZM1414.5 324.283C1414.5 316.656 1416.15 309.873 1419.45 303.933C1422.75 297.919 1427.33 293.263 1433.2 289.963C1439.14 286.589 1445.85 284.903 1453.33 284.903C1462.49 284.903 1470.34 287.323 1476.87 292.163C1483.39 297.003 1487.76 303.603 1489.96 311.963H1469.28C1467.74 308.736 1465.54 306.279 1462.68 304.593C1459.89 302.906 1456.7 302.063 1453.11 302.063C1447.31 302.063 1442.62 304.079 1439.03 308.113C1435.43 312.146 1433.64 317.536 1433.64 324.283C1433.64 331.029 1435.43 336.419 1439.03 340.453C1442.62 344.486 1447.31 346.503 1453.11 346.503C1456.7 346.503 1459.89 345.659 1462.68 343.973C1465.54 342.286 1467.74 339.829 1469.28 336.603H1489.96C1487.76 344.963 1483.39 351.563 1476.87 356.403C1470.34 361.169 1462.49 363.553 1453.33 363.553C1445.85 363.553 1439.14 361.903 1433.2 358.603C1427.33 355.229 1422.75 350.573 1419.45 344.633C1416.15 338.693 1414.5 331.909 1414.5 324.283Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <p className="text-gray-400">
                  Software publishing excellence for the modern enterprise.
                </p>
              </div>
              <div>
                <h4 className="mb-4">Products</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#products" className="hover:text-white transition">
                      Wolf POS
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#contact" className="hover:text-white transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Connect</h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/Tenzor-LLC"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/tenzor-llc/"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-[#B8D8D8]/30 pt-8 text-center text-gray-400"></div>
          </div>
        </footer>
      </ParallaxSection>
    </div>
  );
}
