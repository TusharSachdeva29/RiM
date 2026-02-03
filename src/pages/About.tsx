import { motion } from "framer-motion";
import {
  Award,
  Users,
  Target,
  Heart,
  CheckCircle,
  Factory,
  Shield,
  Zap,
  Lightbulb,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description:
      "Every product undergoes rigorous testing to meet the highest industry standards before leaving our facility.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description:
      "We listen, understand, and deliver tailored solutions that consistently exceed customer expectations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Continuously improving our products and processes with the latest technology and engineering practices.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "Honest, transparent, and ethical in all our business dealings—building relationships that last.",
  },
];

const milestones = [
  {
    year: "1989",
    title: "The Beginning",
    description:
      "RiM was established in Mansa, Punjab with a vision to manufacture quality electrical components.",
  },
  {
    year: "1995",
    title: "First Major Contract",
    description:
      "Secured our first major industrial contract, supplying switchgear to leading manufacturers.",
  },
  {
    year: "2005",
    title: "ISO Certification",
    description:
      "Achieved ISO 9001 certification, marking our commitment to international quality standards.",
  },
  {
    year: "2015",
    title: "Product Expansion",
    description:
      "Expanded our catalog to over 100+ products, serving residential, commercial, and industrial sectors.",
  },
  {
    year: "2024",
    title: "Pan-India Presence",
    description:
      "Established a robust dealer network across all Indian states with 500+ authorized dealers.",
  },
];

const certifications = [
  { name: "ISO 9001:2015", desc: "Quality Management System" },
  { name: "ISI Certified", desc: "Indian Standards Institute" },
  { name: "BIS Compliant", desc: "Bureau of Indian Standards" },
  { name: "CE Marking", desc: "European Conformity (Select Products)" },
];

const stats = [
  { icon: Factory, value: "50,000+", label: "Sq. Ft. Facility" },
  { icon: Zap, value: "200+", label: "Products" },
  { icon: Users, value: "500+", label: "Dealers Nationwide" },
  { icon: Award, value: "10K+", label: "Happy Customers" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/about-us.jpg')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-[#E87722] font-semibold text-lg mb-4 tracking-wide uppercase"
          >
            About RiM
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6 leading-tight"
          >
            The Home of Quality
            <br />
            <span className="text-[#E87722]">Since 1989</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            For over three decades, RiM has been at the forefront of electrical
            switchgear manufacturing in India. Our commitment to quality,
            innovation, and customer satisfaction has made us a trusted name in
            the industry.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-[#E87722] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E87722] font-semibold text-sm tracking-wide uppercase mb-3 block">
                Our Story
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-[#1a1a1a] mb-6 leading-tight">
                Building Trust, One Product at a Time
              </h2>
              <div className="space-y-5 text-gray-600 text-base lg:text-lg leading-relaxed">
                <p>
                  Founded in 1989 in the industrial town of Mansa, Punjab, RiM
                  (Royal Industries Mansa) started with a simple yet powerful
                  vision: to provide high-quality electrical components that
                  industries and homes could rely on for decades. What began in
                  a modest workshop has now transformed into a state-of-the-art
                  manufacturing facility spanning over 50,000 square feet.
                </p>
                <p>
                  Over the years, we have earned the trust of thousands of
                  customers by maintaining an unwavering commitment to quality,
                  safety, and innovation. Our product range has grown to over
                  200+ items—from MCBs and MCCBs to change-over switches and
                  distribution boards—serving residential, commercial, and heavy
                  industrial sectors across India. Today, RiM stands as a
                  testament to what dedication and craftsmanship can achieve.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/about-us-our-story.jpeg"
                  alt="RiM Manufacturing Facility"
                  className="w-full h-auto rounded-xl shadow-lg object-cover aspect-[4/3]"
                />
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-[#E87722] text-white p-6 rounded-xl shadow-2xl"
                >
                  <div className="text-4xl font-heading font-bold">35+</div>
                  <div className="text-sm opacity-90">Years of Excellence</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#E87722] font-semibold text-sm tracking-wide uppercase mb-3 block">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-[#1a1a1a]">
              What Drives Us Forward
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white p-8 rounded-2xl shadow-md border-2 border-transparent hover:border-[#E87722] transition-all duration-300 group"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-[#E87722]/10 flex items-center justify-center group-hover:bg-[#E87722] transition-colors duration-300">
                  <value.icon className="h-7 w-7 text-[#E87722] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#1a1a1a] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#E87722] font-semibold text-sm tracking-wide uppercase mb-3 block">
              Our Journey
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-[#1a1a1a]">
              Milestones That Define Us
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - Orange */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-[#E87722]" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-[#E87722] rounded-full border-4 border-white shadow-lg z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 inline-block">
                      <div className="text-3xl lg:text-4xl font-heading font-bold text-[#E87722] mb-2">
                        {milestone.year}
                      </div>
                      <div className="font-heading font-semibold text-[#1a1a1a] text-lg mb-2">
                        {milestone.title}
                      </div>
                      <div className="text-gray-600 text-sm leading-relaxed">
                        {milestone.description}
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certified Excellence Section */}
      <section className="py-20 lg:py-28 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Certifications */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E87722] font-semibold text-sm tracking-wide uppercase mb-3 block">
                Quality Assurance
              </span>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-white mb-6">
                Certified Excellence
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Our commitment to quality is backed by internationally
                recognized certifications. Every product that leaves our
                facility meets stringent quality standards, ensuring safety and
                reliability.
              </p>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E87722]/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-5 w-5 text-[#E87722]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {cert.name}
                      </div>
                      <div className="text-gray-500 text-sm">{cert.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-center hover:bg-white/10 transition-all"
                >
                  <stat.icon className="h-10 w-10 text-[#E87722] mx-auto mb-4" />
                  <div className="text-3xl lg:text-4xl font-heading font-bold text-[#E87722] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
