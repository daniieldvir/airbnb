function _createStays() {
    const stays = [
        {
            _id: utilService.makeId(),
            name: 'Deluxe Double Room',
            type: 'Room in hotel',
            imgUrls: [
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638651965/hong-kong/app6/app6_1_vg2lo0.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638651966/hong-kong/app6/app6_2_daolwb.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638651965/hong-kong/app6/app6_3_rqqeai.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638651965/hong-kong/app6/app6_4_syy2ql.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638651965/hong-kong/app6/app6_5_fmq2gr.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638651965/hong-kong/app6/app6_6_algkhj.jpg`
            ],
            price: 59,
            avgRate: 4.38,
            summary:
                `Hotel Madera Hong Kong is in The Michelin Guide 2021. Hotel Madera Hong Kong is the place to truly experience the city. Conveniently located in the heart of Jordan, the hotel is close to a host of tourist attractions and offers boundless shopping, dining, and entertainment. All 87 luxurious hotel rooms have spectacular views of the city and are lavishly appointed with the finest amenities. Here, your body, mind, and soul can be rejuvenated in the caress of nature while you feel a sense of serenity.`,
            capacity: 2,
            amenities: ['Kitchen', 'Wifi', 'Air conditioning', 'TV', 'Elevator', 'Bathtub', 'Private gym in building', 'Coffee'],
            host: {
                _id: 'h134',
                fullname: 'Madera Hong Kong',
                imgUrl:
                    'https://res.cloudinary.com/disku3v4j/image/upload/v1638652478/hong-kong/app6/jackie_yhzyv2.jpg',
            },
            loc: {
                city: 'Hong Kong',
                countryCode: 'HK',
                address: 'Hong Kong, Kowloon, Hong Kong',
                lat: 22.316546403542933,
                lng: 114.2085903980824,
            },
            reviews: [
                {
                    id: utilService.makeId(),
                    createdAt: 'September 2020',
                    txt: `Overall, a great experience with a comfortable bed. However, the hygiene and the functionality of the washroom should be better for future guests.`,
                    rate: '4.9',
                    by: {
                        _id: '',
                        fullname: 'Anthony Bordein ',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638628652/bora%20bora/apr1/rev3_yh3d6t.jpg',
                    },
                },
                {
                    id: utilService.makeId(),
                    createdAt: 'July 2019',
                    txt: `A fairly good price. Overall nice stay. Came with snacks and drinks. Just some cleanliness problems on bed and tub.`,
                    rate: '4.1',
                    by: {
                        _id: '',
                        fullname: 'Cheuk Ho',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638628652/bora%20bora/apr1/rev3_yh3d6t.jpg',
                    },
                },
                {
                    id: utilService.makeId(),
                    createdAt: 'November 2020',
                    txt: `Very good location and it worths every single dollar you've spent:)`,
                    rate: '4.4',
                    by: {
                        _id: '',
                        fullname: 'Terry Wo',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638652478/hong-kong/app6/unnamed_k76hau.jpg',
                    },
                },

            ],
            likedByUsers: [],
        },

        {
            _id: utilService.makeId(),
            name: 'Nice & Clean House Nice Host, 2min to MTR, 2BR Apt',
            // type: 'Room in serviced apartment',
            type: 'Room in hotel',
            imgUrls: [
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638664386/hong-kong/app7/app7_1_rtkdj7.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638664386/hong-kong/app7/app7_2_tckfvu.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638664386/hong-kong/app7/app7_3_tietqi.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638664387/hong-kong/app7/app7_4_uyunxw.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638664387/hong-kong/app7/app7_5_i8amim.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638664386/hong-kong/app7/app7_6_nm2wge.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638664387/hong-kong/app7/app7_7_gqcmlo.jpg`
            ],
            price: 91,
            avgRate: 4.56,
            summary:
                `Our brand new 7-storey service apartment located in west Hong Kong Island, Kennedy Town, and is conveniently close to the metro station, with just a few minutes walk. Pet-friendly, well furnished bed rooms with full-size kitchens, Wi-fi access and regular housekeeping service.
                With our exclusive rooftop BBQ garden, you could enjoy food, fun and the relaxing sea and park view here.`,
            capacity: 6,
            amenities: ['Kitchen', 'Wifi', 'Air conditioning', 'TV', 'Elevator', 'Bathtub', 'Private gym in building', 'Coffee'],
            host: {
                _id: 'h135',
                fullname: 'Yannes Kongi',
                imgUrl:
                    'https://res.cloudinary.com/disku3v4j/image/upload/v1638664387/hong-kong/app7/yannes_gkhmbz.jpg',
            },
            loc: {
                city: 'Hong Kong',
                countryCode: 'HK',
                address: 'Hong Kong, Hong Kong Island, Hong Kong',
                lat: 22.271085340493844,
                lng: 114.19220193912096,
            },
            reviews: [
                {
                    id: utilService.makeId(),
                    createdAt: 'September 2020',
                    txt: `Great location by the Kennedy Town MTR station. Big rooms!! Lots of great food and stores close by. Yannes was also a great communicator and helped us when needed. At one point, there was a bit of miscommunication, however, it was quickly resolved. Highly recommended.`,
                    rate: '4.7',
                    by: {
                        _id: '',
                        fullname: 'Christina Bordein ',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638665072/hong-kong/app7/christina_u3e0fd.jpg',
                    },
                },
                {
                    id: utilService.makeId(),
                    createdAt: 'October 2018',
                    txt: `I had an awesome stay in this space. Very clean. Very Comfortable. Very Spacious especially for the price! Good location. Will definitely book again!`,
                    rate: '4.9',
                    by: {
                        _id: '',
                        fullname: 'Lien Lianovitch ',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638665072/hong-kong/app7/lien_b3yxna.jpg',
                    },
                },
                {
                    id: utilService.makeId(),
                    createdAt: 'September 2019',
                    txt: `Spacious appartement, very close to metro and tram stops, easy to get to all the neughbourhoods in HK, nice rooftop view.`,
                    rate: '4.9',
                    by: {
                        _id: '',
                        fullname: 'Huanita Gonzalles ',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638652478/hong-kong/app6/istockphoto-1156954211-170667a_ir08fv.jpg',
                    },
                },
            ],
            likedByUsers: [],
        },

        {
            _id: utilService.makeId(),
            name: '99 Bonham - Deluxe Suite',
            type: 'Room in hotel',
            imgUrls: [
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666943/hong-kong/app8/app8_1_i8tfef.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666943/hong-kong/app8/app8_2_yhf1pd.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666943/hong-kong/app8/app8_3_fdb1et.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666944/hong-kong/app8/app8_7_h2o4zc.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666943/hong-kong/app8/app8_5_vvdrze.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666943/hong-kong/app8/app8_4_gcxpeh.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666943/hong-kong/app8/app8_6_dzvydw.jpg`,
                `https://res.cloudinary.com/disku3v4j/image/upload/v1638666944/hong-kong/app8/app8_8_wwwnuk.jpg`,
            ],
            price: 174,
            avgRate: 4.0,
            summary: `Located in Hong Kong’s dynamic Sheung Wan District, 99 Bonham provides exceptional access to prestigious business, shopping, dining and entertainment destinations.
            99 Bonham is just a 3-minute walk from MTR Sheung Wan Station, while Central is a 20-minute walk away. Both Lan Kwai Fong and SoHo are 15 minutes' walk away. It takes an hour to reach Hong Kong International Airport from the property by taking Airport Express.`,
            capacity: 2,
            amenities: ['Kitchen', 'Wifi', 'Air conditioning', 'TV', 'Elevator', 'Bathtub', 'Private gym in building', 'Coffee', 'Refrigerator'],
            host: {
                _id: 'h136',
                fullname: 'Nick Carter',
                imgUrl:
                    'https://res.cloudinary.com/disku3v4j/image/upload/v1638666944/hong-kong/app8/carter2_jzi6do.jpg',
            },
            loc: {
                city: 'Hong Kong',
                countryCode: 'HK',
                address: 'Sheung Wan, Hong Kong',
                lat: 22.286951799893263,
                lng: 114.15096739880508
            },
            reviews: [
                {
                    id: utilService.makeId(),
                    createdAt: 'September 2020',
                    txt: `Good and Clean hotel, but looks smaller`,
                    rate: '4.0',
                    by: {
                        _id: '',
                        fullname: 'Christina Bordein ',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638665072/hong-kong/app7/christina_u3e0fd.jpg',
                    },
                },
                {
                    id: utilService.makeId(),
                    createdAt: 'October 2018',
                    txt: `I had an awesome stay in this space. Very clean. Very Comfortable. Very Spacious especially for the price! Good location. Will definitely book again!`,
                    rate: '4.0',
                    by: {
                        _id: '',
                        fullname: 'Lien Lianovitch ',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638665072/hong-kong/app7/lien_b3yxna.jpg',
                    },
                },
                {
                    id: utilService.makeId(),
                    createdAt: 'September 2019',
                    txt: `Good location`,
                    rate: '3.7',
                    by: {
                        _id: '',
                        fullname: 'Huanita Gonzalles ',
                        imgUrl:
                            'https://res.cloudinary.com/disku3v4j/image/upload/v1638652478/hong-kong/app6/istockphoto-1156954211-170667a_ir08fv.jpg',
                    },
                },
            ],
            likedByUsers: [],
        },
    ],
        gStays = stays;
    utilService.saveToStorage(STAYS_KEY, gStays);
}


// {
//     _id: 'h134',
//     fullname: 'Madera Hong Kong',
//     imgUrl:'https://res.cloudinary.com/disku3v4j/image/upload/v1638652478/hong-kong/app6/jackie_yhzyv2.jpg',
//     isAdmin: false,
//     isHost: true,
//     username: '',
//     password: '',
//   },

        // 
        // _id: 'h135',
        // fullname: 'Yannes Kongi',
        // imgUrl:
        //     'https://res.cloudinary.com/disku3v4j/image/upload/v1638664387/hong-kong/app7/yannes_gkhmbz.jpg',

        // _id: 'h136',
        // fullname: '99 Bonham',
        // imgUrl:
        //     '',

