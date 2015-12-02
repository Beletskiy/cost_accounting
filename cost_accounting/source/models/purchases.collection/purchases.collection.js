RAD.model('collection.purchases', Backbone.Collection.extend({
    initialize: function () {
        'use strict';
        var purchases = JSON.parse(localStorage.getItem('purchases'));
        this.add(purchases);
        this.on('add remove', function () {
            localStorage.setItem('purchases', JSON.stringify(this));
        });
    },
    comparator: function( collection ){
        'use strict';
        return( collection.get( 'date' ) );
    }
}), true);