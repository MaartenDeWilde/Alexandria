define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Template = _.template(require("text!./request.htm"));

    var DefaultView = Backbone.View.extend({
        id: 'requestView',
        initialize: function () { },
        render: function () {
            var items = [
                {
                    user: "ADS\\Maarten De Wilde",
                    checkoutDate: "03/11/1999"
                },
                {
                    user: "ADS\\Kristof Mattei",
                    checkoutDate: "14/07/1999"
                }
            ];
            var bookName = "My first JavaScript book";
            this.$el.append(Template({ model: { items: items, bookName: bookName } }));
            return this.$el;
        }
    });

    return DefaultView;
})