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
      stays = stays.filter((stay) => stay.loc.city === filterBy.city);
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

function getEmpty() {}

function _createStays() {
  const stays = [
    {
      _id: utilService.makeId(),
      name: "Minimal Former Picture Framer's Warehouse in Central London",
      type: 'Entire loft',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638638346/london/apt7/1_ukls24.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638638345/london/apt7/2_iz8zyn.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638638346/london/apt7/3_oqn5dg.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638638346/london/apt7/4_b5ezku.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638638346/london/apt7/5_flt8tz.jpg',
      ],
      price: '421',
      avgRate: '5',
      summary:
        'Sink into the enormous quilted corner sofa at this monochrome pad in a quiet cobbled mews in Bethnal Green. Walls of glass create a sense of space and light throughout, while the collection of contemporary art and design maintains the modern feel.',
      capacity: '2',
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'No smoking',
        'Cooking basics',
        'Air conditioning',
        'Refrigerator',
        'Free parking',
        'Elevator',
        'Heating',
        'Bath',
      ],
      host: {
        _id: 'lo107',
        fullname: 'Chrissie Morales',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638638346/london/apt7/GC-GettyImages-623463222-613x920_ucthfw.jpg',
      },
      loc: {
        city: 'London',
        countryCode: 'GB',
        address: 'Oxford Street, London ',
        lat: '51.515900',
        lng: '-0.136046',
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'August 2021',
          txt: '5 star stay! Amazing host. The most beautiful place we have stayed to date. Top shelf! Highly recommended!',
          rate: '5',
          by: {
            _id: 'us666',
            fullname: 'Eric Miller',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638638346/london/apt7/photo-1499996860823-5214fcc65f8f_vqi3nh.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Spacious Soho | Patio | Office | Cobble St',
      type: 'Entire rental unit ',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638632379/london/apt3/1_giqi42.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638632306/london/apt3/2_tb0rhd.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638632406/london/apt3/3_spc3ez.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638632306/london/apt3/4_vfxidf.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638632306/london/apt3/5_bz6icg.jpg',
      ],
      price: 318,
      avgRate: 4.3,
      summary:
        'This stylish home is on the ground floor of an historic Georgian building. Unusually large for a central London home, the flat is arranged over two floors. It is fully equipped with a high-end kitchen, squishy sofas and even your own private patio.',
      capacity: 4,
      amenities: [
        'Kitchen',
        'Beach access – Beachfront',
        'Bathtub',
        'Wifi',
        'Air conditioning',
        'TV',
      ],
      host: {
        _id: '23423423rg35gvs',
        fullname: 'Team At The London Agent',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638632306/london/apt3/user_zzrpya.jpg',
      },
      loc: {
        city: 'London',
        countryCode: 'GB',
        address: 'Savile Row, London',
        lat: 51.51032,
        lng: -0.1398,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'November 2021',
          txt: 'Great spot in the heart of Soho! In the middle of it but on a relatively quiet side street. Plenty of space for a small group and a lovely private garden to enjoy in the morning.',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Emmanuelle Andrews ',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638633102/london/apt3/rev_nxu3ot.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Impressive loft in the heart of Kensington Zone 1',
      type: 'Entire loft ',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638633062/london/apt4/1_lq7i3v.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638633061/london/apt4/2_os1sot.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638633062/london/apt4/3_zej5at.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638633061/london/apt4/4_en6wvt.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638633061/london/apt4/5_bxnprv.jpg',
      ],
      price: 219,
      avgRate: 5,
      summary:
        'Impressive loft apartment with super high ceiling, located in the famous Kensington area in London, Zone 1 Walk distance from top museums, shops, restaurants and groceries.',
      capacity: 4,
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Crib',
        'No smoking',
        'Cooking basics',
        'Refrigerator',
        'Bathub',
        'Iron',
        'Heating',
        'Bath',
        'Accessible',
      ],
      host: {
        _id: 'lo104',
        fullname: 'Beatrix Lor',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638633185/london/apt4/rev_cb3daw.jpg',
      },
      loc: {
        city: 'London',
        countryCode: 'GB',
        address: 'Kensington, London',
        lat: 51.498995,
        lng: -0.199123,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'August 2021',
          txt: 'Perfect location and beautiful home.',
          rate: '4.7',
          by: {
            _id: '',
            fullname: 'Alec zye ',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638633062/london/apt4/user_twgmi9.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Room in aparthotel hosted by Supercity Aparthotels',
      type: 'Room in aparthotel ',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638634569/london/apt5/1_opada4.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638634568/london/apt5/2_mdrqn4.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638634569/london/apt5/3_hfveqc.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638634569/london/apt5/4_t6ng94.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638634568/london/apt5/5_qo3yzu.jpg',
      ],
      price: '328',
      avgRate: '4.6',
      summary:
        'The Rosebery aparthotel is a beautifully restored Victorian red brick building with 58 luxurious suites, with Farringdon and Chancery Lane tube stations only a five minute walk away.',
      capacity: '2',
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'No smoking',
        'Cooking basics',
        'Air conditioning',
        'Refrigerator',
        'Elevator',
        'Iron',
        'Heating',
        'Bath',
      ],
      host: {
        _id: 'lo105',
        fullname: 'Supercity Aparthotels',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638634569/london/apt5/sddf_jfuxei.jpg',
      },
      loc: {
        city: 'London',
        countryCode: 'GB',
        address: 'Carnaby Street, London',
        lat: '51.513109',
        lng: '-0.138775',
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: ' 2021',
          txt: 'Better than, expected, nice cute space however light in the bedroom was not working and management could not fix it but offered me a lamp.',
          rate: '',
          by: {
            _id: 'us101',
            fullname: 'George W',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638634568/london/apt5/sd_qor3su.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: '22nd Fl interior designed flat overlooking London',
      type: 'Entire condo',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638635301/london/apt6/1_aylhnm.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638635300/london/apt6/2_npr96h.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638635300/london/apt6/3_ajvkrg.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638635300/london/apt6/4_h1l4da.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638635300/london/apt6/5_mblmbl.jpg',
      ],
      price: '297',
      avgRate: '4.8',
      summary:
        '22nd floor Interior designed, stunning views of the City and Tower of London. Most of the London landmarks can be seen from the flat with no obstruction.',
      capacity: '4',
      amenities: [
        'Kitchen',
        'Wifi',
        'TV',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
        'Air conditioning',
        'Refrigerator',
        'Bathub',
        'Elevator',
        'Iron',
        'Heating',
      ],
      host: {
        _id: 'lo106',
        fullname: 'Marcus Adams',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638635579/london/apt6/portrait-confident-man-looking-camera-260nw-1591189321_tzqlm3.jpg',
      },
      loc: {
        city: 'London',
        countryCode: 'GB',
        address: 'Regent Street, London',
        lat: '51.509906',
        lng: '-0.136521',
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'March 2021',
          txt: 'An an excellent apartment in a great area of the city, the host is super helpful and very kind. Only minor observation is the couch is not ideal, if you want to watch TV in the evening. I will say the electrics were excellent! PS, the view is fantastic!!!',
          rate: '4.8',
          by: {
            _id: 'us105',
            fullname: 'Katia Crysann',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638635302/london/apt6/sdf_ulxf6r.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
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
        city: 'London',
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
        city: 'London',
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
        city: 'Hong Kong',
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
        city: 'Hong Kong',
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
        city: 'Hong Kong',
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
        city: 'Tel Aviv',
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
        city: 'Tel Aviv',
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
      type: 'Entire loft',
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
        city: 'Tel Aviv',
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
      type: 'Entire loft',
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
        city: 'Tel Aviv',
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
    {
      _id: utilService.makeId(),
      name: 'Lovely apartment overlooking the Pantheon square',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624035/roma/ap1/c6735a58-1529-43bb-9bba-541cb4de839d_ub7yhv.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624035/roma/ap1/c7f56c5f-eb1b-4e18-8764-5912bf4b3505_rsliv5.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624035/roma/ap1/617a9c60-89f6-4e63-864a-57216aa2cd31_r72wic.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624035/roma/ap1/061581b3-f19e-4536-820e-9d62e7d5a41f_cuxkho.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624035/roma/ap1/0233c4a4-79d7-41f4-b4b4-05164027b257_kzqjre.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624035/roma/ap1/2d78dde9-64bc-41c1-a4d4-3dfa93f5970c_e9m1tr.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624035/roma/ap1/5d665dfe-00fc-42c5-9691-34feb574985e_inrfzh.jpg',
      ],
      price: 62,
      avgRate: 4.8,
      summary:
        'Lovely apartment overlooking the Pantheon Square, located in the very heart of Rome, featuring 1 bedroom with a double bed, smart tv and conditioned air; a second room with a sofà bed for 1 adult or 2 children (width 140 cm.) and kitchen; bathroom with shower. The mattress and the pillows are very confortable. The apartment has WI-FI, washing mashine, clotheshorse, iron, ironing board, hair dryer, fridge with a little freezer, microwave oven.',
      capacity: 3,
      amenities: [
        // 'Kitchen',
        'Kitchen',
        'Wifi',
        'TV',
        'Washer',
        'Air conditioning',
        'Luggage dropoff allowed',
        'Hair dryer',
        'Refrigerator',
      ],
      host: {
        _id: 'u128',
        fullname: 'Max Rotbona',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638624126/roma/ap1/130592146-handsome-young-man-in-pink-shirt-over-isolated-blue-background-keeping-the-arms-crossed-in-frontal-p_vv4rht.webp',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.911922913384416,
        lng: 12.45137685856766,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'October 2021',
          txt: 'Location could not be better. Epic views. Lots of food options. Very central location. I was able to walk everywhere I needed to go. Good late night food options right outside in the square. Waking up and looking outside to the square and the pantheon was amazing every morning. The ceilings are low and the shower is small. So it might not suit someone over 6ft but was not a problem for me at 5’9”. Max was very helpful and attentive. Everything was taken care of. Would definitely recommend and would definitely stay again.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Matt Blond',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638624208/roma/ap1/you-make-me-a-happy-man-royalty-free-image-883982364-1561128209_trt0d5.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'September 2021',
          txt: 'This is such an AMAZING location with a view of the Pantheon right out the window. Perfect way to spend a couple days in Rome, right in the heart of it all and walking distance to almost everything. The apartment is very cute and authentic. Host was so amazing and helped carry our heavy bags up so many flights of stairs (no elevator!) and gave so many great recommendations. Also right near a taxi station too. And despite the central location, very quiet at night as well with a comfy bed and A/C! You do need to bring all your own shower items like soap. The bathroom had a slight weird smell but I believe it’s just an old building so it was fine for a couple days. It’s also pretty dark in the apartment so if you want to do your makeup/see yourself in the mirror I recommend bringing a travel mirror. It was our first time in Rome and the best place to kick off our trip.',
          rate: '4.76',
          by: {
            _id: '',
            fullname: 'Madeline Dola',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638624208/roma/ap1/happy_woman_outdoors_clouds-1200x628-facebook.20180427215822123-1200x628_sm6bwi.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'September 2019',
          txt: 'The location of this apartment cannot be beat! Great service and a very cute space.          ',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Elisabeth Primo',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638624208/roma/ap1/Mental-Strong-Women-min_jact7u.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Quiet and peaceful home in the heart of Rome',
      type: 'Entire condo',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/da186929-5e70-423e-adcc-f5c6b77e6c57_xycyja.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/fab28e49-af44-4e0d-94a8-ba8a2977f2f0_kmse3i.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/790b28e8-2981-4ad0-8405-ead0b3b80a5d_pbc8vy.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/58df32e3-27a6-4b96-bab6-ee6720cca076_j8d07z.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/77f5b22c-799d-4f9b-9bc8-43ce020c98ab_ilblse.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/a40119cb-fe18-4412-ad55-39a6944cd7c3_jcvfoy.jpg',
      ],
      price: 52,
      avgRate: 4,
      summary:
        'Appartamento ampio, elegante e silenzioso nel pieno centro di Roma recentemente ristrutturato in palazzo del 1880. Posizione strategica per vivere Roma con facilità e ritirarsi per ricaricarsi.',
      capacity: 4,
      amenities: ['Kitchen', 'Wifi', ' Free street parking', 'TV', 'Elevator'],
      host: {
        _id: 'u129',
        fullname: 'Antonio Banderas',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/istockphoto-544358212-612x612_ece1mt.jpg',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.897737534566176,
        lng: 12.492426635719653,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'October 2021',
          txt: 'It’s a nice and safe to stay close to the train and restaurant',
          rate: '4',
          by: {
            _id: '',
            fullname: 'Nico Kristen',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/american-crew-homepage-square-skincare-2020_dghdil.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'September 2021',
          txt: 'Antonio was a very nice and attentive host! In the accommodation you felt at home and could relax perfectly after a long day of sizing.we would come here again :)',
          rate: '4.76',
          by: {
            _id: '',
            fullname: 'Laura Dola',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638624528/roma/apr2/73872442_li3nnx.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'June 2016',
          txt: 'Antonio is a great host! He stayed so late in the evening waiting for us since our flight was delayed. Very enjoyed his beautiful furnitured and great located appartement! We recommend this definetely :)',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Sarah Elizabet',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638624529/roma/apr2/istockphoto-1218228957-612x612_qr3xcj.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Cameretta per 2 persone con bagno privato esterno',
      type: 'Private room in rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638625307/roma/apr3/c9521c9d-a5a0-4484-9aca-64e5f9b67e21_xwzoys.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638625308/roma/apr3/ec27e059-b716-46a4-a736-77fea0813812_a69lfk.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638625307/roma/apr3/3d4bba4a-2af6-49d5-a227-d7881142e75f_rpuhua.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638625307/roma/apr3/cfa341b3-bf23-4ea1-ae22-7de60e5275fb_w6ia2s.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638625307/roma/apr3/3349c69a-18e2-4030-9ea4-71eb4ec70d95_f9nx0c.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638625307/roma/apr3/6a6d6678-bbb8-469a-8b61-0db84c28f8d9_lyyrxv.jpg',
      ],
      price: 31,
      avgRate: 4.66,
      summary:
        'Camera doppia accogliente e silenziosa, con divano letto (1 o 2 piazze), bagno privato esterno, tavolino con due sedie (adatto per lavorare con un laptop) aria condizionata, tv, Wi-Fi, asciugacapelli. Tra un soggiorno e il successivo tutti gli ambienti vengono arieggiati, puliti e igienizzati secondo le linee guida dei CDC',
      capacity: 2,
      amenities: [
        'Kitchen',
        'Wifi',
        ' Free street parking',
        'TV',
        'Elevator',
        'Air conditioning',
        'Long term stays allowed',
      ],
      host: {
        _id: 'u130',
        fullname: 'Lucky nono',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638625308/roma/apr3/1199118_xrxysk.jpg',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.92117600703659,
        lng: 12.421235257024922,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'August 2021',
          txt: 'Great location would definitely recommend staying here. Clean and affordable.',
          rate: '4.2',
          by: {
            _id: '',
            fullname: 'Sandra Wladimirov',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638625308/roma/apr3/portrait-of-beautiful-italian-woman-leaning-against-brick-wall-milan-italy-CUF20852_xhlsgy.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'March 2015',
          txt: 'We really enjoyed our time at luckys Home. The staff(Phillipe) was really polite and showed us a few options for our stay in Rome which helped us a lot to plan our time in Rome better.Our room was very clean and well decorated.We could cook in the kitchen easily and had our own private bathroom.I would definitely book the room again and highly recommend the apartment/room.',
          rate: '4.1',
          by: {
            _id: '',
            fullname: 'Sebastian Max',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638625308/roma/apr3/photo-1615851947829-3641ababa187_uvp0up.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'June 2016',
          txt: 'Philippe is great, he gave me a map with a nice plan of what to visit in Rome which was very helpful',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Adelina Osama',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638625308/roma/apr3/istockphoto-1139999076-612x612_jpcpmt.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Historic center Campo ',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638626130/roma/aprt4/67baa842-4385-4c85-b5fb-8f941dfa67cd_ob34rq.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638626130/roma/aprt4/c1c5c08c-1433-4c38-a111-0c6f461c98de_lldv8h.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638626129/roma/aprt4/91283c45-a878-4f23-980c-91574e85c49f_nysqsb.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638626129/roma/aprt4/06027a95-2d04-4228-b833-d462d9389536_y7qx6s.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638626129/roma/aprt4/40c9df9a-c68b-4869-9b17-93126e4aebf9_budoxj.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638626129/roma/aprt4/0438a18d-e3bc-4caf-858e-d44c3f4ba104_noxrdz.jpg',
      ],
      price: 63,
      avgRate: 4.76,
      summary:
        'Excellent location in the heart of Rome’s historic center, situated between jewish ghetto and Campo dei fiori. It’s located in a historic building of 1700 with vaulted ceilings, ground floor, completely renovated and furnished, sleeping area with a 2 meter mezzanine, living room sofa, independent heating, washing machine, air conditioning, wi-fi.',
      capacity: 2,
      amenities: [
        'Kitchen',
        'Wifi',
        'Microwave',
        'Microwave',
        'Air conditioning',
      ],
      host: {
        _id: 'u130',
        fullname: 'Maria Rita',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638626130/roma/aprt4/hot-italian-women_jrc7lt.jpg',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.97095418477043,
        lng: 12.473398525285116,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'November 2019',
          txt: 'There is not a better location to stay than Maria’s flat. It’s in a great neighborhood and you can walk to all the major sites easily. It is also super close to great gelato and our favorite pizza place, Emma’s.',
          rate: '4.2',
          by: {
            _id: '',
            fullname: 'Jesika Manuela ',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638626657/roma/aprt4/743925b2b9353e38e3b66d33fe281599_hizaiz.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'March 2017',
          txt: 'Great location and Maria Rita is a very accommodating host. Loved my stay here!          ',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Matthew Peri',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638626130/roma/aprt4/Italian-man-smiling_blffre.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'June 2016',
          txt: 'Excellent location and flat. Close to everything and exactly how advertise. Thank you Maria for a fabulous Roma retreat ❤️',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Robin Lex',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638626130/roma/aprt4/textandimage-1ad2f2ce87-3_ouicee.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Charme Navona luxury terrace ',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627022/roma/aprt5/e7fec6ef-3dd1-4871-89c2-fafb1fd9f7ee_kchmnu.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627021/roma/aprt5/29651bb7-6572-476d-8a31-01f61288584a_txmi39.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627021/roma/aprt5/948b91be-6eb6-41b5-a7c4-53c2f8b63f8b_gtzly1.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627021/roma/aprt5/639e9065-fe16-494d-903f-7a7b69051523_ogniph.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627021/roma/aprt5/91a57e6f-5151-4edb-8d6c-3ff70ce59a41_p3wofj.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627021/roma/aprt5/91a57e6f-5151-4edb-8d6c-3ff70ce59a41_p3wofj.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627021/roma/aprt5/7defb013-7718-4688-b809-f93853a10a0b_shoktj.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627021/roma/aprt5/6a97c95b-57cc-47d3-82bb-bba830253cbd_g9npwd.jpg',
      ],
      price: 301,
      avgRate: 4.76,
      summary:
        'Sperimenta il lusso pregiato e la bellezza di un alloggio délite nel centro di Roma, con Piazza Navona a pochi passi e una vista impagabile dallampia terrazza. Goditi tutto lo charme degli arredamenti di pregio a tua esclusiva disposizione. Appartamento situato su 3 diversi piani (terzo, quarto e quinto piano). I diversi piani dellappartamento sono collegati da una scala a chiocciola interna ripida.Nuovo Internet FIBRA WIFI veloce (con ripetitori su tutti i livelli della casa e in terrazza).',
      capacity: 6,
      amenities: [
        'Kitchen',
        'Wifi',
        'Microwave',
        'Microwave',
        'Air conditioning',
      ],
      host: {
        _id: 'u131',
        fullname: 'Maria Teresa',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638627117/roma/aprt5/hoset_xe3fea.jpg',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.90232055422534,
        lng: 12.489985091485417,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'February 2019',
          txt: 'We enjoyed our stay very much. It is well located, comfortable and very clean. The neighborhood is great and you easy access to markets, taxis and sites. Carlo was warm and super helpful. We felt welcomed indeed! Definitely will stay here again!',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Christine Tosi ',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638627117/roma/aprt5/rev1_w2wg5h.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'November 2020',
          txt: 'This was a very fun place to stay. Although the name mentions Navona, it is actually closest to Campo de Fiori. Lots of restaurants near by. Walking distance to many major attractions. There are many local shops for groceries, bread wine and cheese.The home is laid out on three levels with spiral stairs from the street to the door and from the door to each level. Bedrooms are on the entry level. Living room in the middle. Dining, kitchen and terrace on the uppermost level. The terrace was a highlight for both morning coffee and evening wine.The apartment is nicely and comfortably furnished and has hundreds of books. The home is very quiet          ',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Peter Olive',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638627117/roma/aprt5/rev2_luvhf8.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'June 2016',
          txt: 'Awesome hosts!',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Vignesh Omar',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638627117/roma/aprt5/rev3_qnk3c5.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Fontana di Trevi, stunning frontal view',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627730/roma/apr6/46b623bf-bdbf-4174-9a8f-10df822742e0_lds8ln.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627731/roma/apr6/e655917f-d8d9-443f-833c-12530497b907_thph2p.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627730/roma/apr6/8d4140b9-e6da-4b88-a4fb-b967d4a4c6c0_myi2w1.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627730/roma/apr6/b3b6b9ea-1141-4c49-b7b8-5ac6be5a604b_t1xqge.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627730/roma/apr6/85ab786e-d90c-4719-b984-88ddb2df5fab_vujccw.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627730/roma/apr6/5940c0b3-a6b6-48d6-b1c9-be6dc4242eb2_znq6h7.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638627730/roma/apr6/42273f76-e8b6-4ca7-90e6-5da25c7ab1e6_dbfrew.jpg',
      ],
      price: 313,
      avgRate: 4.76,
      summary:
        'Sperimenta il lusso pregiato e la bellezza di un alloggio délite nel centro di Roma, con Piazza Navona a pochi passi e una vista impagabile dallampia terrazza. Goditi tutto lo charme degli arredamenti di pregio a tua esclusiva disposizione. Appartamento situato su 3 diversi piani (terzo, quarto e quinto piano). I diversi piani dellappartamento sono collegati da una scala a chiocciola interna ripida.Nuovo Internet FIBRA WIFI veloce (con ripetitori su tutti i livelli della casa e in terrazza).',
      capacity: 4,
      amenities: ['Kitchen', 'Wifi', 'Microwave', 'Air conditioning', 'TV'],
      host: {
        _id: 'u132',
        fullname: 'Raffaella Maria',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638627731/roma/apr6/OB-KW652_valore_G_20101115224543_nrjfre.jpg',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.903853714608864,
        lng: 12.46869908017434,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'February 2021',
          txt: 'Raffaella and her husband were absolutely great. Our flight was delayed and we had scheduled transportation, Rafaela was accommodating and had her husband wait for us to help us into the apartment and get us familiarized with the place. The apartment is beautiful, located in front of the trevi (literally in front) there’s a bunch of shops and restaurants nearby. It was a beautiful stay, we loved it. Definitely coming back to stay here.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Adriana Stev ',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638627731/roma/apr6/rev1_mkcmat.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'November 2020',
          txt: 'This apartment is just as amazing as the pictures suggest. It is compact, but complete. It is newly redone and comfortable for the two of us. Okay for up to four. But what cannot be beat is the amazing location and view. True five star. Plan your arrival and listen to Raffaella. A taxi is the easiest as they can get within 100ft of the apartment. You really are on the square with a full view of the fountain… which means you cannot drive up to the door. Super easy to get to the rest of Rome’s sights from here.          ',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Timothy Dawn',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638627732/roma/apr6/rev3_qos9xr.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'June 2016',
          txt: 'Raffaella was a great host - Super easy to communicate with & she even helped book us transport to the airport. Comfortable & clean apartment, and the views of the Trevi Fountain can’t be beat.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Emily Donald',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638627732/roma/apr6/rev4_vn6ale.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'April 2018',
          txt: 'Raffaella is a great host who was always there to answer our questions and give us recommendations. The location is perfect, everything within walking distance.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Anthony Jer',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638627732/roma/apr6/rev2_hmfp8q.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Tereva Lodge Bora Bora',
      type: 'Entire bungalow',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638630174/bora%20bora/aprt2/4cd506bc-1a7a-4327-980e-6ae629fd0128_bqgbno.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638630175/bora%20bora/aprt2/7636bae9-2afc-4933-9f5f-30ad670a4c38_fcnjgi.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638630176/bora%20bora/aprt2/bfaaa538-effc-4ee5-bff2-42299ea96a0e_fgztq4.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638630175/bora%20bora/aprt2/260736d7-029c-4fe9-997c-b868f4e64167_vaaa3l.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638630175/bora%20bora/aprt2/36e9b51b-55c9-41dc-a35b-00c4264f2ae4_ud2wkg.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638630175/bora%20bora/aprt2/933d2585-e270-4ae6-9fab-224ca7babff5_jpqwpl.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638630174/bora%20bora/aprt2/0b844b76-6c62-47d4-b997-950fe72edef2_wwi1dd.jpg',
      ],
      price: 81,
      avgRate: 4.76,
      summary:
        'Situé en bord de mer avec sa plage et ponton privés, Tereva Lodge est unique avec sa vue imprenable sur les eaux turquoises et ilots de Borabora de votre deck privatif sur pilotis au dessus du lagon, avec les spots de snorkling a vos pieds! Nous assurons les transferts au check in et out(avec arret supermarché) nous communiquer les horaires darrivée/départ.Velos ,kayaks,paddle sont a disposition gratuitement pour apprécier votre séjour,possibilité de louer nos véhicules.A bientot!',
      capacity: 2,
      amenities: [
        'Kitchen',
        'Beach access – Beachfront',
        'Bathtub',
        'Wifi',
        'Air conditioning',
        'TV',
      ],
      host: {
        _id: 'u133',
        fullname: 'Serge Lionel',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638630376/bora%20bora/aprt2/host_dumocd.jpg',
      },
      loc: {
        city: 'Bora Bora',
        countryCode: 'BV',
        address: 'Bora Bora, Island in French Polynesia',
        lat: -16.49734364645842,
        lng: -151.74208293097504,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'October 2021',
          txt: 'Great location and experience. Loved the deck over the water, kitchen, grill and washer. The host will pick you up from the airport and take you to the grocery store from the water taxi. They also have a moped and car for rent as well as a private boat tour excursion option as well. I highly recommend staying here.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Kristine Boly ',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638630176/bora%20bora/aprt2/BB-Cover4_yr0w5v.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'November 2020',
          txt: 'We highly recommend the Tereva Lodge. They went out of their way to make us feel like family and gave us a warm welcome. We also highly recommend taking the lagoon tour with David. He was fantastic. We look forward to coming back.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Chris Ryan',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638630176/bora%20bora/aprt2/31536000.jpeg_fviont.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'September 2020',
          txt: 'Serge & his family were incredible - seriously kind, helpful and welcoming.They went out of their way to help in every way - going above and beyond!The closest shop for provisions is a little way away so they very kindly drove Andrew so he could do a shop for the week.The location on the waterfront is stunning & makes it popping out into the lagoon to kayak anywhere in the bay really easy.The apartment was sparkling clean and exactly as shown & described.Thank you so much for all your help & for making Andrews stay so seamless.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Rachel Bobe',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638630175/bora%20bora/aprt2/a-girl-in-a-hammock-in-bora-bora_uqkcvx.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Bora Bora bungalow N421 DTO-MT',
      type: 'Entire bungalow',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638628651/bora%20bora/apr1/f0cf9de1-8660-49b1-8fba-78e62cdd55fc_swifyt.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638628651/bora%20bora/apr1/38a0abd9-6873-4012-9c32-d00e64616b88_squsjw.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638628651/bora%20bora/apr1/6a1cb2fe-bb3e-42e9-9e59-c7478517c6e7_rcdggq.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638628651/bora%20bora/apr1/bd315da5-820c-4c8f-9739-e58b2622778f_zz5zt1.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638628651/bora%20bora/apr1/0d5f564e-3fa1-447b-aa72-982294e6e051_fxczra.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638628651/bora%20bora/apr1/cc2c7041-dade-4934-b011-62a143cb474c_r859gj.jpg',
      ],
      price: 183,
      avgRate: 4.76,
      summary:
        'Bungalow avec vue sur lagon et accès direct à la mer. Idéal pour couple souhaitant visiter notre belle île tout en se sentant comme chez eux.',
      capacity: 2,
      amenities: ['Kitchen', 'Wifi', 'Air conditioning', 'TV'],
      host: {
        _id: 'u134',
        fullname: 'Hitiura & Lionel Lolo',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638628652/bora%20bora/apr1/host_gjojez.jpg',
      },
      loc: {
        city: 'Bora Bora',
        countryCode: 'BV',
        address: 'Bora Bora, Island in French Polynesia',
        lat: -16.49734364645842,
        lng: -151.74208293097504,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'September 2021',
          txt: 'The bungalow is beautiful right over the water but we have a few suggestions for future stays they only provide one roll of bathroom tissue and 2 coffee filters, with no fresh towels for a 6 day stay it is NOT comforting especially when you are visiting from another country. The electric car charger located in FRONT of the bungalow we were told that we can’t use it because it belongs to the neighbor across the other side of the road. Avis explain to us that all Airbnb have electric car chargers. The shower has extremely cold water or extremely hot water. The bathtub water was comfortable temperature. We were traveling from out of the country and instructions explained that the door will be open and key inside we did not have phone service there and instructions changed the day we arrive PLEASE GIVE PEOPLE INSTRUCTIONS IN ADVANCE Your location is beautiful but if this is a dream vacation for many people traveling outside the country please make their stay comfortable',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Delilah Loni ',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638628652/bora%20bora/apr1/rev3_yh3d6t.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'November 2020',
          txt: 'The bungalow is cute, coat and a great location. You can snorkel right outside. This is a great value for your money. All the locals are very helpful and kind. It was very clean and ready when we got there. We definitely would recommend it for couples who would like to spend a romantic weekend in bora bora and have a good time. The view for the sunrise and sunset is great. And sitting on the deck under the stars was amazing.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Byron Ryan',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638628651/bora%20bora/apr1/rev1_ayqti5.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'September 2020',
          txt: 'Bora Bora Bungalow was perfect. The setting and location could not be better. The hosts were helpful setting up our lagoon tour and answered questions quickly. Highly recommend this place.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Marlene lily',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638628652/bora%20bora/apr1/rev2_vtmugu.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: '1 bed room apartment, in the heart of Sheung Wan',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638639852/hong-kong/apr4/22898840-fbe0-4bd5-904e-5c45dad8053c_tnosb3.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638639852/hong-kong/apr4/812be7ff-05ce-418a-915d-20725a74910c_ia9bto.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638639852/hong-kong/apr4/ff0e2272-70b9-42b5-9a06-86a4b6969be2_fugi3a.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638639852/hong-kong/apr4/9405451a-635b-48c4-8bb6-cef9e166f376_kbcm9c.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638639852/hong-kong/apr4/67a5efbb-d8f5-4978-a989-e1e5ce0dfd2e_iogy29.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638639852/hong-kong/apr4/19838de7-3e34-4742-a221-aa15dbbf65bf_sul4cv.jpg',
      ],
      price: 44,
      avgRate: 4.76,
      summary:
        'One bedroom apartment available at the heart of Sheung Wan. Very close proximity from MTR and other transportations. Walking distance to any convenience store and local attractions. Fully equipped. Bright, filled with sunlight. The building is small, with 5 floors, 1 apartment per floor only. It is a walk-up to the 3rd floor.',
      capacity: 2,
      amenities: [
        'Kitchen',
        'Wifi',
        'Air conditioning',
        'TV',
        'Long term stays allowed',
      ],
      host: {
        _id: 'u135',
        fullname: 'Clément Toto',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638639853/hong-kong/apr4/v1_tsmbwt.jpg',
      },
      loc: {
        city: 'Hong Kong',
        countryCode: 'HK',
        address: 'Hong Kong, Kowloon, Hong Kong',
        lat: 22.319613821878374,
        lng: 114.16606194181783,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: '',
          txt: '',
          rate: '',
          by: {
            _id: '',
            fullname: ' ',
            imgUrl: '',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'MTR AUSTIN ICC &ELEMENTS classy modern studio',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638640902/hong-kong/apt5/c80ad5df-dfd0-40f8-8cc9-8ff36a1abed5_sabnrz.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638640902/hong-kong/apt5/b3fa3edb-1239-4660-8837-d6b708df09b5_wnbpfw.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638640902/hong-kong/apt5/28ffa3d7-6754-4d2f-8132-8a302b9a5bf1_m4awdu.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638640902/hong-kong/apt5/8a78fee1-56d9-4025-9ebc-a64cee18d632_rz4tib.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638640902/hong-kong/apt5/ee680cb7-65bb-4f35-b082-678c26138aea_x8a2nn.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638640902/hong-kong/apt5/b664dec9-3196-4d54-8c9c-12c7c9263d22_vg1u9h.jpg',
      ],
      price: 40,
      avgRate: 4.76,
      summary:
        'The building is 24/7 secured by the guards. However, you can still enjoy the 24HOURS SELF CHECK IN service! Our studio is perfect for solo travellers, couples or business travellers as the location is the best in town.',
      capacity: 2,
      amenities: [
        'Kitchen',
        'Wifi',
        'Air conditioning',
        'Elevator',
        'Hair dryer',
        'TV',
        'Long term stays allowed',
      ],
      host: {
        _id: 'u136',
        fullname: 'Yuen Tirosho',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638640903/hong-kong/apt5/host_j1o2gu.jpg',
      },
      loc: {
        city: 'Hong Kong',
        countryCode: 'HK',
        address: 'Hong Kong, Kowloon, Hong Kong',
        lat: 22.32465589234941,
        lng: 114.17076566101818,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'July 2021',
          txt: 'Great stylish place! Exactly as shown in picture. Great location but not in the middle of all the craziness which is nice. Probably one of the best value for money places I have stayed in for an Airbnb',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Curtis Meng',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638640903/hong-kong/apt5/v2_pl84vp.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'January 2020',
          txt: 'Clean and tidy, great location, walking distance to Element and MTR',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Carmen Elextra',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638640903/hong-kong/apt5/v3_wxcgmf.jpg',
          },
        },
      ],
      likedByUsers: [],
    },

    {
      _id: utilService.makeId(),
      name: 'Centro - Vaticano - San Pietro  ',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/d1f081ff-f198-4ef2-bba6-d2749b5fdabc_d27rti.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/799bd34c-0ebd-4962-ad29-caabfdcf106f_vlyfia.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/627cc613-5226-4d6c-8569-82bfef8f5f41_tifmrz.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/5ef1a8d6-eba5-4236-ac6d-856f5d229d59_jk5nj1.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/9a23ca19-9a7b-494c-99bd-0f9f3d581149_musurr.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/9aca11f7-74ca-4984-a258-84636984ba07_qky3zv.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/5f19017d-d266-495a-99d8-53efe20cfa8e_x7k89a.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/1c4cbdde-3676-4120-81f3-eee349717b36_di7lcv.jpg',
      ],
      price: 254,
      avgRate: 4.76,
      summary:
        'A pochi passi dalla Basilica di San Pietro e Musei Vaticani, spettacolare attico arredato di circa 95 mq, adatto per 6 persone. Troverete pulizia, cortesia e attenzione verso il cliente.',
      capacity: 6,
      amenities: [
        'Kitchen',
        'Wifi',
        'Pets allowed',
        'Hot tub',
        'Elevator',
        'TV',
        'Air conditioning',
      ],
      host: {
        _id: 'u136',
        fullname: 'Stefano Bolony',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638648869/roma/apr7/host_f7vfxo.jpg',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.903853714608864,
        lng: 12.46869908017434,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'September 2019',
          txt: 'Amazing air bnb. The pictures don’t do it Justice. Great location, top floor, the views are incredible, the hot tub is great. So clean and spacious it was by far one of my favorite air bnbs I’ve stayed in. So many cute food spots nearby and shopping. 10/10 recommend.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Andrea Bolsmi',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638648870/roma/apr7/v_k6m9rj.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'January 1018',
          txt: 'Justin’s place is gorgeous. We had a great stay and would definitely stay there again.',
          rate: '4.3',
          by: {
            _id: '',
            fullname: 'Renee Chen',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638648870/roma/apr7/v3_gvki5b.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'April 2010',
          txt: 'Great host very attentive and Timely',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Radion Non',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638648870/roma/apr7/v2_zb5zmo.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
    {
      _id: utilService.makeId(),
      name: 'Little Venice Garden Flat',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638647763/london/apr8/de06d7eb-4ccc-4be2-8490-e6a07fbfd543_srfr2a.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638647763/london/apr8/e92d86b3-d5f0-4466-b502-1351704a5c7e_iteg69.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638647763/london/apr8/f506682d-d30d-4f84-961d-646197b23ab4_khaaec.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638647762/london/apr8/74da8b35-2427-4b17-b01e-ece4582681f7_jq4l8x.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638647762/london/apr8/848e5c3d-0aec-4aac-a0e5-60121244cbde_l3buqh.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638647762/london/apr8/02c83734-ea90-4406-94b1-a388d17fc6a9_muyxgp.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638647762/london/apr8/9a0a7bfb-5a4d-4f40-816a-65b54fb79afb_hh1oap.jpg',
      ],
      price: 355,
      avgRate: 4.76,
      summary:
        'A cool, beautifully designed, spacious , contemporary garden flat. Three double bedrooms, two bathrooms. Stylish with very modern upto date fittings including air conditioning, under floor heating, Home Cinema and multi room audio. Little Venice in Central London is a hidden gem famed for its canals and attractive, stucco-fronted houses. Nearby Maida Vale offers wide tree-lined streets and handsome redbrick mansion blocks. Located a pleasant an 11 minute walk to Hyde Park',
      capacity: 8,
      amenities: [
        'Kitchen',
        'Wifi',
        'Pets allowed',
        'Washer',
        'Hair dryer',
        'TV',
        'Air conditioning',
      ],
      host: {
        _id: 'u136',
        fullname: 'Justin Timnerlek',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638647763/london/apr8/photo-1506794778202-cad84cf45f1d_ahygok.jpg',
      },
      loc: {
        city: 'London',
        countryCode: 'GB',
        address: 'Oxford Street, London ',
        lat: 51.515427871471154,
        lng: -0.14194294201317234,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'July 2021',
          txt: 'Fabulous mid century lush home! Walked the canal each day and easy access from Paddington Station to Central London for all the sites. There was 5 of us and plenty of private space',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Teri Bradsho',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638647763/london/apr8/v1_ck4vmo.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'January 2020',
          txt: 'Justin’s place is gorgeous. We had a great stay and would definitely stay there again.',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Jon Carmel',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638647763/london/apr8/v_jwbmjc.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'April 2020',
          txt: 'Justin home is really amazing and Justin is a first class host. We will be back! Thank you for your responsiveness to our requests. Fantastic apartment in a great location.',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Philip Longo',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638647763/london/apr8/v3_bhkcdz.jpg',
          },
        },
      ],
      likedByUsers: [],
    },

    {
      _id: utilService.makeId(),
      name: 'Penthouse Rome Capitol',
      type: 'Entire rental unit',
      imgUrls: [
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650077/roma/8/e3b41f2a-09b5-4c6a-877b-bb97dbd07851_ykgilh.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650077/roma/8/f7598ab0-9c14-44c5-9b86-4235321ec3c4_i4owmm.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650076/roma/8/36453ea9-3725-485a-b4f0-81dc92f743b2_ktjain.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650076/roma/8/9683c086-e7ea-47e6-afeb-528af6fc94b1_obxklu.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650076/roma/8/84e7b53c-003e-48d0-8b94-eeba5363b272_curd9j.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650076/roma/8/141aa177-6e6d-425b-ae76-74ba14c61b67_nundi5.jpg',
        'https://res.cloudinary.com/disku3v4j/image/upload/v1638650076/roma/8/6f6d6be3-faf1-49bf-936b-481120355b46_tcm678.jpg',
      ],
      price: 344,
      avgRate: 4.76,
      summary:
        'Unique apartment in the heart of ancient Rome, with a spacious terrace overlooking the "Chiesa del Gesù"; here you can experience your moments of relax with the incomparable feeling of having the Eternal City at your feet. In an elegant and comfortable environment thought out in every detail, you can enjoy your stay looking at Rome from an unparalleled perspective. You will stay a few steps from Piazza Venezia, Piazza Navona and the major attractions of Rome.',
      capacity: 6,
      amenities: [
        'Kitchen',
        'Wifi',
        'Pets allowed',
        'Hot tub',
        'Elevator',
        'TV',
        'Air conditioning',
        'Elevator',
      ],
      host: {
        _id: 'u137',
        fullname: 'Rachel Grin',
        imgUrl:
          'https://res.cloudinary.com/disku3v4j/image/upload/v1638650077/roma/8/host_egsuai.jpg',
      },
      loc: {
        city: 'Rome',
        countryCode: 'IT',
        address: 'Rome, Italy',
        lat: 41.903853714608864,
        lng: 12.46869908017434,
      },
      reviews: [
        {
          id: utilService.makeId(),
          createdAt: 'September 2019',
          txt: 'Such a beautiful place, especially the patio! It’s in a great location, not far from some awesome landmarks. The area is pretty busy with several places to eat or visit, so you can walk or scooter around. The agency was great to work with as well. They helped set up transport from the airport which was helpful.',
          rate: '4.9',
          by: {
            _id: '',
            fullname: 'Dalia Nul',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638650077/roma/8/v_ufndod.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'January 1018',
          txt: 'it was an amazing company to work with. The check-in process was smooth, and our contact person helped organized transportation to and from the Airbnb. The patio really took the experience to the next level. Highly recommended.',
          rate: '4.3',
          by: {
            _id: '',
            fullname: 'KyQuan Shot',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638650076/roma/8/afbb3846a69217b88aa2781297971f43_ds91vs.jpg',
          },
        },
        {
          id: utilService.makeId(),
          createdAt: 'April 2006',
          txt: 'This view is unparalleled! Honestly, you almost won’t want to go around Rome because of this terrace. It’s worth every penny. They were very communicative upon arrival, and really made our stay seamless and wonderful. We had an issue with the shower, but they sent help immediately and worked diligently to fix any problems. You can’t beat that kind service, and certainly can’t beat that view!',
          rate: '4.5',
          by: {
            _id: '',
            fullname: 'Radion Non',
            imgUrl:
              'https://res.cloudinary.com/disku3v4j/image/upload/v1638648870/roma/apr7/v2_zb5zmo.jpg',
          },
        },
      ],
      likedByUsers: [],
    },
  ];
  gStays = stays;
  utilService.saveToStorage(STAYS_KEY, gStays);
}
