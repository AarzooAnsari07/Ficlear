import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { useState } from 'react';

interface ContactUsPageProps {
  onNavigate?: (page: string) => void;
}

export function ContactUsPage({ onNavigate }: ContactUsPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          </div>
          <p className="text-gray-600">Get in touch with our team. We're here to help you!</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Office Address */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h2 className="font-bold text-gray-900">Our Office</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700">
                  FiClear Financial Services<br />
                  India
                </p>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <h2 className="font-bold text-gray-900">Email Us</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-2">
                <div>
                  <p className="text-sm text-gray-600">General Inquiries:</p>
                  <a href="mailto:support@ficlear.in" className="text-blue-600 hover:underline font-medium">
                    support@ficlear.in
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loan Applications:</p>
                  <a href="mailto:loans@ficlear.in" className="text-blue-600 hover:underline font-medium">
                    loans@ficlear.in
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Partnerships:</p>
                  <a href="mailto:partner@ficlear.in" className="text-blue-600 hover:underline font-medium">
                    partner@ficlear.in
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <h2 className="font-bold text-gray-900">Call Us</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Customer Support:</p>
                    <a href="tel:+911234567890" className="text-blue-600 hover:underline font-medium text-lg">
                      +91 123 456 7890
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp:</p>
                    <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium text-lg">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <h2 className="font-bold text-gray-900">Business Hours</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span className="text-red-600">Closed</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  * Response time may vary on holidays
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block font-medium text-gray-900 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block font-medium text-gray-900 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-medium text-gray-900 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block font-medium text-gray-900 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="loan-inquiry">Loan Inquiry</option>
                      <option value="eligibility-check">Eligibility Check</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="complaint">Complaint / Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-medium text-gray-900 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 font-semibold px-8"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-300 font-semibold px-8"
                      onClick={() => setFormData({ name: '', email: '', phone: '', subject: '', message: '' })}
                    >
                      Clear Form
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600">
                    By submitting this form, you agree to our{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate?.('privacy-policy')}
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate?.('terms-of-service')}
                      className="text-blue-600 hover:underline"
                    >
                      Terms of Service
                    </button>
                    .
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="shadow-sm border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-bold mb-1">Email Support</h3>
                  <p className="text-sm text-blue-100">24-48 hours response</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-bold mb-1">Phone Support</h3>
                  <p className="text-sm text-green-100">Instant assistance</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-bold mb-1">WhatsApp Chat</h3>
                  <p className="text-sm text-purple-100">Quick responses</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="shadow-md border-0 mt-8">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b">
            <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">How quickly will I receive a response?</h3>
                <p className="text-gray-700 text-sm">
                  We typically respond to inquiries within 24 hours during business days. Phone and WhatsApp 
                  support may provide faster responses during business hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Can I check my loan eligibility without contacting you?</h3>
                <p className="text-gray-700 text-sm">
                  Yes! Our platform allows you to check loan eligibility across multiple banks instantly. 
                  However, our experts can provide personalized guidance for complex cases.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Is there a charge for consultation?</h3>
                <p className="text-gray-700 text-sm">
                  Our basic eligibility checking service is free. Consultation with our financial experts 
                  is also complimentary for loan applications processed through our platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
