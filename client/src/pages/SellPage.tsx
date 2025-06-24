import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { brands } from '@/data/products';

const sellFormSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().optional(),
  condition: z.string().min(1, 'Condition is required'),
  hasBox: z.boolean().default(false),
  hasPapers: z.boolean().default(false),
  hasServiceRecords: z.boolean().default(false),
  description: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Valid email is required'),
  location: z.string().min(1, 'Location is required'),
});

type SellFormData = z.infer<typeof sellFormSchema>;

export function SellPage() {
  const { toast } = useToast();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  
  const form = useForm<SellFormData>({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      hasBox: false,
      hasPapers: false,
      hasServiceRecords: false,
    },
  });

  const onSubmit = async (data: SellFormData) => {
    try {
      await apiRequest('POST', '/api/sell-submissions', data);
      toast({
        title: "Submission Successful!",
        description: "We'll evaluate your watch and contact you within 24 hours.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your watch. Please try again.",
        variant: "destructive",
      });
    }
  };

  const faqs = [
    {
      id: 'faq-1',
      question: 'How do you determine the value of my watch?',
      answer: 'We consider multiple factors including brand, model, condition, age, rarity, original box and papers, service history, and current market demand. Our experts use industry databases and recent sales data to provide accurate valuations.',
    },
    {
      id: 'faq-2',
      question: 'How long does the evaluation process take?',
      answer: 'Most evaluations are completed within 24 hours of receiving your submission. Complex or rare pieces may require additional research and could take up to 48 hours.',
    },
    {
      id: 'faq-3',
      question: 'Do you charge for evaluations?',
      answer: 'No, our initial evaluation service is completely free with no obligation to sell. We only earn when you decide to sell your watch through us.',
    },
    {
      id: 'faq-4',
      question: 'What payment methods do you offer?',
      answer: 'We offer bank transfers to any Nigerian bank account or cash payment upon pickup in Lagos. Payment is processed immediately upon completion of the transaction.',
    },
    {
      id: 'faq-5',
      question: 'Is my watch insured during the process?',
      answer: 'Yes, all watches are fully insured from the moment we take possession until payment is completed. We use professional courier services with comprehensive coverage.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-luxury-black mb-4">Sell Your Watch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get the best value for your luxury timepiece with our professional evaluation service</p>
        </div>
        
        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-playfair font-bold text-luxury-black text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-luxury-black">1</span>
              </div>
              <h3 className="text-lg font-semibold text-luxury-black mb-3">Submit Watch Details</h3>
              <p className="text-gray-600">Tell us about your watch using our simple form. Include photos and condition details.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-luxury-black">2</span>
              </div>
              <h3 className="text-lg font-semibold text-luxury-black mb-3">Receive Evaluation</h3>
              <p className="text-gray-600">Our experts review your submission and provide a fair market value assessment within 24 hours.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-luxury-black">3</span>
              </div>
              <h3 className="text-lg font-semibold text-luxury-black mb-3">Accept Offer</h3>
              <p className="text-gray-600">Review our competitive offer and decide whether to proceed with the sale.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-luxury-black">4</span>
              </div>
              <h3 className="text-lg font-semibold text-luxury-black mb-3">Get Paid</h3>
              <p className="text-gray-600">Secure pickup in Lagos and immediate payment via bank transfer or cash.</p>
            </div>
          </div>
        </div>
        
        {/* Submission Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-playfair font-bold text-luxury-black mb-8 text-center">Submit Your Watch</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand */}
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand} value={brand}>
                                {brand}
                              </SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Model */}
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Submariner Date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Purchase</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2020" 
                          min="1950" 
                          max="2024"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Condition */}
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="very-good">Very Good</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Box and Papers */}
              <div>
                <FormLabel>Box and Papers</FormLabel>
                <div className="space-y-2 mt-2">
                  <FormField
                    control={form.control}
                    name="hasBox"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Original Box
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hasPapers"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Original Papers/Certificate
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hasServiceRecords"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Service Records
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={4} 
                        placeholder="Tell us more about your watch, any modifications, service history, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Photo Upload Placeholder */}
              <div>
                <FormLabel>Photos</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-luxury-gold transition-colors duration-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload photos or drag and drop</p>
                  <p className="text-sm text-gray-500">Include photos of the face, case back, bracelet, and any damage</p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Input placeholder="+234 xxx xxx xxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Location in Lagos *</FormLabel>
                      <FormControl>
                        <Input placeholder="Victoria Island" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Submit Button */}
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit for Evaluation'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-playfair font-bold text-luxury-black mb-8 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openFAQ === faq.id}
                onOpenChange={(isOpen) => setOpenFAQ(isOpen ? faq.id : null)}
              >
                <CollapsibleTrigger className="w-full py-4 text-left flex justify-between items-center text-lg font-medium text-luxury-black hover:text-luxury-gold transition-colors duration-300 border-b border-gray-200">
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transform transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="pb-4 text-gray-600">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-luxury-black mb-4">Have More Questions?</h3>
          <p className="text-gray-600 mb-6">Our watch experts are ready to help you get the best value for your timepiece.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+2348012345678" className="bg-luxury-black text-white px-6 py-3 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 font-semibold rounded-lg">
              <Phone className="w-5 h-5 inline mr-2" />
              Call: +234 801 234 5678
            </a>
            <a href="https://wa.me/2348012345678" className="bg-green-500 text-white px-6 py-3 hover:bg-green-600 transition-all duration-300 font-semibold rounded-lg">
              <MessageCircle className="w-5 h-5 inline mr-2" />
              WhatsApp
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">Response time: Within 2 hours during business hours</p>
        </div>
      </div>
    </section>
  );
}
