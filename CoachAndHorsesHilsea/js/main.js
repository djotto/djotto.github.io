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

    VerticalTimeline.prototype.toggle = function(name, button) {
        Array.from(this.blocks).forEach(function(block) {
            if (block.firstElementChild.classList.contains('cd-timeline__img--' + name)) {
                // Toggle display:none class.
                if (block.classList.contains('cd-is-display-none')) {
                    block.classList.remove('cd-is-display-none');
                } else {
                    block.classList.add('cd-is-display-none');
                }
            }
        });
        // Toggle Show/Hide on the button that was pressed.
        console.log(button.innerText);
        if (button.innerText.includes('Show')) {
            button.innerText = button.innerText.replace('Show', 'Hide')
        } else {
            button.innerText = button.innerText.replace('Hide', 'Show')
        }
        checkTimelineScroll();
    };

    Array.from(document.getElementsByClassName('toggleBooks')).forEach(
        function(button) {
            button.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(button)) {
                        timeline.toggle('book', button);
                    }
                });
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleCensuses')).forEach(
        function(button) {
            button.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(button)) {
                        timeline.toggle('census', button);
                    }
                });
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleComments')).forEach(
        function(button) {
            button.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(button)) {
                        timeline.toggle('comment', button);
                    }
                });
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleMaps')).forEach(
        function(button) {
            button.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(button)) {
                        timeline.toggle('location', button);
                    }
                });
            })
        }
    );

    Array.from(document.getElementsByClassName('toggleNewspapers')).forEach(
        function(button) {
            button.addEventListener('click', function () {
                verticalTimelinesArray.forEach(function (timeline) {
                    if (timeline.element.contains(button)) {
                        timeline.toggle('newspaper', button);
                    }
                });
            })
        }
    );
})();
