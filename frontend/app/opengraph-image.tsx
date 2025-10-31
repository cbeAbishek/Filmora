import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Filmora - Movie & TV Show Manager';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

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
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '64px',
            }}
          >
            🎬
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #8b5cf6, #a78bfa, #c4b5fd)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'flex',
            }}
          >
            Filmora
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              display: 'flex',
            }}
          >
            Movie & TV Show Manager
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginTop: '24px',
              color: '#cbd5e1',
              fontSize: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              ✨ AI-Powered
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔍 OMDB Integration
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎨 Beautiful UI
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#64748b',
            fontSize: '18px',
          }}
        >
          Organize, discover, and personalize your movie library
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
