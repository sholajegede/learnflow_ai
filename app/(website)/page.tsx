"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  BookOpen,
  BarChart2,
  Users,
  Check,
  Star,
} from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Learning",
    description:
      "Interactive AI companions that adapt to your learning style and pace.",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Personalized Paths",
    description: "Custom learning journeys based on your goals and progress.",
  },
  {
    icon: <BarChart2 className="w-8 h-8" />,
    title: "Track Progress",
    description: "Monitor your learning journey with detailed analytics.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Learning",
    description: "Join discussions and learn with peers on similar paths.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 9,
    period: "month",
    description: "Perfect for individual learners getting started",
    popular: false,
    features: [
      "Access to 5 AI companions",
      "Basic course materials",
      "Community support",
      "Email support",
      "Progress tracking",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    description: "For serious learners who want more",
    popular: true,
    features: [
      "Access to all AI companions",
      "All course materials",
      "Priority support",
      "Advanced analytics",
      "Offline access",
      "Monthly webinars",
    ],
    buttonText: "Subscribe",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "year",
    description: "For organizations and teams",
    popular: false,
    features: [
      "Unlimited AI companions",
      "Custom learning paths",
      "Dedicated account manager",
      "Single sign-on (SSO)",
      "Custom integrations",
      "Team analytics dashboard",
    ],
    buttonText: "Contact Sales",
  },
];

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Computer Science Student",
    content:
      "LearnFlow AI has completely transformed how I study. The AI companions explain complex topics in a way that's easy to understand.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Lifelong Learner",
    content:
      "I've tried many learning platforms, but none compare to the personalized experience LearnFlow AI provides. It's like having a personal tutor 24/7!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Bootcamp Graduate",
    content:
      "The ability to learn at my own pace with AI guidance was a game-changer. I landed my first developer job thanks to the skills I gained here.",
    rating: 4,
  },
];

export default function Home() {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="mx-auto px-4">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              Learn Smarter with AI Companions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              Transform your learning experience with personalized AI companions
              that adapt to your style and pace.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-row gap-4 justify-center"
            >
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button size="lg" className="px-8 py-6 text-lg">
                      Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link
                    href="#features"
                    onClick={() =>
                      document.getElementById("features")?.scrollIntoView()
                    }
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-6 text-lg"
                    >
                      Learn More
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth#login">
                    <Button size="lg" className="px-8 py-6 text-lg">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link
                    href="#features"
                    onClick={() =>
                      document.getElementById("features")?.scrollIntoView()
                    }
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 py-6 text-lg"
                    >
                      Learn More
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Features
            </span>
            <h2 className="text-4xl font-bold mb-4">
              Why Choose LearnFlow AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to enhance your learning experience
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 -z-10"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Learners Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied learners who transformed their
              learning experience
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-card p-8 rounded-2xl shadow-lg border"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mb-6">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div className="text-2xl font-medium mb-6 max-w-2xl">
                    &quot;{testimonials[currentTestimonial].content}&quot;
                  </div>
                  <div className="mb-2 font-medium">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="flex mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that works best for your learning journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl border ${
                  plan.popular
                    ? "border-primary/30 shadow-lg shadow-primary/10"
                    : "border-border/50"
                } overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold">{plan.price === "Custom" ? "Custom" : `$${plan.price}`}</span>
                    {plan.price !== "Custom" && plan.price !== "Free" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() =>
                      router.push(
                        plan.price === "Custom" ? "/contact" : "/auth#signup"
                      )
                    }
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to transform your learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners already using LearnFlow AI to achieve
              their goals.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-6 text-lg"
              onClick={() => router.push("/auth#signup")}
            >
              Start Learning for Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}