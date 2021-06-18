const tegn = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const tegnStor = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function krypterPassord(pass) {
    let kryptert = "";
    const iterations = 15;
    for (let i=0; i<iterations; i++) {
        kryptert = krypter(pass, i);
    }
    return kryptert;
}

function krypter(pass, keyVal) {
    const arr = pass.split("");
    let encrypted = "";

    for (let i=0; i<arr.length; i++) {
        let j;
        if (tegn.includes(arr[i])) {
            j = tegn.indexOf(arr[i]);
            encrypted += tegn[j+keyVal];
        }
        else if (tegnStor.includes(arr[i])) {
            j = tegnStor.indexOf(arr[i]);
            encrypted += tegnStor[j+keyVal];
        }
    }
    return encrypted;
}