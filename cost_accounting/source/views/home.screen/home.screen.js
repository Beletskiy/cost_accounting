RAD.view('home.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/home.screen/home.screen.html',

    events: {
        'tap #add-costs, #history, #reports': 'onButtonClick'
    },
    onButtonClick: function (e) {
        'use strict';
        var id = e.currentTarget.getAttribute('id');
        this.showNextPage(id);
    },

    showNextPage: function (id) {
        'use strict';
    switch (id) {
        case 'add-costs':
            this.application.showAddCosts();
            break;
        case 'history':
            this.application.showHistory();
            break;
        case 'reports':
            this.application.showReports();
            break;
    }
}
}));