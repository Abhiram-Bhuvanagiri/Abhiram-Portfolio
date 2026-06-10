import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const htmlPath = path.join(__dirname, 'resume-build.html');
  console.log(`Loading file://${htmlPath}`);
  await page.goto(`file://${htmlPath}`, {waitUntil: 'networkidle0'});
  
  const pdfPathPublic = path.join(__dirname, 'public', 'resume', 'resume-en.pdf');
  const pdfPathDist = path.join(__dirname, 'dist', 'resume', 'resume-en.pdf');
  
  const pdfOptions = {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  };
  
  console.log(`Saving to ${pdfPathPublic}`);
  await page.pdf({ ...pdfOptions, path: pdfPathPublic });
  try {
    console.log(`Saving to ${pdfPathDist}`);
    await page.pdf({ ...pdfOptions, path: pdfPathDist });
  } catch (e) {
    console.log('dist folder might not exist, ignoring...');
  }
  
  await browser.close();
  console.log('PDF generation complete!');
})();
