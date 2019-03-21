$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    const maxChar = 140;
    const currentC = this.value.length;
    const count = maxChar - currentC;
    $(".counter").text(count);            // ".text" to see how it works

    if (count < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
