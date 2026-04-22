import React from "react";

const Privacypolicy = () => {
  return (
    <div className="bg-[#0f0f1a] text-gray-200 min-h-screen px-6 md:px-20 py-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">Last updated: July 30, 2025</p>
        </header>

        {/* Intro */}
        <p className="text-base md:text-lg leading-relaxed text-gray-300">
          Welcome to Kynyx Solutions LLC ("Kynyx," "we," "us," or "our"). This Privacy Policy
          explains how we collect, use, disclose, and safeguard your information when you visit our
          website kynyx.com (the "Site"). Please read this privacy policy carefully. If you do not
          agree with the terms of this privacy policy, please do not access the site.
        </p>

        {/* Sections */}
        <div className="space-y-10 text-base md:text-lg leading-relaxed text-gray-300">

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">1. Information We Collect</h2>
            <p className="mb-2">
              We may collect information about you in a variety of ways. The information we may
              collect on the Site includes:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Personal Data You Provide to Us:</strong> Such as your name, email address,
                telephone number, and other details you submit via contact forms.
              </li>
              <li>
                <strong>Information We Collect Automatically:</strong> Includes your IP address,
                browser type, operating system, access times, and viewed pages.
              </li>
              <li>
                <strong>Cookies and Tracking Technologies:</strong> Used to enhance user experience;
                browser settings may allow disabling them but could affect functionality.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">2. How We Use Your Information</h2>
            <p>
              We use your information to provide a smooth, efficient, and customized experience.
              Specifically, we may use it to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Deliver targeted advertising, coupons, newsletters, and promotions</li>
              <li>Monitor and improve our website and services</li>
              <li>Prevent fraud and protect against criminal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">3. Disclosure of Your Information</h2>
            <p>
              We do not sell or trade your personal information. We may share it in cases such as:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                <strong>By Law or to Protect Rights:</strong> In response to legal processes or to
                protect others.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> For operations like data analysis or
                hosting.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">4. Data Security</h2>
            <p>
              We use administrative, technical, and physical safeguards to protect your data.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">5. Your State Privacy Rights</h2>
            <p>
              We comply with applicable U.S. state privacy laws. For example, California residents
              have the right under CCPA to:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Know the personal information we collect</li>
              <li>Request deletion of personal information</li>
              <li>Opt out of data sale (Note: Kynyx does not sell personal info)</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us using the info below. We will not discriminate
              against you for exercising your rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">6. Do-Not-Track Signals</h2>
            <p>
              Currently, we do not respond to Do-Not-Track (DNT) browser signals or similar
              mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">7. Children's Privacy</h2>
            <p>
              Our Site is not intended for children under 13. We do not knowingly collect personal
              data from them. If we learn we have done so, we will delete it immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">8. Changes to This Privacy Policy</h2>
            <p>
              We may update this policy from time to time. Updates will be posted on this page, so
              please review it periodically.
            </p>
          </section>

          <section className="bg-[#141625] p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-3">9. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 text-cyan-400">
              <p>Kynyx Solutions LLC</p>
              <p>8, The Green, Suite A</p>
              <p>Dover - 19091 (Delaware) US</p>
              <p>Email: info@kynyx.com</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacypolicy;
