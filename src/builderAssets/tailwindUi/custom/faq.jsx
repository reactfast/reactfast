"use client";
// components/FAQAccordion.js
import { useState } from "react";

export default function FAQAccordion({ faqs }) {
  faqs = faqs
    ? faqs
    : [
        {
          question: "What is your return policy?",
          answer:
            "Our return policy is 30 days with no questions asked. Just return the item in its original condition.",
        },
        {
          question: "Do you offer technical support?",
          answer: "Yes, we offer 24/7 technical support for all our products.",
        },
        {
          question: "How can I contact customer service?",
          answer:
            "You can contact customer service through our support email or call us at our toll-free number.",
        },
        // Add more FAQs as needed
      ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b border-black/[.06]">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left py-2 px-4 bg-black/[.05] dark:bg-white/[.05] rounded-t-lg flex justify-between items-center focus:outline-none"
          >
            <span className="text-lg font-semibold">{faq.question}</span>
            <span className="text-lg">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <div className="py-2 px-4 bg-white/[.08]  border-t-0 rounded-b-lg">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
