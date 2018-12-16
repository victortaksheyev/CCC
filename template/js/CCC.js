// ----------------------------------------------------------------------------------------------
// Start BuildTOC
// ----------------------------------------------------------------------------------------------

// Use:
// In main section ->
/*

  --- Define a section like this ---
  --- section_[ID]               ---
  --- First link is toc name     ---
  --- "_[ID]"                    ---

  <section id="section_JSIYWS">
    <a id="_JSIYWS">
      <h1>
        <codeG>Javascript In Your Website</codeG>
      </h1>
    </a>
  </section>

  --- Define a subSection like this ---
  --- Use 0 to prefix the link      ---
  <a id="0AST">
    <h2>Adding <code class="prettifyJS">&lt;script></code> tags:</h2>
  </a>
*/


// For TOC -
// Structure:
// Root
//  <ul id="toc">
// Header
//  <li class="navListItem"><a class="navItem" href="#_[ID]"><codeG>[H1]</codeG></a></li>
// Section
//  <section id="TOC_[ID]">
// Section Item
//  <li class="navListItem"><a class="navItem" href="#[ID]">[H2]</a></li>

// For Body -
// Section header/container
//  <section id="section_JSIYWS">
// Section Title
//  <a id="_JSIYWS"><h1><codeG>Javascript In Your Website</codeG></h1></a>
// Section Subtitle
//  <a id="0AST"><h2>Adding <code class="prettifyJS">&lt;script></code> tags:</h2></a>

// For sections
let sections = new Array();
let subSections = new Array();

function buildTOCSubHeaders() {
  for (var i = 0; i < subSections.length; i++) {
    for (var j = 0; j < subSections[i].length; j++) {
      let tocname = sections[i].id;
      let name = subSections[i][j].id;
      let text = $(subSections[i][j])[0].innerText;
      text = text.replace(/</g, "&lt;")
      $id = $("head").attr('id');
      if ($id == "php") {
        $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'><span class='code prettifyPHP'>" + text + "</span></a></li>")
      } else if ($id == "js") {
        $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'><span class='code prettifyJS'>" + text + "</span></a></li>")
      } else if ($id == "css") {
        $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'><span class='code prettifyCSS'>" + text + "</span></a></li>")
      } else if ($id == "html") {
        $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'><span class='code prettifyHTML'>" + text + "</span></a></li>")
      } else if ($id == "sql") {
        $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'><span class='code prettifySQL'>" + text + "</span></a></li>")
      } else if ($id == "result") {
        $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'><span class='code prettifyResult'>" + text + "</span></a></li>")
      } else {
        $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'>" + text + "</a></li>")
      }
      $("#TOC" + tocname).append($temp);
    }
  }
}

function populateTOC() {
  $("#tocHook").addClass("toc")
  var tocTitle = $("#tocHook").text()
  $("#tocHook").text("")
  $("#tocHook").append($(
    `<a href="#top">
          <h3 class="navTitle">` + tocTitle + `</h3>
     </a>`
  ));

  $("#tocHook").append($("<ul id='tocDynamic'><ul>"));
  for (var i = 0; i < sections.length; i++) {
    let name = sections[i].id;
    let text = ($(sections[i]).find("a")[0].innerText);
    $temp = $("<li class='navListItem'><a class='navItem' href='#" + name + "'><span class='code prettifyResult'>" + text + "</span></a></li>")
    $("#tocDynamic").append($temp);
    $temp = $("<section id='TOC" + name + "'>")
    $("#tocDynamic").append($temp);
  }
}

function buildTOCArrays() {
  sections = $("#tocContent").find("section");

  for (var i = 0; i < sections.length; i++) {
    subSections[i] = new Array();
    let tempSub = $(sections[i]).find("a")
    for (var j = 0; j < tempSub.length; j++) {
      if (tempSub[j].id[0] == "0") {
        subSections[i].push(tempSub[j])
      }
    }
  }
}

jQuery(document).ready(
  function() {
    buildTOCArrays();
    populateTOC();
    buildTOCSubHeaders();
  });
// ----------------------------------------------------------------------------------------------
// End BuildTOC
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// Start prettyPrint
// ----------------------------------------------------------------------------------------------

$(document).ready(
  function() {
    prettyPrint();
  });

// ----------------------------------------------------------------------------------------------
// End prettyPrint
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// Start smoothscroll
// ----------------------------------------------------------------------------------------------
jQuery(document).ready(function() {
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        // console.log(this.hash[1]);
        if (this.hash[1] != '-') {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
            });
          }
        }
      }
    });
});

// ----------------------------------------------------------------------------------------------
// End smoothscroll
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// Start TOC
// ----------------------------------------------------------------------------------------------
let TOC_names = [];
let TOC_break = [];

function createTOC() {
  // BUILD: TOC Table //
  for (var i = 0; i < $("#tocContent").find("section").length; i++) {
    TOC_names.push($("#tocContent").find("section")[i].id)
  }
  // BUILD: TOC Break Table //
  TOC_break = [];
  for (var i = 0; i < TOC_names.length; i++) {
    TOC_break.push(document.getElementById(TOC_names[i]).getBoundingClientRect().y);
  }
}

function updateTOC() {
  for (var i = 0; i < TOC_names.length; i++) {
    document.getElementById('TOC' + TOC_names[i]).style.display = "none";
  }
  for (var i = TOC_break.length - 1; i >= 0; i--) {
    if ((currScroll) >= startScroll + TOC_break[i] - 1) {
      document.getElementById('TOC' + TOC_names[i]).style.display = "inline";
      return;
    }
  }

  if (currScroll <= (startScroll + TOC_break[0] - 1)) {
    document.getElementById('TOC' + TOC_names[0]).style.display = "inline";
  }
}

// ----------------------------------------------------------------------------------------------
// End TOC
// ----------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------
// Start Scrolling
// ----------------------------------------------------------------------------------------------
var maxScroll = 0;
var currScroll = 0;
var startScroll = 0;

$(document).ready(function() {
  maxScroll = document.body.scrollHeight - window.innerHeight;
  startScroll = $(document).scrollTop();
  currScroll = startScroll;
  createTOC();
  updateTOC();
});

$(window).scroll(function() {
  maxScroll = document.body.scrollHeight - window.innerHeight;
  currScroll = $(document).scrollTop();
  updateTOC();
});

// ----------------------------------------------------------------------------------------------
// End Scrolling
// ----------------------------------------------------------------------------------------------