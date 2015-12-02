RAD.view('addCosts.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/addCosts.screen/addCosts.screen.html',

    events: {
        'tap button': 'onSubmit',
        'tap .glyphicon-menu-left': 'backToThePreviousPage'
    },

    onSubmit: function (e) {
        'use strict';
        e.preventDefault();
        var field1 = this.el.querySelector('#date-choose'),
            time = field1.value,
            field2 = this.el.querySelector('#sum'),
            sum = field2.value,
            field3 = this.el.querySelector('#costs-type'),
            costsType = field3.value;
        if ((time) && (costsType) && (this.isRightSum(sum))) {
            RAD.model('model.purchase').set({date: time, category: costsType, sum: sum});
            RAD.model('collection.purchases').add(RAD.model('model.purchase'));
        }
    },

    onInitialize: function () {
        'use strict';
        this.model = RAD.model('collection.categories');
    },

    backToThePreviousPage: function () {
        'use strict';
       this.application.backToThePreviousPage();
    },

    isRightSum: function(sum) {
        'use strict';
        if (sum > 1) {
            return parseInt(Number(sum), 10) === Number(sum);
        }
    }

}));