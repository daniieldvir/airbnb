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

function getEmpty() {}

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
  ];
  gStays = stays;
  utilService.saveToStorage(STAYS_KEY, gStays);
}
