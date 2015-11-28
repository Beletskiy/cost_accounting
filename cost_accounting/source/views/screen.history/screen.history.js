RAD.view("screen.history", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.history/screen.history.html',

    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
    },
    onNewExtras: function () {
        var purchasesOldList = RAD.model('collection.purchases'),
            result = [],
            reference = null;
        console.log(purchasesOldList);
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