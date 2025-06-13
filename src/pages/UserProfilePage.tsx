import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MainNavigationSidebar from '@/components/layout/MainNavigationSidebar';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// React Hook Form and Zod for Profile Form
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Lucide Icons
import { UserCircle, Edit3, ListOrdered, Heart, Settings2, Mail, Phone, MapPin, Briefcase, Save, LogOut, Menu as MenuIcon, ShieldCheck, Bell } from 'lucide-react';

// Profile Form Schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must not exceed 50 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional().refine(val => !val || /^[+]?[0-9]{10,15}$/.test(val), { message: "Invalid phone number format." }),
  address: z.string().optional(),
  bio: z.string().max(200, { message: "Bio must not exceed 200 characters." }).optional(),
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Placeholder Data
const sampleUser = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+919876543210',
  address: '123 Ganges Road, Varanasi, UP, India',
  bio: 'Passionate traveler exploring the rich culture of India. Love photography and local cuisines.',
  profilePictureUrl: 'https://via.placeholder.com/150/FFD700/808080?Text=AS', // Gold background, gray text
};

const sampleBookings = [
  { id: 'INDTRV7890', destination: 'Rajasthan Royal Tour', date: '2024-11-15', status: 'Confirmed', cost: '₹75,000' },
  { id: 'INDTRV1234', destination: 'Kerala Backwaters Escape', date: '2024-03-20', status: 'Completed', cost: '₹45,000' },
  { id: 'INDTRV5678', destination: 'Himalayan Trek Adventure', date: '2025-06-01', status: 'Pending Payment', cost: '₹60,000' },
];

const sampleWishlist = [
  { id: 'dest1', name: 'Andaman Islands Getaway', imageUrl: 'https://images.unsplash.com/photo-1505903340906-151575941528?q=80&w=400&h=300&fit=crop', description: 'Pristine beaches and coral reefs.' },
  { id: 'dest2', name: 'Spiritual Journey to Rishikesh', imageUrl: 'https://images.unsplash.com/photo-1582460115992-74517f300198?q=80&w=400&h=300&fit=crop', description: 'Yoga, meditation, and Ganga Aarti.' },
  { id: 'dest3', name: 'Wildlife Safari in Ranthambore', imageUrl: 'https://images.unsplash.com/photo-1595680223999-981756769495?q=80&w=400&h=300&fit=crop', description: 'Spot tigers in their natural habitat.' },
];

const UserProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: sampleUser.name,
      email: sampleUser.email,
      phone: sampleUser.phone,
      address: sampleUser.address,
      bio: sampleUser.bio,
    },
  });

  function onSubmit(data: ProfileFormValues) {
    console.log('Profile data submitted:', data);
    // Here you would typically send data to a backend API
    alert('Profile updated successfully! (Simulated)');
  }

  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 text-gray-800">
      <Header />
      <MainNavigationSidebar isOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-700">My Account</h1>
            {/* This button demonstrates triggering MainNavigationSidebar, 
                useful if Header's default menu isn't sufficient or for specific contexts.
                Header already has its own mobile menu. This could be for desktop or an alternative. */}
            <Button 
                variant="outline" 
                onClick={() => setIsSidebarOpen(true)} 
                className="md:hidden border-amber-600 text-amber-700 hover:bg-amber-100"
                aria-label="Open full navigation menu"
            >
                <MenuIcon className="h-5 w-5" />
            </Button>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 bg-amber-100 p-1 rounded-lg shadow">
            <TabsTrigger value="profile" className="flex items-center justify-center gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">
              <UserCircle className="h-5 w-5" /> Profile
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center justify-center gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">
              <Briefcase className="h-5 w-5" /> Bookings
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center justify-center gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">
              <Heart className="h-5 w-5" /> Wishlist
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center justify-center gap-2 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-md">
              <Settings2 className="h-5 w-5" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Information Tab */}
          <TabsContent value="profile">
            <Card className="shadow-lg border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-700 flex items-center gap-2"><Edit3 /> Edit Profile Information</CardTitle>
                <CardDescription>Keep your personal details up to date.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-24 w-24 border-2 border-amber-500">
                    <AvatarImage src={sampleUser.profilePictureUrl} alt={sampleUser.name} />
                    <AvatarFallback className="bg-amber-500 text-white text-3xl">
                      {sampleUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{sampleUser.name}</h2>
                    <p className="text-sm text-gray-500">{sampleUser.email}</p>
                    <Button variant="outline" size="sm" className="mt-2 text-amber-700 border-amber-500 hover:bg-amber-50">Change Picture</Button>
                  </div>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"/>
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
                            <FormLabel className="text-gray-700">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"/>
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
                            <FormLabel className="text-gray-700">Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 XXXXX XXXXX" {...field} className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Address (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your street address" {...field} className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Short Bio (Optional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell us a bit about yourself..." {...field} className="border-gray-300 focus:border-amber-500 focus:ring-amber-500" rows={3}/>
                            </FormControl>
                            <FormDescription>A brief description for your profile.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white w-full sm:w-auto">
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="shadow-lg border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-700 flex items-center gap-2"><ListOrdered /> My Bookings</CardTitle>
                <CardDescription>View your past and upcoming trip bookings.</CardDescription>
              </CardHeader>
              <CardContent>
                {sampleBookings.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Booking ID</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.destination}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full
                              ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'}`}>
                              {booking.status}
                            </span>
                          </TableCell>
                          <TableCell>{booking.cost}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild className="text-amber-700 border-amber-500 hover:bg-amber-50">
                              {/* Link to a specific booking detail page if available, e.g. /booking/{booking.id} */}
                              <Link to={`/destination-detail?bookingId=${booking.id}`}>View Details</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500 text-center py-8">You have no bookings yet. <Link to="/explore-destinations" className="text-amber-600 hover:underline">Explore destinations</Link> to start planning!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card className="shadow-lg border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-700 flex items-center gap-2"><Heart /> My Wishlist</CardTitle>
                <CardDescription>Your saved destinations and dream trips.</CardDescription>
              </CardHeader>
              <CardContent>
                {sampleWishlist.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sampleWishlist.map((item) => (
                      <Card key={item.id} className="overflow-hidden group transition-all hover:shadow-xl">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold text-amber-800 mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                          <Button variant="outline" size="sm" asChild className="w-full text-amber-700 border-amber-500 hover:bg-amber-50">
                            <Link to={`/destination-detail?destId=${item.id}`}>Explore</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                   <p className="text-gray-500 text-center py-8">Your wishlist is empty. <Link to="/explore-destinations" className="text-amber-600 hover:underline">Discover amazing places</Link> to add!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-lg border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl text-amber-700 flex items-center gap-2"><Settings2 /> Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Notification Preferences</h3>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-3 text-amber-600" />
                      <Label htmlFor="email-notifications" className="text-gray-700">Email Notifications</Label>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                     <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-amber-600" />
                        <Label htmlFor="sms-notifications" className="text-gray-700">SMS Notifications</Label>
                     </div>
                    <Switch id="sms-notifications" />
                  </div>
                </div>
                <Separator />
                 <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Security</h3>
                  <Button variant="outline" className="w-full sm:w-auto text-amber-700 border-amber-500 hover:bg-amber-50">
                    <ShieldCheck className="mr-2 h-4 w-4" /> Change Password
                  </Button>
                 </div>
                 <Separator />
                 <div>
                    <Button variant="destructive" className="w-full sm:w-auto">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfilePage;