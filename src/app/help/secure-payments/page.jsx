import React from 'react'

const SecurePayments = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-center text-3xl font-bold">Secure Payments</h1>

      <section>
        <p>
          At Jot.Cards, we prioritize your security and peace of mind when it
          comes to payments. That’s why we exclusively use{' '}
          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Stripe
          </a>
          , a globally trusted and secure payment platform.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Why Stripe?</h2>
        <p>
          Stripe is a leading payment processor used by millions of businesses
          worldwide, from startups to Fortune 500 companies. Here’s why we’ve
          chosen Stripe:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Advanced Security:</strong> Stripe uses state-of-the-art
            encryption to keep your payment details safe.
          </li>
          <li>
            <strong>PCI Compliance:</strong> Stripe is PCI DSS Level 1
            compliant, the highest level of certification for payment
            processors.
          </li>
          <li>
            <strong>Global Trust:</strong> With a reputation for reliability and
            security, Stripe ensures your transactions are handled with care.
          </li>
        </ul>
        <p>
          Learn more about Stripe’s security measures by visiting their{' '}
          <a
            href="https://stripe.com/docs/security"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Security Overview
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          Payments on the Jot.Cards Platform
        </h2>
        <p>
          Our platform enables users to collect payments for goods or services
          directly through their own integrated Stripe accounts. Please note
          that:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            Payments made to users of our platform are handled directly by their
            individual Stripe accounts.
          </li>
          <li>
            Jot.Cards does not process, manage, or take responsibility for these
            transactions.
          </li>
          <li>
            Payments made to users of our platform are not covered under our
            Terms of Service.
          </li>
        </ul>
        <p>
          For questions about payments made to a specific user, we recommend
          reaching out to them directly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Your Trust Matters</h2>
        <p>
          While we don’t take payments on behalf of our users, we ensure that
          our platform and the tools we provide adhere to the highest standards
          of quality and reliability. Your trust is our priority, and we’re here
          to provide you with a secure and seamless experience.
        </p>
      </section>

      <p className="text-center">
        Thank you for choosing Jot.Cards. If you have any questions or concerns
        about secure payments, feel free to{' '}
        <a href="/contact" className="text-blue-600 underline">
          contact us
        </a>
        .
      </p>
    </div>
  )
}

export default SecurePayments
