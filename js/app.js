(function($, Vue) {
	'use strict';

	new Vue({
		el: '#pos',
		data: {
			items: [],
			lineItems: []
		},

		created: function() {
			$.get('items.json', function(items){
				this.items = items;
			}.bind(this), 'json');
		},

		methods: {
			onItemClick : function(item) {
				var found = false;

				this.lineItems.filter(function(index){
					if (index.item === item) {
						index.numberOfItems++;
						found = true;
					}
				});

				if (!found) {
					this.lineItems.push({
						item : item,
						numberOfItems : 1,
						editing : false
					});
				}
			},

			toggleEdit : function(lineItem) {
				lineItem.editing = !lineItem.editing;
			},

			removeItem : function(lineItem) {
				this.lineItems = this.lineItems.filter(function(index){
					if(index.item != lineItem.item) {
						return index;
					}
				});
			}
		}, 

		computed : {
			subtotal : function() {
				var subtotal = 0;

				this.lineItems.forEach(function(product){
					subtotal += product.item.price * product.numberOfItems;
				});

				return subtotal;
			},

			tax : function() {
				return this.subtotal * 0.065;
			},

			total: function() {
				return this.subtotal + this.tax;
			}
		},
	});
})(jQuery, Vue);