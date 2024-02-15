const getElem = (id) => document.getElementById(id)
const clearCanvas = (ctx, canv) => ctx.clearRect(0, 0, canv.width, canv.height);
const getDate = () => new Date().toLocaleDateString('en-us', {day:'numeric', year:'numeric', month:'numeric'});

function getDist(l, fn, ln) {
    if (l.value ===  'Auto') {
        return (fn.value.length + ln.value.length > 11) ? 'far' : 'close';
    };
    return (l.value === 'Close') ? 'close' : 'far';
};

var form = document.getElementsByTagName('form')[0]
var firstname = getElem('firstname'), lastname = getElem('lastname');
var lang = getElem('lang');
var len = getElem('len');

var canvas = getElem('canvas')
var ctx = canvas.getContext('2d');


// stop page from refreshing
form.addEventListener('submit', function (e) { e.preventDefault() })

form.onsubmit = function (e) {    
    clearCanvas(ctx, canvas); // clears canvas everytime submit is pressed; not necessary however.

    let dist = getDist(len, firstname, lastname); // t = close or far; determines the claw on the certificate's gap.
    let color = (lang.value === 'JS') ? "black" : "white"; // var myVariable = (true condition) ? "true" : "false"

    // create template & draw img
    const img = document.createElement('img');
    img.src = `/templates/${lang.value}_${dist}.webp`;
    img.style.width = "100%";
    img.style.height = "100%";

    ctx.drawImage(img, 0, 0, 3508, 2479);

    // prep & write text
    ctx.fillStyle = color;

    ctx.font = '9rem inknut';
    ctx.textAlign = 'center';
    ctx.fillText(`${firstname.value} ${lastname.value}`, canvas.width / 2, canvas.height / 2 + 185);

    ctx.font = '7rem barcode';
    ctx.fillText(getDate(), canvas.width / 2 - 325, canvas.height - 190);

}

function printCanvas() {
    let url = canvas.toDataURL();
    let win = window.open();
    win.document.write("<img src='" + url + "' style=\"width: 100%; height: 100%\"/>");
    setTimeout(() => win.print(), 0);
}