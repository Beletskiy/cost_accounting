RAD.view("reports.screen", RAD.Blanks.ScrollableView.extend({

    url: 'source/views/reports.screen/reports.screen.html',

    onInitialize: function () {
        'use strict';
        this.model = RAD.model('collection.purchases');
    },

    onEndAttach: function () {
        'use strict';
        this.drawCharts();
    },
    /*    onEndRender: function () {

    },
    onNewExtras: function (extras) {
        
    },
    onReceiveMsg: function (channel, data) {
        
    },
    onStartRender: function () {
        
    },

    onBeforeAttach: function(){

    },
    onStartAttach: function () {
        
    },

    onEndDetach: function () {

        
    },
    onDestroy: function () {
        
    }
*/

    drawCharts: function() {
        var self = this;
        google.load('visualization', '1.1',
            { packages: ['line'], callback: drawChart });

        function drawChart() {
            var data = new google.visualization.DataTable();

            data.addColumn('number', 'Day');
            data.addColumn('number', 'Sum');
         /*   data.addColumn('number', 'Habitation');
            data.addColumn('number', 'Transport');
            data.addColumn('number', 'Entertainment');
            data.addColumn('number', 'Products');
            data.addColumn('number', 'Food');
            data.addColumn('number', 'Communication services');
            data.addColumn('number', 'Common'); */

            for (var i = 0; i < self.model.length; i++) {
                var row = [Number(self.model.models[i].attributes.date), Number(self.model.models[i].attributes.sum)];
                console.log(self.model.models[i].attributes.date);
                data.addRows(row);
            }

            data.addRows(row);

           /* data.addRows([
                [1,  37.8, 80.8, 41.8],
                [2,  30.9, 69.5, 32.4],
                [3,  25.4,   57, 25.7],
                [4,  11.7, 18.8, 10.5],
                [5,  11.9, 17.6, 10.4],
                [6,   8.8, 13.6,  7.7],
                [7,   7.6, 12.3,  9.6],
                [8,  12.3, 29.2, 10.6],
                [9,  16.9, 42.9, 14.8],
                [10, 12.8, 30.9, 11.6],
                [11,  5.3,  7.9,  4.7],
                [12,  6.6,  8.4,  5.2],
                [13,  4.8,  6.3,  3.6],
                [14,  4.2,  6.2,  3.4]
            ]); */

            console.log(self.model);

            var options = {
                chart: {
                    title: 'Reports'
                },
                width: 400,
                height: 500
            };
            //console.log( this.$("#linechart_material") );
            var chart = new google.charts.Line(document.getElementById('linechart_material'));

            chart.draw(data, google.charts.Line.convertOptions(options));
        }
    }

}));