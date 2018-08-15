(function(){
    // Vertical Timeline - by CodyHouse.co
    function VerticalTimeline( element ) {
        this.element = element;
        this.blocks = this.element.getElementsByClassName("js-cd-block");
        this.images = this.element.getElementsByClassName("js-cd-img");
        this.contents = this.element.getElementsByClassName("js-cd-content");
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
    };

    // Functions below this point should be genericized, so we can have more than one timeline per page.

    // Flip display:none on an element on or off.
    function toggleClass(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        } else {
            element.classList.add(className);
        }
    };

    // Flip cd-is-display-none on all parent elements of elements with class className.
    function toggleAllDisplayNone(className) {
        elements = document.getElementsByClassName(className);
        for (var i = 0; i < elements.length; i++) {
            toggleClass(elements[i].parentElement, 'cd-is-display-none');
        }
    }

    // Whatever str this's innerText currently is, flip to the other str.
    function toggleInnerText(element, str1, str2) {
        if (element.innerText == str1) {
            element.innerText = str2;
        } else {
            element.innerText = str1;
        }
    }

    document.getElementById('toggleNewspapers').addEventListener('click', function() {
        toggleAllDisplayNone('cd-timeline__img--newspaper');
        toggleInnerText(this, 'Hide Newspapers', 'Show Newspapers');
        checkTimelineScroll();
    });
    document.getElementById('toggleBooks').addEventListener('click', function() {
        toggleAllDisplayNone('cd-timeline__img--book');
        toggleInnerText(this, 'Hide Books', 'Show Books');
        checkTimelineScroll();
    });
    document.getElementById('toggleComments').addEventListener('click', function() {
        toggleAllDisplayNone('cd-timeline__img--comment');
        toggleInnerText(this, 'Hide Comments', 'Show Comments');
        checkTimelineScroll();
    });
    document.getElementById('toggleMaps').addEventListener('click', function() {
        toggleAllDisplayNone('cd-timeline__img--location');
        toggleInnerText(this, 'Hide Maps', 'Show Maps');
        checkTimelineScroll();
    });
    document.getElementById('toggleCensuses').addEventListener('click', function() {
        toggleAllDisplayNone('cd-timeline__img--census');
        toggleInnerText(this, 'Hide Censuses', 'Show Censuses');
        checkTimelineScroll();
    });

})();