(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./components/item-list":2,"./components/transaction":4}],2:[function(require,module,exports){
module.exports = {
	template: require('./template.html'),
	props: ['items', 'add'],
	methods: {
		itemClicked: function(item) {
			this.add(item);
		},
	}
}
},{"./template.html":3}],3:[function(require,module,exports){
module.exports = '    <div class="list-group">\n        <button class="list-group-item item" v-repeat="item : items" v-on="click: itemClicked(item)">\n            <strong>{{ item.name }}</strong> - {{ item.price }}\n        </button>\n    </div>';
},{}],4:[function(require,module,exports){
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
},{"./template.html":5}],5:[function(require,module,exports){
module.exports = '<table class="table table-striped table-hover table-bordered table-responsive" v-if="items.length">\n    <thead>\n        <tr>\n            <th>Produto</th>\n            <th>Qtd</th>\n            <th>Preço</th>\n            <th></th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr v-repeat="line : items">\n            <td>{{line.item.name}}</td>\n            <td>\n                <span v-if="!line.editing" v-on="dblclick : toggleEdit(line)">{{ line.numberOfItems }}</span>\n                <input v-if="line.editing" v-on="blur :  toggleEdit(line)" type="number" v-model="line.numberOfItems">\n            </td>\n            <td>{{ line.numberOfItems * line.item.price | currency \'R$ \'}}</td>\n            <td><i class="fa fa-times" v-on="click: removeItem(line)"></i></td>\n        </tr>\n    </tbody>\n</table>\n<p v-if="!items.length">Nenhum produto foi adicionado.</p>\n<table class="table">\n    <tbody>\n        <tr>\n            <td>Subtotal:</td>\n            <td>{{ subtotal | currency \'R$ \'}}</td>\n        </tr>\n        <tr>\n            <td>Tax:</td>\n            <td>{{ tax | currency \'R$ \'}}</td>\n        </tr>\n        <tr>\n            <td>Total:</td>\n            <td>{{ total | currency \'R$ \'}}</td>\n        </tr>\n    </tbody>\n</table>';
},{}]},{},[1]);
