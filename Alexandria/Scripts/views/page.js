define(function(require) {
  var $ = require('jquery'),
      _ = require('underscore'),
      Backbone = require('backbone')

  var Page = Backbone.View.extend({
    el: 'body',
    initialize: function() {
      this._header = null
      this._content = null

      this.$header = this.$('.navbar')
      this.$content = this.$('#content')
      this.$el.on('click', 'a.js-backbone-navigate', _.bind(this.onLinkClicked, this))            
    },   
    onLinkClicked: function(e) {
      Backbone.history.navigate($(e.currentTarget).attr('href'), true)      
      e.preventDefault()
      e.stopPropagation()
    },
    content: function(view) {
      if(!view) {
        return this._content;
      }

      if(this._content) {
        this._content.remove()
      }

      this._content = view
      this.$content.append(view.render())
    }
  })

  return Page;
})