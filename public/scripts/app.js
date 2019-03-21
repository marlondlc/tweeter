//import { callbackify } from "util";

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

$(function () {                                             // this can be written like this "$(document).ready(){}"

  //Week 3 Day 2 -     Creating the Tweets[0][1] etc:
  function renderTweets(tweets) {
    tweets.forEach(tweet => {                               // calls createTweetElement for each tweet
      createTweetElement(tweet);
      $('#tweet-container').append(tweet);                  // takes return value and appends it to the tweets container
    });
  }
  renderTweets(data)                                        // pushes the Data structure into renderTweets() and singling them out.

  //Week 3 Day 2 - Dynamic Tweets Assignment:
  function createTweetElement(tweet) {                      //this "f()" will give you the structure on how you want your data to display
    //var $tweet = createTweetElement(data);
    let container = $("#tweet-container");
    console.log(tweet)
    let bossTweet = $("<article />");
    let header = $("<header>").addClass("userHeader")
    let avatarDiv = $('<div>').addClass("img-user")
    let image = $("<img>").addClass("tweetLogo").attr("src", tweet.user.avatars.small)
    let userName = $("<h1>").addClass("user-name").text(tweet.user.name)
    let userId = $("<h3>").addClass("userId").text(tweet.user.handle)
    let textAndPostDate = $("<div>").addClass("textAndPostDate")
    let textPost = $("<p>").addClass("post-tweet").text(tweet.content.text)
    let footer = $("<footer>").addClass("time-stamp")
    let timeStamp = $("<div>").text(tweet.created_at)
    let iconContainer = $("<div>")
    let retweet = $("<img>").addClass("bottomIcons")
    let flag = $("<img>").addClass("bottomIcons")
    let like = $("<img>").addClass("bottomIcons")


    avatarDiv.append(image).append(userName)
    header.append(avatarDiv).append(userId)

    iconContainer.append(retweet).append(flag).append(like)
    footer.append(timeStamp).append(iconContainer)
    textAndPostDate.append(textPost).append(footer)

    bossTweet.append(header).append(textAndPostDate)

    container.append(bossTweet);
    //return $tweet;                                            // no need to return this function is running its course of adding a new structure for tweet

  }

  //Week 3 Day 3 - Form Submission using JQuery Assignment:
  $("form").on("submit", function (event) {                   //in this case"form" is fine but in the future use a "class"/"ID"
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');

    const requestOptions = {
      method: "POST",
      url: "/tweets",
      dataType: "json",
      data: $(this).serialize()
    };


    $.ajax(requestOptions)                                      // varaialbe  above needs to be pushed inside ( )
      .done(response => { console.log(response); })
      .fail(err => { `Error: ${err}` })                         // Any error with the request
      .always(() => { console.log('Request completed'); });     // This will get executed in any case


    // const input = $(".textbox")                                 //in this case"textarea" is fine but in the future use a "class"/"ID"
    //console.log(input.val())
    // if (input.val()) {                                          // ".val()" returns a value
    //   createTweetElement(input.val());                          // call the f() with the value "textarea"
    //   input.val("")                                             // after this is done empty the "textArea" with .val(" ") (space between the " ")
    // }


    // //console.log(tweet);                                       // to see what it looks like
    // $('.container').prepend(tweet);                             // push the new tweet structure inside the body container "prepend" instead of "append" because pre comes before so on top of the rest
  })


})