RAD.view('reports.screen', RAD.Blanks.View.extend({

    url: 'source/views/reports.screen/reports.screen.html',

    events: {
        'tap .glyphicon-menu-left': 'backToThePreviousPage'
    },

    onInitialize: function () {
        'use strict';
        this.model = RAD.model('collection.purchases');
    },

    onStartAttach: function () {
        'use strict';
        var self = this;
        $(window).resize(function () {
            self.drawCharts();
        });
    },

    onEndAttach: function () {
        'use strict';
        this.drawCharts();
    },

    onEndDetach: function () {
        'use strict';
        $(window).off('resize');
    },


    backToThePreviousPage: function () {
        'use strict';
        this.application.backToThePreviousPage();
    },

    drawCharts: function () {
        'use strict';
        var self = this,
            year = 0, month = 0, day = 0,
            VERTICAL_INDENT = 40,
            costsType = {
                habitation: 0,
                transport: 0,
                entertainment: 0,
                products: 0,
                food: 0,
                comServ: 0
            },
            sumOfCost = 0,
            currentInnerHeight = 0, currentInnerWeight = 0;
        calculateCurrentInnerSizes();
        google.load('visualization', '1.1',
            {packages: ['bar'], callback: drawChart});

        function drawChart() {
            var data = new google.visualization.DataTable(),
                currentDate = null, row = null, commonOnDay = 0, lastDate = null;

            data.addColumn('date', 'Day');
            data.addColumn('number', 'Habitation');
            data.addColumn('number', 'Transport');
            data.addColumn('number', 'Entertainment');
            data.addColumn('number', 'Products');
            data.addColumn('number', 'Food');
            data.addColumn('number', 'Communication services');
            data.addColumn('number', 'Common');

            for (var i = 0; i < self.model.length; i++) {
                currentDate = self.model.models[i].attributes.date;
                changeDateFormatFromStringToNumber(currentDate);

                if (isInCurrentMonth()) {
                    zeroingCostsTypeSum();
                    calculateSumForCategory(self.model.models[i].attributes.category, i);
                    calculateSumForAllCategories();
                    if (lastDate !== currentDate) {
                        lastDate = currentDate;
                        commonOnDay = sumOfCost;
                    } else {
                        commonOnDay += sumOfCost;
                    }
                    row = [[new Date(year, month - 1, day),
                        costsType.habitation, costsType.transport, costsType.entertainment, costsType.products,
                        costsType.food, costsType.comServ, commonOnDay]];

                    data.addRows(row);
                }
            }
            var options = {
                width: currentInnerWeight,
                height: currentInnerHeight,
                legend: {position: 'top', maxLines: 3},
                bar: {groupWidth: '75%'},
                isStacked: true
            };
            var chart = new google.charts.Bar(document.getElementById('linechart_material'));
            chart.draw(data, google.charts.Bar.convertOptions(options));

        }

        function isInCurrentMonth() {
            var MILLISECONDS_IN_MONTH = 2678400000,
                currentDate = new Date().getTime(),  //in ms
                date = new Date(year, month - 1, day).getTime();
            return ((currentDate - date) < MILLISECONDS_IN_MONTH);
        }

        function calculateCurrentInnerSizes() {
            var computedStyleH1 = getComputedStyle(document.getElementById('reports-head'));
            currentInnerHeight = window.innerHeight - parseInt(computedStyleH1.marginBottom) -
                parseInt(computedStyleH1.marginTop) - VERTICAL_INDENT;
            currentInnerWeight = window.innerWidth;
        }

        function calculateSumForCategory(category, index) {
            var sum = Number(self.model.models[index].attributes.sum);
            switch (category) {
                case 'Habitation':
                    costsType.habitation = sum;
                    break;
                case 'Transport':
                    costsType.transport = sum;
                    break;
                case 'Entertainment':
                    costsType.entertainment = sum;
                    break;
                case 'Products':
                    costsType.products = sum;
                    break;
                case 'Food':
                    costsType.food = sum;
                    break;
                case 'Communication services':
                    costsType.comServ = sum;
                    break;
                default:
                    console.log('Do not have this category');
            }

        }

        function zeroingCostsTypeSum() {
            for (var prop in costsType) {
                if (costsType.hasOwnProperty(prop)) {
                    costsType[prop] = 0;
                }
            }
        }

        function changeDateFormatFromStringToNumber(date) {
            var currentDateArr = date.split('-');
            year = Number(currentDateArr[0]);
            month = Number(currentDateArr[1]);
            day = Number(currentDateArr[2]);
        }

        function calculateSumForAllCategories() {
            sumOfCost = 0;
            for (var prop in costsType) {
                if (costsType.hasOwnProperty(prop)) {
                    sumOfCost += costsType[prop];
                }
            }
        }
    }
    /*  drawCharts: function () {                                  line charts
     'use strict';
     var self = this,
     year = 0, month = 0, day = 0,
     VERTICAL_INDENT = 40,
     costsType = {
     habitation: 0,
     transport: 0,
     entertainment: 0,
     products: 0,
     food: 0,
     comServ: 0
     },
     sumOfCost = 0,
     currentInnerHeight = 0, currentInnerWeight = 0;
     calculateCurrentInnerSizes();
     google.load('visualization', '1.1',
     {packages: ['Line'], callback: drawChart});

     function drawChart() {
     var data = new google.visualization.DataTable(),
     currentDate = null, row = null, commonOnDay = 0, lastDate = null;

     data.addColumn('date', 'Day');
     data.addColumn('number', 'Habitation');
     data.addColumn('number', 'Transport');
     data.addColumn('number', 'Entertainment');
     data.addColumn('number', 'Products');
     data.addColumn('number', 'Food');
     data.addColumn('number', 'Communication services');
     data.addColumn('number', 'Common');

     for (var i = 0; i < self.model.length; i++) {

     zeroingCostsTypeSum();
     currentDate = self.model.models[i].attributes.date;
     changeDateFormatFromStringToNumber(currentDate);
     calculateSumForCategory(self.model.models[i].attributes.category, i);
     calculateSumForAllCategories();
     if (lastDate !== currentDate) {
     lastDate = currentDate;
     commonOnDay = sumOfCost;
     } else {
     commonOnDay += sumOfCost;
     }
     row = [[new Date(year, month - 1, day),
     costsType.habitation, costsType.transport, costsType.entertainment, costsType.products,
     costsType.food, costsType.comServ, commonOnDay]];

     data.addRows(row);
     }

     var options = {
     curveType: 'function',
     legend: {
     position: 'bottom',
     alignment: 'start'
     },
     //explorer: {},
     width: currentInnerWeight,
     height: currentInnerHeight,
     hAxis: {
     format: 'd.M.yy',
     gridlines: {count: 5}
     }
     };
     var chart = new google.charts.Line(document.getElementById('linechart_material'));
     chart.draw(data, google.charts.Line.convertOptions(options));
     }

     function calculateSumForCategory(category, index) {
     var sum = Number(self.model.models[index].attributes.sum);
     switch (category) {
     case 'Habitation':
     costsType.habitation = sum;
     break;
     case 'Transport':
     costsType.transport = sum;
     break;
     case 'Entertainment':
     costsType.entertainment = sum;
     break;
     case 'Products':
     costsType.products = sum;
     break;
     case 'Food':
     costsType.food = sum;
     break;
     case 'Communication services':
     costsType.comServ = sum;
     break;
     default:
     console.log('Do not have this category');
     }

     }

     function zeroingCostsTypeSum() {
     for (var prop in costsType) {
     if (costsType.hasOwnProperty(prop)) {
     costsType[prop] = 0;
     }
     }
     }

     function changeDateFormatFromStringToNumber(date) {
     var currentDateArr = date.split('-');
     year = Number(currentDateArr[0]);
     month = Number(currentDateArr[1]);
     day = Number(currentDateArr[2]);
     }

     function calculateSumForAllCategories() {
     sumOfCost = 0;
     for (var prop in costsType) {
     if (costsType.hasOwnProperty(prop)) {
     sumOfCost += costsType[prop];
     }
     }
     }

     function calculateCurrentInnerSizes() {
     var computedStyleH1 = getComputedStyle(document.getElementById('reports-head'));
     currentInnerHeight = window.innerHeight - parseInt(computedStyleH1.marginBottom) -
     parseInt(computedStyleH1.marginTop) - VERTICAL_INDENT;
     currentInnerWeight = window.innerWidth;
     }
     } */

}));