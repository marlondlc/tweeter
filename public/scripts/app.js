//import { callbackify } from "util";

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const request = (options, cb) => {

  $.ajax(options)

    .done(response => {
      cb(response);
    })

    .fail(err => {
      console.log(`Error: `)
      console.error(err)
    })

  // .always(() => {                                                           // in this project there is no propose of the ".always"
  //   console.log("Request complete")
  // });
};


function createTweetElement(tweet) {                                            // this "f()" will give you the structure on how you want your data to be display
  let container = $("#tweet-container");

  let bossTweet = $("<article />");
  let header = $("<header>").addClass("userHeader")
  let avatarDiv = $('<div>').addClass("img-user")
  let image = $("<img>").addClass("tweet-logo").attr("src", tweet.user.avatars.small)
  let userName = $("<h1>").addClass("user-name").text(tweet.user.name)
  let userId = $("<h3>").addClass("userId").text(tweet.user.handle)
  let textAndPostDate = $("<div>").addClass("textAndPostDate")
  let textPost = $("<p>").addClass("post-tweet").text(tweet.content.text)
  let footer = $("<footer>").addClass("time-stamp")
  let timeStamp = $("<div>").text(moment(tweet.created_at).fromNow())           //.text(you are  grabbing the data when it was created from server/routes/tweets "data"  using .from() will calculate from when -- linked in my index.html script!)
  let iconContainer = $("<div>")
  let flag = $("<img>").addClass("bottomIcons").attr("src", "/images/flag.png")
  let retweet = $("<img>").addClass("bottomIcons").attr("src", "/images/reload.png")
  let like = $("<img>").addClass("bottomIcons").attr("src", "/images/like.png")

  avatarDiv.append(image).append(userName)
  header.append(avatarDiv).append(userId)

  iconContainer.append(retweet).append(flag).append(like)
  footer.append(timeStamp).append(iconContainer)
  textAndPostDate.append(textPost).append(footer)

  bossTweet.append(header).append(textAndPostDate)

  return bossTweet
}


function renderTweets(tweets) {
  $('#tweet-container').empty()

  tweets.forEach(tweet => {                                    // calls createTweetElement for each tweet
    let strucTweet = createTweetElement(tweet);
    $('#tweet-container').prepend(strucTweet);                 // takes return value and appends it to the tweets container

  });
}


function loadTweets() {
  $.ajax({
    method: "GET",
    url: "/tweets"
  }).done(function (response) {
    renderTweets(response)
  })
}


function addFormEventHandler() {
  $("form").on("submit", function (event) {                   // in this case"form" is fine but in the future use a "class"/"ID"
    event.preventDefault();

    let tweetLength = $(".textbox").val().trim().length       // the value of the "textbox" length minus the "spaces before and after"(.trim()

    if (tweetLength > 140) {

      $(".error-message").slideDown(200, () => {              // calling my error-message asking it to slide down -- 200 is the speed
        setTimeout(function () {                              // giving it another function "setTimeOut" which is a CB of the above line
          $(".error-message").slideUp(200)                    // giving it another JQuery ("$()") slideUp () eventhandler to slideup the "text error msg i gave it" 200 is the time it take to open
        }, 1500)                                              // the amount of time i want my error msg to display for
      })

    } else if (tweetLength === 0) {
      $(".please-fill-in").slideDown(200, () => {             // calling my ".please-fill-in" asking it to slide down -- 200 is the speed
        setTimeout(function () {                              // giving it another function "setTimeOut" which is a CB of the above line
          $(".please-fill-in").slideUp(200)                   // giving it another JQuery $(".please-fill-in") slideUp () eventhandler to slideup the "text msg i gave it" 200 is the time it take to open
        }, 1500)                                              // the amount of time i want my error msg to display for
      })

    } else {

      const requestOptions = {                                // Creating the app.post route
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()                             // returns a query "string" // "[name of the input]=[text that was submitted]"
      };

      request(requestOptions, function () {

        loadTweets()
        $(".textbox").val("")                                 // this will empty the textbox after submitting it
        $(".counter").text("140")                             // this will reset the counter back to the amount you give it ".text()"
      });
    }
  })
}

function createComposeEventHandler() {                        // naming:  verb followed by some information "create"verb what are  you creating "ComposeEventHandler"
  $(".compose").click(function (event) {                      // ("compose").click(function(event))
    event.preventDefault();                                   // prevent it from being redirected
    $(".new-tweet").slideToggle(800);                         // .slideToggle( [duration ] [, complete ] ) //the parameters are optional
    $(".textbox").select();                                   // once the above is completed set the mouse to the textarea "textbox"
  })
}

//summary of whats going on in the "DOM"
$(function () {                                               // this can be written like this "$(document).ready(){}""
  loadTweets()                                                // load existing data tweets without the new
  addFormEventHandler()
  createComposeEventHandler()
})
