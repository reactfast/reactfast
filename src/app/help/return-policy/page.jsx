import React from 'react'

const ReturnPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-center text-3xl font-bold">Return Policy</h1>

      <section>
        <p>
          At Jot.Cards, we stand by the quality of our products and your
          satisfaction is our priority. If something isn’t right, we’re here to
          make it right.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          Damaged or Defective Products
        </h2>
        <p>
          We are happy to replace any Jot.Cards product that has been damaged in
          transit or does not meet our quality standards. Simply contact our
          support team and provide details about the issue, including photos of
          the damaged or defective item, and we’ll work with you to resolve it
          promptly.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Reasonable Return Timeframes</h2>
        <p>
          While we want to ensure you’re satisfied with your purchase, it’s
          important to note that our products are designed as marketing
          materials, intended to be used and often subjected to wear and tear.
          Because of this, we can only accept returns within{' '}
          <strong>reasonable timeframes</strong> from the delivery date. If you
          believe your item qualifies for a return, please reach out to us as
          soon as possible.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">How to Start a Return</h2>
        <ol className="list-inside list-decimal space-y-2">
          <li>Contact our support team via email or our contact form.</li>
          <li>
            Provide your order number, delivery date, and a description of the
            issue.
          </li>
          <li>
            If applicable, include photos of the product to help us assess the
            situation.
          </li>
        </ol>
        <p>
          Once we’ve reviewed your request, we’ll guide you through the next
          steps for a replacement or return.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Exclusions</h2>
        <p>
          Please note that we do not accept returns for products that show
          significant signs of wear and tear beyond what is reasonable for the
          time since delivery. Returns for reasons other than damage or
          manufacturing defects are evaluated on a case-by-case basis.
        </p>
      </section>

      <p className="text-center">
        Thank you for choosing Jot.Cards. We value your business and are here to
        ensure you have the best experience possible.
      </p>
    </div>
  )
}

export default ReturnPolicy
