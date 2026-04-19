import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Flight Searches
export const saveSearch = async (uid, flightData) => {
  try {
    await addDoc(collection(db, 'flight_searches'), {
      uid,
      flightNumber: flightData.flightNumber,
      airline: flightData.airline,
      departure: flightData.departure.iata,
      arrival: flightData.arrival.iata,
      searchedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving search:", error);
  }
};

export const getRecentSearches = async (uid) => {
  try {
    const q = query(
      collection(db, 'flight_searches'),
      where('uid', '==', uid),
      orderBy('searchedAt', 'desc'),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting searches:", error);
    return [];
  }
};

// Favorites
export const saveFavorite = async (uid, flightData) => {
  try {
    await addDoc(collection(db, 'favorites'), {
      uid,
      flightNumber: flightData.flightNumber,
      airline: flightData.airline,
      route: `${flightData.departure.iata} → ${flightData.arrival.iata}`,
      savedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
};

export const getFavorites = async (uid) => {
  try {
    const q = query(collection(db, 'favorites'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const removeFavorite = async (favoriteId) => {
  try {
    await deleteDoc(doc(db, 'favorites', favoriteId));
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
};
