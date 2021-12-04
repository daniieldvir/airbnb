import { faUtensilSpoon } from "@fortawesome/free-solid-svg-icons";

export const utilService = {
  delay,
  getRandomInt,
  makeId,
  saveToStorage,
  loadFromStorage,
  getIcon
};
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
// 'Kitchen',
//   'Wifi',
//   'TV',
//   'Washer',
//   'Dryer',
//   'Crib',
//   'Smoking allowed',
//   'Pets allowed',
//   'Cooking basics',
//   'Air conditioning',
//   'Heating',
//   'Essentials',
//   'Hair dryer',

// function getIcon(amenity) {
//   return 'utensils';
// }
function getIcon(amenity) {
  switch (amenity) {
    case 'Kitchen':
      return 'utensils'
    case 'Wifi':
      return 'wifi'
    case 'TV':
      return 'tv';
    // case 'Washer':
    // return ''
    // case 'Dryer':
    // return ''
    case 'Crib':
      return 'baby-carriage'
    case 'Smoking allowed':
      return 'smoking'
    case 'No smoking':
      return 'smoking-ban'
    case 'Pets allowed':
      return 'paw'
    case 'Cooking basics':
      return 'blender'
    case 'Air conditioning':
      // return 'fan'
      return 'snowflake'
    case 'Refrigerator':
      return 'refrigerator'
    // case 'Dishwasher':
    // return ''
    case 'Free parking':
      return 'parking'
    case 'Bathub':
      return 'hot-tub'
    // case 'Balcony':
    // return 'balcony'
    case 'Iron':
      return 'iron'
    case 'Heating':
      return 'temperature-high'
    default:
      return '';
      break;
  }
}