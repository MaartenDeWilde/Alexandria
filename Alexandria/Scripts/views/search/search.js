define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Template= _.template(require("text!./search.htm"))

    var SearchView = Backbone.View.extend({
        id: 'searchView',
        initialize: function() {
            this.items = [];
            this.tagBooks = {};
            $.get($("#root").attr("href") + "api/books/getalltags", _.bind(function(data){
                this.tags=  data;
                this.render();
            }, this));
        },
        events: {
            "click .btn" : "onSearch",
            "keyup .search-query" : "onSearchKey",
            "click .accordion-toggle" : "onToggleTag"
        },
        render: function () {
            this.$el.empty();
            this.$el.append(Template({model:{results:this.items, tags: this.tags}}));
            return this.$el;
        },
        onSearchKey: function(e){
            if(e.keyCode == 13)
            {
                this.onSearch();
            }
        },
        onSearch: function(){
            var searchValue = encodeURIComponent($(".search-query").val());
            $.get($("#root").attr("href") + "api/books/search/" + searchValue, _.bind(function(data){
                this.items = data;
                this.render();
            }, this));
        },
        onToggleTag: function(e){
            var $t = $(e.currentTarget);
            var $content = $t.parent().parent().find(".accordion-inner");
            var tag =  $.trim($t.text());
             $.get($("#root").attr("href") + "api/books/getallbooksbytag/" + encodeURIComponent(tag), _.bind(function(data){

                var $list = $("<ul/>")
                _.each(data, function(book){
                    $list.append("<li><a href='Detail/" +  book.Id + "'>" + book.Title + "</a></li>");
                });
                $content.empty();
                $content.append($list[0]);
            }, this));
        }
    });
    return SearchView;
})