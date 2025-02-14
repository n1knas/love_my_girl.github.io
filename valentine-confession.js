$(document).ready(function () {
    // Обработка изменения состояния чекбокса
    $("#messageState").on("change", function () {
        $(".message").removeClass("openNor").removeClass("closeNor");
        if ($("#messageState").is(":checked")) {
            $(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
            $(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
            $(".container").stop().animate({ "backgroundColor": "#f48fb1" }, 2000);
            console.log("Opening message");
        } else {
            $(".message").removeClass("no-anim").addClass("closeNor");
            $(".heart").removeClass("openHer").addClass("closeHer"); // Добавляем анимацию возврата
            $(".container").stop().animate({ "backgroundColor": "#fce4ec" }, 2000);
            console.log("Closing message");
        }
    });

    // Обработка окончания анимации сообщения
    $(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
        console.log("Message animation ended");
        if ($(".message").hasClass("closeNor")) {
            $(".message").addClass("closed");
        }
        $(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
    });

    // Обработка окончания анимации сердечка
    $(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
        console.log("Heart animation ended");
        if ($(".heart").hasClass("closeHer")) {
            $(".heart").removeClass("closeHer").removeClass("openedHer").addClass("no-anim");
        } else if ($(".heart").hasClass("openHer")) {
            $(".heart").removeClass("openHer").addClass("openedHer").addClass("beating");
        }
    });

    // Функция для создания плавающих сердечек
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.style.left = Math.random() * 100 + 'vw'; /* По всей ширине экрана */
        heart.style.top = Math.random() * 100 + 'vh'; /* По всей высоте экрана */
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random() * 0.7 + 0.3; /* Прозрачность от 30% до 100% */
        document.querySelector('.container').appendChild(heart); /* Добавляем в контейнер */

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Генерация сердечек каждые 300 мс
    setInterval(createHeart, 150);

    // Обработка клика по сердечку
    $(".heart").on("click", function () {
        $("#messageState").prop("checked", !$("#messageState").prop("checked")).trigger("change");
    });
});