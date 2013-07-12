/*global require*/
'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: [
				'jquery'
			]
		}
	},
	paths: {
		jquery: './dependencies/jquery/jquery',
		underscore: './dependencies/underscore/underscore',
		backbone: './dependencies/backbone/backbone',
		associations: './dependencies/backbone.associations/backbone.associations',
		text: './dependencies/requirejs-text/text',
		bootstrap: './dependencies/bootstrap/bootstrap',
		dateFormat: './dependencies/date.format/date.format',
		fancybox: './dependencies/fancybox/jquery.fancybox'
	}
});

require(['./app'], function (Application) {
    Application.start();
});
