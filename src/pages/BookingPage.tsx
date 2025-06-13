import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation to potentially read pre-fill data
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MainNavigationSidebar from '@/components/layout/MainNavigationSidebar';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea'; // For special requests

// Lucide Icons
import { User, Mail, Phone, MapPin, CalendarDays, Users as UsersIcon, BedDouble, Car, CreditCard, ShieldCheck, ArrowLeft, ArrowRight, Info } from 'lucide-react';

// Zod Schema for form validation
const bookingFormSchema = z.object({
  // Step 1: Personal Information
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]{10,15}$/, { message: "Invalid phone number format."}),

  // Step 2: Trip Details
  destination: z.string().min(3, { message: "Destination is required." }),
  startDate: z.string().refine(val => val && !isNaN(Date.parse(val)), { message: "Valid start date is required." }),
  endDate: z.string().refine(val => val && !isNaN(Date.parse(val)), { message: "Valid end date is required." }),
  travelers: z.coerce.number().min(1, { message: "At least one traveler is required." }).max(10, { message: "Maximum 10 travelers." }),
  accommodationType: z.string().nonempty({ message: "Please select accommodation type." }),
  transportType: z.string().nonempty({ message: "Please select transport type." }),
  specialRequests: z.string().max(500, { message: "Special requests cannot exceed 500 characters." }).optional(),

  // Step 3: Payment & Review
  paymentMethod: z.string().nonempty({ message: "Please select a payment method." }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
}).refine(data => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) > new Date(data.startDate);
    }
    return true;
}, {
    message: "End date must be after start date.",
    path: ["endDate"],
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const defaultValues: Partial<BookingFormValues> = {
  fullName: "",
  email: "",
  phone: "",
  destination: "",
  startDate: "",
  endDate: "",
  travelers: 1,
  accommodationType: "",
  transportType: "",
  specialRequests: "",
  paymentMethod: "",
  agreeToTerms: false,
};

const TOTAL_STEPS = 4; // 1: Personal, 2: Trip, 3: Payment/Review, 4: Confirmation

const BookingPage: React.FC = () => {
  console.log('BookingPage loaded');
  const { toast } = useToast();
  const location = useLocation(); // To potentially get pre-fill data from state or query params

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
    mode: "onTouched", // Validate on blur
  });

  // Effect to pre-fill form if data is passed via location state (e.g., from TripCalculatorPage)
  useEffect(() => {
    if (location.state?.tripDetails) {
      const { destination, days } = location.state.tripDetails;
      form.reset({
        ...defaultValues,
        destination: destination || "",
        // Potentially calculate start/end dates based on 'days' if relevant
      });
      toast({
        title: "Trip Details Pre-filled",
        description: "Your destination from the calculator has been pre-filled.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, form.reset]);


  const processStep = async (fieldsToValidate?: (keyof BookingFormValues)[]) => {
    if (!fieldsToValidate || fieldsToValidate.length === 0) return true;
    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please correct the highlighted fields.",
        variant: "destructive",
      });
    }
    return isValid;
  };

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof BookingFormValues)[] | undefined = undefined;
    if (currentStep === 1) {
      fieldsToValidate = ['fullName', 'email', 'phone'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['destination', 'startDate', 'endDate', 'travelers', 'accommodationType', 'transportType', 'specialRequests'];
    }
    // Step 3 uses the main submit button (type="submit")

    if (fieldsToValidate) {
      const isValid = await processStep(fieldsToValidate);
      if (isValid && currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      }
    } else if (currentStep < 3) { // Should not happen if fieldsToValidate is correctly set for steps 1 & 2
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1 && currentStep < TOTAL_STEPS) { // Can't go back from confirmation
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit: SubmitHandler<BookingFormValues> = (data) => {
    console.log("Booking form submitted:", data);
    // Simulate API call
    toast({
      title: "Booking Processing...",
      description: "Your booking is being processed. Please wait.",
    });
    setTimeout(() => {
      toast({
        title: "Booking Confirmed!",
        description: "Your Indian adventure is booked! Check your email for details.",
        className: "bg-green-500 text-white",
      });
      setCurrentStep(4); // Move to confirmation step
    }, 2000);
  };

  const StepperUI = () => (
    <div className="mb-8 text-center">
      <p className="text-sm text-muted-foreground">Step {currentStep} of {TOTAL_STEPS} - {
        currentStep === 1 ? "Personal Information" :
        currentStep === 2 ? "Trip Details" :
        currentStep === 3 ? "Review & Payment" : "Booking Confirmation"
      }</p>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-amber-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-orange-50/30">
      <Header />
      <MainNavigationSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <Card className="max-w-3xl mx-auto shadow-xl border-amber-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-amber-700 text-center">Book Your Dream India Trip</CardTitle>
            <CardDescription className="text-center text-gray-600">
              {currentStep < TOTAL_STEPS ? "Complete the steps below to finalize your adventure." : "Thank you for booking with IndiVoyage!"}
            </CardDescription>
            <StepperUI />
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8">
                {currentStep === 1 && (
                  <section className="space-y-6 animate-fadeIn">
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4 text-amber-600" />Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Rohan Kumar" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4 text-amber-600" />Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="e.g., rohan@example.com" {...field} />
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
                          <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4 text-amber-600" />Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="e.g., +91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                )}

                {currentStep === 2 && (
                  <section className="space-y-6 animate-fadeIn">
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Trip Details</h3>
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-amber-600" />Destination</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Goa, Kerala, Rajasthan" {...field} />
                          </FormControl>
                           <FormDescription>As chosen or from your Trip Calculator estimate.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-amber-600" />Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-amber-600" />End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} min={form.getValues("startDate") || new Date().toISOString().split("T")[0]} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="travelers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><UsersIcon className="mr-2 h-4 w-4 text-amber-600" />Number of Travelers</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="10" placeholder="e.g., 2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accommodationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><BedDouble className="mr-2 h-4 w-4 text-amber-600" />Accommodation Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select accommodation style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="budget_hotel">Budget Hotel</SelectItem>
                              <SelectItem value="mid_range_hotel">Mid-Range Hotel (3-Star)</SelectItem>
                              <SelectItem value="luxury_hotel">Luxury Hotel (4-5 Star)</SelectItem>
                              <SelectItem value="homestay">Homestay / Guesthouse</SelectItem>
                              <SelectItem value="resort">Resort</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transportType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><Car className="mr-2 h-4 w-4 text-amber-600" />Preferred Transport</FormLabel>
                           <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="flights" />
                              </FormControl>
                              <FormLabel className="font-normal">Flights (if applicable)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="train" />
                              </FormControl>
                              <FormLabel className="font-normal">Train</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="private_car" />
                              </FormControl>
                              <FormLabel className="font-normal">Private Car / Cab</FormLabel>
                            </FormItem>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><Info className="mr-2 h-4 w-4 text-amber-600" />Special Requests (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="e.g., dietary needs, accessibility requirements, preferred room view" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                )}

                {currentStep === 3 && (
                  <section className="space-y-6 animate-fadeIn">
                    <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">Review & Payment</h3>
                    {/* Display a summary of selected options - for brevity, this is omitted but would be good UX */}
                    <p className="text-sm text-muted-foreground">Please review your booking details before proceeding to payment. For this demo, payment is simulated.</p>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center"><CreditCard className="mr-2 h-4 w-4 text-amber-600" />Payment Method</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="credit_card">Credit Card</SelectItem>
                              <SelectItem value="debit_card">Debit Card</SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                              <SelectItem value="net_banking">Net Banking</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the <Link to="/terms" className="text-amber-600 hover:underline">terms and conditions</Link> and <Link to="/privacy" className="text-amber-600 hover:underline">privacy policy</Link>.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                        <p className="font-bold flex items-center"><ShieldCheck className="h-5 w-5 mr-2"/>Secure Payment</p>
                        <p>Your payment information is encrypted and transmitted securely.</p>
                    </div>
                  </section>
                )}

                {currentStep === 4 && (
                  <section className="text-center py-10 animate-fadeIn">
                    <ShieldCheck className="w-24 h-24 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-green-600 mb-3">Booking Confirmed!</h2>
                    <p className="text-lg text-gray-700 mb-2">Thank you for choosing IndiVoyage.</p>
                    <p className="text-gray-600 mb-8">An email confirmation with your trip details has been sent to <span className="font-semibold">{form.getValues("email")}</span>.</p>
                    <div className="space-x-4">
                        <Button asChild variant="outline">
                            <Link to="/user-profile">View My Trips</Link>
                        </Button>
                        <Button asChild className="bg-amber-600 hover:bg-amber-700">
                            <Link to="/">Explore More</Link>
                        </Button>
                    </div>
                  </section>
                )}
              </CardContent>

              {currentStep < TOTAL_STEPS && (
                <CardFooter className="flex justify-between pt-8 border-t">
                  <Button type="button" variant="outline" onClick={handlePrevStep} disabled={currentStep === 1} className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  
                  {currentStep < 3 && (
                    <Button type="button" onClick={handleNextStep} className="bg-amber-600 hover:bg-amber-700 flex items-center">
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {currentStep === 3 && (
                    <Button type="submit" className="bg-green-600 hover:bg-green-700 flex items-center">
                      Confirm & Pay <ShieldCheck className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              )}
            </form>
          </Form>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;