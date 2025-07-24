"use client"

import Header from "@/components/navbar/App";
import { LucideAArrowDown, Instagram, Mail } from "lucide-react";
import { useState } from "react";

const ContactUs = () => {


  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/contact-us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("Message Sent!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Error sending message");
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-background min-h-screen px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-3">
          <h1 className="text-4xl md:text-5xl font-playful text-primary mb-3">
            Get in Touch
          </h1>
          <p className="text-subtle text-lg">
            Have a question or feedback? We’re just a message away!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-10">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <h2 className="text-xl font-bold text-dark mb-6">Send Us a Message</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message"
                className="w-full border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition"
              ></textarea>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold cursor-pointer transition">
              Send Message
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-dark">Contact Info</h2>

              <li className="flex items-center gap-3">
                <span className="bg-primary text-white p-3 rounded-full"><Mail /></span>
                <a href="mailto:kaastechnical@gmail.com">kaastechnical@gmail.com</a>
              </li>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
}

export default ContactUs