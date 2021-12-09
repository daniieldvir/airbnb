import { stayService } from '../services/stay.service.new.js';

export const stayStore = {
    strict: true,
    state: {
        stays: [],
        filterBy: {
            hostId: '',
            city: '',
            guests: '',
            dates: {
                checkInDate: '',
                checkOutDate: '',
            },
            guests: { adults: 0, children: 0, infants: 0, pets: 0 },
            totalGuests: 0,
            priceRange: [15, 850],
            amenities: [],
            propertyType: '',
        },
        currStay: null,
        emptyOrder: {
            hostId: '',
            createdAt: Date.now(),
            buyer: {
                _id: '',
                fullname: '',
            },
            totalPrice: 0,
            dates: {
                checkInDate: '',
                checkOutDate: '',
            },
            totalNights: 0,
            totalGuests: 0,
            stay: {
                _id: '',
                name: '',
                price: 0,
            },
            status: 'pending',
        },
        isLoading: false,
    },
    getters: {
        filterBy(state) {
            // console.log('store filter', state.filterBy);
            return state.filterBy;
        },
        staysToShow(state) {
            // console.log(state.stays);
            return state.stays;
        },
        avgPrice(state) {
            return state.stays.reduce((acc, stay) => {
                (acc + stay.price) / state.stays.length;
            });
        },
        emptyOrder(state) {
            return state.emptyOrder;
        },

        imgsToShow(state) {
            return state.currStay.imgUrls.slice(0, 5);
        },
    },
    mutations: {
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
            // console.log('filter state', state.filterBy);
        },
        setStays(state, { stays }) {
            state.stays = stays;
            // console.log('stays', stays);
        },
        setStay(state, { stay }) {
            state.currStay = stay;
        },
        clearAllFilters(state) {
            state.filterBy = {
                city: '',
                guests: '',
                dates: {
                    checkInDate: '',
                    checkOutDate: '',
                },
                guests: { adults: 0, children: 0, infants: 0, pets: 0 },
                totalGuests: 0,
                priceRange: [15, 850],
                amenities: [],
                propertyType: '',
            };
        },
    },
    actions: {
        async loadStays({ commit, state }) {
            console.log('store: state.filterBy', state.filterBy)
            commit({ type: 'setLoading', isLoading: true });
            try {
                // const stays = await stayService.query();
                const stays = await stayService.query(state.filterBy);
                commit({ type: 'setStays', stays });
                // console.log('stay', stays);
            } catch (err) {
                console.log('stayStore: Error in loadStays', err);
                throw err;
            } finally {
                commit({ type: 'setLoading', isLoading: false });
            }
        },
        setFilter({ commit, dispatch }, { filterBy }) {
            // console.log('store set filter', filterBy);
            commit({ type: 'setFilter', filterBy });
            dispatch({ type: 'loadStays' });
        },
        // loadStays({ commit, state }) {
        //   var filterBy = state.filterBy ? state.filterBy : ''
        //   commit({ type: 'setLoading', isLoading: true })
        //   stayService
        //     .query(filterBy)
        //     .then((stays) => {
        //       commit({ type: 'setStays', stays })
        //     })
        //     .finally(() => {
        //       commit({ type: 'setLoading', isLoading: false })
        //     })
        // },
        async getStayById({ commit }, { stayId }) {
            try {
                const stay = await stayService.getById(stayId);
                console.log('stay store: stay by id ', stay);
                commit({ type: 'setStay', stay });
                return stay;
            } catch (err) {
                console.log('stayStore: Error in get stay', err);
                throw err;
            }
        },
    },
    modules: {},
};
