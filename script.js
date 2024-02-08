var form = document.getElementsByTagName('form')[0]
var firstname = document.getElementById('firstname'), lastname = document.getElementById('lastname');
var lang = document.getElementById('lang');
var len = document.getElementById('len');

var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d');


// stop page from refreshing
form.addEventListener('submit', function (e) { e.preventDefault() })

form.onsubmit = function (e) {
    let t;

    if (len.value ===  'Auto') {
        if ((firstname.value.length + lastname.value.length) > 11) { t = 'far' } else { t = 'close' };
    } else if (len.value === 'Close') {
        t = 'close';
    } else if (len.value === 'Far') {
        t = 'far';
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears canvas everytime submit is pressed; but not necessary

    img = document.createElement('img');
    img.src = `/templates/${lang.value}_${t}.webp`;
    img.style.width = "100%";
    img.style.height = "100%";

    ctx.drawImage(img, 0, 0, 3508, 2479);

    if (lang.value === 'JS') ctx.fillStyle = 'black';
    if (lang.value !== 'JS') ctx.fillStyle = 'white';

    ctx.font = '9rem inknut';
    ctx.textAlign = 'center';
    ctx.fillText(`${firstname.value} ${lastname.value}`, canvas.width / 2, canvas.height / 2 + 185);

    let theDate = new Date().toLocaleDateString('en-us', {weekday:'long', year:'numeric', month:'short'})
    ctx.font = '7rem barcode';
    ctx.fillText(theDate, canvas.width / 2 - 240, canvas.height - 190);

}

function printCanvas() {
    let url = canvas.toDataURL();
    let win = window.open();
    win.document.write("<img src='" + url + "' style=\"width: 100%; height: 100%\"/>");
    setTimeout(() => win.print(), 0); // write first, then print
}