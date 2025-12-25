import React from 'react'

const ShippingInfo = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <h1 className="text-center text-3xl font-bold">Shipping Information</h1>

      <section>
        <p>
          At Jot.Cards, we are committed to delivering your orders quickly,
          securely, and efficiently. Here's what you need to know about our
          shipping process:
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Shipping Method</h2>
        <p>
          We exclusively use <strong>USPS First Class Mail</strong> for all
          orders within the United States. This method ensures reliable and
          affordable delivery, offering the perfect balance between speed and
          cost-effectiveness.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">
          What Is USPS First Class Mail?
        </h2>
        <p>
          USPS First Class Mail is a trusted and efficient service for
          lightweight packages, making it an excellent choice for shipping our
          eco-friendly materials like NFC cards and QR stickers. Here’s why we
          use it:
        </p>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <strong>Delivery Timeline:</strong> Packages typically arrive within{' '}
            <strong>2–5 business days</strong>, depending on your location.
          </li>
          <li>
            <strong>Tracking Included:</strong> All orders come with a USPS
            tracking number, so you can monitor your package every step of the
            way.
          </li>
          <li>
            <strong>Affordable and Reliable:</strong> Designed to ensure your
            items reach you without breaking the bank.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Shipping Coverage</h2>
        <p>
          Currently, we only ship orders{' '}
          <strong>within the United States</strong>. While we plan to expand
          internationally in the future, we are dedicated to providing
          exceptional service to our U.S. customers for now.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Need Help?</h2>
        <p>
          If you have any questions about your order or shipping, feel free to
          reach out to our support team. We’re here to help ensure your
          Jot.Cards experience is smooth and hassle-free.
        </p>
      </section>

      <p className="text-center">Thank you for choosing Jot.Cards!</p>
    </div>
  )
}

export default ShippingInfo
