var col = $(".col");
var slot = $(".slot");
var modal = $("#modal");
var ok = $("#ok");

(function() {
    modal.hide();
    var curPlayer = "player1";
    var everySlot = col.children();

    col.on("click", function(e) {
        var emptySlot;

        var slotsInColumn = $(e.currentTarget).find(slot);
        // console.log(slotsInColumn);
        for (var i = 5; i >= 0; i--) {
            //lowest slot that is empty
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                emptySlot = slotsInColumn.eq(i);
                break;
            }
        } //end of FOR loop
        var row = i; //position of row
        var horizontalRow = $(".row" + row);
        // console.log(horizontalRow);

        //find empty slot here
        emptySlot.addClass(curPlayer);

        //if winner, show message
        checkForVerticalVictory(slotsInColumn);
        checkForHorizontalVictory(horizontalRow);
        checkForDiagonalVictory();
        switchPlayer();
    });

    function checkForVerticalVictory(slots) {
        var counter = 0; //keeps track of the dots and colors in a column. e.g. counts each red piece, if 4, one wins. If there are 2 reds and suddenly a yellow, the counter rests.
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(curPlayer)) {
                counter++;
                if (counter >= 4) {
                    console.log(curPlayer, "vertical win");

                    modal.fadeIn();

                    ok.on("click", function(e) {
                        modal.css({
                            display: "none"
                        });
                        location.reload();
                    });
                    return true;
                }
            } else {
                counter = 0;
            }
        }
        return false;
    }

    function checkForHorizontalVictory(horizontalRow) {
        var counter = 0;
        for (var i = 0; i < horizontalRow.length; i++) {
            if (horizontalRow.eq(i).hasClass(curPlayer)) {
                counter++;
                if (counter >= 4) {
                    console.log(curPlayer, "horizontal win");

                    modal.fadeIn();

                    ok.on("click", function(e) {
                        modal.css({
                            display: "none"
                        });
                        location.reload();
                    });
                    return true;
                }
            } else {
                counter = 0;
            }
        }
        return false;
    }

    function checkIndex(a, b, c, d) {
        var firstPosition = everySlot.eq(a);
        var secondPosition = everySlot.eq(b);
        var thirdPosition = everySlot.eq(c);
        var fourthPosition = everySlot.eq(d);
        if (firstPosition.hasClass(curPlayer)) {
            if (secondPosition.hasClass(curPlayer)) {
                if (thirdPosition.hasClass(curPlayer)) {
                    if (fourthPosition.hasClass(curPlayer)) {
                        // console.log("diagonal victory!", curPlayer);
                        modal.fadeIn();

                        ok.on("click", function(e) {
                            modal.css({
                                display: "none"
                            });
                            location.reload();
                        });
                    }
                }
            }
        }
    }

    function checkForDiagonalVictory() {
        var solutions = [
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [2, 9, 16, 23],
            [0, 7, 14, 21],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 41],
            [12, 19, 26, 33],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [18, 13, 8, 3],
            [24, 19, 14, 9],
            [19, 14, 9, 4],
            [30, 25, 20, 15],
            [25, 20, 15, 10],
            [20, 15, 10, 5],
            [36, 31, 26, 21],
            [31, 26, 21, 16],
            [26, 21, 16, 11],
            [37, 32, 27, 22],
            [32, 27, 22, 17],
            [38, 33, 28, 23]
        ];
        for (var i = 0; i < solutions.length; i++) {
            var diagonalVictories = solutions[i];
            console.log(
                diagonalVictories[0],
                diagonalVictories[1],
                diagonalVictories[2],
                diagonalVictories[3]
            );
            checkIndex(
                diagonalVictories[0],
                diagonalVictories[1],
                diagonalVictories[2],
                diagonalVictories[3]
            );
        }
    } //end of diagonal function

    function switchPlayer() {
        if (curPlayer == "player1") {
            curPlayer = "player2";
        } else {
            curPlayer = "player1";
        }
    }
})();

//option 2 victory

// function checkForVertical(slots) {
//     var str ="",
//     var counter =0;
//     for (var i = 0; i < slots.length; i++) {
//         if(slots.eq(i).hasClass(curPlayer)){
//             str +='w'
//         } else {
//             str +='l'
//         }
//     }
//     return str.indexOf('www') > -1; //where another str occurs
// }
