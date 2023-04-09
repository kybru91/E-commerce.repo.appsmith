export default {

	onOpen: async () => {
		await storeValue('order',appsmith.store.cart)
		await storeValue('cart',[])
	}


}