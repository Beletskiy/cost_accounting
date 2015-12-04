RAD.view('add_costs.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/add_costs.screen/add_costs.screen.html',

    events: {
        'tap button': 'onSubmit',
        'tap .glyphicon-menu-left': 'backToThePreviousPage',
        'tap input, select, .glyphicon-menu-left': 'clearForm'
    },

    model: RAD.model('collection.categories'),
    isFirstClickOnForm: true,

    $successMessage: null,
    $formAddCost: null,
    $dateChoose: null,
    $sum: null,
    $costsType: null,

    onEndRender: function () {
        'use strict';
        this.$successMessage = this.$('#success-message');
        this.$formAddCost = this.$('#form-add-cost');
        this.$dateChoose = this.$('#date-choose');
        this.$sum = this.$('#sum');
        this.$costsType = this.$('#costs-type');
    },


    onSubmit: function (e) {
        'use strict';
        e.preventDefault();
        var time = this.$dateChoose.val(),
            sum = this.$sum.val(),
            costsType = this.$costsType.val();

        if ((this.isRightTime(time)) && (costsType) && (this.isRightSum(sum))) {
            RAD.model('collection.purchases').add({date: time, category: costsType, sum: sum});
            this.$successMessage.show();
            this.isFirstClickOnForm = false;
        }
    },

    backToThePreviousPage: function () {
        'use strict';
        this.application.backToThePreviousPage();
    },

    clearForm: function () {
        'use strict';
        if (!this.isFirstClickOnForm) {
            this.$formAddCost[0].reset();
            this.$successMessage.hide();
            this.isFirstClickOnForm = true;
        }
    },

    isRightSum: function (sum) {
        'use strict';
        var MIN_SUM = 0,
            MAX_SUM = 999999;
        if ((sum > MIN_SUM) && (sum < MAX_SUM)) {
            return parseInt(Number(sum), 10) === Number(sum);
        }
    },
    isRightTime: function (time) {
        'use strict';
        var MIN_YEAR = 2014,
            MAX_YEAR = 2025,
            MAX_DAYS_IN_MONTH = 31,
            MAX_MONTHS = 12,
            currentDateArr = time.split('-'),
            year = Number(currentDateArr[0]),
            month = Number(currentDateArr[1]),
            day = Number(currentDateArr[2]);

        if ((year > MIN_YEAR) && (year < MAX_YEAR ) && (day <= MAX_DAYS_IN_MONTH) && (month < MAX_MONTHS)) {
            return true;
        }
    }
}));