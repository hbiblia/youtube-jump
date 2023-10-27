
let url_hitory, url_history_current;
let url_change = false
const url_check_time = 1000
const iframe_id_str = btoa(crypto.randomUUID())
const iframe_id = "#" + iframe_id_str

let youtube_jump = function () {
  let i = setInterval(function () {
    if ($('#player') != null && location.search != '') {
      // clearInterval(i)

      // para el cambio de la url
      url_hitory = location.search
      if (url_hitory != url_history_current) url_change = true;

      // cuando aun no tenemos el custom_youtube
      if (document.querySelector(iframe_id) == null) {
        $('#player').append(`<iframe id="${iframe_id_str}" style="width:100%; height:100%; z-index:99; position:absolute; top:0;left:0;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
        url_change = true
      }

      // Cuando cambiamos de video
      if (url_change) {
        url_change = false
        url_history_current = url_hitory
        let url_code = location.search.split('=')[1].split('&')[0]

        $(iframe_id).attr('src', `https://www.youtube-nocookie.com/embed/${url_code}`)
        url_empty = false
      }
    }

    // Estamos en la pagina principal
    if (location.search == '' && url_change == false) {
      url_change = true
      $(iframe_id).attr('src', ``)
    }
  }, url_check_time);
}

$(function () {
  youtube_jump()

  $(window).on('resize', function (event) {
    let e = $('#player')
    let w = e.width()
    let h = e.height()
    $(iframe_id).css({ 'width': w + 'px', 'height': h + 'px' })
  })

});
