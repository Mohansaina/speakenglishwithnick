import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const originalPhoto = 'C:\\Users\\svssw\\.gemini\\antigravity-ide\\brain\\47b85ffa-dead-419d-b5ae-67f61b9a1e69\\.user_uploaded\\media_1787765351843.png';
    const logoSrc = 'C:\\Users\\svssw\\.gemini\\antigravity-ide\\brain\\47b85ffa-dead-419d-b5ae-67f61b9a1e69\\real_nick_brand_logo_1787762291291.jpg';
    
    const reel1Src = 'C:\\Users\\svssw\\.gemini\\antigravity-ide\\brain\\47b85ffa-dead-419d-b5ae-67f61b9a1e69\\reel_thumb_1_1787766587973.jpg';
    const reel2Src = 'C:\\Users\\svssw\\.gemini\\antigravity-ide\\brain\\47b85ffa-dead-419d-b5ae-67f61b9a1e69\\reel_thumb_2_1787766613115.jpg';
    const reel3Src = 'C:\\Users\\svssw\\.gemini\\antigravity-ide\\brain\\47b85ffa-dead-419d-b5ae-67f61b9a1e69\\reel_thumb_3_1787766646898.jpg';
    const reel4Src = 'C:\\Users\\svssw\\.gemini\\antigravity-ide\\brain\\47b85ffa-dead-419d-b5ae-67f61b9a1e69\\reel_thumb_4_1787766680480.jpg';
    
    const bannerDest = path.join(process.cwd(), 'public', 'nick-banner.jpg');
    const heroDest = path.join(process.cwd(), 'public', 'nick-hero.jpg');
    const nickDest = path.join(process.cwd(), 'public', 'nick.jpg');
    const nickPngDest = path.join(process.cwd(), 'public', 'nick.png');
    const logoDest = path.join(process.cwd(), 'public', 'logo.jpg');
    const logoPngDest = path.join(process.cwd(), 'public', 'logo.png');
    
    const reel1Dest = path.join(process.cwd(), 'public', 'reel-1.jpg');
    const reel2Dest = path.join(process.cwd(), 'public', 'reel-2.jpg');
    const reel3Dest = path.join(process.cwd(), 'public', 'reel-3.jpg');
    const reel4Dest = path.join(process.cwd(), 'public', 'reel-4.jpg');
    
    if (fs.existsSync(originalPhoto)) {
      fs.copyFileSync(originalPhoto, bannerDest);
      fs.copyFileSync(originalPhoto, heroDest);
      fs.copyFileSync(originalPhoto, nickDest);
      fs.copyFileSync(originalPhoto, nickPngDest);
    }
    
    if (fs.existsSync(logoSrc)) {
      fs.copyFileSync(logoSrc, logoDest);
      fs.copyFileSync(logoSrc, logoPngDest);
    }
    
    if (fs.existsSync(reel1Src)) fs.copyFileSync(reel1Src, reel1Dest);
    if (fs.existsSync(reel2Src)) fs.copyFileSync(reel2Src, reel2Dest);
    if (fs.existsSync(reel3Src)) fs.copyFileSync(reel3Src, reel3Dest);
    if (fs.existsSync(reel4Src)) fs.copyFileSync(reel4Src, reel4Dest);
    
    return NextResponse.json({ success: true, message: 'All reel thumbnails and assets synced' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

