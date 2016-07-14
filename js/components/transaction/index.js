module.exports = {
	template : require('./template.html'),
	props : ['items', 'edit', 'remove'],
	computed : {
		subtotal : function() {
			var subtotal = 0;

			this.items.forEach(function(product){
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

	methods : {
		toggleEdit : function(item) {
			this.edit(item);
		},
		removeItem : function(item) {
			this.remove(item);
		}
	}
}