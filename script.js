const alfabet = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Y', 'Z', 'Ź', 'Ż'];

let originalPassword = "";
let hiddenPassword = "";
let counter = 1;

const createKeyboard = () => {
    for (i = 0; i < alfabet.length; i++) {
        $('#keyboard').append(`<input type="button" class="keyboardButtons" value="${alfabet[i]}" onclick="chosenLetter('${alfabet[i]}')" disabled />`);
    };
};

const setKeyboardStyle = () =>{
$('.keyboardButtons').css({
    'background-color': 'rgba(0, 0, 0, 0)',
    'color': 'white',
    'font-size': '1.3em',
    'width': '4em',
    'height': '4em',
    'border': '3px solid white',
    'border-radius': '20%',
    'margin': '5px',
    'display': 'flex',
    'justify-content': 'center',
    'allign-content': 'center'
});}

// Checks if written password contains only legit characters and hide inputs
const passwordSet = () => {
    let match = false;    
    //loop inside loop, iterates through all letters from alfabet array and matches them with given password.
    if ($('#passwordInput').val().length -1>= 0) {
        for(i = 0; i < $('#passwordInput').val().length; i++) {
            for(j = 0; j < alfabet.length; j++) {
                if ($('#passwordInput').val()[i].toUpperCase() == alfabet[j] || $('#passwordInput').val()[i].toUpperCase() == " ") {
                    match = true;
                }
            }
            
            if (match == false) {
                alert("Only polish letters allowed");
                location.reload();
                break;
            }
            match = false;
        }

            originalPassword = $('#passwordInput').val();
            $('#password > input').hide();
            passwordHide();
            $('.keyboardButtons').removeAttr('disabled');
        
    }
    else {
        alert("Password is too short");
    }
}

// Transform original password into ----
const passwordHide = () => {

    for (i = 0; i < originalPassword.length; i++){
        if ( originalPassword.charCodeAt(i) != 32 ) {
            hiddenPassword += "-";
        }
        else {
            hiddenPassword += " ";
        }
    }
    $('#password > h1').text(hiddenPassword);
}

// EVENT onclick function that matches button input with password string.
const chosenLetter = (key) => {
    enlargenedPassword = originalPassword.toUpperCase();
    const index = [];
    // Iterates through password and search for input key
    for (i=0; i< enlargenedPassword.length; i++){
        if (enlargenedPassword[i] == key){
            index.push(i);
        }
    }
    // If there's no matches, puts new screen of hanged man
    if (index.length == 0)
    {
        $('#picture > img').attr('src', `./img/s${+counter}.jpg`);
        counter++;

        $(`#keyboard > input[value=${key}]`).css({'color': 'red'});

        if (counter > 8)
        {
            $('#password > h1').text("Game Over");
            $('#keyboard').hide();
        }
    }
    // Otherwise reveal 
    else
    {
        const letters = [];
        //Creates array of upper and lower case letters
        for (i=0; i< index.length; i++){
            if (originalPassword[index[i]] == key){
                letters.push(key);
            }
            else {
                letters.push(key.toLowerCase());
            }
        }
        // Cuts and concat string right letter at its position.
        for (i = 0; i < index.length; i++) {
            hiddenPassword = hiddenPassword.substr(0, index[i]) + letters[i] + hiddenPassword.substr(index[i] + 1, hiddenPassword.length);
        }

        $(`#keyboard > input[value=${key}]`).css({'color': 'green'});
        // Update password with each revealed letter
        $('#password > h1').text(hiddenPassword);

        // Victory Condition ! 
        if (originalPassword == hiddenPassword) {
            $('#password').append(`<h3 style="color: goldenrod;">Congratulations. You've saved the man</h3>`);
            $('#password').append(`<input type='button' class='buttons' value='Retry?' onclick='location.reload()'
            style='padding: 10px 20px; margin: 1.5em; border-radius: 5%' />`);
            $('#keyboard').hide();
        }
    }
}

createKeyboard();
setKeyboardStyle();