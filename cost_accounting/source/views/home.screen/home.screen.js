RAD.view('home.screen', RAD.Blanks.ScrollableView.extend({

    url: 'source/views/home.screen/home.screen.html',

    events: {
        'tap .btn': 'onButtonClick'
    },
    onButtonClick: function (e) {
        'use strict';
        var id = e.currentTarget.getAttribute('id');
        this.application.showNextPage(id);
    }

}));