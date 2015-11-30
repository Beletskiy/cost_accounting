RAD.view('home.screen', RAD.Blanks.View.extend({

    url: 'source/views/home.screen/home.screen.html',
/*
    onInitialize: function () {
        
    },
    onNewExtras: function (extras) {
        
    },
    onReceiveMsg: function (channel, data) {
        
    },
    onStartRender: function () {
        
    },
    onEndRender: function () {
        
    },
    onBeforeAttach: function(){

    },
    onStartAttach: function () {
        
    },
    onEndAttach: function () {
        
    },
    onEndDetach: function () {
        
    },
    onDestroy: function () {
        
    }
*/
    events: {
        'tap .btn' : 'onButtonClick'
    },
    onButtonClick: function (e) {
        var id = e.currentTarget.getAttribute('id');
        this.application.showNextPage(id);
    }

}));