define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Template = _.template(require("text!./create.htm"));

    var DefaultView = Backbone.View.extend({
        id: 'createView',
        initialize: function () {        

        },
        events: {
            "click .btn" : "onSave"
        },
        render: function () {
            this.$el.append(Template({model:{message:"Awesome"}}));
            return this.$el;
        },
        onSave: function(){              
            $.post($("#root").attr("href") + "api/books/savebook", {
                title: $("#title").val(),
                description: $("#description").val(),
                tags: $("#tags").val(),
                isbn:  $("#isbn").val(),
                author: $("#author").val()
            }, function(){
                Backbone.history.navigate("Home", {trigger:true});
            });                   
        }
    });

    return DefaultView;
})