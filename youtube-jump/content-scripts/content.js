
let url_hitory, url_history_current;
let url_change = false
let url_check_time = 1000
let iframe_paste = false
let iframe_id = "custom_y"

let youtube_jump = function () {
  let i = setInterval(function () {
    if ($('#player') != null && location.search != '') {
      // clearInterval(i)
      url_hitory = location.search

      if (url_hitory != url_history_current) url_change = true;

      if ($(`#${iframe_id}`) == null){
        iframe_paste = false
      }

      if (url_change) {
        url_change = false
        url_history_current = url_hitory
        let url_code = location.search.split('=')[1].split('&')[0]

        if (!iframe_paste) {
          iframe_paste = true
          $('#player').append(`<iframe id="${iframe_id}" style="width:100%; height:100%; z-index:99; position:absolute; top:0;left:0;" src="https://www.youtube-nocookie.com/embed/${url_code}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
        }

        $(`#${iframe_id}`).attr('src', `https://www.youtube-nocookie.com/embed/${url_code}`)
      }
    }
  }, url_check_time);
}

$(function () {
  youtube_jump()
  $(window).on('resize', function (event) {
    let e = $('#player')
    let w = e.width()
    let h = e.height()
    $(`#${iframe_id}`).css({ 'width': w + 'px', 'height': h + 'px' })
  })
});
