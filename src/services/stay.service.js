import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const STAYS_KEY = 'stays';
let gStays;

_getStays();

console.log(gStays);

export const stayService = {
  query,
  remove,
  save,
  getEmpty,
  getById,
};

function query() {
  return storageService.query(STAYS_KEY) || gStays;
}

function getById(id) {
  return storageService.get(STAYS_KEY, id);
}

function remove(id) {
  return storageService.remove(STAYS_KEY, id);
}

function save(stay) {
  const savedStay = stay._id
    ? storageService.put(STAYS_KEY, stay)
    : storageService.post(STAYS_KEY, stay);
  return savedStay;
}

function getEmpty() { }

function _getStays() {
  const stays = [
    {
      _id: utilService.makeId(),
      name: 'Cheval Place for 3 persons',
      type: 'Entire home',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299910/london/apr1/1_px3yih.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299910/london/apr1/2_gjjsbo.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299910/london/apr1/3_q7zbc5.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299910/london/apr1/4_ukhyjx.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299910/london/apr1/5_zu0lqe.jpg',
      ],
      price: 90,
      summary:
        'Additional service charges may have to be paid locally on-site, see house rules and house manual for details. Please dont hesitate to contact us should you have any questions. Thank you. Knightsbridge Small, comfortable terraced house Cheval Place, renovated in 2012. In the centre of London, in a quiet position, in the heart of the city. Single garage. Shop, grocery, shopping centre, restaurant 150 m, bus stop Brompton Square 150 m, underground station Knightsbridge 400 m. Nearby attractions: Harrods 200m, Hyde Park 250m, South Kensington Museums 300m. Please note, Garage is suitable for small cars only.',
      capacity: 3,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Washer',
        'Dryer',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
        'Essentials',
        'Hair dryer',
      ],
      host: {
        _id: 3463463462244,
        fullname: 'Emma Wilson',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638299902/photo-1438761681033-6461ffad8d80_bhahe9.jpg',
      },
      loc: {
        country: 'London',
        countryCode: 'GB',
        address: 'Bond Street, London',
        lat: 51.515419,
        lng: -0.141099,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'September 2021',
          txt: 'Great location! Close to the action but on a quiet street, down the road from an outstanding Indian restaurant, 5 minute walk from South Kensington station and from the V&A and Natural History museums. The kitchen/sitting room is up a narrow staircase though, so keep in mind if that may pose a challenge. Overall was a great location for our London vacation and would definitely consider booking again.',
          rate: 4.73,
          by: {
            _id: '',
            fullname: 'Guest',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638300062/our_kind_of_people_lance_gross_2x_ssvg9h.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: "Expensive two-bedroom luxury APT overlooking Lincolin's  inn fields.",
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299922/london/apr2/1_fg6mux.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299922/london/apr2/2_daw7ar.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299922/london/apr2/3_l2pwib.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299922/london/apr2/4_ovzmuv.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299922/london/apr2/5_kqkrv8.jpg',
      ],
      price: 312,
      summary:
        'We’ve everything that you need for your stay in London! Our penthouse is very spacious and has a private terrace. Its located on the top floor of the building - the 4th floor, making it a perfect place for those who are sunset lovers and enjoys city views!',
      capacity: 6,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Washer',
        'Dryer',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
        'Essentials',
        'Hair dryer',
      ],
      host: {
        _id: 807807856456,
        fullname: 'Christopher Louise',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638299987/images_gj0cfe.jpg',
      },
      loc: {
        country: 'London',
        countryCode: 'GB',
        address: 'Abbey Road, London',
        lat: 51.532005,
        lng: -0.177331,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'October 2021',
          txt: 'A great host, she responded to our every need instantly. The flat was very clean. I definitely recommend :)',
          rate: 4.3,
          by: {
            _id: '',
            fullname: 'Guest',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638300062/ed76f14d3021840aba9d329ee037d23637896277_drm40f.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Whole Apartment, Huge Rooftop - Ferry Pier 2min',
      type: 'Entire rental unit',
      imgUrls: [],
      price: 118.0,
      summary:
        'Very close to the ferry terminal, with a huge rooftop (BBQ set available), our spacious home is perfect for enjoying the ultimate Cheung Chau experience. With a perfect view of the sunset, close to all shops & seafood restaurants, you couldn\'t stay in a better location. Beach is also a short walk away.',
      capacity: 3,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Washer',
        'Dryer',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
        'Essentials',
        'Hair dryer',
      ],
      host: {
        _id: '',
        fullname: 'Marlon Bordo',
        imgUrl: 'https://res.cloudinary.com/disku3v4j/image/upload/v1638300062/our_kind_of_people_lance_gross_2x_ssvg9h.jpg',
      },
      loc: {
        country: 'Hong Kong',
        countryCode: 'HK',
        address: 'Hong Kong, New Territories, Hong Kong',
        lat: 22.403165563636975,
        lng: 114.1285844603382,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'November 2021',
          txt: 'Clean and cozy apartment. Great location and great host. Highly recommended!',
          rate: 4.5,
          by: {
            _id: '',
            fullname: 'Sharon Budis',
            imgUrl: 'https://res.cloudinary.com/disku3v4j/image/upload/v1638299789/host_qszv7p.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: '2BR Garden Terrace near Mongkok',
      type: 'Entire rental unit',
      imgUrls: [],
      price: 81.0,
      summary:
        `Difficult to find in Hong Kong, my place has two large balconies connected to the living room and bedroom allowing you a Garden terrace feel during your stay.It is located 3min walk from Prince Edward MTR & only 7-10 min walk to Mongkok main centre for shopping .3min walk from my place, there are over 8-10 local and Asian cuisines for you to sample. Via MTR, you may go to places like Disney or Ocean Park.
            It is on the 1st Floor with no elevator so you need to use the stairs for one level.`,
      capacity: 8,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Washer',
        'Dryer',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
        'Essentials',
        'Hair dryer',
      ],
      host: {
        _id: '',
        fullname: 'Bonnie Bonno',
        imgUrl: 'https://res.cloudinary.com/disku3v4j/image/upload/v1638299789/host_qszv7p.jpg',
      },
      loc: {
        country: 'Hong Kong',
        countryCode: 'HK',
        address: 'Hong Kong, Kowloon, Hong Kong',
        lat: 22.32765605023636,
        lng: 114.20713143726115,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'November 2021',
          txt: 'Good place, very clean, good communication from host, everything was excellent but the neighbors can be a little noisy at awkward hours of the night',
          rate: 5,
          by: {
            _id: '',
            fullname: 'Jordan Michaels',
            imgUrl: 'https://res.cloudinary.com/disku3v4j/image/upload/v1638300062/our_kind_of_people_lance_gross_2x_ssvg9h.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Brand New Studio Apartment in North Point - D2',
      type: 'Entire condo',
      imgUrls: [],
      price: 90.0,
      summary:
        `Brand-new and luxurious Studio apartment with balcony right in the heart of North Point, a quintessential part of Hong Kong. Surrounded by renowned eateries and a wealth of culture, the property is conveniently located only 6 minutes away from the nearest MTR station and the tram terminus is just a 4-minute walk in the other direction.
            Whether you're in Hong Kong for business or pleasure, we've got you covered by taking care of your travel needs, so you can spend your time doing what matters.`,
      capacity: 2,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Washer',
        'Dryer',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
        'Essentials',
        'Hair dryer',
      ],
      host: {
        _id: '',
        fullname: 'Tee Tyrel',
        imgUrl: 'https://res.cloudinary.com/disku3v4j/image/upload/v1638300901/pexels-photo-1300402_wtxf88.jpg',
      },
      loc: {
        country: 'Hong Kong',
        countryCode: 'HK',
        address: 'North Point, Hong Kong',
        lat: 22.292752869816333,
        lng: 114.20693432968984,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'July 2020',
          txt: `Very nice experience of stay at Tee's place with my husband for a 3-week holiday back to HK. We are able to receive food and grocery delivery which is super convenient! Amazing location with easy access to bus station, MTR station, restaurants, dentist, and banks. More importantly, Tee is a very nice and responsive host ready to answer any of your questions promptly!`,
          rate: 4,
          by: {
            _id: '',
            fullname: 'Sheila Masters',
            imgUrl: 'https://res.cloudinary.com/disku3v4j/image/upload/v1638299902/photo-1438761681033-6461ffad8d80_bhahe9.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
  ];
  gStays = stays;
  utilService.saveToStorage(STAYS_KEY, gStays);
}
