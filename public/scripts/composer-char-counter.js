$(document).ready(function() {
  // --- our code goes here ---
  console.log("Working");
  $('textarea').keyup(event,function() {
    let $input = $(this);
    let $form = $input.parent();
    let $counter = $form.find('.counter');
    let len = $input.val().length;
    const max = 140;
    let remainingChars = max - len;
    $counter.text(remainingChars);
    if (remainingChars < 0) {
      $counter.addClass('red');
    } else {
      $counter.removeClass('red');
    }
  })
});