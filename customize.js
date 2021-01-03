
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

  while (new_title.endsWith(end_char)) {
    new_title = new_title.slice(0, -1);
  }
  document.title = new_title;
}

function repair_youtube_link(track_node) {
  var info = Array.from(track_node.querySelectorAll('.t,.a').values());
  info = info.map(node => node.innerText);
  var query = info
      .join(' ')
      .split(' ')
      .map(str => encodeURIComponent(str))
      .join('+');

  var yt = track_node.getElementsByClassName('yt');
  if (!yt || yt.length < 1) { return; }
  yt[0].href = 'https://www.youtube.com/results?search_query=' + query;
}

function repair_youtube_links() {
  // Replace links in main tracklist.
  var playlist = document.getElementById('tracks_played');
  if (playlist) {
    Array.from(playlist.childNodes).map(repair_youtube_link);
  }

  // Replace link in player.
  var player = document.getElementById('now_playing');
  if (player) {
    repair_youtube_link(player);
  }
}

player_to_top();
cvim_title_fix();
repair_youtube_links();
