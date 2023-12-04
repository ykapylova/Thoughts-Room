let text = document.querySelector('input');
let move_text = document.querySelector("#moving_text");
let turn_text = document.querySelector("#turning_text");
let audio = document.querySelector("#audio");
let player_btn = document.querySelector("#player");
let img_play = document.querySelector("#audio_played");
let img_pause = document.querySelector("#audio_paused");
let played = true;

//кол-во блоков с текстом перед началом ввода в input
//МОЖНО МЕНЯТЬ!!!
let intro_text = 2;

let enter = 0; //номер страницы

//контроль музычки
function player() {
    if (played) {
        played = false;
        audio.pause();
        jQuery(img_play).fadeTo(700, 0);
        jQuery(img_pause).fadeTo(700, 0.6);
    }
    else {
        played = true;
        audio.play();
        jQuery(img_play).fadeTo(700, 0.6);
        jQuery(img_pause).fadeTo(700, 0);
    }
}

jQuery("#text1").fadeTo(1000, 1);


function start(){ //когда любая клавише нажата
    
    //переключаем страницу
    enter++;

    //включаем музычку
    if (enter === intro_text) {
        player_btn.style.display = "block";
        audio.play();
        jQuery(img_play).fadeTo(300, 0.6);
    }
    
    //если идет текст, до input
    if (enter < intro_text+2) {
        let hide = "#text" + (enter-1);
        let show = "#text" + enter;
        jQuery(hide).fadeTo(1000, 0, function() {
            jQuery(show).fadeTo(1000, 1);
        });
    }
    
    //после появления input
    if (enter > intro_text+1) {

        if (text.value) {

            //после первого ввода убираем placeholder
            text.placeholder = "";

            //вставляем значение input в блок со стилем вращения 
            turn_text.innerHTML = text.value;
            //input очищаем
            text.value = "";

            //добавляем классы вращения и движения к нужным блокам
            turn_text.classList.add("turn");
            move_text.classList.add("move");

            //после окончания анимации убираем классы до следующего нажатия enter
            setTimeout(() => {
                move_text.classList.remove("move");
                turn_text.classList.remove("turn");
                turn_text.innerHTML = "";
            }, 1450);
        }
    }
}



//для ПК
document.addEventListener("keyup", function(event){
    if(event.keyCode === 13) {
        start();
    }
});

//для сенсорных панелей
document.addEventListener("touchend", function() {
    alert('tap!');
    start();
});
