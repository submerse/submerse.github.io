// shared behaviour for every page — loaded at the bottom of each page
(function(){
  // 1. gallery lightbox: any <img> inside .shots opens fullscreen on click
  var shots = document.querySelectorAll('.shots img');
  if (shots.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<span class="x">✕</span><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    shots.forEach(function(img){
      img.addEventListener('click', function(){
        lbImg.src = img.src; lbImg.alt = img.alt;
        lb.classList.add('open');
      });
    });
    lb.addEventListener('click', function(){ lb.classList.remove('open'); });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') lb.classList.remove('open');
    });
  }

  // 2. click-to-play videos: YouTube is only contacted after the visitor clicks
  document.querySelectorAll('.video .yt').forEach(function(a){
    a.addEventListener('click', function(e){
      e.preventDefault();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + a.dataset.id + '?autoplay=1';
      f.title = a.dataset.title || 'video';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      a.replaceWith(f);
    });
  });
})();
