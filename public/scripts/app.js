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


$(function () {        // this can be written like this "$(document).ready(){}"

  function renderTweets(tweets) {
    // calls createTweetElement for each tweet
    tweets.forEach(tweet => {

      createTweetElement(tweet.val());  // takes return value and appends it to the tweets container
      $('#tweet-container').append(tweet);
    });
  }

  renderTweets(data)


  function createTweetElement(tweet) {
    var $tweet = createTweetElement(data);
    let container = $("#tweet-container")

    let bossTweet = $("<article />");  // 1-tweet content pass it to a "new/created" article than place it in sectio
    let header = $("<header>").addClass("userHeader")
    let avatarDiv = $('<div>').addClass("img-user")
    let image = $("<img>").addClass("tweetLogo").attr("src", tweet.user.avatars.small)
    let userName = $("<h1>").addClass("user-name").text(tweet.user.name)

    avatarDiv.append(image).append(userName)

    let userId = $("<h3>").addClass("userId").text(tweet.user.handle)

    header.append(avatarDiv).append(userId)

    let textAndPostDate = $("<div>").addClass("textAndPostDate")

    let textPost = $("<p>").addClass("post-tweet").text(tweet.content.text)

    let footer = $("<footer>").addClass("time-stamp")
    let timeStamp = $("<div>").text(tweet.created_at)

    let iconContainer = $("<div>")
    let retweet = $("<img>").addClass("bottomIcons")
    let flag = $("<img>").addClass("bottomIcons")
    let like = $("<img>").addClass("bottomIcons")

    iconContainer.append(retweet).append(flag).append(like)
    footer.append(timeStamp).append(iconContainer)
    textAndPostDate.append(textPost).append(footer)


    bossTweet.append(header).append(textAndPostDate)
    //this function within your loop


    container.append(bossTweet);

    return $(tweets)
  }


  $("form").on("submit", function (event) {               // 2-once the button ("tweet") is submitted run function in code
    event.preventDefault();

    const input = $("textarea")
    if (input.val()) {                                    // 3- ".val()" returns a value
      createTweetElement(input.val());                    // call the f() with the value "textarea"
      input.val("")                                      // after this is done empty the "textArea" with .val(" ") (space between the " ")
    }

    //console.log(tweet);                                    // to see what it looks like
    $('.container').append(tweet);                         // push the new tweet structure inside the body container
  })

})


// let $tweet = $("<article>").addClass(".user-tweet");
// let header = $("<header>");
// let h1 = $("<h1>").text(json.user.name);
// let h2 = $("<h2>").attr("src", json.user.avatars.regular);
// let h3 = $("<h3>").text(json.user.handle);
// let p = $("<p>").text(json.content.text);
// let footer = $("<footer>").text(json.created_at);

// $("h1").appendTo("header");
// $("h2").appendTo("header"); //not sure if append or appendTO
// $("h3").appendTo("header");
// $("$tweet").append("header");
// $("$tweet").append("p");
// $("$tweet").append("footer");