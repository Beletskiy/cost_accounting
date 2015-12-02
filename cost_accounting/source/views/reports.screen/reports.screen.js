RAD.view('reports.screen', RAD.Blanks.View.extend({

    url: 'source/views/reports.screen/reports.screen.html',

    events: {
        'tap .btn' : 'onButtonClick',
        'tap .glyphicon-menu-left': 'backToThePreviousPage'
    },

    onInitialize: function () {
        'use strict';
        this.model = RAD.model('collection.purchases');
    },

    onEndAttach: function () {
        'use strict';
        this.drawCharts();
    },

    backToThePreviousPage: function () {
        'use strict';
        this.application.backToThePreviousPage();
    },

    drawCharts: function () {
        'use strict';
        var self = this,
            habitation = 0, transport = 0, entertainment = 0, products = 0, food = 0, comServ = 0;
        google.load('visualization', '1.1',
            {packages: ['Line'], callback: drawChart});

        function drawChart() {
            var data = new google.visualization.DataTable(),
                year = 0, month = 0, day = 0, currentDate = null, row = null, common = 0, lastDate = null,
                currentDateArr = [];

            data.addColumn('date', 'Day');
            data.addColumn('number', 'Habitation');
            data.addColumn('number', 'Transport');
            data.addColumn('number', 'Entertainment');
            data.addColumn('number', 'Products');
            data.addColumn('number', 'Food');
            data.addColumn('number', 'Communication services');
            data.addColumn('number', 'Common');

            for (var i = 0; i < self.model.length; i++) {
                habitation = 0;
                transport = 0;
                entertainment = 0;
                products = 0;
                food = 0;
                comServ = 0;
                currentDate = self.model.models[i].attributes.date;
                currentDateArr = currentDate.split('-');
                year = Number(currentDateArr[0]);
                month = Number(currentDateArr[1]);
                day = Number(currentDateArr[2]);
                calculateSumForCategories(self.model.models[i].attributes.category, i);
                if (lastDate !== currentDate) {
                    lastDate = currentDate;
                    common = habitation + transport + entertainment + products + food + comServ; //объединить в объект?
                } else {
                    common += habitation + transport + entertainment + products + food + comServ;
                }
                row = [[new Date(year, month - 1, day),
                    habitation, transport, entertainment, products, food, comServ, common]];

                data.addRows(row);
            }

            var options = {
                curveType: 'function',
                legend: {
                    position: 'bottom',
                    alignment: 'start'
                },
                //explorer: {},
                width: 800,
                height: 500,
                hAxis: {
                    format: 'd.M.yy',
                    gridlines: {count: 5}
                }
            };
            var chart = new google.charts.Line(document.getElementById('linechart_material'));
            chart.draw(data, google.charts.Line.convertOptions(options));
        }

        function calculateSumForCategories(category, index) {
            var sum = Number(self.model.models[index].attributes.sum);
            switch (category) {
                case 'Habitation':
                    habitation = sum;
                    break;
                case 'Transport':
                    transport = sum;
                    break;
                case 'Entertainment':
                    entertainment = sum;
                    break;
                case 'Products':
                    products = sum;
                    break;
                case 'Food':
                    food = sum;
                    break;
                case 'Communication services':
                    comServ = sum;
                    break;
                default:
                    console.log('Do not have this category');
            }

        }
    }

}));