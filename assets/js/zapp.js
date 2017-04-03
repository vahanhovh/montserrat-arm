$(document).ready(function(){
  var values = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 64, 72];
  $('#slider').slider({
    animate: true,
    value: 7,
    range: 'min',
    min: 0,
    max: values.length-1,
    step: 1,
    slide: function( event, ui ) {
      $('.current-size').text(values[ui.value] + 'px');
      $('.font-test').css('font-size', values[ui.value] + 'px');
    }
  });
  scrollThenFix();
  scrollSpy();
  var wow = new WOW();
  wow.init();
})

$(document).on('click', '.navigation a', function(e){
  e.preventDefault();
  var el = $(this).attr('href');
  var pos = $(el).offset().top;
  $('html, body').animate({scrollTop: pos}, 500, 'swing');
})

$(document).on('paste', '.font-test', function(e) {
  e.preventDefault();
  var text = '';
  if (e.clipboardData || e.originalEvent.clipboardData) {
    text = (e.originalEvent || e).clipboardData.getData('text/plain');
  } else if (window.clipboardData) {
    text = window.clipboardData.getData('Text');
  }
  if (document.queryCommandSupported('insertText')) {
    document.execCommand('insertText', false, text);
  } else {
    document.execCommand('paste', false, text);
  }
});

$(window).scroll(function(){
  scrollThenFix();
  scrollSpy();
})

function scrollThenFix() {
  if($(window).scrollTop() > 60) {
    $('.navigation').addClass('fixed');
  } else {
    $('.navigation').removeClass('fixed');
  }
}

function scrollSpy() {
  var sections = ['#preview', '#test-font', '#symbols', '#license', '#download'];
  var offsets = [];
  var offset, i;
  var scrollTop = $(window).scrollTop();
  var number = sections.length;
  for(i = number-1; i >= 0; i--) {
    offset = $(sections[i]).offset().top;
    offsets.push({'section': sections[i], 'offset': offset});
  }
  for(i = 0; i < number; i++) {
    if(scrollTop > offsets[i].offset-128) {
      $('.navigation a').removeClass('active');
      $('a[href="'+offsets[i].section+'"]').addClass('active');
      break;
    }
  }
  if(scrollTop < offsets[number-1].offset-128) {
    $('.navigation a').removeClass('active');
  }
  if(scrollTop > $(document).height() - $(window).height() - 128) {
    $('.navigation a').removeClass('active');
    $('.navigation a[href="#download"]').addClass('active');
  }
}

var testFont = new Vue({
  el: '#test-font',
  data: {
    open: false,
    currentWeight: 'Regular',
    fontWeight: '-regular',
    bg: 'test-grey'            
  },
  methods: {
    changeBg: function (value) {
      this.bg = value;
    },
    changeWeight: function (value, name) {
      this.fontWeight = value;
      this.currentWeight = name;
    }
  }
})

var symbols = new Vue({
  el: '#symbols',
  data: {
    open: false,
    currentWeight: 'Regular',
    fontWeight: '-regular',
    currentType: 'letters',
    currentIndex: 0,
    letters: letters,
    ligatures: ligatures,
    symbols: symbols
  },
  computed: {
    toDisplay: function() {
      return this[this.currentType];
    }
  },
  methods: {
    changeIndex: function(index) {
      this.currentIndex = index;
    },
    changeWeight: function (value, name) {
      this.fontWeight = value;
      this.currentWeight = name;
    },
    changeType: function (type) {
      this.currentIndex = 0;
      this.currentType = type;
    }
  }
})