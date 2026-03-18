import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'VACE Culture – Premium Custom Streetwear'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.12em',
            marginBottom: 28,
            fontFamily: 'sans-serif',
          }}
        >
          VACE CULTURE
        </div>
        <div
          style={{
            fontSize: 38,
            color: '#ffffff',
            opacity: 0.65,
            fontFamily: 'sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          Premium 1-of-1 Custom Streetwear
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
