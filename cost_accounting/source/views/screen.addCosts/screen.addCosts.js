RAD.view("screen.addCosts", RAD.Blanks.View.extend({

    url: 'source/views/screen.addCosts/screen.addCosts.html',

    events: {
        'tap button': 'onSubmit'
    },

    onSubmit: function (e) {
        'use strict';
        e.preventDefault();
        var field1 = this.el.querySelector('#date-choose'),
            time = field1.value,
            field2 = this.el.querySelector('#Sum'),
            sum = field2.value,
            field3 = this.el.querySelector('#costs-type'),
            costsType = field3.value;
        if ((time) && (sum) && (costsType)) {
            RAD.model('model.purchase').set({date: time, category: costsType, sum: sum});
            RAD.model('collection.purchases').add(RAD.model('model.purchase'));
        }
    },

    onInitialize: function () {
        'use strict';
        this.model = RAD.model('collection.categories');
    }
    /*    onNewExtras: function (extras) {

     },
     onReceiveMsg: function (channel, data) {

     },
     onStartRender: function () {

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

}));