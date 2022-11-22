from js import document
import random
from xml.dom.minidom import Element
def scramble():
    scr = ""
    movesExtra = ["", "'", "2"]
    axises = [["U","D"], ["F","B"], ["R","L"]]
    num = random.randrange(19, 22)

    curAxis = -1
    moves = []
    
    i = 0
    while (i < num):
        axis = random.randrange(0, 2)

        if (axis != curAxis):
            curAxis = axis
            moves = axises[curAxis].copy()

        if (len(moves) == 0):
            i = i - 1
        else:
            m = 0
            if (len(moves) != 1):
                m = random.randrange(len(moves) - 1)
            move = moves[m]
            moveE = movesExtra[random.randrange(len(movesExtra) - 1)]
            
            del moves[m]

            scr += move + moveE + " "
        
        i = i + 1

    document.getElementById("scrambleDisplay").innerText = scr