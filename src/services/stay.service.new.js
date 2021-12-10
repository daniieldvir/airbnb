import { httpService } from './http.service';

export const stayService = {
    query,
    getById,
    remove,
    save,
    getEmptyStay,
    getHostStays
}

//to get the ownedStays need to send ({hostId: 'u101'})
async function query(filterBy) {
    console.log('filterBy frontend service', filterBy);
    return await httpService.get(`stay`, filterBy)
    // let stays;
    // let allStays = await httpService.get(`stay`, filterBy);
    // stays = allStays.filter((stay) => {
    //     const { totalGuests, priceRange, propertyType, amenities } = filterBy;
    //     if (propertyType) {
    //         return stay.type === propertyType;
    //     }
    //     if (amenities.length) {
    //         return amenities.every((type) => stay.amenities.includes(type));
    //     }

    //     return (
    //         stay.capacity >= totalGuests &&
    //         stay.price >= priceRange[0] &&
    //         stay.price <= priceRange[1]
    //     );
    // });

    // if (filterBy.city) {
    //     stays = stays.filter((stay) => {
    //         if (filterBy.city === 'flexible') {
    //             return (
    //                 stay.loc.city === 'Bora Bora' ||
    //                 stay.loc.city === 'Hawaii' ||
    //                 stay.loc.city === 'France'
    //             );
    //         } else {
    //             return stay.loc.city === filterBy.city;
    //         }
    //     });
    //     return stays;
    // }
    // return stays;
}
async function getHostStays(hostId) {
    console.log('hostId', hostId);
    // / if (filterBy) {
    // const user = filterBy.userId ? `?userId=${filterBy.userId}` : ''
    const host = hostId ? `?hostId=${hostId}` : ''
    query = `${host}`
    return await httpService.get(`stay${query}`)
    // return await httpService.get(`stay/${hostId}`);
    // return await httpService.get(`stay/`, hostId);
    // }
}

async function getById(stayId) {
    console.log('stayId service front', stayId);
    return await httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    return await httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
    return stay._id
        ? await httpService.put('stay/' + stay._id, stay)
        : await httpService.post('stay/', stay)
}

function getEmptyStay() {
    return {
        name: '',
        price: 0,
        summary: '',
        imgUrls: [],
        type: '',
        capacity: 0,
        amenities: [],
        avgRate: 0,
        loc: {
            country: '',
            countryCode: '',
            address: '',
            lat: 0,
            lng: 0,
        },
        reviews: [],
        likedByUsers: [],
    }
}