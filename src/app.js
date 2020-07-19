let themes = ['light','dark'];

function changeFavIconTo(theme) {
  if (theme === undefined) {
    theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  }
  let newThemeIndex = themes.indexOf(theme);
  let currentThemeIndex = !newThemeIndex * 1;
  var favicon = document.querySelector("link[rel*='icon']");
  favicon.href = favicon.href.replace(themes[currentThemeIndex], themes[newThemeIndex]);
}

// change theme (dark/light) base on user prefrences
let wantDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (wantDark) {
  document.body.classList.add('dark');
  changeFavIconTo('dark');
}

// change theme (dark/light) when logo clicked
document.querySelector('.logo').addEventListener('click', ()=>{
    document.body.classList.toggle('dark')
    document.body.classList.toggle('light');

    changeFavIconTo();
});

let availableLocales = new Set()
let locale = localStorage['locale'];
locale = locale || 'en';

document.body.classList.add(locale);
availableLocales.add(locale);

document.querySelectorAll('.lang').forEach(item => {
    item.addEventListener('click', e => {
        let localeToSet = e.target.dataset.locale.toLowerCase();
        availableLocales.add(localeToSet);
        localStorage['locale'] = localeToSet;
        document.body.classList.remove(...availableLocales);
        document.body.classList.add(localeToSet);
    });
});

const _C = document.querySelector('.main-canvas'), 
      CT = _C.getContext('2d'), F = .5, T = 120, A = 2*Math.PI/T;

let r, rmax, rmin;

function size() {
  _C.width = _C.height = Math.round(_C.getBoundingClientRect().width);
	
  r = .5*_C.width;
	rmin = F*.5*r;
	rmax = r - rmin;
	
  CT.translate(r, r);
};

size();

(function ani(t = 0) {
  let k = .5*(1 + Math.cos(t*A)), 
      cr1 = k*rmin + (1 - k)*rmax, cr2 = r - cr1;
	
	CT.clearRect(-r, -r, _C.width, _C.width);
	CT.rotate(A);
	
	CT.fillStyle = 'black';
  CT.beginPath();
  CT.arc(0, 0, r, -Math.PI, 0);
  CT.arc(cr2, 0, cr1, 0, Math.PI);
  CT.arc(-cr1, 0, cr2, 0, -Math.PI, true);
  CT.arc(-cr1, 0, cr2/3, 0, 2*Math.PI);
  CT.closePath();
  CT.fill();

  CT.fillStyle = 'white';
  CT.beginPath();
  CT.arc(cr2, 0, cr1/3, 0, 2*Math.PI);
  CT.closePath();
  CT.fill();
	
	requestAnimationFrame(ani.bind(this, ++t));
})();

addEventListener('resize', size, false);

