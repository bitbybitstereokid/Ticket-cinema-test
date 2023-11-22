const seats = document.querySelector('.seats');
const seatReserved = document.querySelectorAll('.seats .seat-column .seat:not(.reserved)')
const timeSelect = document.querySelectorAll('.session ul li')
const seatsCount = document.querySelector('#seats-count');
const totalPrice = document.querySelector('#total');
let ticketPrice = +document.querySelector('.price').dataset.price;

loadCookies();

// Select time
timeSelect.forEach((time, index) => {
    time.addEventListener('click', (e) => {
        const selectedElements = document.querySelectorAll('.session ul li.selected');
        selectedElements.forEach((selectedElement) => {
            selectedElement.classList.remove('selected');
        });

        time.classList.add('selected');
        let ticketTime = +time.dataset.time;
        setCookieData(index, ticketTime);
        updateSelectedSeats();
    });
})

// Seats
seats.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedSeats();
    }
});

//Set cookies
function setCookieData(movieIndex, moviePrice) {
    document.cookie = `selectedMovieIndex=${movieIndex};`;
    document.cookie = `selectedMoviePrice=${moviePrice};`;
}

//Update selected seats
function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.seats .seat-column .seat.selected');
    const seatsIndex = [];
    const selectedSeatsArray = [...selectedSeats];
    const seatReservedArray = [...seatReserved];

    for (let i = 0; i < selectedSeatsArray.length; i++) {
        const seatIndex = seatReservedArray.indexOf(selectedSeatsArray[i]);
        seatsIndex.push(seatIndex);
    }

    const seatsIndexString = JSON.stringify(seatsIndex);
    document.cookie = `selectedSeats=${seatsIndexString};`;

    const selectedSeatsCount = selectedSeats.length;
    seatsCount.innerHTML = selectedSeatsCount.toString();
    totalPrice.innerHTML = (selectedSeatsCount * ticketPrice).toString();
}

//Load cookies info
function loadCookies() {
    const selectedTime = getCookie('selectedMoviePrice');
    const selectedPrice = getCookie('selectedMoviePrice');
    const selectedSeatsString = getCookie('selectedSeats');
    const selectedSeats = selectedSeatsString ? JSON.parse(selectedSeatsString) : [];

    if (selectedSeats.length > 0) {
        seatReserved.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });

        if (selectedPrice !== null) {
            const selectedSeatsCount = selectedSeats.length;
            seatsCount.innerHTML = selectedSeatsCount.toString();
            totalPrice.innerHTML = (selectedSeatsCount * ticketPrice).toString();
        }
    }

    if (selectedTime !== null) {
        timeSelect.forEach((time,) => {
            if (selectedTime === time.dataset.time) {
                time.classList.add('selected');
            }
        });
    }
}

//Get cookies name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}