import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Handshake, 
  TrendingUp, 
  HeadphonesIcon, 
  Package, 
  MapPin, 
  Shield,
  Send,
  CheckCircle
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
    description: "Access to our complete range of 200+ quality electrical products.",
  },
  {
    icon: TrendingUp,
    title: "Growth Support",
    description: "Marketing materials, training, and business development assistance.",
  },
  {
    icon: Shield,
    title: "Territory Protection",
    description: "Exclusive dealership rights in your designated area.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Direct line to our sales and technical support teams.",
  },
  {
    icon: MapPin,
    title: "Pan-India Network",
    description: "Join our network of 500+ successful dealers across India.",
  },
  {
    icon: Handshake,
    title: "Partnership Focus",
    description: "We grow when you grow. Your success is our success.",
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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DealershipFormData>({
    resolver: zodResolver(dealershipSchema),
  });

  const onSubmit = async (data: DealershipFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Dealership form submitted:", data);
    
    toast({
      title: "Application Submitted!",
      description: "Thank you for your interest. Our team will contact you within 48 hours.",
    });
    
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-dark-gradient py-16 lg:py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-primary text-sm font-medium mb-6">
              <Handshake className="h-4 w-4" />
              Partner With Us
            </span>
            <h1 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
              Become a RiM Dealer
            </h1>
            <p className="text-gray-300 text-lg">
              Join India's growing network of premium electrical product distributors. 
              Partner with RiM and unlock new business opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 lg:py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
              Why Partner With RiM?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
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
                className="p-6 rounded-2xl bg-card border hover:border-primary hover:shadow-rim transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
                Apply for Dealership
              </h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form and our team will get in touch with you to discuss 
                the partnership opportunity.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Quick Response</div>
                    <div className="text-sm text-muted-foreground">
                      Our team will contact you within 48 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">No Application Fee</div>
                    <div className="text-sm text-muted-foreground">
                      The application process is completely free
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Personal Consultation</div>
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
              <div className="p-6 lg:p-8 rounded-2xl bg-card border">
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
                    className="w-full sm:w-auto bg-rim-gradient hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
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
    </div>
  );
}
