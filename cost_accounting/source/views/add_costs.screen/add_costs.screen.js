RAD.view('add_costs.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/add_costs.screen/add_costs.screen.html',

    events: {
        'tap button': 'onSubmit',
        'tap .glyphicon-menu-left': 'backToThePreviousPage',
        'tap input, select': 'onForm'
    },

    model: RAD.model('collection.categories'),
    isFirstClickOnForm: true,

    $successMessage: null,

    onEndRender: function () {
        'use strict';
        this.$successMessage = this.$('#success-message');
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
            //RAD.model('model.purchase').set({date: time, category: costsType, sum: sum});
            RAD.model('collection.purchases').add({date: time, category: costsType, sum: sum});
            this.$successMessage.show();
            this.isFirstClickOnForm = false;
        }
    },

    backToThePreviousPage: function () {
        'use strict';
       this.application.backToThePreviousPage();
    },

    onForm: function () {
        'use strict';
        if (!this.isFirstClickOnForm) {
            document.getElementById('form-add-cost').reset();
            $('#success-message').hide();
            this.isFirstClickOnForm = true;
        }
    },

    isRightSum: function(sum) {
        'use strict';
        if ((sum > 0) && (sum < 999999)) {
            return parseInt(Number(sum), 10) === Number(sum);
        }
    }

}));