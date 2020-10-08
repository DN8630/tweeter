
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
  output += `<p>${tweetData["content"]["text"]}</p>`;
  output += `<footer>`
  output += `<span>${tweetData["created_at"]}</span>`;
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


// Form submission using jQuery
const createTweet = function(event) {
  event.preventDefault();
  const $form = $(this);
  let $input = $form.find('#tweet-text');
  let $tweetContent = $input.val();
  const serializedData = $input.serialize();
  if ($tweetContent === "" || $tweetContent === null) {
    alert("Please enter a Tweet.");
    console.log("After alert in empty");
    return;
  } else if ($tweetContent.length > 140) {
    alert("The tweet is too long. Please limit to 140 characters");
    return;
  } else {
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: serializedData
    }).then(() => {
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