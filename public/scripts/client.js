/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  //Render Dynamic Tweets
  renderTweets(data);

  // Form Submission using jQuery
  $('form').submit(createTweet);

});
