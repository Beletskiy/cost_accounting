RAD.application(function (core) {
    'use strict';
    var app = this;

    app.start = function () {

        core.startService();
        app.loadHome();
    };

    app.loadHome = function () {
        var options = {
            container_id: '#screen',
            content: 'home.screen',
            animation: 'slide',
            backstack: true
        };
        core.publish('navigation.show', options);
    };

    app.loadCategories = function () {
        core.publish('service.json_loader.get', {
            file: 'jsondata/categories.json',
            //loader: true,
            callback: function (json) {
                RAD.model('collection.categories').add(json, {silent: true});
                RAD.model('collection.categories').trigger('change');
            }
        });
    };

    app.showAddCosts = function () {
        var options = {
            container_id: '#screen',
            content: 'add_costs.screen'
        };
        core.publish('navigation.show', options);
    };
    app.showHistory = function () {
        var options = {
            container_id: '#screen',
            content: 'history.screen',
            extras: {}
        };
        core.publish('navigation.show', options);
    };
    app.showReports = function () {
        var options = {
            container_id: '#screen',
            content: 'reports.screen'
        };
        core.publish('navigation.show', options);
    };
    app.backToThePreviousPage = function() {
        window.history.back();
    };

    return app;
}, true);
