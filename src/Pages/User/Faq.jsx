import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ REQUIRED
import { FaTruck, FaLock, FaUndo, FaHeart } from "react-icons/fa";

const Faq = () => {
  const [activeTopic, setActiveTopic] = useState("delivery");
  const [isAnimating, setIsAnimating] = useState(false);

  const changeTopic = (topic) => {
    if (topic === activeTopic) return;

    setIsAnimating(true);

    setTimeout(() => {
      setActiveTopic(topic);
      setIsAnimating(false);
    }, 300);
  };

  const faqData = {
    delivery: {
      title: "Delivery & Shipping",
      description:
        "Everything you need to know about how your package arrives. All orders are shipped discreetly.",
      faqs: [
        {
          q: "What does the package look like?",
          a: "Your order is shipped in plain, unbranded packaging. There is no mention of product type or store name."
        },
        {
          q: "How long does shipping take?",
          a: "Delivery usually takes 3–7 business days depending on your location."
        },
        {
          q: "Will my package be left at my door?",
          a: "Yes, unless a signature is required by your local courier."
        },
        {
          q: "Can I track my order?",
          a: "Yes, tracking details are emailed once your order ships."
        },
        {
          q: "What is the minimum age to shop here?",
          a: "You have have to be 18 and older to shop at Toys."
        },
        {
          q: "How can I stay up to date with new launches and sales?",
          a: "Do you want to keep up with the latest products and be informed of discounts and sales? Just go to the Toys homepage and scroll to the bottom of the page to see the button that says 'Sign up to our newsletters'. Simply type your email ID and you can even avail 10% off your first order by signing up."
        },
        {
          q: "How can I be updated on the latest products?",
          a: "You can get updates on latest products by signing up for our newsletter or following us on our social media."
        },
        {
          q: "What warranty do you provide for your products?",
          a: "All our electronic/battery operated products have standard manufacturers warranty of about a year from date of purchase. However, this can vary from product to product, and details will be mentioned inside the box of the toy. If you need any assistance, we are happy to help!"
        },
        {
          q: "Will I face any side effects while using your products?",
          a: "While none of our products cause any sort of side effects after use, it is still recommended to read the instruction manual prior to using any of our products. It is also important to keep the sex toys clean and store it in a dry place. Please also check the ingredients list on our products to understand if have an allergy to any of the ingredients."
        },
        {
          q: "How do I search for a particular product?",
          a: "Toys has a simple search engine that has been customized to provide better search results. If you are familiar with or specific about a product, enter it into the search bar and the results will be displayed. Also, if you are only vaguely familiar with a product, simply enter the category and you will be outlined with a list of products which are 100% genuine from well-known Indian and International Brands from which you can easily find your preferred product."
        },
        {
          q: "How do I reset my password in case I fail to log in to my account?",
          a: `If you failed to log in to your account, don't worry. Toys has a simple account recovery process that will allow you to re-login quickly.

1. Select the option “Forgot Password”.
2. Enter your registered email address or phone number.
3. An OTP will be sent to your selected method.
4. Enter the OTP and create a new password.

Once completed, you will be redirected to the login page.`
        }
      ]
    },

    privacy: {
      title: "Privacy & Billing",
      description:
        "Your privacy matters. We ensure complete discretion in billing and data handling.",
      faqs: [
        {
          q: "How do I track my order?",
          a: "You can check the status of your order by signing in and navigating to My Account > Order History."
        },
        {
          q: "Will my order details be visible on the package?",
          a: "No product or store details are mentioned on the package."
        },
        {
          q: "Is GST included in your orders?",
          a: "Yes, GST is included in the product price."
        },
        {
          q: "How does the charge appear on my bank statement?",
          a: "Charges appear under a neutral business name."
        },
        {
          q: "Is my payment information secure?",
          a: "Yes, all payments are encrypted and secure."
        },
        {
          q: "Do you store my card details?",
          a: "No, we never store your card or payment details."
        }
      ]
    },

    returns: {
      title: "Returns & Refunds",
      description:
        "Learn about returns, refunds, and damaged product handling.",
      faqs: [
        {
          q: "Can I return a product?",
          a: "Due to hygiene reasons, intimate products cannot be returned once opened."
        },
        {
          q: "What if I receive a damaged item?",
          a: "Contact support within 48 hours."
        },
        {
          q: "How long do refunds take?",
          a: "Refunds are processed within 5–7 business days."
        }
      ]
    },

    care: {
      title: "Product Care",
      description:
        "How to clean, store, and maintain your products safely.",
      faqs: [
        {
          q: "How should I clean my product?",
          a: "Clean before and after use with warm water and a toy-safe cleanser."
        },
        {
          q: "Which lubricant should I use?",
          a: "Water-based lubricants are recommended."
        },
        {
          q: "How do I store it safely?",
          a: "Store in a clean, dry place."
        }
      ]
    }
  };


  const topic = faqData[activeTopic];

  return (
    <div className="faq py-5">
      <div className="container">
        <div className="row">
          <div className="col text-center mb-4">
            <h1>Frequently Asked Question</h1>
          </div>
        </div>

        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-lg-3 mb-4">
            <h6 className="faq__title">HELP TOPICS</h6>

            <ul className="list-group faq__topics">
              <li className={`list-group-item ${activeTopic === "delivery" ? "active" : ""}`} onClick={() => changeTopic("delivery")}>
                <FaTruck /> Delivery & Shipping
              </li>
              <li className={`list-group-item ${activeTopic === "privacy" ? "active" : ""}`} onClick={() => changeTopic("privacy")}>
                <FaLock /> Privacy & Billing
              </li>
              <li className={`list-group-item ${activeTopic === "returns" ? "active" : ""}`} onClick={() => changeTopic("returns")}>
                <FaUndo /> Returns & Refunds
              </li>
              <li className={`list-group-item ${activeTopic === "care" ? "active" : ""}`} onClick={() => changeTopic("care")}>
                <FaHeart /> Product Care
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-9">
            <div className={`faq__content ${isAnimating ? "fade-out" : "fade-in"}`}>
              <p className="faq__breadcrumb">
                Help Center › <span>{topic.title}</span>
              </p>

              <h2 className="faq__heading">{topic.title}</h2>
              <p className="faq__desc">{topic.description}</p>

              {/* 🔑 key FIX forces fresh accordion */}
              <div className="accordion faq__accordion" id="faqAccordion" key={activeTopic}>
                {topic.faqs.map((item, index) => (
                  <div className="accordion-item faq__item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed faq__button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-${activeTopic}-${index}`}
                      >
                        {item.q}
                      </button>
                    </h2>

                    {/* ❗ FIXED ID (NO #) */}
                    <div
                      id={`faq-${activeTopic}-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body faq__body">
                        {item.a}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
