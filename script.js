var form = document.getElementsByTagName('form')[0]
var firstname = document.getElementById('firstname'), lastname = document.getElementById('lastname');
var lang = document.getElementById('lang');
var len = document.getElementById('len');

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');
var img, nametext;

const date = new Date();

// stop page from refreshing
form.addEventListener('submit', function (e) { e.preventDefault() })

form.onsubmit = function (e) {
    let f = firstname.value, l = lastname.value;
    let t;

    if (len.value ===  'Auto') {
        if ((f.length + l.length) > 11) { t = 'far' } else { t = 'close' };
    } else if (len.value === 'Close') {
        t = 'close';
    } else if (len.value === 'Far') {
        t = 'far';
    }
    

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
    ctx.fillText(`${f} ${l}`, canvas.width / 2, canvas.height / 2 + 185);

    ctx.font = '7rem barcode';
    ctx.fillText(date.getUTCMonth() + "/" + date.getUTCDate() + "/" + date.getUTCFullYear(), canvas.width / 2 - 325, canvas.height - 200);

}

function printCanvas() {
    let url = canvas.toDataURL();
    let win = window.open();
    win.document.write("<img src='" + url + "' style=\"width: 100%; height: 100%\"/>");
    setTimeout(() => win.print(), 0); // write first, then print
}