export function toBase64(picture: string): string {
    const imageBytes = new Uint8Array(picture.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
    const base64Str = Buffer.from(imageBytes).toString('base64')
    return base64Str
}
