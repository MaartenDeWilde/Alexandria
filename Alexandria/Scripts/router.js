define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        DefaultView = require('./views/default'),
        DesktopView = require('./views/desktop/desktop'),
        SearchView = require('./views/search/search'),
        DetailView = require('./views/detail/detail'),
        CreateView = require('./views/create/create'),
        TransferView = require('./views/transfer/transfer'),
        RequestView = require('./views/request/request');

    var Router = Backbone.Router.extend({
        routes: {
            '': 'desktopView',
            'Home': 'desktopView',
            'Search': 'searchView',
            'Detail/:id': 'detailView',
            'CreateBook': 'createBookView',
            'TransferBook/:id': 'transferBookView',
            'RequestBook': 'requestBookView'
        },
        initialize: function(options) {
            this.page = options.app.page;
        },
        index: function () {
            this.page.content(new DefaultView());
        },
        desktopView: function() {
            this.page.content(new DesktopView());
		},
        searchView: function() {
            this.page.content(new SearchView());
        },
        detailView: function (id) {
            this.page.content(new DetailView({id:id}));
        },
        createBookView: function() {
            this.page.content(new CreateView());
        },
        transferBookView: function (id) {
            this.page.content(new TransferView({id:id}));
        },
        requestBookView: function () {
            this.page.content(new RequestView());
        }
    });
  return Router;
})
