export default {
	onOpen: async () =>{
		await storeValue('cart', appsmith.store?.cart || [])
		await storeValue('search', appsmith.store?.search || '')
		await storeValue('filter', appsmith.store?.filter || '')
	},

	resetCart: () =>{
		storeValue('cart',[]);
		resetWidget('lst_cart');
	},

	addToCart: async () => {
		await closeModal('mod_productDetail');
		await storeValue('cart', 			 		appsmith.store.cart.concat({id:lst_productList.selectedItem.id,make:lst_productList.selectedItem.make,model:lst_productList.selectedItem.model,qty:1,price:lst_productList.selectedItem.price,image:lst_productList.selectedItem.image}));
		await showAlert(`${lst_productList.selectedItem.model} added to cart`,'info')
	},

	saveQty: async (qty, itemId)=>{
		let cart = appsmith.store.cart;
		let cartRow = cart.findIndex(item=>item.id==itemId);
		cart[cartRow].qty = qty;
		await storeValue('cart',cart);
		await resetWidget('lst_cart')
	},

	showConfirm: async (title,message,icon) => {
		await storeValue('confirm',{message:message,title:title,icon:icon});
		await resetWidget('mdl_confirm');
		await showModal('mdl_confirm');
	},

	isConfirmed: () => {
		let confirm = appsmith.store.confirm;
		confirm.response = true;
		storeValue('confirm',confirm);
		closeModal('mdl_confirm');
		//showAlert(JSON.stringify(confirm));

		let title = confirm.title;
		switch(title){
			case 'Clear Cart':
				utils.resetCart()
				break;
			case 'CHECKOUT':
				navigateTo('Checkout','SAME_WINDOW');
				break;
			case 'RESET FILTERS':
				//showAlert('case = reset filters');
				storeValue('search','')
				storeValue('filter','')
				resetWidget('sel_productTypeFilter')
				break;
			default:
				//showAlert('default case');
		}
		return confirm
	},


	getSelectOptions: (data, labelKey, valueKey = 'id') => {  
		// creates a deduplicated array of SelectOptions from data 
		let dupValues = data.map(row => {return {'label':row[labelKey], 'value':row[valueKey]}});
		let output = {};
		dupValues.forEach(option => {output[option.label] = option});
		let outputProps = Object.getOwnPropertyNames(output);
		return outputProps.map(prop => output[prop])
	},
}