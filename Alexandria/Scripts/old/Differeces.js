$(function () {
    var imageComparison = function (imagesSelector) {
        this.images = $(imagesSelector);
    };

    imageComparison.prototype.create = function () {
        if (this.images.length == 0 && $('form ~ .carousel').length != 1) {
            $('#completeMessage').removeClass('hide');
            $('#slides').hide();
            return;
        }
        this.images.each(function (i, el) {
            var fileName = $(el).data('image');

            $.ajax({
                url: 'ImageComparison/FetchImages',
                type: 'POST',
                dataType: "json",
                data: { fileName: fileName },
                complete: function (data, xhr) {
                    if (xhr === 'success') {
                        var response = JSON.parse(data.responseText);
                        $(el).find('.archiveImage').attr('src', 'data:image/png;base64,' + response.ArchiveImage);
                        $(el).find('.triageImage').attr('src', 'data:image/png;base64,' + response.TriageImage);
                        $(el).find('.highlightImage').attr('src', 'data:image/png;base64,' + response.HighlightedImage);
                        $(el).find('.differenceImage').attr('src', 'data:image/png;base64,' + response.DifferenceImage);
                        $('div[data-imageHolder="' + response.FileName + '"]').html(response.ImageDisplayInfo);
                    }
                },
                error: function () {
                    alert('Ops!!! what the ajax call... went wrong... ');
                }
            });
        });
    };


    var swipe = {
        create: function () {
            this.swipeBar = $('.swipe').find('.swipe-bar');
            this.swipeBar.each(function (i, element) {
                $(element).draggable({
                    containment: $(element).siblings('.swipe-shell').find('img:not(.hide)'),
                    drag: function (e, el) {
                        var height = $(e.target).siblings('.swipe-ref').height();
                        $(e.target).siblings()[1].style.clip = "rect(0, " + el.position.left + "px, " + height + "px, 0)";
                    }
                });
            });

            swipe.fixSize();
            $(window).resize(function () {
                swipe.fixSize();
            });
        },

        setParent: function () {
            this.swipeBar.each(function (i, element) {
                $(element).draggable('option', 'containment', $(element).siblings('.swipe-shell').find('img:not(.hide)'));
            });
        },

        fixSize: function () {
            var swipeElements = $('.image.active .swipe');
            if (swipeElements.length === 0) {
                return;
            }
            var swipeBar = swipeElements.find('.swipe-bar');
            var swipeShell = swipeElements.find('.swipe-shell').find('img:not(.hide)');

            var imageWidth = swipeShell.width();
            if (imageWidth === 0) {
                swipeShell.on('load', function () {
                    swipe.fixSize();
                });
                return;
            }

            var left = (swipeShell.parent().width() - swipeShell.width()) / 2;
            var actual = parseInt(swipeBar.siblings()[1].style.clip.slice(9, 14));
            if (left <= actual && actual <= left + imageWidth) {
                left = actual;
            }
            if (left === 0 && !isNaN(actual)) {
                left = imageWidth / 2;
            }
            swipeBar.css('left', left);

            var height = swipeShell.height();
            swipeBar.siblings()[1].style.clip = "rect(0, " + left + "px, " + height + "px, 0)";
        }
    };


    var onionSkin = {
        create: function () {
            var oniSkin = $('.onion-skin');
            var delFrame = oniSkin.find('div.deleted-frame');
            var addFrame = oniSkin.find('div.added-frame');

            delFrame.dragger({
                drag: function (event, element) {
                    var slidePosition = element.position.left;
                    var width = element.helper.parents('.deleted-frame').children('img.deleted-frame:not(.hide)').width();
                    var filter = addFrame.filter(function (i, el) {
                        return $(el).parents('.image.active').length == 1;
                    });
                    filter.css('opacity', parseInt(slidePosition) / (width - 38));
                }
            });
            delFrame.dragger('width', '690');

            $(window).resize(function () {
                var width = addFrame.parents('.image.active').find('.onion-skin img.added-frame:not(.hide)').width();
                delFrame.dragger('width', width);
            });
        },
        
        setParent: function () {
            this.fixSize();
        },

        fixSize: function () {
            var delFrame = $('.image.active .onion-skin .deleted-frame');
            var image = delFrame.find('img:not(.hide)');
            var imageWidth = image.width();
            if (imageWidth === 0) {
                image.on('load', function () {
                    onionSkin.fixSize();
                });
            }
            delFrame.dragger('width', imageWidth);
        }
    };

    var navigation = {
        createViewMenu: function () {
            $('ul.view-modes-menu > li').click(function () {
                var btn = $(this);
                var activeBtn = btn.siblings("[class*='active']");
                var images = $('.image');
                var activeMode = images.children('[style!="display: none;"]:not(.alert, .noCompare)');

                if (btn.hasClass('btn-diff')) {
                    navigation.deactivate(activeBtn, activeMode);
                    navigation.activate(btn, images.find('.difference'));
                }

                if (btn.hasClass('btn-onion')) {
                    navigation.deactivate(activeBtn, activeMode);
                    navigation.activate(btn, images.find('.onion-skin'));
                    onionSkin.fixSize();
                }

                if (btn.hasClass('btn-swipe')) {
                    navigation.deactivate(activeBtn, activeMode);
                    navigation.activate(btn, images.find('.swipe'));
                    swipe.fixSize();
                }
            });

            $('menu.menu-bar.down > button').click(function () {
                var btn = $(this);
                var url = btn.data('link');
                var imageName = $('.image.active').data('image');

                if (imageName) {
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: { imageName: imageName },
                        error: function (msg) {
                            alert('Something went wrong!' + msg.responseText);
                        },
                        success: function () {
                            slider.removeCurrentSlide();
                        }
                    });
                }
            });
        },

        activate: function (btn, mode) {
            var parent = btn.parent();
            var btnLeft = btn.offset().left;
            var parentLeft = parent.offset().left;
            var width = btn.outerWidth();

            parent.css('background-position', btnLeft - parentLeft + width / 2 + "px 0");
            btn.addClass('active');
            mode.css('display', "");
        },

        deactivate: function (btn, mode) {
            btn.removeClass('active');
            mode.css('display', 'none');
        }
    };

    var slider = {
        create: function () {
            $('#slides').carousel({
                interval: false
            });

            $('#slides').on('slid', function () {
                onionSkin.fixSize();
                swipe.fixSize();
            });
            slider.activate();
        },

        activate: function (slideNumber) {
            slideNumber = slideNumber || 1;
            $('#slides .item:nth-child(' + slideNumber + ')').addClass('active');
            onionSkin.fixSize();
        },

        removeCurrentSlide: function () {
            var imageToRemove = $('#slides').find(".image.active");
            var carousel = $('#slides').carousel('next');
            imageToRemove.remove();
            var item = carousel.find('.item.active');
            if (item.length === 0) {
                $('#completeMessage').removeClass('hide');
            }
        }
    };

    var highlightChooser = {
        activate: function () {

            $('#showHighlight').click(function () {
                var button = $(this);
                var isHighlighting = !button.hasClass('active');

                $('.deleted-frame, .swipe-ref').each(function (index, item) {
                    var highlightingImage = $(item);
                    var highlightImageElement = highlightingImage.find('img[data-comparedImage="highlight"]');
                    var triageImageElement = highlightingImage.find('img[data-comparedImage="triage"]');

                    if (isHighlighting) {
                        highlightImageElement.removeClass('hide');
                        triageImageElement.addClass('hide');
                        button.addClass('btn-info');
                    } else {
                        highlightImageElement.addClass('hide');
                        triageImageElement.removeClass('hide');;
                        button.removeClass('btn-info');
                    }
                });

                onionSkin.setParent();
                swipe.setParent();

            });
        }
    };

    var comparison = new imageComparison('.image.item');
    comparison.create();
    navigation.createViewMenu();
    onionSkin.create();
    slider.create();
    swipe.create();
    highlightChooser.activate();
});