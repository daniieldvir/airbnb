export const stayService = {
    query,
    getById,
    remove,
    save,
    getEmptyStay,
}


async function query(filterBy) {
    return await httpService.get(`stay`, filterBy)
}

async function getById(stayId) {
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