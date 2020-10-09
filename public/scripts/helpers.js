
const createTweetElement = function(tweetData) {
  let output = ""; 
  output += `<article class="tweet">`;
  output += `<header>`;
  output += ` <div>`;
  output += `<img src="${tweetData["user"]["avatars"]}" class="avatar">`;
  output += `<h4> <span class="not-bold">${tweetData["user"]["name"]}</span></h4>`;
  output += `</div>`;
  output += `<span class="handle">${tweetData["user"]["handle"]}</span>`
  output += `</header>`;
  output += `<p>${escape(tweetData["content"]["text"])}</p>`;
  output += `<footer>`
  output += `<span>${moment(tweetData["created_at"]).fromNow()}</span>`;
  output += `<div>`;
  output += `<i class="fas fa-flag"></i>`;
  output += `<i class="fas fa-retweet"></i>`;
  output += `<i class="fas fa-heart"></i>`;
  output += `</div>`;
  output += `</footer>`;
  output += `</article>`;

  return output;

};


const renderTweets = function(tweets) {
  for (const item of tweets) {
    const $tweet = createTweetElement(item);
    $('.tweets-container').append($tweet);
  }  
};

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Form submission using jQuery
const createTweet = function(event) {
  event.preventDefault();
  const $form = $(this);
  let $input = $form.find('#tweet-text');
  let $tweetContent = $input.val();
  const serializedData = $input.serialize();
  $('.error').hide(); 
  if ($tweetContent === "" || $tweetContent === null) {
    $('.error').removeClass("hidden");
    $('.error').slideDown(500); 
    $('.error').children('span').text("Please enter a tweet");    
    return;
  } else if ($tweetContent.length > 140) {
    $('.error').slideDown(500);  
    $('.error').removeClass("hidden");
    $('.error').children('span').text("The tweet is too long. Please limit to 140 characters");
    return;
  } else {
    $('.error').addClass("hidden");
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: serializedData
    }).then(() => {
      $('.tweets-container').empty();
      loadTweets();
      this.reset();
      $('.counter').text("140");
    });
  }
};

const loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  }).then((tweets) => {
    console.log(tweets);
    renderTweets(tweets);
  });
};