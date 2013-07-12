define(function(require) {
    var _ = require('underscore'),
        $ = require('jquery'),
        Backbone = require('backbone'),
        Router = require('./router'),
        Page = require('./views/page');

    require('associations');
    require('bootstrap');

    var Application = function() {
        this.root = $('#root').attr('href');

    };

    Application.prototype = _.extend({
        start: function() {
            this.trigger('starting');

            this.page = new Page();
            this.router = new Router({
                app: this
            });

            Backbone.history.start({
                pushState: true,
                root: this.root
            });

            this.trigger('started');
        }
    }, Backbone.Events);
  
  return new Application();
})

