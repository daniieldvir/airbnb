<template>
	<section class="user-wishlist-container">
		<h2>Wishlist</h2>
		<wishlist v-if="stays" :stays="stays" />
		<h2 v-if="!loggedInUser || !stays">No items in your wishlist</h2>
	</section>
</template>

<script>
import wishlist from '@/cmps/wishlist-list.vue'
export default {
	components: { wishlist },
	props: {},
	data() {
		return {
			loggedInUser: null,
		}
	},
	computed: {
		stays() {
			return this.$store.getters.staysToShow
		},
	},
	methods: {},
	async created() {
		window.scrollTo(0, 0)
		await this.$store.dispatch({ type: 'loadStays' })
		this.loggedInUser = this.$store.getters.loggedInUser
	},
}
</script>
