import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/lib/data/categories";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Floating contact cards data
const contactCards = [
  {
    icon: Phone,
    title: "Speak to Sales",
    value: "+91 123 456 7890",
    href: "tel:+911234567890",
    description: "Mon-Sat, 9AM-6PM",
  },
  {
    icon: Mail,
    title: "Get Support",
    value: "rimswitchgear@gmail.com",
    href: "mailto:rimswitchgear@gmail.com",
    description: "We reply within 24hrs",
  },
  {
    icon: MapPin,
    title: "Visit HQ",
    value: "Royal Industries, Mansa",
    href: "https://maps.google.com",
    description: "Punjab-151505, India",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", data);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[420px] lg:min-h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/contact-support.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-[#E87722] bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              We're Here to Help
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Have questions about our products? Our team is here to help you find the right solution for your industrial automation needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating Contact Cards */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {contactCards.map((card, index) => (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
              >
                {/* Glassmorphism effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E87722]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#E87722]/10 flex items-center justify-center mb-4 group-hover:bg-[#E87722] transition-colors duration-300">
                    <card.icon className="h-7 w-7 text-[#E87722] group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {card.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#E87722] transition-colors">
                    {card.value}
                  </p>
                  <p className="text-sm text-gray-500">
                    {card.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form & Map Split */}
      <section className="py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-lg border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-500">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">
                        Full Name <span className="text-[#E87722]">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                        className={`h-12 rounded-xl border-gray-200 focus:border-[#E87722] focus:ring-[#E87722]/20 ${errors.name ? "border-red-500" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        Email Address <span className="text-[#E87722]">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        {...register("email")}
                        className={`h-12 rounded-xl border-gray-200 focus:border-[#E87722] focus:ring-[#E87722]/20 ${errors.email ? "border-red-500" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        Phone Number <span className="text-[#E87722]">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register("phone")}
                        className={`h-12 rounded-xl border-gray-200 focus:border-[#E87722] focus:ring-[#E87722]/20 ${errors.phone ? "border-red-500" : ""}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700 font-medium">
                        Company Name <span className="text-gray-400 text-sm">(Optional)</span>
                      </Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        {...register("company")}
                        className="h-12 rounded-xl border-gray-200 focus:border-[#E87722] focus:ring-[#E87722]/20"
                      />
                    </div>
                  </div>

                  {/* Product Interest Dropdown */}
                  <div className="space-y-2">
                    <Label htmlFor="productInterest" className="text-gray-700 font-medium">
                      Product Interest
                    </Label>
                    <Select onValueChange={(value) => setValue("productInterest", value)}>
                      <SelectTrigger className="h-12 rounded-xl border-gray-200 focus:border-[#E87722] focus:ring-[#E87722]/20">
                        <SelectValue placeholder="Select a product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">
                      Your Message <span className="text-[#E87722]">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements, project details, or any questions you have..."
                      rows={5}
                      {...register("message")}
                      className={`rounded-xl border-gray-200 focus:border-[#E87722] focus:ring-[#E87722]/20 resize-none ${errors.message ? "border-red-500" : ""}`}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button - Full Width */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-semibold rounded-xl bg-[#E87722] hover:bg-[#d56a1a] text-white shadow-lg shadow-[#E87722]/25 hover:shadow-xl hover:shadow-[#E87722]/30 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="h-5 w-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-full min-h-[500px] lg:min-h-full flex flex-col">
                {/* Map Header */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#E87722]" />
                    Our Location
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Royal Industries, Mansa-151505, Punjab, India
                  </p>
                </div>
                
                {/* Map Container - Takes remaining height */}
                <div className="flex-1 relative min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.0!2d75.4!3d29.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU0JzAwLjAiTiA3NcKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: 'absolute', inset: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="RiM Location"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                
                {/* Get Directions Button */}
                <div className="p-4 border-t border-gray-100">
                  <a
                    href="https://maps.google.com/?q=Royal+Industries+Mansa+Punjab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-[#E87722] text-[#E87722] font-medium hover:bg-[#E87722] hover:text-white transition-all duration-300"
                  >
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Urgent Assistance Footer Callout */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E87722]/20 flex items-center justify-center">
                <Headphones className="h-6 w-6 text-[#E87722]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Need urgent assistance?</p>
                <p className="text-white font-semibold">We're available 24/7</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-700" />
            <a
              href="tel:+911234567890"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E87722] hover:bg-[#d56a1a] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#E87722]/25"
            >
              <Phone className="h-5 w-5" />
              +91 123 456 7890
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
