define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Template = _.template(require("text!./detail.htm")),
        Fancybox = require("fancybox");   

    var DefaultView = Backbone.View.extend({
        id: 'detailView',
        initialize: function () {  
            $.get($("#root").attr("href") + "api/books/"+ this.options.id, _.bind(function(data){
                this.book = data;
                this.render();
            }, this));  

           this.newRating();     

            $.get($("#root").attr("href") + "api/books/access/"+ this.options.id, _.bind(function(data){
                this.access = data;
                this.render();
            }, this));               
        },

        newRating: function () {           
            $.get($("#root").attr("href") + "api/books/ratings/"+ this.options.id, _.bind(function(data){
                this.ratings = data;
                this.render();
            }, this));                    
        },

        events:{"click #requestButton":"onRequest",
                "click #transferButton":"onTransfer",
                "click #copyBook" : "onCopyBook",
                "click #rateButton": "onAddRating" },

        render: function () {
            this.$el.empty();
            
            if(this.book && this.access){                
                var bookName=this.book.Title;
                var description=this.book.Description;
                var averageRating=this.book.AverageRating;                
                var inOrganizationSince = this.book.InOrganizationSince;
                var tags = this.book.Tags;
                var numberOfBorrows = this.book.TimesTransfered;
                var ISBN = this.book.ISBN;
                var ratings = this.ratings;    
                var bookAuthor = this.book.Author;         

                this.$el.append(Template({model:{ratings:ratings, bookName:bookName,description:description,averageRating:averageRating,inOrganizationSince:inOrganizationSince,tags:tags,numberOfBorrows:numberOfBorrows,ISBN:ISBN, bookAuthor: bookAuthor }}));

                // Request
                if (this.access.RequestPending) { 
                    $("#requestButton").text("Request pending...");
                    $("#requestButton").attr("disabled", "true");
                    $("#requestButton").removeClass("btn-primary");
                };
                if (!this.access.CopyInPosession) { $("#requestButton").removeClass("hide"); };

                // Transfer
                if (this.access.CopyInPosession) { $("#transferButton").removeClass("hide"); };

                this.$el.find("#cover_image").fancybox();
            }
            return this.$el;
        },
        onRequest:function(){
            $.post($("#root").attr("href") + "api/books/addrequest",{'':this.book.Id}, function(){
                Backbone.history.navigate("Home", {trigger:true});
            });
        },   
        onTransfer:function(){
            Backbone.history.navigate("TransferBook/" + this.book.Id, { trigger: true });
        }, 
        onCopyBook: function(){
            $.post($("#root").attr("href") + "api/books/createbookcopy",{'':this.book.Id}, _.bind(function(){
               this.initialize();
            }, this));
        },
        onAddRating:function(){
            $.post($("#root").attr("href") + "api/books/addrating",{
                bookId: this.book.Id,
                ratingGiven:  parseInt($("#ratingButton .btn.active").text().trim()),
                comment: $("#comment").val(),
            },
            _.bind(function(){
            this.newRating();
        },this));

        },      
    });

    return DefaultView;
})
