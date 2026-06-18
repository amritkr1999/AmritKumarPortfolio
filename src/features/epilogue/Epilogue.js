import React, { useState } from "react";

export default function Epilogue() {
  // Postcard Contact Form States
  const [contactData, setContactData] = useState({ name: "", email: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Coffee Payment Module States
  const [checkoutStep, setCheckoutStep] = useState("button"); // 'button', 'form', 'loading', 'success'
  const [paymentData, setPaymentData] = useState({ card: "", expiry: "", cvc: "" });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) return;

    setContactLoading(true);
    // Simulate contact mail send
    setTimeout(() => {
      setContactLoading(false);
      setContactSubmitted(true);
      setContactData({ name: "", email: "", message: "" });
      setTimeout(() => setContactSubmitted(false), 5000);
    }, 1200);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentData.card || !paymentData.expiry || !paymentData.cvc) return;

    setCheckoutStep("loading");

    // Ping POST endpoint, fallback gracefully if not found
    fetch("/api/v1/coffee/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    })
      .catch(() => {
        // Fallback for static mock pipeline
      })
      .finally(() => {
        setTimeout(() => {
          setCheckoutStep("success");
        }, 1500);
      });
  };

  return (
    <section id="epilogue" className="epilogue-section">
      <div className="container-wrapper">
        <div className="epilogue-grid">
          {/* Postcard Contact Box */}
          <div className="postcard-card">
            <form className="postcard-form" onSubmit={handleContactSubmit}>
              <span className="postcard-input-label" style={{ fontFamily: "var(--font-mono)", color: "var(--interactive-focal)", marginBottom: "4px" }}>
                Chapter 4: The Epilogue
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "var(--space-sm)" }}>
                Send a Postcard
              </h2>

              <div className="postcard-input-group">
                <span className="postcard-input-label">My Name</span>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="postcard-input"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                />
              </div>

              <div className="postcard-input-group">
                <span className="postcard-input-label">My Email</span>
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  className="postcard-input"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                />
              </div>

              <div className="postcard-input-group">
                <span className="postcard-input-label">Narrative message</span>
                <textarea
                  required
                  placeholder="Write your story here..."
                  className="postcard-input postcard-textarea"
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                />
              </div>

              <div style={{ marginTop: "var(--space-md)" }}>
                <button type="submit" className="btn-primary-custom" disabled={contactLoading}>
                  {contactLoading ? (
                    "Sending..."
                  ) : contactSubmitted ? (
                    <>
                      Message Sent!
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Drop in Mailbox
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" x2="11" y1="2" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="postcard-vertical-divider"></div>

            <div className="postcard-details-pane">
              <div className="postcard-stamp-area">
                <div className="postcard-stamp">
                  <span className="postcard-stamp-icon">☕</span>
                  <span>INDIA</span>
                  <span style={{ fontSize: "8px", marginTop: "2px" }}>POSTAGE</span>
                </div>
              </div>

              <div className="postcard-address-lines">
                <div className="postcard-address-line">To: Amrit Kumar</div>
                <div className="postcard-address-line">Software Engineer</div>
                <div className="postcard-address-line">Github: amritkr1999</div>
                <div className="postcard-address-line">Lucknow, India</div>
              </div>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--subtle-accent-alpha)" }}>
                * Stamp is canceled. Please handle with care.
              </div>
            </div>
          </div>

          {/* Coffee Interface Component */}
          <div className="card-custom coffee-card">
            {checkoutStep === "button" && (
              <>
                <div className="coffee-icon-wrapper">
                  <span>☕</span>
                </div>
                <h3 className="coffee-title">Support the Caffeine Engine</h3>
                <p className="coffee-desc">
                  If you found my chronicles or blueprints useful, consider gifting a warm cup of coffee or chai!
                </p>
                <button className="btn-primary-custom btn-coffee" onClick={() => setCheckoutStep("form")}>
                  Gift a Cup (₹150)
                </button>
              </>
            )}

            {checkoutStep === "form" && (
              <form className="coffee-checkout-box" onSubmit={handlePaymentSubmit}>
                <h3 className="coffee-title" style={{ fontSize: "1.2rem", marginBottom: "var(--space-xs)" }}>
                  Checkout Simulator
                </h3>
                <p className="coffee-desc" style={{ fontSize: "12px", marginBottom: "var(--space-md)" }}>
                  Enter simulated transaction details to complete the payment boost.
                </p>

                <div className="postcard-input-group" style={{ marginBottom: "var(--space-sm)" }}>
                  <span className="postcard-input-label" style={{ fontSize: "10px" }}>Card Number</span>
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    className="coffee-input"
                    value={paymentData.card}
                    onChange={(e) => setPaymentData({ ...paymentData, card: e.target.value })}
                  />
                </div>

                <div className="coffee-input-row" style={{ marginBottom: "var(--space-sm)" }}>
                  <div className="postcard-input-group">
                    <span className="postcard-input-label" style={{ fontSize: "10px" }}>Expiry (MM/YY)</span>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      className="coffee-input"
                      value={paymentData.expiry}
                      onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                    />
                  </div>
                  <div className="postcard-input-group">
                    <span className="postcard-input-label" style={{ fontSize: "10px" }}>CVC</span>
                    <input
                      type="password"
                      required
                      placeholder="***"
                      maxLength="3"
                      className="coffee-input"
                      value={paymentData.cvc}
                      onChange={(e) => setPaymentData({ ...paymentData, cvc: e.target.value })}
                    />
                  </div>
                </div>

                <div className="coffee-submit-row">
                  <button type="submit" className="btn-primary-custom btn-coffee" style={{ padding: "8px 16px", fontSize: "13px" }}>
                    Authorize Charge
                  </button>
                  <button
                    type="button"
                    className="btn-secondary-custom"
                    style={{ padding: "8px 16px", fontSize: "13px" }}
                    onClick={() => setCheckoutStep("button")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === "loading" && (
              <div className="coffee-loading-pulse">
                <div className="coffee-loading-circle"></div>
                <span>PROCESSING SECURE CAFFEINE TRANSFER...</span>
              </div>
            )}

            {checkoutStep === "success" && (
              <div className="coffee-success-message">
                <div className="coffee-success-icon">
                  <span>✓</span>
                </div>
                <h3 className="coffee-title" style={{ fontSize: "1.2rem", color: "var(--success-highlight)" }}>
                  Caffeine Fuel Added!
                </h3>
                <p className="coffee-desc" style={{ fontSize: "12px", marginTop: "var(--space-xs)" }}>
                  Thank you! Your simulated transaction succeeded. Amrit's engineering motors have been charged with 100mg of energy.
                </p>
                <button
                  className="btn-secondary-custom"
                  style={{ padding: "6px 12px", fontSize: "12px", marginTop: "var(--space-sm)" }}
                  onClick={() => {
                    setCheckoutStep("button");
                    setPaymentData({ card: "", expiry: "", cvc: "" });
                  }}
                >
                  Send another cup
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
