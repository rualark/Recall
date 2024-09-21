class AESCipher {
  constructor (password, iterations = 6000000) {
    this.password = password
    this.iterations = iterations
    this.saltLength = 16 // 16 bytes salt
    this.ivLength = 16 // 16 bytes IV for AES-CBC
    this.keyLength = 256 // AES-256 requires 256-bit keys
  }

  async _deriveKey (salt) {
    // Convert password to a key using PBKDF2
    const enc = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(this.password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    )

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: this.iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-CBC', length: this.keyLength },
      false,
      ['encrypt', 'decrypt']
    )
  }

  async encrypt (plaintext) {
    const salt = crypto.getRandomValues(new Uint8Array(this.saltLength)) // Generate random salt
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength)) // Generate random IV
    const key = await this._deriveKey(salt) // Derive key using salt

    const enc = new TextEncoder()
    const paddedPlaintext = this._pad(enc.encode(plaintext)) // Pad the plaintext

    const ciphertext = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      key,
      paddedPlaintext
    )

    // Combine salt, IV, and ciphertext and return as base64
    const combinedBuffer = new Uint8Array([
      ...salt,
      ...iv,
      ...new Uint8Array(ciphertext)
    ])

    return this._arrayBufferToBase64(combinedBuffer)
  }

  async decrypt (ciphertextBase64) {
    const combinedBuffer = this._base64ToArrayBuffer(ciphertextBase64)

    const salt = combinedBuffer.slice(0, this.saltLength)
    const iv = combinedBuffer.slice(this.saltLength, this.saltLength + this.ivLength)
    const encryptedData = combinedBuffer.slice(this.saltLength + this.ivLength)

    const key = await this._deriveKey(salt) // Derive the key using the same salt

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      key,
      encryptedData
    )

    const dec = new TextDecoder()
    const decryptedText = dec.decode(decryptedBuffer)
    return this._unpad(decryptedText)
  }

  // PKCS#7 padding
  static _pad (buffer) {
    const paddingLength = 16 - (buffer.length % 16)
    const padding = new Uint8Array(paddingLength).fill(paddingLength)
    const paddedBuffer = new Uint8Array(buffer.length + paddingLength)
    paddedBuffer.set(buffer)
    paddedBuffer.set(padding, buffer.length)
    return paddedBuffer
  }

  static _unpad (text) {
    const paddingLength = text.charCodeAt(text.length - 1)
    return text.slice(0, -paddingLength)
  }

  static _arrayBufferToBase64 (buffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte)
    })
    return btoa(binary)
  }

  static _base64ToArrayBuffer (base64) {
    const binaryString = atob(base64)
    const buffer = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      buffer[i] = binaryString.charCodeAt(i)
    }
    return buffer
  }
}

export async function encrypt (password, text) {
  const aesCipher = new AESCipher(password)
  const encrypted = aesCipher.encrypt(text)
  return encrypted
}

export async function decrypt (password, encryptedText) {
  const aesCipher = new AESCipher(password)
  const decrypted = aesCipher.decrypt(encryptedText)
  return decrypted
}
