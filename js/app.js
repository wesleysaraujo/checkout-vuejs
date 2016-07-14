(function($, Vue) {
	'use strict';

	/*var Vue = require('vue');
	var $ 	= require('jquery');*/

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

		components : {
			transaction : require('./components/transaction'),
			itemList : require('./components/item-list')
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
	});
})(jQuery, Vue);