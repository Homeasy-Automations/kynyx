import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-[#0f0f1a] text-gray-200 min-h-screen px-6 md:px-20 py-12 font-sans">
      <section className="max-w-5xl mx-auto space-y-10 animate-fadeIn">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-400">Last updated: July 30, 2025</p>
        </header>

        {/* Content Sections */}
        <section className="space-y-12 text-base md:text-lg leading-relaxed text-gray-300">
          {/* Agreement */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Service constitute a legally binding agreement
              made between you, whether personally or on behalf of an entity
              (“you”) and Kynyx Solutions LLC (“we,” “us,” or “our”), concerning
              your access to and use of the kynyx.com website as well as any
              other media form, media channel, mobile website or mobile
              application related, linked, or otherwise connected thereto
              (collectively, the “Site”). You agree that by accessing the Site,
              you have read, understood, and agreed to be bound by all of these
              Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS,
              THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE.
            </p>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics
              (collectively, the “Content”) and the trademarks, service marks,
              and logos (“Marks”) are owned or licensed by us and protected by
              copyright, trademark, and unfair competition laws of the United
              States and international conventions.
            </p>
          </div>

          {/* User Representations */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3. User Representations
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>You have the legal capacity to comply with these terms.</li>
              <li>You are not a minor in your jurisdiction.</li>
              <li>
                You will not access the Site through automated or non-human
                means (e.g., bots or scripts).
              </li>
              <li>You will not use the Site for any unlawful purpose.</li>
              <li>Your use will not violate applicable laws or regulations.</li>
            </ul>
          </div>

          {/* Prohibited Activities */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4. Prohibited Activities
            </h2>
            <p>
              You may not use the Site for any purpose other than what we make
              available. Commercial use not expressly approved by us is
              prohibited.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5. Governing Law
            </h2>
            <p>
              These terms are governed by the laws of the State of Delaware,
              without regard to its conflict of law principles. Disputes will be
              resolved in Delaware courts.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">6. Disclaimer</h2>
            <p>
              THE SITE IS PROVIDED “AS IS” AND “AS AVAILABLE.” YOUR USE IS AT
              YOUR SOLE RISK. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
              INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              7. Limitation of Liability
            </h2>
            <p>
              IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              CONSEQUENTIAL, EXEMPLARY, OR SPECIAL DAMAGES, INCLUDING LOST
              PROFITS, EVEN IF ADVISED OF SUCH POSSIBILITY.
            </p>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              8. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold us harmless from any loss or
              damages arising from your use of the Site, violation of these
              Terms, or infringement of third-party rights.
            </p>
          </div>

          {/* Contact */}
          <div className="">
            <h2 className="text-2xl font-semibold text-white mb-3">
              9. Contact Us
            </h2>
            <p>
              To resolve complaints or request more information about these
              Terms, contact us:
            </p>
            <div className="mt-3 text-cyan-400">
              <p>Kynyx Solutions LLC 8, The Green, Suite A</p>
              <p>Dover - 19091 (Delaware) US</p>
              <p>Email: info@kynyx.com</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default TermsOfService;
