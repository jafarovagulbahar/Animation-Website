	
// variables
var $header_top = $('.header-top');
var $nav = $('nav');



// toggle menu 
$header_top.find('a').on('click', function() {
  $(this).parent().toggleClass('open-menu');
});



// fullpage customization
$('#fullpage').fullpage({
  // sectionsColor: ['#B8AE9C', '#348899', '#F2AE72', '#5C832F', '#B8B89F'],
  sectionSelector: '.vertical-scrolling',
  slideSelector: '.horizontal-scrolling',
  navigation: true,
  slidesNavigation: true,
  controlArrows: false,
  anchors: ['home', 'about', 'service', 'contact'],
  menu: '#menu',

  // afterLoad: function(anchorLink, index) {
  //   $header_top.css('background', 'rgba(0, 47, 77, .3)');
  //   $nav.css('background', 'rgba(0, 47, 77, .25)');
  //   if (index == 5) {
  //       $('#fp-nav').hide();
  //     }
  // },

  // onLeave: function(index, nextIndex, direction) {
  //   if(index == 5) {
  //     $('#fp-nav').show();
  //   }
  // },

  // afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
  //   if(anchorLink == 'fifthSection' && slideIndex == 1) {
  //     $.fn.fullpage.setAllowScrolling(false, 'up');
  //     $header_top.css('background', 'transparent');
  //     $nav.css('background', 'transparent');
  //     $(this).css('background', '#374140');
  //     $(this).find('h2').css('color', 'white');
  //     $(this).find('h3').css('color', 'white');
  //     $(this).find('p').css(
  //       {
  //         'color': '#DC3522',
  //         'opacity': 1,
  //         'transform': 'translateY(0)'
  //       }
  //     );
  //   }
  // },

  // onSlideLeave: function( anchorLink, index, slideIndex, direction) {
  //   if(anchorLink == 'fifthSection' && slideIndex == 1) {
  //     $.fn.fullpage.setAllowScrolling(true, 'up');
  //     $header_top.css('background', 'rgba(0, 47, 77, .3)');
  //     $nav.css('background', 'rgba(0, 47, 77, .25)');
  //   }
  // } 
}); 

// =========== Mouse Move ============
var cursor = $(".cursor"),
    follower = $(".cursor-follower");

var posX = 0,
    posY = 0;
var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function(){           
    posX += (mouseX - posX) / 9;  
    posY += (mouseY - posY) / 9;  
    
    TweenMax.set(follower, {
      css: {
        left: posX - 12,
        top: posY - 12
      }
    });
    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
    });
  } 
})

$(document).on("mousemove", function(e){    
  mouseX = e.pageX;
  mouseY = e.pageY;
});

$(".link").on("mouseenter",function(){
  cursor.addClass("active");
  follower.addClass("active");
});

$(".link").on("mouseleave",function(){
  cursor.removeClass("active");
  follower.removeClass("active");
});


//=========== Animation Write Style========
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };