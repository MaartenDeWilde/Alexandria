define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Template = _.template(require("text!./transfer.htm"));


    var DefaultView = Backbone.View.extend({
        id: 'transferView',
        events:{"click #transferButton":"onTransfer" },

        initialize: function () {  
            $.get($("#root").attr("href") + "api/books/requests/"+ this.options.id, _.bind(function(data){
                this.requests = data;
                this.render();
            }, this));    

             $.get($("#root").attr("href") + "api/books/"+ this.options.id, _.bind(function(data){
                this.book = data;
                this.render();
            }, this));                   
        },

        render: function () {
            this.$el.empty();
              if(this.book && this.requests){       
            var requests = this.requests;
            var bookName = this.book.Title;
            this.$el.append(Template({ model: { requests: requests, bookName:bookName } }));
        }
            return this.$el;
        },

        onTransfer:function(e){
            var rid = $(e.currentTarget).data("pendingrequestid");
            $.post($("#root").attr("href") + "api/books/transferbook/" , {'': parseInt(rid)} , _.bind(function(){
                Backbone.history.navigate("Detail/" + _.first(this.requests).BookId, { trigger: true });
            },this));                     
            
        }, 
    });

    return DefaultView;
})