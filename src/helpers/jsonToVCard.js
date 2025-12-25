export const jsonToVCard = (data) => {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0']

  // Name
  if (data.lastName || data.firstName) {
    lines.push(`N:${data.lastName || ''};${data.firstName || ''};;;`)
    lines.push(
      `FN:${[data.firstName, data.lastName].filter(Boolean).join(' ')}`,
    )
  }

  // Organization & Title
  if (data.organization) lines.push(`ORG:${data.organization}`)
  if (data.title && data.title !== 'undefined')
    lines.push(`TITLE:${data.title}`)

  // Phones
  if (Array.isArray(data.phones)) {
    data.phones.forEach((phoneObj) => {
      if (phoneObj.number) {
        const type = phoneObj.type ? phoneObj.type.toUpperCase() : 'VOICE'
        lines.push('TEL;TYPE=' + type + ':' + phoneObj.number)
      }
    })
  } else {
    if (data.workPhone) lines.push('TEL;TYPE=WORK,VOICE:' + data.workPhone)
    if (data.homePhone) lines.push('TEL;TYPE=HOME,VOICE:' + data.homePhone)
  }

  // Emails
  if (Array.isArray(data.emails)) {
    data.emails.forEach((emailObj) => {
      if (emailObj.address) {
        const type = emailObj.type ? emailObj.type.toUpperCase() : 'INTERNET'
        lines.push('EMAIL;TYPE=' + type + ':' + emailObj.address)
      }
    })
  } else if (data.email) {
    lines.push('EMAIL:' + data.email)
  }

  // Websites
  if (Array.isArray(data.websites)) {
    data.websites.forEach((siteObj) => {
      if (siteObj.url && siteObj.url !== 'undefined')
        lines.push('URL:' + siteObj.url)
    })
  } else if (data.website && data.website !== 'undefined') {
    lines.push('URL:' + data.website)
  }

  // Birthday
  if (data.birthday && data.birthday !== 'undefined')
    lines.push('BDAY:' + data.birthday)

  // Addresses
  if (Array.isArray(data.addresses)) {
    data.addresses.forEach((addrObj) => {
      if (addrObj.address) {
        const adrParts = addrObj.address.split(';')
        while (adrParts.length < 7) adrParts.push('')
        const type = addrObj.type ? addrObj.type.toUpperCase() : 'HOME'
        lines.push('ADR;TYPE=' + type + ':' + adrParts.join(';'))
      }
    })
  } else if (data.homeAddress) {
    const adrParts = data.homeAddress.split(';')
    while (adrParts.length < 7) adrParts.push('')
    lines.push('ADR;TYPE=HOME:' + adrParts.join(';'))
  }

  // Photo (improved to detect base64)
  if (data.photo && data.photo !== 'undefined') {
    if (data.photo.startsWith('http')) {
      lines.push('PHOTO;VALUE=URI:' + data.photo)
    } else if (data.photo.startsWith('data:image/')) {
      // If full data URL like data:image/png;base64,AAA...
      const match = data.photo.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/)
      if (match) {
        const type = match[1].toUpperCase()
        const base64Data = match[2]
        lines.push(`PHOTO;ENCODING=b;TYPE=${type}:${base64Data}`)
      }
    } else {
      // fallback, assume JPEG base64
      lines.push('PHOTO;ENCODING=b;TYPE=JPEG:' + data.photo)
    }
  }

  lines.push('END:VCARD')
  return lines.join('\n')
}
