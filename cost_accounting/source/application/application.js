RAD.application(function (core) {
    'use strict';
    var app = this;

    app.start = function () {

        core.startService();
        app.loadHome();
        app.loadCategories();
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

    app.showNextPage = function (id) {
        switch (id) {
            case 'add-costs':
                app.showAddCosts();
                break;
            case 'history':
                app.showHistory();
                break;
            case 'reports':
                app.showReports();
                break;
        }
    };
    app.showAddCosts = function () {
        var options = {
            container_id: '#screen',
            content: 'addCosts.screen',
            animation: 'slide',
            backstack: true
        };
        core.publish('navigation.show', options);
    };
    app.showHistory = function () {
        var options = {
            container_id: '#screen',
            content: 'history.screen',
            animation: 'slide',
            backstack: true,
            extras: {
                hello : 'world'
            }
        };
        core.publish('navigation.show', options);
    };
    app.showReports = function () {
        var options = {
            container_id: '#screen',
            content: 'reports.screen',
            animation: 'slide',
            backstack: true
        };
        core.publish('navigation.show', options);
    };

    return app;
}, true);
