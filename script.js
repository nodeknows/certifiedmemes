// 9 characters including a space is enough for a close,
// otherwise, up to 16 including a space for everything else.

var form = document.getElementsByTagName('form')[0]
var submit = document.getElementById('submit');
var firstname = document.getElementById('firstname'), lastname = document.getElementById('lastname');;

// stop page from refreshing
form.addEventListener('submit', function(e){ e.preventDefault()}) 

form.onsubmit = function (e) {
    console.log(firstname.value, lastname.value)
}