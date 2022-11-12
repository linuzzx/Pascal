let locked;

$(() => {
    locked = false;

    $(window).keypress(function(e) {
        if (!locked) {
            locked = true;
        }
    });

    $(window).keyup(function(e) {
        locked = false;
    });
})