import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import { 
  Handshake, 
  TrendingUp, 
  HeadphonesIcon, 
  Package, 
  MapPin, 
  Shield,
  Send,
  CheckCircle,
  BadgePercent,
  ClipboardCheck,
  UserCheck,
  Rocket,
  ArrowRight,
  Sparkles,
  Phone,
  Mail
} from "lucide-react";
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
import { useEmailSender } from "@/hooks/use-email";

const dealershipSchema = z.object({
  businessName: z.string().min(2, "Business name is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  experience: z.string().min(1, "Please select your experience"),
  currentBusiness: z.string().min(10, "Please describe your current business"),
  message: z.string().optional(),
});

type DealershipFormData = z.infer<typeof dealershipSchema>;

const benefits = [
  {
    icon: Package,
    title: "Premium Products",
    description: "Access to our complete range of 200+ quality electrical products with industry-leading warranties.",
  },
  {
    icon: TrendingUp,
    title: "Growth Support",
    description: "Marketing materials, training programs, and dedicated business development assistance.",
  },
  {
    icon: Shield,
    title: "Territory Protection",
    description: "Exclusive dealership rights in your designated area with zero competition from us.",
  },
  {
    icon: BadgePercent,
    title: "High Margins",
    description: "Competitive pricing structure ensuring healthy profit margins on every sale.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Direct line to our sales and technical support teams available 24/7.",
  },
  {
    icon: MapPin,
    title: "Pan-India Network",
    description: "Join our network of 500+ successful dealers across India.",
  },
];

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "Apply Online",
    description: "Fill out the simple application form with your business details",
    step: 1,
  },
  {
    icon: UserCheck,
    title: "Verification",
    description: "Our team reviews your application and contacts you within 48 hours",
    step: 2,
  },
  {
    icon: Rocket,
    title: "Start Selling",
    description: "Get onboarded, receive inventory, and start growing your business",
    step: 3,
  },
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh", "Chandigarh"
];

export default function Dealership() {
  const { toast } = useToast();
  const { sendDealershipEmail, isLoading: isEmailLoading } = useEmailSender();
  const formRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DealershipFormData>({
    resolver: zodResolver(dealershipSchema),
  });

  // Combined loading state
  const isLoading = isSubmitting || isEmailLoading;

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBenefits = () => {
    benefitsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = async (data: DealershipFormData) => {
    // Send email via EmailJS
    const result = await sendDealershipEmail({
      businessName: data.businessName,
      ownerName: data.ownerName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state,
      experience: data.experience,
      currentBusiness: data.currentBusiness,
      message: data.message,
    });
    
    if (result.success) {
      toast({
        title: "Application Submitted Successfully!",
        description: result.message,
      });
      reset();
    } else {
      toast({
        title: "Failed to Submit Application",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/dealer-partnership.jpg"
            alt="Partnership"
            className="w-full h-full object-cover"
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              {/* Trust Badge with Golden Glow */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-primary mb-6 shadow-[0_0_20px_rgba(232,119,34,0.3)]"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Partner With Us
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight"
              >
                Grow Your Business{" "}
                <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                  with RiM
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
              >
                Join India's fastest-growing network of premium electrical distributors. 
                Unlock exclusive territories, high margins, and dedicated support.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  className="bg-rim-gradient hover:opacity-90 text-white px-8 py-6 text-lg font-semibold shadow-[0_0_30px_rgba(232,119,34,0.4)] hover:shadow-[0_0_40px_rgba(232,119,34,0.6)] transition-all"
                  onClick={scrollToForm}
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all"
                  onClick={scrollToBenefits}
                >
                  View Benefits
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10"
              >
                {[
                  { value: "500+", label: "Active Dealers" },
                  { value: "200+", label: "Products" },
                  { value: "25+", label: "States Covered" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Empty for image visibility */}
            <div className="hidden lg:block" />
          </div>
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
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Partner Benefits
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              Why Partner With <span className="text-primary">RiM?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We provide everything you need to build a successful electrical distribution business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                {/* Orange Bottom Border on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-amber-400 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-amber-400/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Becoming a RiM dealer is quick and easy. Here's how to get started.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
              <div className="w-full h-full border-t-2 border-dashed border-primary/40" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step Circle */}
                    <div className="relative z-10 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center shadow-lg shadow-primary/30">
                        <step.icon className="h-9 w-9 text-white" strokeWidth={1.5} />
                      </div>
                      {/* Step Number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-card border-2 border-primary flex items-center justify-center text-primary font-bold text-sm shadow-md">
                        {step.step}
                      </div>
                    </div>

                    <h3 className="font-heading font-semibold text-xl mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for mobile */}
                  {index < processSteps.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="py-20 lg:py-28 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Apply Today
              </span>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
                Apply for <span className="text-primary">Dealership</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Fill out the form and our team will get in touch with you to discuss 
                the partnership opportunity.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold">Quick Response</div>
                    <div className="text-sm text-muted-foreground">
                      Our team will contact you within 48 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold">No Application Fee</div>
                    <div className="text-sm text-muted-foreground">
                      The application process is completely free
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold">Personal Consultation</div>
                    <div className="text-sm text-muted-foreground">
                      Discuss your requirements with our sales team
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border/50 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Your business name"
                        {...register("businessName")}
                        className={errors.businessName ? "border-destructive" : ""}
                      />
                      {errors.businessName && (
                        <p className="text-sm text-destructive">{errors.businessName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner/Proprietor Name *</Label>
                      <Input
                        id="ownerName"
                        placeholder="Your name"
                        {...register("ownerName")}
                        className={errors.ownerName ? "border-destructive" : ""}
                      />
                      {errors.ownerName && (
                        <p className="text-sm text-destructive">{errors.ownerName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        {...register("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Your city"
                        {...register("city")}
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && (
                        <p className="text-sm text-destructive">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select onValueChange={(value) => setValue("state", value)}>
                        <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-sm text-destructive">{errors.state.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years in Electrical Business *</Label>
                    <Select onValueChange={(value) => setValue("experience", value)}>
                      <SelectTrigger className={errors.experience ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 Years</SelectItem>
                        <SelectItem value="2-5">2-5 Years</SelectItem>
                        <SelectItem value="5-10">5-10 Years</SelectItem>
                        <SelectItem value="10+">10+ Years</SelectItem>
                        <SelectItem value="new">New to Electrical Business</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experience && (
                      <p className="text-sm text-destructive">{errors.experience.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentBusiness">Current Business Details *</Label>
                    <Textarea
                      id="currentBusiness"
                      placeholder="Tell us about your current business, products you deal in, and target market..."
                      rows={4}
                      {...register("currentBusiness")}
                      className={errors.currentBusiness ? "border-destructive" : ""}
                    />
                    {errors.currentBusiness && (
                      <p className="text-sm text-destructive">{errors.currentBusiness.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      placeholder="Any specific requirements or questions? (optional)"
                      rows={3}
                      {...register("message")}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto bg-rim-gradient hover:opacity-90 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting Application...
                      </span>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Join CTA Section */}
      <section className="py-20 lg:py-28 bg-[#1a1a1a]">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#252525] to-[#1f1f1f] border border-white/10 p-8 md:p-12 lg:p-16"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6"
                >
                  <Handshake className="h-4 w-4" />
                  Join Our Network
                </motion.span>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                    Join?
                  </span>
                </h2>
                
                <p className="text-gray-400 text-lg mb-8 max-w-lg">
                  Take the first step towards building a successful electrical distribution business. 
                  Our team is ready to help you grow.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-rim-gradient hover:opacity-90 text-white px-8 py-6 text-lg font-semibold shadow-[0_0_30px_rgba(232,119,34,0.4)]"
                    onClick={scrollToForm}
                  >
                    Start Your Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Right Content - Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Call Us</div>
                    <div className="text-lg font-semibold text-white">+91 98765 43210</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email Us</div>
                    <div className="text-lg font-semibold text-white">dealers@rimelectricals.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Visit Us</div>
                    <div className="text-lg font-semibold text-white">Mumbai, Maharashtra</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
