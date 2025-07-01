import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-responsive">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-responsive-h1 font-playfair font-bold text-luxury-black mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get in touch with our luxury watch experts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-6 md:p-8">
            <h2 className="text-responsive-h3 font-playfair font-bold text-luxury-black mb-6">Send us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} className="touch-target" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+234 xxx xxx xxxx" {...field} className="touch-target" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} className="touch-target" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject *</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help you?" {...field} className="touch-target" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5} 
                          placeholder="Tell us about your inquiry..."
                          {...field}
                          className="touch-target"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 touch-target"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-responsive-h3 font-playfair font-bold text-luxury-black mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              We're here to help you find the perfect timepiece or answer any questions about our services.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-luxury-black mb-1">Visit Our Showroom</h3>
                  <p className="text-gray-600">Victoria Island</p>
                  <p className="text-gray-600">Lagos, Nigeria</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-luxury-black mb-1">Call Us</h3>
                  <p className="text-gray-600">+234 801 234 5678</p>
                  <p className="text-sm text-gray-500">Monday - Saturday, 9AM - 6PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-luxury-black mb-1">Email Us</h3>
                  <p className="text-gray-600">info@luxurybyus.ng</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-luxury-gold mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-luxury-black mb-1">WhatsApp</h3>
                  <p className="text-gray-600">+234 801 234 5678</p>
                  <p className="text-sm text-gray-500">Instant messaging support</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-luxury-dark text-white rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-luxury-gold" />
                <h3 className="text-lg font-semibold">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}