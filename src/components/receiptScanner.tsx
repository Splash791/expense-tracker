'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { parseReceiptText } from '@/lib/receiptParser'; 

type ReceiptScannerProps = {
  onScanComplete: (data: any) => void;
};

export function ReceiptScanner({ onScanComplete }: ReceiptScannerProps) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLoading(true);
      setImage(URL.createObjectURL(file));

      const { data: { text } } = await Tesseract.recognize(
        file,
        'eng',
        {
          logger: m => console.log(m)
        }
      );

      setText(text);

      const parsedData = parseReceiptText(text);
      console.log('Parsed Data:', parsedData); 
      onScanComplete(parsedData); 

      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-center text-sm text-gray-500 mb-2">
            Upload a picture of your receipt.
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </CardContent>
      </Card>
      {loading && <p className="text-center text-sm">Processing receipt...</p>}
      {image && !loading && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Extracted Text:</h3>
            <Textarea value={text} readOnly rows={10} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}