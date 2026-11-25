import medicinesData from './medicines.json';

// Fictional pharmacy names used deliberately — this is sample data for a
// student prototype, not real listings. Swap this file for a real dataset
// (or an API call) once you have one.

export const PHARMACIES = ["CityChemist", "MedGo", "WellCare Pharmacy", "QuickDose"];

// Builds a real, working link that searches for this medicine online.
// The pharmacy names (CityChemist, MedGo, etc.) are still fictional demo
// data, so rather than invent fake company URLs for them, "Buy" opens a
// genuine search for the medicine so the link always works and never
// misrepresents a real company's page or price.
export function buildBuyLink(pharmacyName, medicineName) {
  const query = encodeURIComponent(`${medicineName} buy online India`);
  return `https://www.google.com/search?q=${query}&tbm=shop`;
}

export const CATEGORIES = ["Tablets", "Capsules", "Syrups", "Injections"];

export const MEDICINES = medicinesData;

export function lowestPrice(med) { return Math.min(...Object.values(med.prices)); }
export function highestPrice(med) { return Math.max(...Object.values(med.prices)); }

// "Paracetamol 650mg" -> "paracetamol"
function baseSalt(salt) { return salt.replace(/\s*\d.*$/, '').trim().toLowerCase(); }

// Other brands with the same salt (generic alternatives)
export function findSubstitutes(med) {
  const base = baseSalt(med.salt);
  return MEDICINES.filter((m) => m.name !== med.name && baseSalt(m.salt) === base);
}
