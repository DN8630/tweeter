
const createTweetElement = function(tweetData) {
  let output = ""; 
  output += `<article class="tweet">`;
  output += `<header>`;
  output += ` <div>`;
  output += `<img src="images/img_avatar.png" class="avatar">`;
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
  $.ajax({
    url: '/tweets/',
    method: 'POST',
    data: serializedData
  })
  
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