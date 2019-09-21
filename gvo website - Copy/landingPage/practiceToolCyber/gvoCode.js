console.log("nasdasdasdasd");

AOS.init({
    once: true,
    duration: 1000
});

function onload() {
    document.getElementById("loader").classList.add("hide");
    setTimeout(() => document.getElementById("loader").remove(), 500);
}

var Stopwatch = function(elem, options) {
  
    var timer       = createTimer(),
        startButton = createButton("start", start),
        stopButton  = createButton("stop", stop),
        resetButton = createButton("reset", reset),
        offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append elements     
    elem.appendChild(timer);
    // elem.appendChild(startButton);
    // elem.appendChild(stopButton);
    // elem.appendChild(resetButton);

    // initialize
    reset();

    // private functions
    function createTimer() {
        return document.createElement("span");
    }

    function createButton(action, handler) {
        var a = document.createElement("a");
        a.href = "#" + action;
        a.innerHTML = action;
        a.addEventListener("click", function(event) {
        handler();
        event.preventDefault();
        });
        return a;
    }

    function start() {
        if (!interval) {
        offset   = Date.now();
        interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
        clearInterval(interval);
        interval = null;
        }
    }

    function reset() {
        clock = 0;
        render(0);
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        timer.innerHTML = clock/1000; 
    }

    function delta() {
        var now = Date.now(),
            d   = now - offset;
        
        offset = now;
        return d;
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
    };
var a = document.getElementById("a-timer");
aTimer = new Stopwatch(a);
document.getElementById('purchase-button').onclick = () => {
    document.getElementById('modal').style.visibility = 'visible';
    document.getElementById('modal').style.opacity = 1;
    const button = document.getElementById('form-actions-button');
    button.innerText = 'Purchase £300';
    aTimer.start();     
};

document.getElementById('modal').onclick = function (e) {
    if(e.target !== this) return;
    document.getElementById('modal').style.visibility = 'hidden';
    document.getElementById('modal').style.opacity = 0;
    aTimer.stop();
    aTimer.reset();
}

//cdn from cyberaio 

const stripe = Stripe('pk_live_52mN94lFZkMNYTdkFr0zBMmm');

        const elements = stripe.elements();

        const style = {
            base: {
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '14px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        const card = elements.create('card', {
            style: style
        });

        card.mount('#card-element');

        card.addEventListener('change', ({
            error
        }) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
            } else {
                displayError.textContent = '';
            }
        });

        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (window.submitting === true) return;
            window.submitting = true;
            const {
                token,
                error
            } = await stripe.createToken(card);

            if (error) {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = error.message;
                window.submitting = false;
            } else {
                stripeTokenHandler(token);
            }
        });
        const stripeTokenHandler = (token) => {
            const button = document.getElementById('form-actions-button');
            button.innerText = 'Complete';
            aTimer.stop();
            button.style.backgroundColor = "#086cbd"
            button.style.border = "solid #086cbd"
        }
       
