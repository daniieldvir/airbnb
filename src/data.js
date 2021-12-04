var stays = [
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
      country: 'London',
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
];
