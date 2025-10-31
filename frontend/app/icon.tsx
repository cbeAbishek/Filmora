import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Filmora';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
          borderRadius: '6px',
          fontSize: '20px',
        }}
      >
        🎬
      </div>
    ),
    {
      ...size,
    }
  );
}
