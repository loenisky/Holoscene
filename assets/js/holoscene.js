$(document).ready(function() {
  $(".parallax-container").mousemove(function(e) {
    let screenWidth = $(window).width();
    let screenHeight = $(window).height();

    $(".parallax").css({
      transform:
        "translate(-" +
        e.pageX / screenWidth * 20 +
        "px, -" +
        e.pageY / screenHeight * 20 +
        "px)"
    });

    $(".parallax .title").css({
      transform:
        "translate(" +
        e.pageX / screenWidth * 45 +
        "px, " +
        e.pageY / screenHeight * 45 +
        "px)"
    });
  });
});

console.clear();
var _data = JSON.parse(
  `{"lyrics":[{"line":"holoscene","time":-1},{"line":"Bon Iver","time":17500},{"line":" ","time":28000},{"line":"Someway baby it's part of me","time":37000},{"line":"apart from me","time":40000},{"line":" ","time":42000},{"line":"You're laying waste","time":47300},{"line":"to Halloween","time":49000},{"line":" ","time":51400},{"line":"You fucked it friend","time":55500},{"line":"it's on its head","time":57000},{"line":"it struck the street","time":58800},{"line":" ","time":60800},{"line":"You're in Milwaukee","time":66000},{"line":"off your feet","time":67700},{"line":" ","time":70500},{"line":"And at once I knew","time":74000},{"line":"I was not","time":77000},{"line":"magnificent","time":78500},{"line":" ","time":81000},{"line":"Strayed above","time":90500},{"line":"the highway aisle","time":93100},{"line":" ","time":97600},{"line":"Jagged vacance","time":105000},{"line":" thick with ice","time":108000},{"line":" ","time":112000},{"line":"but I could see for","time":115700},{"line":"miles","time":116700},{"line":"miles","time":117200},{"line":"miles","time":117700},{"line":" ","time":120000},{"line":"3rd and Lake","time":123800},{"line":"it burnt away","time":125200},{"line":"the hallway","time":126650},{"line":" ","time":129000},{"line":"Was where we learned","time":134000},{"line":"to celebrate","time":136000},{"line":" ","time":139000},{"line":"Automatic","time":142400},{"line":"bought the years","time":143900},{"line":"you'd talk for me","time":145300},{"line":" ","time":148000},{"line":"that night you played me","time":152800},{"line":"lip parade","time":154500},{"line":" ","time":156800},{"line":"Not the needle","time":161000},{"line":"nor the thread","time":162600},{"line":"the lost decree","time":164000},{"line":" ","time":167000},{"line":"saying nothing that's","time":171000},{"line":"enough for me","time":173000},{"line":" ","time":175000},{"line":"And at once I knew","time":179500},{"line":"I was not magnificent","time":182600},{"line":" ","time":186000},{"line":"hulled","time":195000},{"line":"far from","time":196500},{"line":"the highway aisle","time":198000},{"line":" ","time":201500},{"line":"jagged vacance","time":210000},{"line":"thick with ice","time":213000},{"line":" ","time":216000},{"line":"I could see for","time":220500},{"line":"miles","time":221500},{"line":"miles","time":222000},{"line":"miles","time":222500},{"line":" ","time":225500},{"line":"Christmas night","time":232000},{"line":"it clutched the light","time":233500},{"line":" ","time":235600},{"line":"the hallow bright","time":237100},{"line":" ","time":237600},{"line":"above my brother I","time":248000},{"line":"and tangled spines","time":251000},{"line":" ","time":253000},{"line":"we smoked the screen","time":254000},{"line":"to make it what","time":255500},{"line":"it was to be","time":257500},{"line":" ","time":259000},{"line":"now to know it in","time":265500},{"line":"my memory","time":267000},{"line":" ","time":270000},{"line":"and at once I knew","time":273500},{"line":"I was not","time":277000},{"line":"magnificent","time":278500},{"line":" ","time":281000},{"line":"high above","time":290000},{"line":"the highway aisle","time":293200},{"line":" ","time":296300},{"line":"jagged vacance","time":306500},{"line":"thick with ice","time":309500},{"line":" ","time":312000},{"line":"I could see for","time":316500},{"line":"miles","time":318000},{"line":"miles","time":318500},{"line":"miles","time":319000},{"line":" ","time":320000},{"line":"holoscene","time":321000}]}`
);
var currentLine = "";

function align() {
  var a = $(".highlighted").height();
  var c = $(".content").height();
  var d =
    $(".highlighted").offset().top -
    $(".highlighted")
      .parent()
      .offset().top;
  var e = d + a / 2 - c / 2;
  $(".content").animate(
    { scrollTop: e + "px" },
    { easing: "swing", duration: 900 }
  );
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
  if ($(".lyrics").height() != lyricHeight) {
    //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
    lyricHeight = $(".lyrics").height();
    align();
  }
});

$(document).ready(function() {
  $("video").on("timeupdate", function(e) {
    var time = this.currentTime * 1000;
    var past = _data["lyrics"].filter(function(item) {
      return item.time < time;
    });
    if (_data["lyrics"][past.length] != currentLine) {
      currentLine = _data["lyrics"][past.length];
      $(".lyrics div").removeClass("highlighted");
      $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
      align();
    }
  });
});

generate();

function generate() {
  var html = "";
  for (var i = 0; i < _data["lyrics"].length; i++) {
    html += "<div";
    if (i == 0) {
      html += ` class="highlighted"`;
      currentLine = 0;
    }
    if (_data["lyrics"][i]["note"]) {
      html += ` note="${_data["lyrics"][i]["note"]}"`;
    }
    html += ">";
    html += _data["lyrics"][i]["line"] == "" ? "•" : _data["lyrics"][i]["line"];
    html += "</div>";
  }
  $(".lyrics").html(html);
  align();
}
