RAD.view('history.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/history.screen/history.screen.html',

    events: {
        'tap .glyphicon-remove-circle': 'deletePurchase'
    },


    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
        this.listenTo(RAD.model('collection.purchases'), 'remove', this.application.showHistory);

    },
    onNewExtras: function () {
        'use strict';

        var purchasesOldList = RAD.model('collection.purchases'),
            result = [],
            reference = null;
        //console.log(purchasesOldList);
        for (var i = 0; i < purchasesOldList.length; i++) {
            var el = {
                category: purchasesOldList.models[i].attributes.category,
                sum: purchasesOldList.models[i].attributes.sum,
                id: i
            };
            if (purchasesOldList.models[i].attributes.date !== reference) {
                reference = purchasesOldList.models[i].attributes.date;
                var obj = {
                    date: purchasesOldList.models[i].attributes.date,
                    elements: [el]
                };
                result.push(obj);
            }
            else {
                result[result.length - 1].elements.push(el);
            }
        }
        this.model.reset(result);
    },
    deletePurchase: function (e) {
        'use strict';
        var purchaseForRemove = e.currentTarget.id;
        RAD.model('collection.purchases').remove(RAD.model('collection.purchases').models[purchaseForRemove]);

    }
}));
/*   onStartRender: function () {

 }
 onReceiveMsg: function (channel, data) {

 },
 onEndRender: function () {

 },
 onBeforeAttach: function(){

 },
 onStartAttach: function () {

 },
 onEndAttach: function () {

 },
 onEndDetach: function () {

 },
 onDestroy: function () {

 }
 */