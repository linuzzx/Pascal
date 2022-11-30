const template = document.createElement("template");
template.innerHTML = "<h1 id='timerdisplay'>0.00</h1>";

export class EinarTimer extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.setAttribute("ms", "0");
        this.setAttribute("time", "0.00");
        this.timing = false;

        this.timerlock = false;

        this.shadowRoot.querySelector("#timerdisplay").style.textAlign = "center";
        this.shadowRoot.querySelector("#timerdisplay").style.position = "relative";
        this.shadowRoot.querySelector("#timerdisplay").style.top = "50%";
        this.shadowRoot.querySelector("#timerdisplay").style.transform = "translateY(-50%)";
        this.shadowRoot.querySelector("#timerdisplay").style.margin = "0";

        this.initialized = false;
    }

    connectedCallback() {
        this.initialized = true;

        this.getAttribute("color") ? this.shadowRoot.querySelector("#timerdisplay").style.color = this.getAttribute("color") : "";
        this.getAttribute("background") ? this.shadowRoot.querySelector("#timerdisplay").style.background = this.getAttribute("background") : "";
        this.getAttribute("fontfamily") ? this.shadowRoot.querySelector("#timerdisplay").style.fontFamily = this.getAttribute("fontfamily") : "";
        this.getAttribute("fontsize") ? this.shadowRoot.querySelector("#timerdisplay").style.fontSize = this.getAttribute("fontsize") : "";

        clearInterval(this.interval);
        this.startkey = parseInt(this.getAttribute("startkey")) || 32;
        this.stopkey = parseInt(this.getAttribute("stopkey")) || 32;
        this.stopfunc = this.getAttribute("stopfunc") || "";
        
        window.addEventListener("keyup", e => {
            if (e.which === this.startkey && !this.timing && !this.timerlock) {
                this.timing = true;
                let start = Date.now();
                this.interval = setInterval(() => {
                    let ms = Date.now() - start;
                    let time = msToTime(ms);
                    let message = this.getAttribute("timermessage") || "Timing";
                    this.setAttribute("ms", ms);
                    this.setAttribute("time", time);
                    this.shadowRoot.querySelector("#timerdisplay").innerText = this.getAttribute("timerupdate") === "hide" ? message : time;
                }, 1);
            }
            else if (e.which === this.stopkey && this.timerlock) {
                this.timerlock = false;
            }
        });

        window.addEventListener("keydown", e => {
            if (e.which === this.stopkey && this.timing) {
                clearInterval(this.interval);
                this.timing = false;
                this.timerlock = true;
                this.shadowRoot.querySelector("#timerdisplay").innerText = this.getAttribute("time");
                window[this.stopfunc](this.getAttribute("ms"), this.getAttribute("time"));
            }
        });
    }
    
    static get observedAttributes() {
        return ["color", "background", "fontfamily", "fontsize", "timerupdate", "timermessage", "startkey", "stopkey", "stopfunc"];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        clearInterval(this.interval);
        this.setAttribute("ms", "0");
        this.setAttribute("time", "0.00");
        this.shadowRoot.querySelector("#timerdisplay").innerText = this.getAttribute("time");
        this.timing = false;
        this.timerlock = false;

        if (this.initialized) {
            switch (attr) {
                case "color":
                    this.shadowRoot.querySelector("#timerdisplay").style.color = newValue;
                    break;
                case "background":
                    this.shadowRoot.querySelector("#timerdisplay").style.background = newValue;
                    break;
                case "fontfamily":
                    this.shadowRoot.querySelector("#timerdisplay").style.fontFamily = newValue;
                    break;
                case "fontsize":
                    this.shadowRoot.querySelector("#timerdisplay").style.fontSize = newValue;
                    break;
                case "timerupdate":
                    this.timerupdate = newValue;
                    break;
                case "timermessage":
                    this.timermessage = newValue;
                    break;
                case "startkey":
                    this.startkey = parseInt(newValue);
                    break;
                case "stopkey":
                    this.stopkey = parseInt(newValue);
                    break;
                case "stopfunc":
                    this.stopfunc = newValue;
                    break;
            }
        }
    }
}

function msToTime(ms, decimals = 2) {
    let timeStr = "";

    let dec = decimals === 3 ? 1 : decimals === 2 ? 10 : decimals === 1 ? 100 : 1000;

    let cs = Math.floor((ms % 1000) / dec);
    let s = Math.floor((ms / 1000) % 60);
    let m = Math.floor((ms / 60000) % 60);
    let h = Math.floor((ms / 3600000) % 24);

    if (h !== 0) {
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        if (cs < 10) {
            cs = "0" + cs;
        }
        timeStr = h + ":" + m + ":" + s + "." + cs;
    }
    else {
        if (m !==0) {
            if (s < 10) {
                s = "0" + s;
            }
            if (cs < 10) {
                cs = "0" + cs;
            }
            timeStr = m + ":" + s + "." + cs;
        }
        else {
            if (cs < 10) {
                cs = "0" + cs;
            }
            timeStr = s + "." + cs;
        }
    }
    
    return timeStr;
}

customElements.define("einar-timer", EinarTimer);