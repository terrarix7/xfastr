import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is XFastr?",
    answer:
      "XFastr is a platform designed to help you analyze, optimize, and grow your Twitter presence using AI-powered insights. It offers features to engage with your niche, analyze top creators, and get AI feedback on your account.",
  },
  {
    question: "Can XFastr help me boost my Twitter engagement?",
    answer:
      "XFastr helps boost engagement by providing AI-driven insights into what content resonates with your audience, identifying the best times to post, and even helping you craft more engaging tweets and replies. By understanding your niche and optimizing your content strategy, you can see significant growth.",
  },
  {
    question: "Does XFastr help with competitor analysis?",
    answer:
      'Yes, XFastr\'s "Niche Intelligence" feature allows you to monitor competitor performance in real-time, identify trending topics in your niche, and discover content strategies that drive engagement and growth.',
  },
  {
    question: "Can XFastr help me write tweets?",
    answer:
      'XFastr offers "Human-Like AI Tweets" that generate authentic, natural-sounding content tailored to your writing style and designed to avoid AI detection.',
  },
  {
    question: "How does the Smart Reply feature work?",
    answer:
      "The Smart Reply feature uses a browser extension that reads the full conversation context and suggests meaningful contributions. This helps you craft replies that are relevant and add value to discussions.",
  },
  {
    question: "Is there a free trial available for XFastr?",
    answer:
      "While we don't offer a free trial, we have a very affordable entry point with our $2/month XFastr Basic plan. Providing this service, especially with the associated API costs, makes it challenging to offer it for free.",
  },
  {
    question: "Where can I get the XFastr browser extension?",
    answer:
      "You can download the XFastr browser extension directly from the Chrome Web Store. Here is the link to the Chrome Web Store (Please replace your-extension-id with the actual extension ID).",
  },
  {
    question: "What is the refund policy for XFastr?",
    answer:
      "XFastr does not offer refunds. Please review our plans and features carefully before making a purchase.",
  },
  {
    question: "I have a feature request or suggestion. How can I share it?",
    answer:
      "We welcome your feedback and feature requests! You can reach out to us directly via Twitter at @terrarix7 or send an email to terrarix7@gmail.com. We'd love to hear your ideas!",
  },
  {
    question: "How do I get started with XFastr?",
    answer:
      'You can get started by clicking the "Get Started" buttons available throughout the page, which likely lead to a sign-up or account creation process. There\'s also a "Log in" option for existing users.',
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="w-full max-w-4xl mx-auto px-6 py-20 z-10">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Okay fine, get your questions cleared up
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          but after that don't forget to sign up
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-100 last:border-b-0"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 px-4 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 px-4">
                <p className="text-gray-600 leading-relaxed text-base">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
