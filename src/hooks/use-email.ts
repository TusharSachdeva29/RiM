import emailjs from "@emailjs/browser";
import { useState } from "react";

// EmailJS Configuration
// To set up EmailJS:
// 1. Create account at https://www.emailjs.com/
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create email templates for "contact_form" and "dealership_form"
// 4. Replace these placeholder IDs with your actual IDs

const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
  publicKey: "YOUR_PUBLIC_KEY", // Replace with your EmailJS public key
  templates: {
    contact: "contact_form", // Template ID for contact form
    dealership: "dealership_form", // Template ID for dealership form
  },
};

// Email recipient
const RECIPIENT_EMAIL = "sachdevatushar81@gmail.com";

export type EmailType = "contact" | "dealership";

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productInterest?: string;
  message: string;
}

export interface DealershipEmailData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  experience: string;
  currentBusiness: string;
  message?: string;
}

export interface EmailResult {
  success: boolean;
  message: string;
}

// Format contact form data for email template
const formatContactEmail = (data: ContactEmailData) => ({
  to_email: RECIPIENT_EMAIL,
  from_name: data.name,
  from_email: data.email,
  phone: data.phone,
  company: data.company || "Not provided",
  product_interest: data.productInterest || "General Inquiry",
  message: data.message,
  subject: `New Contact Inquiry from ${data.name}`,
  // Formatted message for email body
  formatted_message: `
New Contact Inquiry from ${data.name}
========================================

Contact Details:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Company: ${data.company || "Not provided"}

Product Interest: ${data.productInterest || "General Inquiry"}

Message:
${data.message}

========================================
Sent from RiM Website Contact Form
  `.trim(),
});

// Format dealership form data for email template
const formatDealershipEmail = (data: DealershipEmailData) => ({
  to_email: RECIPIENT_EMAIL,
  from_name: data.ownerName,
  from_email: data.email,
  business_name: data.businessName,
  owner_name: data.ownerName,
  phone: data.phone,
  city: data.city,
  state: data.state,
  experience: data.experience,
  current_business: data.currentBusiness,
  additional_info: data.message || "None",
  subject: `New Dealership Application - ${data.businessName}`,
  // Formatted message for email body
  formatted_message: `
New Dealership Application - ${data.businessName}
========================================

Applicant Details:
- Business Name: ${data.businessName}
- Owner/Proprietor: ${data.ownerName}
- Email: ${data.email}
- Phone: ${data.phone}

Location:
- City: ${data.city}
- State: ${data.state}

Business Experience:
- Years in Electrical Business: ${data.experience}

Current Business Details:
${data.currentBusiness}

Additional Information:
${data.message || "None provided"}

========================================
Sent from RiM Website Dealership Form
  `.trim(),
});

export function useEmailSender() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendContactEmail = async (data: ContactEmailData): Promise<EmailResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const templateParams = formatContactEmail(data);
      
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templates.contact,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      setIsLoading(false);
      return {
        success: true,
        message: "Your message has been sent successfully! We'll get back to you soon.",
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send email. Please try again.";
      setError(errorMessage);
      setIsLoading(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const sendDealershipEmail = async (data: DealershipEmailData): Promise<EmailResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const templateParams = formatDealershipEmail(data);
      
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templates.dealership,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      setIsLoading(false);
      return {
        success: true,
        message: "Your application has been submitted successfully! Our team will contact you within 48 hours.",
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application. Please try again.";
      setError(errorMessage);
      setIsLoading(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    sendContactEmail,
    sendDealershipEmail,
    isLoading,
    error,
  };
}
