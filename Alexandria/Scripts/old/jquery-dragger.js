/* ==========================================================
* mso/dragger.js v0.0.1
* ========================================================== */

(function ($) {
    var dragElement = "<span class=\"dragger-control\"><span class=\"transparent\"></span><span class=\"drag-track\">" +
                    "<span class=\"dragger\" style=\"left: 0px;\"></span></span><span class=\"opaque\"></span></span>";


    var addDrag = function (el, callback) {
        el.find('.dragger').draggable(
            {
                containment: "parent",
                drag: callback
            });
    };

    var methods = {
        init: function (options) {
            return this.each(function () {
                $(this).append(dragElement);

                $(this).find('img').on('change', function () {
                    methods.width($(this).width());
                });

                if (options.drag != undefined && typeof options.drag === 'function') {
                    addDrag($(this), options.drag);
                }
            });
        },

        drag: function (callback) {
            addDrag($(this), callback);
        },

        remove: function () {
            var control = $(this).find('.dragger-control');
            control.draggable('destroy');
            control.remove();
        },

        width: function (size) {
            var control = $(this).find('.dragger-control');
            control.css('width', size);
            control.css('margin-left', -size / 2);
            control.find('.drag-track').css('width', size - 24);
        }
    };

    $.fn.dragger = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.dragger');
        }
    }
})(jQuery);