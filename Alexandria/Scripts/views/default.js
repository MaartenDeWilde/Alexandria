define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');

    var DefaultView = Backbone.View.extend({
        id: 'defaultView',
        initialize: function() {

        },
        render: function () {
            this.$el.append(" <span class='label label-success'>Hello world!</span><a href='/Alexandria/create'>Create</a>");
            return this.$el;
        }
    });

    return DefaultView;
})