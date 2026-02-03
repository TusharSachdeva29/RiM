import { motion } from "framer-motion";
import { Shield, Zap, Award, Check } from "lucide-react";

const benefits = [
  {
    title: "Quality Assurance",
    description: "Every product undergoes rigorous testing and quality checks.",
    icon: Shield,
  },
  {
    title: "Innovation",
    description: "Continuous R&D to stay ahead in the electrical industry.",
    icon: Zap,
  },
  {
    title: "Expertise",
    description: "35+ years of manufacturing excellence and technical knowledge.",
    icon: Award,
  },
];

export function AboutSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rim-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-accent text-primary text-sm font-medium mb-6"
            >
              About RiM
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight"
            >
              Engineering Trust{" "}
              <span className="text-transparent bg-clip-text bg-rim-gradient">Since 1989</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-700 mb-8 leading-relaxed max-w-xl"
            >
              RiM is synonymous with industrial reliability. From heavy-duty Changeover Switches to
              precision Capacitors, we engineer solutions that power the nation. Our commitment to
              safety and durability makes us the preferred choice for industrial and residential
              sectors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {[
                "Trusted by 10,000+ customers across India",
                "ISO certified manufacturing processes",
                "24/7 technical support and customer service",
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Visual Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.15 }}
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75 }}
              className="mt-8 p-6 rounded-xl bg-rim-gradient text-white"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold">35+</div>
                  <div className="text-sm text-white/80">Years of Excellence</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm text-white/80">Product Range</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
