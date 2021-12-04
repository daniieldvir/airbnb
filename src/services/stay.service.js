import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const STAYS_KEY = 'stays';
let gStays;

_createStays();

// console.log('gStays', gStays);

export const stayService = {
  query,
  remove,
  save,
  getEmpty,
  getById,
};

function query(filterBy) {
  let stays;
  // return storageService.query(STAYS_KEY).then((allStays) => {
  //   stays = allStays.filter((stay) => stay.capacity >= filterBy.totalGuests);
  //   if (filterBy.city) {
  //     stays = stays.filter((stay) => stay.loc.countryCode === filterBy.city);
  //     return stays;
  //   }
  //   return stays;
  // });

  return storageService.query(STAYS_KEY).then((allStays) => {
    stays = allStays.filter((stay) => {
      const { totalGuests, priceRange, propertyType, amenities } = filterBy;
      if (propertyType) {
        return stay.type === propertyType;
      }
      if (amenities.length) {
        return amenities.every((type) => stay.amenities.includes(type));
      }

      return (
        stay.capacity >= totalGuests &&
        stay.price >= priceRange[0] &&
        stay.price <= priceRange[1]
      );
    });

    if (filterBy.city) {
      stays = stays.filter((stay) => stay.loc.country === filterBy.city);
      return stays;
    }
    return stays;
  });
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

function _createStays() {
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
      avgRate: 4.5,
      summary:
        'Additional service charges may have to be paid locally on-site, see house rules and house manual for details. Please dont hesitate to contact us should you have any questions. Thank you. Knightsbridge Small, comfortable terraced house Cheval Place, renovated in 2012. In the centre of London, in a quiet position, in the heart of the city. Single garage. Shop, grocery, shopping centre, restaurant 150 m, bus stop Brompton Square 150 m, underground station Knightsbridge 400 m. Nearby attractions: Harrods 200m, Hyde Park 250m, South Kensington Museums 300m. Please note, Garage is suitable for small cars only.',
      capacity: 3,
      amenities: [
        // 'Kitchen',
        'Wifi',
        'TV',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
        'Bathub',
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
      avgRate: 4.5,
      summary:
        'We’ve everything that you need for your stay in London! Our penthouse is very spacious and has a private terrace. Its located on the top floor of the building - the 4th floor, making it a perfect place for those who are sunset lovers and enjoys city views!',
      capacity: 6,
      amenities: [
        // 'Kitchen',
        'Wifi',
        'TV',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
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
      reviews: [],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Whole Apartment, Huge Rooftop - Ferry Pier 2min',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301206/hong-kong/app1/app1_5_gtzqo4.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301205/hong-kong/app1/app1_6_fwda8m.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301204/hong-kong/app1/app1_2_iu2vhb.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301203/hong-kong/app1/app1_4_l2vktl.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301203/hong-kong/app1/app1_1_ptbog0.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301203/hong-kong/app1/app1_3_mqt1pw.jpg',
      ],
      price: 118.0,
      avgRate: 4.5,
      summary:
        "Very close to the ferry terminal, with a huge rooftop (BBQ set available), our spacious home is perfect for enjoying the ultimate Cheung Chau experience. With a perfect view of the sunset, close to all shops & seafood restaurants, you couldn't stay in a better location. Beach is also a short walk away.",
      capacity: 3,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
      ],
      host: {
        _id: 'kj900',
        fullname: 'Marlon Bordo',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638300062/our_kind_of_people_lance_gross_2x_ssvg9h.jpg',
      },
      loc: {
        country: 'Hong Kong',
        countryCode: 'HK',
        address: 'Hong Kong, New Territories, Hong Kong',
        lat: 22.203015870571996,
        lng: 114.02630528582661,
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
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638299789/host_qszv7p.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: '2BR Garden Terrace near Mongkok',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301204/hong-kong/app2/app2_1_evmekt.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301205/hong-kong/app2/app2_5_xyunh5.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301206/hong-kong/app2/app2_3_aijgmy.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301204/hong-kong/app2/app2_2_rn2ljr.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301206/hong-kong/app2/app2_4_nu56tp.jpg',
      ],
      price: 81.0,
      avgRate: 4.5,
      summary: `Difficult to find in Hong Kong, my place has two large balconies connected to the living room and bedroom allowing you a Garden terrace feel during your stay.It is located 3min walk from Prince Edward MTR & only 7-10 min walk to Mongkok main centre for shopping .3min walk from my place, there are over 8-10 local and Asian cuisines for you to sample. Via MTR, you may go to places like Disney or Ocean Park.
            It is on the 1st Floor with no elevator so you need to use the stairs for one level.`,
      capacity: 8,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
      ],
      host: {
        _id: 'f8989',
        fullname: 'Bonnie Bonno',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638299789/host_qszv7p.jpg',
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
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638300062/our_kind_of_people_lance_gross_2x_ssvg9h.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Brand New Studio Apartment in North Point - D2',
      type: 'Entire condo',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301205/hong-kong/app3/app3_1_s9r0be.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301207/hong-kong/app3/app3_2_k3smty.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301208/hong-kong/app3/app3_3_yvnlz1.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301210/hong-kong/app3/app3_4_jr4hgt.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301207/hong-kong/app3/app3_5_akkimm.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301206/hong-kong/app3/app3_6_qub3xc.jpg',
      ],
      price: 90.0,
      avgRate: 4.5,
      summary: `Brand-new and luxurious Studio apartment with balcony right in the heart of North Point, a quintessential part of Hong Kong. Surrounded by renowned eateries and a wealth of culture, the property is conveniently located only 6 minutes away from the nearest MTR station and the tram terminus is just a 4-minute walk in the other direction.
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
      ],
      host: {
        _id: 't36367',
        fullname: 'Tee Tyrel',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638300901/pexels-photo-1300402_wtxf88.jpg',
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
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638299902/photo-1438761681033-6461ffad8d80_bhahe9.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Linen White With a balcony',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299229/tel-aviv/apr1/5_rw0zve.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299229/tel-aviv/apr1/6_xo6ien.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299229/tel-aviv/apr1/1_jpdkj8.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299229/tel-aviv/apr1/3_b3jh4p.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299229/tel-aviv/apr1/4_izjujq.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299229/tel-aviv/apr1/2_y7jlvj.jpg',
      ],
      price: 29,
      avgRate: 4.5,
      summary:
        'Authentic Studio with a balcony, in an original Bauhaus building, with traditional floor. You have fully equipped kitchen, hot water boiler, stove, and a microwave. Seat out at the balcony and observe the Tel Aviv vibe. The location is in the heart of Florentine. A very nice upcoming area, with lots of coffeshops, cafees, streetart, galleries and cool shops. It is close to Rothschild Boulevard, where u can find a lot of nightlife. 10min bike ride to the beach and old Jaffa. See you soon! :-)',
      capacity: 3,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Washer',
        'Elevator',
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
        _id: 'u120',
        fullname: 'Will Smit',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638299465/tel-aviv/apr1/wouter-aghina_fc-mask_profile_1536x1152_wmamov.webp',
      },
      loc: {
        country: 'Tel Aviv',
        countryCode: 'IS',
        address: 'Tel Aviv, Israel',
        lat: 32.07887336917053,
        lng: 34.781135397603585,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'June 2014',
          txt: 'Great location! Close to the action but on a quiet street, down the road from all the bars and restaurants .',
          rate: 4.73,
          by: {
            _id: '',
            fullname: 'Maya Dagan',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638299789/host_qszv7p.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Apartment next to the beach',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299258/tel-aviv/apr2/3_uucukm.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299258/tel-aviv/apr2/6_nmvfby.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299258/tel-aviv/apr2/5_iqgmiy.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299259/tel-aviv/apr2/7_tecrii.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299258/tel-aviv/apr2/2_ctrp43.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299258/tel-aviv/apr2/4_rwiirl.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638299258/tel-aviv/apr2/1_kejiq6.jpg',
      ],
      price: 65,
      avgRate: 4.5,
      summary:
        "This modern apartment is situated in a vibrant part of Tel Aviv, just 1 minutes' walk from the beach. The famous Hakarmel Market and the buzzing nightlife of Allenby Street are within a 5-minute walk.",
      capacity: 1,
      amenities: [
        // 'Kitchen',
        'Wifi',
        'TV',
        'Elevator',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
      ],
      host: {
        _id: 'u121',
        fullname: 'Limor Ronen',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638299259/tel-aviv/apr2/host_csyws6.jpg',
      },
      loc: {
        country: 'Tel Aviv',
        countryCode: 'IS',
        address: 'Tel Aviv, Israel',
        lat: 32.077953188721075,
        lng: 34.76762477079723,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'May 2018',
          txt: 'Location right by the sea, great atmosphere and fun.Great restaurants and bars',
          rate: 4,
          by: {
            _id: '',
            fullname: 'Dodo Yaron',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638299790/wide_16x9_hgcswu.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'cozy studio at the most beautiful building',
      type: 'Entire loft hosted',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301095/tel-aviv/apr3/a84ceba0-a748-4a23-81af-afd4d3be0b2d_cla4zw.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301095/tel-aviv/apr3/4f46b7fb-d5e8-47cb-93c8-6e548038ad12_ckwaze.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301096/tel-aviv/apr3/cf53a349-09b5-4c82-9091-e6eab8b9a618_rkeayh.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301096/tel-aviv/apr3/bbbfeb50-a244-4342-83cd-05a9bd7c7437_ihfuje.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301095/tel-aviv/apr3/2144057a-56ff-4007-b7a2-5b469e0711ce_addgpv.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301095/tel-aviv/apr3/4729c8d2-899c-4691-851a-ea84f67ee7ca_cbmika.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301095/tel-aviv/apr3/8ca43c36-dc24-4b05-9c08-d0900c3c9c44_f2fhak.jpg',
      ],
      price: 83,
      avgRate: 4.5,
      summary:
        'Stunning studio apartment in a new hotel opening in the Montefiore neighborhood. The studio has been renovated to a high standard and is housed in a new building with a lobby, elevator, study rooms, and a young and pleasant atmosphere.',
      capacity: 2,
      amenities: [
        // 'Kitchen',
        'Wifi',
        'TV',
        'Elevator',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
      ],
      host: {
        _id: 'u121',
        fullname: 'Tom Dvir',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638300900/depositphotos_11412590-stock-photo-handsome-young-man_f1iwbg.jpg',
      },
      loc: {
        country: 'Tel Aviv',
        countryCode: 'IS',
        address: 'Tel Aviv, Israel',
        lat: 32.0656318607977,
        lng: 34.773478162551385,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'April 2020',
          txt: 'Tel Aviv is stunning, and the apartment was perfect. Right on Montefiore. Near lots of restaurants',
          rate: 4.98,
          by: {
            _id: '',
            fullname: 'Emily Slom',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638300900/download_xbgfnw.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'amazing urban lost at the most perfect building ',
      type: 'Entire loft hosted',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301907/tel-aviv/aprt4/65a84d1d-d73b-47ca-8a11-7a2013c579b9_sqibud.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301907/tel-aviv/aprt4/7067d4be-0892-4660-a6fb-2ae72b0212de_qqlrud.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301907/tel-aviv/aprt4/82703825-396d-42a5-a2a4-e7ae0a4b67db_gzf7lu.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301907/tel-aviv/aprt4/fcbfee99-0eb4-4163-b09d-c374ed8dec38_hizhvx.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301907/tel-aviv/aprt4/64f1b457-c7fc-4ef2-94ed-506abbba410a_tqhceb.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301907/tel-aviv/aprt4/29b1dd72-d86b-4812-b259-881e4513c60b_t3ebte.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638301907/tel-aviv/aprt4/901fcdcd-2481-40ea-9373-7e7f6e6e3974_hv0yno.jpg',
      ],
      price: 80,
      avgRate: 4.5,
      summary:
        'Enjoy a stylish experience at this centrally located place.A new and amazing business hotel in the center of Tel Aviv. The hotel has about 30 studios equipped and decorated to the highest standard. Each studio is completely private but in addition there is a laundry room, a lobby for work, a courtyard and a young and pleasant energyEnjoy a stylish experience at this centrally located place.',
      capacity: 2,
      amenities: [
        // 'Kitchen',
        'Wifi',
        'TV',
        'Elevator',
        'Crib',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Heating',
      ],
      host: {
        _id: 'u121',
        fullname: 'Tamar Choen',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638300901/istockphoto-969233490-612x612_pls00z.jpg',
      },
      loc: {
        country: 'Tel Aviv',
        countryCode: 'IS',
        address: 'Tel Aviv, Israel',
        lat: 32.06210484605474,
        lng: 34.780698842146606,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: '',
          txt: '',
          rate: '',
          by: {
            _id: '',
            fullname: '',
            imgUrl: '',
          },
        },
      ],
      likedByUsers: [],
    },
  ];
  gStays = stays;
  utilService.saveToStorage(STAYS_KEY, gStays);
}
