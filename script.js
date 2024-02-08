// 9 characters including a space is enough for a close,
// otherwise, up to 16 including a space for everything else.

var form = document.getElementsByTagName('form')[0]
var submit = document.getElementById('submit');
var firstname = document.getElementById('firstname'), lastname = document.getElementById('lastname');
var lang = document.getElementById('lang');

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var img, nametext;

const date = new Date();

// stop page from refreshing
form.addEventListener('submit', function (e) { e.preventDefault() })

form.onsubmit = function (e) {
    //console.log(firstname.value, lastname.value)
    let f = firstname.value, l = lastname.value;
    let t;
    if ((f.length + l.length) > 11) { t = 'far' } else { t = 'close' };

    if (img) {
        img.remove();
        img = undefined;
    }

    if (nametext) {
        nametext.remove();
        nametext = undefined;
    }

    img = document.createElement('img');
    img.src = `/templates/${lang.value}_${t}.webp`;
    img.style.width = "100%";
    img.style.height = "100%";

    ctx.drawImage(img, 0, 0, 3508, 2479);

    if (lang.value === 'JS') ctx.fillStyle = 'black';
    if (lang.value !== 'JS') ctx.fillStyle = 'white';

    ctx.font = '9rem inknut';
    ctx.textAlign = 'center';
    ctx.fillText(`${f} ${l}`, canvas.width/2, canvas.height/2+185);
    
    ctx.font = '7rem barcode';
    ctx.fillText(date.getUTCMonth()+"/"+date.getUTCDate()+"/"+date.getUTCFullYear(), canvas.width/2-325, canvas.height-200);

    /* 
    img = document.createElement('img');
    document.body.appendChild(img);
    
    img.src = `/templates/${lang.value}_${t}.webp`;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.marginTop = "2vh";

    nametext = document.createElement('h1');
    document.body.appendChild(nametext);
    
    nametext.innerHTML = `${f} ${l}`
    nametext.style.position = 'absolute';
    nametext.style.color = 'black';
    nametext.style.top = '49%';
    nametext.style.textAlign = 'center';
    nametext.style.width = '100%';
    nametext.style.fontFamily = 'inknut';
    nametext.style.fontSize = '3rem';

    if (lang.value !== 'JS') nametext.style.color = 'white';
    */

}