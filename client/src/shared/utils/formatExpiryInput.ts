export function formatExpiryInput(value: string): string {
    const raw = value.replace(/[^\d]/g, "");
  
    if (raw.length === 0) return "";
  
    let mm = raw.slice(0, 2);
    const month = parseInt(mm, 10);
  
    if (isNaN(month)) {
      mm = "";
    } else if (month < 1) {
      mm = "01";
    } else if (month > 12) {
      mm = "12";
    }
  
    if (raw.length <= 2) {
      return mm;
    }
  
    const yy = raw.slice(2, 4);
    return `${mm}/${yy}`;
  }
  