export interface ParsedExpense {
    vendor: string | null;
    amount: number | null;
    date: string | null;
    location: string | null;
    time: string | null;
    items: { description: string; price: number }[];
  }
  
  export function parseReceiptText(text: string): ParsedExpense {
    let vendor: string | null = null;
    let amount: number | null = null;
    let date: string | null = null;
    let location: string | null = null;
    let time: string | null = null;
    const items: { description: string; price: number }[] = [];
  
    const lines = text.split('\n');
  
    const totalRegex = /(total|amount|subtotal|due|balance)\s*[:$]?\s*([0-9]+\.[0-9]{2})/i;
    const dateRegex = /\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\w{3,9}\s+\d{1,2},\s*\d{4})\b/i;
    const timeRegex = /\b(\d{1,2}:\d{2}(?:\s*(?:AM|PM))?)\b/i;
    const locationRegex = /\b(\d{5}(?:-\d{4})?)\b/i;
    const itemRegex = /^(?:\d+\s+)?(.+?)\s+([0-9]+\.[0-9]{2})$/;
  
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length < 2) continue;
  
      if (!vendor && trimmedLine.length < 30 && (trimmedLine === trimmedLine.toUpperCase() || lines.indexOf(line) < 3)) {
        vendor = trimmedLine;
      }
  
      const totalMatch = trimmedLine.match(totalRegex);
      if (!amount && totalMatch) {
        amount = parseFloat(totalMatch[2]);
      }
  
      const dateMatch = trimmedLine.match(dateRegex);
      if (!date && dateMatch) {
        const parsedDate = new Date(dateMatch[1]);
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate.toISOString().substring(0, 10);
        }
      }
  
      const timeMatch = trimmedLine.match(timeRegex);
      if (!time && timeMatch) {
        time = timeMatch[1];
      }
  
      const locationMatch = trimmedLine.match(locationRegex);
      if (!location && locationMatch) {
        location = locationMatch[1];
      }
      
      const itemMatch = trimmedLine.match(itemRegex);
      if (itemMatch) {
        items.push({
          description: itemMatch[1].trim(),
          price: parseFloat(itemMatch[2])
        });
      }
    }
    
    if (vendor && vendor.startsWith('——-')) {
      vendor = vendor.replace('——-', '').trim();
    }
  
    return { vendor, amount, date, location, time, items };
  }