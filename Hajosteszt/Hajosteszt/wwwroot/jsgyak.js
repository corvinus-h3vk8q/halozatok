window.onload = function () {

    let pascalhszog = document.getElementById("pascal");

    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        pascalhszog.appendChild(sor);
        sor.classList.add("sorozás");

        for (var o = 0; o < 10; o++) {
            let szám = document.createElement("div");
            sor.appendChild(szám);
            szám.classList.add("számozás");
            szám.innerText = Faktorialis(s) / (Faktorialis(o) * Faktorialis((s - o)));
            szám.style.background = `rgb(${255 / 10 * s},${s * o},${255 / 10 * o}`;
            if (s == o) {
                break;
            }
        }
    }

    function Faktorialis(n) {
        if (n == 0) {
            return 1;
        }
        else {
            return n * Faktorialis(n - 1);
        }
    }


}