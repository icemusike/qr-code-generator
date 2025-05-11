import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { Download, Link, Settings, Palette, TextCursorInput } from 'lucide-react';

const App = () => {
  const [text, setText] = useState('https://xbesh.com');
  const [qrSize, setQrSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [level, setLevel] = useState('L'); // L, M, Q, H
  const qrRef = useRef(null);

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const pngUrl = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-light to-gray-200 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl bg-background rounded-xl shadow-card overflow-hidden md:flex">
        {/* Control Panel */}
        <div className="md:w-1/2 p-6 sm:p-8 space-y-6 bg-gray-50">
          <header className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-1">QR Code Generator</h1>
            <p className="text-neutral-dark text-sm sm:text-base">Create and customize your QR codes instantly.</p>
          </header>

          <div className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                <Link size={16} className="mr-2 text-secondary" /> URL or Text
              </label>
              <input
                type="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                <Settings size={16} className="mr-2 text-secondary" /> Size ({qrSize}px)
              </label>
              <input
                type="range"
                id="size"
                min="128"
                max="512"
                step="16"
                value={qrSize}
                onChange={(e) => setQrSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fgColor" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                  <Palette size={16} className="mr-2 text-secondary" /> Foreground Color
                </label>
                <input
                  type="color"
                  id="fgColor"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-10 p-1 border border-gray-300 rounded-lg shadow-input cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="bgColor" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                  <Palette size={16} className="mr-2 text-secondary" /> Background Color
                </label>
                <input
                  type="color"
                  id="bgColor"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 p-1 border border-gray-300 rounded-lg shadow-input cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-neutral-dark mb-1.5 flex items-center">
                 <TextCursorInput size={16} className="mr-2 text-secondary" /> Error Correction
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-input focus:ring-2 focus:ring-secondary focus:border-secondary transition-shadow bg-white"
              >
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary">
          <div className="bg-background p-4 sm:p-6 rounded-lg shadow-lg mb-6" ref={qrRef} style={{ backgroundColor: bgColor }}>
            {text ? (
              <QRCode
                value={text}
                size={qrSize}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                renderAs="canvas" // Important for download
              />
            ) : (
              <div 
                className="flex items-center justify-center text-neutral-dark text-center"
                style={{ width: qrSize, height: qrSize, backgroundColor: bgColor }}
              >
                Enter text to generate QR code
              </div>
            )}
          </div>
          <button
            onClick={handleDownload}
            disabled={!text}
            className="w-full max-w-xs flex items-center justify-center px-6 py-3 bg-accent hover:bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={20} className="mr-2" />
            Download QR Code
          </button>
        </div>
      </div>
      <footer className="mt-8 text-center">
        <p className="text-sm text-neutral-dark">
          Built by <a href="https://xbesh.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">xBesh Labs, LLC</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
