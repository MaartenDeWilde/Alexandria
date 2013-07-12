define(function(require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone');
  
  return {
    home: function() {
        return '/';
    }
    create: function(){
      return 'create';
    }
  };
})