import axios from 'axios'

export async function createStaticQrCode({ url, text = 'Scan Me' }) {
  try {
    const endpoint = 'https://qrfy.com/api/public/qrs/jpg'
    const token = process.env.NEXT_PUBLIC_QR_CODE_SECRET

    if (!token) {
      throw new Error(
        'Authorization token is missing. Set NEXT_PUBLIC_QR_CODE_SECRET in your environment variables.',
      )
    }

    const payload = {
      type: 'url-static',
      data: {
        url, // Use the dynamic URL parameter
      },
      style: {
        image: '',
        shape: {
          backgroundColor: '#ffffff',
          color: '#000000',
          style: 'square',
        },
        corners: {
          squareStyle: 'default',
          dotStyle: 'default',
          dotColor: '#000000',
          squareColor: '#000000',
        },
        frame: {
          id: 1,
          color: '#000000',
          text: text,
          fontSize: 30,
          backgroundColor: '#ffffff',
          textColor: '#000000',
        },
      },
    }

    const response = await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('QR Code created successfully:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Error creating QR Code:',
      error.response?.data || error.message,
    )
    throw error
  }
}
