RAD.view("screen.history", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/screen.history/screen.history.html',

    /* onInitialize: function () {
     'use strict';
     this.model = RAD.model('collection.purchases');
     console.log(this.model.models);
     var newModel = this.model.models[0].attributes;
     // console.log(newModel);

     var newArr = [];
     _.map(this.model.models, function(elem, index){
     //newArr.push(elem.attributes);
     //console.log(elem.attributes.date, " ", index);
     if ((index > 1) && (elem.attributes.date === newArr[index-1].date)) {

     }
     newArr.push(elem.attributes);
     });
     console.log(newArr);


     }, */
    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Collection();
    },
    onNewExtras: function () {
        var purchasesOldList = RAD.model('collection.purchases'),
            purchasesNewList = [];
        //this.purchasesNewList = purchasesOldList.map(function (item, index) {
        //   tempDate = item.attributes.date;
        //    console.log(item);
        //    return item;
        //});
        // console.log(purchasesOldList);
        for (var i = 0; i < purchasesOldList.length - 1; i++) {
            if (purchasesOldList.models[i].attributes.date === purchasesOldList.models[i + 1].attributes.date) {
                //purchasesNewList.push({
                //    date: purchasesOldList.models[i].attributes.date,
                //    arr: [{
                //        category: purchasesOldList.models[i].attributes.category,
                //        sum: purchasesOldList.models[i].attributes.sum
                //    }]
                //});

            } else {
                purchasesNewList.push({
                    date: purchasesOldList.models[i].attributes.date,
                    arr: [{
                        category: purchasesOldList.models[i].attributes.category,
                        sum: purchasesOldList.models[i].attributes.sum
                    }]
                });
            }
            console.log(purchasesNewList);
        }

        this.model.reset(purchasesNewList);
        //console.log(this.purchasesNewList);
        // console.log(RAD.model('collection.purchases'));
    }
    //selectedStudents = extras.selectedStudents.map(function (item) {
    //    return item.id
    //});
    //
    //this.availableStudents = purchasesOldList.filter(function (student) {
    //    return selectedStudents.indexOf(student.id) < 0;
    //});
    //this.checkedStudents = [];
    //
    //this.model.reset(this.availableStudents);

    //}

    //onStartRender: function () {
    //    var purchasesOldList = RAD.model('collection.purchases');
    //    this.purchasesNewList = purchasesOldList.map(function (item) {
    //        console.log(item);
    //    });
    //    this.model.reset(this.purchasesNewList);
    //
    //}
    /*    onReceiveMsg: function (channel, data) {

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
/* var collection = [
 {
 date: '01.10.2015',
 name: 'Test1 - 1',
 sum: 150
 },
 {
 date: '01.10.2015',
 name: 'Test2 - 1',
 sum: 99
 },
 {
 date: '01.10.2015',
 name: 'Test3 - 1',
 sum: 255
 },
 {
 date: '02.10.2015',
 name: 'Test999',
 sum: 1
 },
 {
 date: '03.11.2015',
 name: 'Test11 - 3',
 sum: 15
 },
 {
 date: '03.11.2015',
 name: 'Test22 - 3',
 sum: 1505
 },
 {
 date: '10.10.2015',
 name: 'Test',
 sum: 1
 }
 ];

 var result = [];
 var ref = null;

 for(var i = 0; i < collection.length; i++) {
 console.log(collection[i]);
 var el = {
 name: collection[i].name,
 sum: collection[i].sum
 };
 if (collection[i].date !== ref) {
 ref = collection[i].date;
 var obj = {
 date: collection[i].date,
 elements: [el]
 }
 result.push(obj);
 } else {
 result[result.length - 1].elements.push(el);
 }
 }

 console.log(result);*/