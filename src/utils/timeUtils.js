import { formatDistanceToNow, parseISO, isAfter, isBefore } from 'date-fns';

/**
 * Format human-readable time (e.g., "Departs in 2h 15m", "Arrived 30 mins ago")
 */
export const formatHumanTime = (isoString, type = 'departure') => {
  if (!isoString) return '';
  
  try {
    const date = parseISO(isoString);
    const now = new Date();
    
    const distance = formatDistanceToNow(date, { addSuffix: true });
    
    if (isAfter(date, now)) {
      return type === 'departure' ? `Departs ${distance}` : `Arrives ${distance}`;
    } else {
      return type === 'departure' ? `Departed ${distance}` : `Arrived ${distance}`;
    }
  } catch (e) {
    return '';
  }
};

/**
 * Calculate delay in minutes
 */
export const calculateDelayMinutes = (scheduled, estimated) => {
  if (!scheduled || !estimated) return 0;
  try {
    const s = new Date(scheduled);
    const e = new Date(estimated);
    const diff = (e - s) / (1000 * 60);
    return Math.max(0, Math.round(diff));
  } catch (e) {
    return 0;
  }
};

/**
 * Extract HH:MM AM/PM from ISO string
 */
export const formatLocalTime = (isoString) => {
  if (!isoString) return '--:--';
  try {
    const timePart = isoString.split('T')[1]?.substring(0, 5);
    if (!timePart) return '--:--';
    
    const [hours, minutes] = timePart.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  } catch (e) {
    return '--:--';
  }
};
