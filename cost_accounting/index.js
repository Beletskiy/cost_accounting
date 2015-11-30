(function (document, window) {
    // don't remove ## marks, CLI uses them for updating this file
    // #script_begin#
    'use strict';
    var scripts = [

        'source/models/collection.categories/categories.collection.js',

        'source/models/collection.purchases/purchases.collection.js',

        'source/models/model.purchase/purchase.model.js',

        'source/service/service.json_loader/service.json_loader.js',

        'source/views/addCosts.screen/addCosts.screen.js',

        'source/views/history.screen/history.screen.js',

        'source/views/home.screen/home.screen.js',

        'source/application/application.js'
    ];
    // #script_end#
    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'none',
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