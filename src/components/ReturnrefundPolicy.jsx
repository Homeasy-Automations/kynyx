import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <div className="bg-[#0f0f1a] text-gray-200 min-h-screen px-6 md:px-20 py-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Return & Refund Policy
          </h1>
          <p className="text-sm text-gray-400">Last updated: July 30, 2025</p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-base md:text-lg leading-relaxed text-gray-300">

          {/* Introduction */}
          <p>
            At Kynyx Solutions LLC, we are committed to providing our clients
            with high-quality digital services. Our policy regarding returns and
            refunds is designed to be transparent and fair, reflecting the
            nature of the custom services we provide.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              1. Scope of Policy
            </h2>
            <p>
              This policy applies to all services provided by Kynyx Solutions
              LLC, including but not limited to website development, application
              development, digital marketing, UI/UX design, and consulting
              services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              2. General Policy on Refunds
            </h2>
            <p>
              Due to the custom nature of our work, payments for services
              rendered are generally non-refundable. When you engage Kynyx
              Solutions, you are purchasing our team's time, expertise, and the
              resources allocated to your project. These costs are incurred
              regardless of the project's outcome.
            </p>
            <p className="mt-2">
              However, we are committed to client satisfaction and will make
              every reasonable effort to ensure the services are delivered to
              your satisfaction as outlined in our project agreement.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              3. Project Cancellation
            </h2>
            <p>
              Should you choose to cancel a project after work has commenced,
              any payments made up to that point are non-refundable. This
              includes any initial deposits or milestone payments. These
              payments cover the work completed and resources allocated up to
              the date of cancellation.
            </p>
            <p className="mt-2">
              If you wish to cancel a project, a formal written request must be
              submitted to our team. We will provide a final invoice for any
              work completed that has not yet been billed.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              4. Non-performance
            </h2>
            <p>
              Our goal is to exceed your expectations. In the unlikely event
              that we are unable to deliver the services as outlined in the
              project agreement, we will work with you to find a mutually
              agreeable solution. This may include, at our discretion, a partial
              refund or credit for future services. Any such remedy will be
              determined on a case-by-case basis and will be based on the
              specific circumstances of the project.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              5. Chargebacks
            </h2>
            <p>
              If you initiate a chargeback with your credit card company for
              services that have been rendered, this will be considered a breach
              of contract. We will provide evidence of the services performed
              and may take legal action to recover the funds. We encourage you
              to contact us directly to resolve any billing disputes before
              initiating a chargeback.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">
              6. Client Responsibilities
            </h2>
            <p>
              The timely completion of a project often depends on the client's
              cooperation, including providing necessary content, feedback, and
              approvals. We are not liable for refunds or damages in cases where
              project delays or failures are due to a lack of participation from
              the client.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-[#141625] p-6 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-3">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about our Return & Refund Policy, please
              contact us before engaging our services. We believe in clear and
              honest communication from the start.
            </p>
            <div className="mt-4 text-cyan-400">
              <p>Kynyx Solutions LLC</p>
              <p>8, The Green, Suite A,</p>
              <p>Dover - 19091 (Delaware) US</p>
              <p>Email: info@kynyx.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
