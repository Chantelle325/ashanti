
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Globe,
  Mail,
  Menu,
  ReceiptText,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import blueImage from "../images/blue.png";
import orangeImage from "../images/orange.png";
import pinkImage from "../images/pink.png";

const initialServices = [
  {
    id: 1,
    name: "Starter Portfolio",
    category: "Portfolio Development",
    description:
      "An affordable, professional online portfolio for students and beginners ready to showcase their talents.",
    price: 300,
    icon: BriefcaseBusiness,
    image: pinkImage,
    imageAlt: "Starter personal portfolio design",
    features: [
      "One-page portfolio website",
      "About me and contact sections",
      "Skills and education",
      "Up to 3 projects",
      "Mobile-friendly design",
      "1 revision",
      "Delivery in 3–5 working days",
    ],
  },
  {
    id: 2,
    name: "Professional Portfolio",
    category: "Portfolio Development",
    description:
      "A polished portfolio for job seekers and professionals who want to stand out and showcase their experience.",
    price: 950,
    icon: BriefcaseBusiness,
    image: orangeImage,
    imageAlt: "Professional portfolio website design",
    features: [
      "Up to 4 pages or sections",
      "About, skills, education and experience",
      "Up to 6 project showcases",
      "CV download button",
      "Contact form",
      "Responsive design and animations",
      "2 revisions",
      "Delivery in 5–7 working days",
    ],
  },
  {
    id: 3,
    name: "Professional Website Development",
    category: "Website Development",
    description:
      "A beautifully designed, responsive website tailored to your business, brand, or organisation. Build credibility, showcase your services, and help customers connect with you online.",
    price: 2500,
    icon: Globe,
    image: blueImage,
    imageAlt: "Professional responsive website development",
    features: [
      "Up to 5 pages",
      "Custom design aligned with your brand",
      "Home, About, Services and Contact pages",
      "Responsive layout for mobile, tablet and desktop",
      "Contact form and social media links",
      "Basic search engine optimisation (SEO)",
      "2 rounds of revisions",
      "Estimated delivery: 7–10 working days",
    ],
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    details: "",
  });
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("");
  const [isSending, setIsSending] = useState(false);

  const updateCustomer = (field, value) => {
    setCustomer((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openQuote = (serviceId = "") => {
    setSelectedService(String(serviceId));
    setNotice("");
    setNoticeType("");
    setActiveTab("quote");
    setMenuOpen(false);

    window.location.hash = "quote";
  };

  const submitQuote = async (event) => {
    event.preventDefault();

    if (isSending) return;

    const service = initialServices.find(
      (item) => String(item.id) === selectedService
    );

    if (!service) {
      setNoticeType("error");
      setNotice("Please select a service before submitting.");
      return;
    }

    const customerName = customer.name.trim();
    const customerEmail = customer.email.trim();
    const projectDetails = customer.details.trim();

    if (!customerName || !customerEmail) {
      setNoticeType("error");
      setNotice("Please enter your name and email address.");
      return;
    }

    setIsSending(true);
    setNotice("");
    setNoticeType("");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your .env file."
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          customer_name: customerName,
          customer_email: customerEmail,
          service_name: service.name,
          service_price: money(service.price),
          message:
            projectDetails || "No additional details provided.",
          reply_to: customerEmail,
        },
        { publicKey }
      );

      setNoticeType("success");
      setNotice(
        "Success! Your quotation request has been sent to Ashanti Digital Solutions. Thank you for your interest! We will review your requirements and get back to you."
      );

      setCustomer({
        name: "",
        email: "",
        details: "",
      });

      setSelectedService("");
    } catch (error) {
      console.error("Quotation email failed:", error);

      setNoticeType("error");
      setNotice(
        "We couldn't send your quotation request. Your details are still available in the form. Please check your connection and try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const navItems = [
    ["home", "Home"],
    ["services", "Our Services"],
    ["quote", "Get a Quote"],
  ];

  return (
    <div className="site-shell">
      <header className="navbar">
        <a
          className="brand"
          href="#home"
          onClick={() => {
            setActiveTab("home");
            setMenuOpen(false);
          }}
        >
          <span className="brand-mark">
            <Sparkles size={22} />
          </span>

          <span>
            <strong>Ashanti</strong>
            <small>DIGITAL SOLUTIONS</small>
          </span>
        </a>

        <button
          className="mobile-menu"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeTab === id ? "nav-active" : ""}
              onClick={() => {
                setActiveTab(id);
                setMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={15} />
              YOUR VISION, BEAUTIFULLY BUILT
            </span>

            <h1>
              Your story.
              <br />
              Your <span>digital presence.</span>
            </h1>

            <p>
              We create professional portfolios and beautiful,
              responsive websites that showcase your talent,
              communicate your brand, and help you stand out
              online.
            </p>

            <div className="hero-actions">
              <a
                className="button button-primary"
                href="#services"
                onClick={() => setActiveTab("services")}
              >
                Explore Our Services
                <ArrowRight size={18} />
              </a>

              <button
                type="button"
                className="button button-light"
                onClick={() => openQuote()}
              >
                Request a Quote
              </button>
            </div>

            <div className="hero-trust">
              <CheckCircle2 size={17} />
              Personalised design · Responsive websites ·
              Professional results
            </div>
          </div>

          <div
            className="hero-art"
            aria-label="Ashanti Digital Solutions creative studio"
          >
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />

            <div className="art-card art-card-main">
              <span className="art-sparkle">
                <Sparkles size={28} />
              </span>

              <span className="art-small-label">
                ASHANTI DIGITAL STUDIO
              </span>

              <strong>
                Your ideas.
                <br />
                Your impact.
              </strong>

              <span className="art-bottom">
                Crafted to stand out ✦
              </span>
            </div>

            <div className="floating-chip chip-top">
              <BriefcaseBusiness size={19} />
              Personal portfolios
            </div>

            <div className="floating-chip chip-bottom">
              <Code2 size={19} />
              Modern websites
            </div>

            <span className="decor-dot dot-one" />
            <span className="decor-dot dot-two" />
          </div>
        </section>

        <section
          className="services-section section"
          id="services"
        >
          <div className="section-heading">
            <span className="eyebrow">OUR SPECIALTIES</span>

            <h2>
              Digital solutions for your{" "}
              <span>next chapter.</span>
            </h2>

            <p>
              Whether you're building your career or growing
              your business, let's create an online presence
              that represents you.
            </p>
          </div>

          <div className="service-grid">
            {initialServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  className="service-card"
                  key={service.id}
                  style={{
                    "--card-index": index,
                  }}
                >
                  <div className="service-image-wrap">
                    <img
                      className="service-image"
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                    />

                    <span className="service-icon">
                      <Icon size={23} />
                    </span>
                  </div>

                  <div className="service-content">
                    <span className="service-number">
                      SERVICE {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3>{service.name}</h3>

                    <p>{service.description}</p>

                    <ul className="service-features">
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle2 size={16} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="service-footer">
                      <span className="service-price">
                        <small>Package price</small>
                        <strong>{money(service.price)}</strong>
                      </span>

                      <button
                        type="button"
                        className="service-arrow"
                        aria-label={`Request a quote for ${service.name}`}
                        onClick={() => openQuote(service.id)}
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="quote-section section"
          id="quote"
        >
          <div className="quote-copy">
            <span className="eyebrow">
              LET'S CREATE SOMETHING MEANINGFUL
            </span>

            <h2>
              Let's bring your{" "}
              <span>vision online.</span>
            </h2>

            <p>
              Tell us about yourself, your business, or your
              project. We'll use your requirements to prepare
              the next steps for your quotation.
            </p>

            <div className="quote-promise">
              <Mail size={20} />

              <span>
                <strong>Personalised service</strong>
                <small>
                  A solution tailored to your goals.
                </small>
              </span>
            </div>

            <div className="quote-promise">
              <ReceiptText size={20} />

              <span>
                <strong>Transparent quotations</strong>
                <small>
                  Review your project requirements and pricing
                  before proceeding.
                </small>
              </span>
            </div>
          </div>

          <form
            className="quote-form"
            onSubmit={submitQuote}
          >
            <h3>Request a quotation</h3>
            <p>Fields marked * are required.</p>

            <label>
              Full name *
              <input
                required
                autoComplete="name"
                value={customer.name}
                onChange={(event) =>
                  updateCustomer("name", event.target.value)
                }
                placeholder="Enter your full name"
              />
            </label>

            <label>
              Email address *
              <input
                required
                type="email"
                autoComplete="email"
                value={customer.email}
                onChange={(event) =>
                  updateCustomer("email", event.target.value)
                }
                placeholder="you@example.com"
              />
            </label>

            <label>
              Service required *
              <select
                required
                value={selectedService}
                onChange={(event) => {
                  setSelectedService(event.target.value);
                  setNotice("");
                  setNoticeType("");
                }}
              >
                <option value="">Choose a service</option>

                {initialServices.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.name} — {money(service.price)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Tell us about your project
              <textarea
                rows="4"
                value={customer.details}
                onChange={(event) =>
                  updateCustomer("details", event.target.value)
                }
                placeholder="Describe what you need, your preferred features, and your timeline..."
              />
            </label>

            <button
              className="button button-primary submit-button"
              type="submit"
              disabled={isSending}
            >
              {isSending ? "Sending Request..." : "Send Quote Request"}
              {!isSending && <Send size={17} />}
            </button>

            {notice && (
              <p
                className={`form-notice ${
                  noticeType === "success"
                    ? "form-notice-success"
                    : "form-notice-error"
                }`}
                role="status"
                aria-live="polite"
              >
                {notice}
              </p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <a
          className="brand footer-brand"
          href="#home"
          onClick={() => setActiveTab("home")}
        >
          <span className="brand-mark">
            <Sparkles size={20} />
          </span>

          <span>
            <strong>Ashanti</strong>
            <small>DIGITAL SOLUTIONS</small>
          </span>
        </a>

        <p>
          Thoughtfully designed. Professionally developed.
        </p>

        <span>
          © {new Date().getFullYear()} Ashanti Digital Solutions
        </span>
      </footer>
    </div>
  );
}
