import sharp from 'sharp';

async function run() {
  const input = '/Users/elyon/.gemini/antigravity/brain/54a0b921-4c79-4932-af53-b3e567fee8d7/media__1783622673037.png';
  const outLogo = './public/logo.png';

  const metadata = await sharp(input).metadata();
  
  // Crop 60 pixels from all sides to remove watermark and keep centered
  const width = metadata.width - 120;
  const height = metadata.height - 120;

  await sharp(input)
    .extract({ left: 60, top: 60, width, height })
    .toFile(outLogo);

  console.log('Logo cropped and saved to public/logo.png!');
}

run();
