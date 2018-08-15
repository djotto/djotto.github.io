(function(){
    // Vertical Timeline - by CodyHouse.co
    function VerticalTimeline( element ) {
        this.element = element;
        this.blocks = this.element.getElementsByClassName("js-cd-block");
        this.images = this.element.getElementsByClassName("js-cd-img");
        this.contents = this.element.getElementsByClassName("js-cd-content");

        this.books = this.element.getElementsByClassName("cd-timeline__img--book");
        this.censuses = this.element.getElementsByClassName("cd-timeline__img--census");
        this.comments = this.element.getElementsByClassName("cd-timeline__img--comment");
        this.maps = this.element.getElementsByClassName("cd-timeline__img--location");
        this.newspapers = this.element.getElementsByClassName("cd-timeline__img--newspaper");

        this.offset = 0.8;
        this.hideBlocks();
    };

    VerticalTimeline.prototype.hideBlocks = function() {
        //hide timeline blocks which are outside the viewport
        if ( !"classList" in document.documentElement ) {
            return;
        }
        var self = this;
        for( var i = 0; i < this.blocks.length; i++) {
            (function(i){
                if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
                    self.images[i].classList.add("cd-is-hidden");
                    self.contents[i].classList.add("cd-is-hidden");
                }
            })(i);
        }
    };

    VerticalTimeline.prototype.showBlocks = function() {
        if ( ! "classList" in document.documentElement ) {
            return;
        }
        var self = this;
        for( var i = 0; i < this.blocks.length; i++) {
            (function(i){
                if( self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
                    // add bounce-in animation
                    self.images[i].classList.add("cd-timeline__img--bounce-in");
                    self.contents[i].classList.add("cd-timeline__content--bounce-in");
                    self.images[i].classList.remove("cd-is-hidden");
                    self.contents[i].classList.remove("cd-is-hidden");
                }
            })(i);
        }
    };

    var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
        verticalTimelinesArray = [],
        scrolling = false;
    if( verticalTimelines.length > 0 ) {
        for( var i = 0; i < verticalTimelines.length; i++) {
            (function(i){
                verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
            })(i);
        }

        //show timeline blocks on scrolling
        window.addEventListener("scroll", function(event) {
            if( !scrolling ) {
                scrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
            }
        });
    }

    function checkTimelineScroll() {
        verticalTimelinesArray.forEach(function(timeline){
            timeline.showBlocks();
        });
        scrolling = false;
    }

    // Functions below this point should be genericized, so we can have more than one timeline per page.

    // Whatever str this's innerText currently is, flip to the other str.
    function toggleInnerText(element, str1, str2) {
        if (element.innerText == str1) {
            element.innerText = str2;
        } else {
            element.innerText = str1;
        }
    }

    VerticalTimeline.prototype.toggleElements = function(className) {
        Array.from(document.getElementsByClassName(className)).forEach(function (element) {
             if (element.parentElement.classList.contains('cd-is-display-none')) {
                 element.parentElement.classList.remove('cd-is-display-none');
             } else {
                 element.parentElement.classList.add('cd-is-display-none');
             }
            }
        );
	};

    Array.from(document.getElementsByClassName('toggleBooks')).forEach(
        function(element) {
            element.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(element)) {
                        timeline.toggleElements('cd-timeline__img--book');
                    }
                });
                toggleInnerText(element, "Show Books", "Hide Books");
                checkTimelineScroll();
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleCensuses')).forEach(
        function(element) {
            element.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(element)) {
                        timeline.toggleElements('cd-timeline__img--census');
                    }
                });
                toggleInnerText(element, "Show Censuses", "Hide Censuses");
                checkTimelineScroll();
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleComments')).forEach(
        function(element) {
            element.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(element)) {
                        timeline.toggleElements('cd-timeline__img--comment');
                    }
                });
                toggleInnerText(element, "Show Comments", "Hide Comments");
                checkTimelineScroll();
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleMaps')).forEach(
        function(element) {
            element.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(element)) {
                        timeline.toggleElements('cd-timeline__img--location');
                    }
                });
                toggleInnerText(element, "Show Maps", "Hide Maps");
                checkTimelineScroll();
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleNewspapers')).forEach(
        function(element) {
            element.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(element)) {
                        timeline.toggleElements('cd-timeline__img--newspaper');
                    }
                });
                toggleInnerText(element, "Show Newspapers", "Hide Newspapers");
                checkTimelineScroll();
            })
        }
    );
})();
