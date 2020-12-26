
function player_to_top() {
  var player = document.getElementById('player_box');
  var body = document.getElementById('body_overlay');
  document.body.insertBefore(player, body);
}

// Play character is not being removed from title on pause (native js
// probably checking first char of title, which cvim controls). This
// leads to a stacking of tab# from cvim and play character from
// 8tracks.
function cvim_title_fix() {
  // The char added by background.js when the tab is no longer audible.
  const end_char = '.';

  var stop_playing = document.title.endsWith(end_char);
  var is_playing = !!document.title.match(/►/);
  if (!is_playing) { return; }

  var match = document.title.match(/([\s\d]*)([►\s\d]*\s)(.*)/);
  var new_title = match[1];
  if (!stop_playing) {
    new_title += '► ';
  }
  new_title += match[3];

  if (stop_playing) {
    while (new_title.endsWith(end_char)) {
      new_title = new_title.slice(0, -1);
    }
  }
  document.title = new_title;
}

player_to_top();
cvim_title_fix();
