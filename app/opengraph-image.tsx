
import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Syed Monis Sarwar - Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #27272a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #27272a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b',
            padding: '40px 80px',
            border: '1px solid #3f3f46',
            borderRadius: '20px',
            boxShadow: '0 0 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
           <h1
              style={{
                fontSize: 72,
                fontWeight: 900,
                background: 'linear-gradient(to bottom right, #fff, #a1a1aa)',
                backgroundClip: 'text',
                color: 'transparent',
                margin: 0,
                padding: 0,
                textAlign: 'center',
                letterSpacing: '-0.05em',
                lineHeight: 1.1,
              }}
            >
              Syed Monis Sarwar
            </h1>
            <p
              style={{
                fontSize: 32,
                color: '#a1a1aa',
                margin: 0,
                textAlign: 'center',
                letterSpacing: '-0.02em',
                fontWeight: 500
              }}
            >
              Full Stack Back-end Developer
            </p>
          </div>
        </div>
        <div style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: 0.6
        }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <span style={{ fontSize: 20, color: '#d4d4d8' }}>Portfolio</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
