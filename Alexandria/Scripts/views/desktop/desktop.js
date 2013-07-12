define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Template = _.template(require('text!./desktop.htm'));

    var DesktopView = Backbone.View.extend({
        id: 'desktopView',
        initialize: function() {
            $.get($("#root").attr("href") + "api/books/top/", _.bind(function(data){
                this.popularitems = data;
                this.render();
            }, this));

            $.get($("#root").attr("href") + "api/books/lendedbooks/", _.bind(function(data){
                this.lendedbooks = data;
                this.render();
            }, this));
        },
        events : {
            "click #btnaddnew": "onAddnew",
            "click #btnsearch": "onSearch"
        },
        render: function () {
            this.$el.empty();
            if(this.popularitems && this.lendedbooks){
                this.$el.append(Template({model:{
                    popularitems:this.popularitems, 
                    lendedbooks:this.lendedbooks}}));
                // make first item in carrousel active
                $(_.first(this.$el.find('.carousel-inner div'))).addClass('active'); 
                
                // make first item in carrousel active
                $('.myCarousel').carousel({
                  interval: 2000
                })
            }
            return this.$el;
        },
        onAddnew:function(){
            Backbone.history.navigate("CreateBook", { trigger: true })
        },
        onSearch:function(){
            Backbone.history.navigate("Search", { trigger: true })
        }
    });

    return DesktopView;
})