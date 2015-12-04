(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    'use strict';
    var scripts = [

        'source/models/categories.collection/categories.collection.js',

        'source/models/purchases.collection/purchases.collection.js',

        'source/service/service.json_loader/service.json_loader.js',

        'source/views/add_costs.screen/add_costs.screen.js',

        'source/views/history.screen/history.screen.js',

        'source/views/home.screen/home.screen.js',

        'source/views/reports.screen/reports.screen.js',

        'source/application/application.js'
    ];
    // #script_end#
    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: true,
                defaultAnimation: 'slide',
                animationTimeout: 3000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));