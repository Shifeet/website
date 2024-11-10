// Function to handle drawing on the signature pad
const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');

let isDrawing = false;

// Function to get the correct coordinates on mouse or touch
function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let x, y;

    // For touch events
    if (e.touches) {
        x = (e.touches[0].clientX - rect.left) * scaleX;
        y = (e.touches[0].clientY - rect.top) * scaleY;
    }
    // For mouse events
    else {
        x = (e.clientX - rect.left) * scaleX;
        y = (e.clientY - rect.top) * scaleY;
    }

    return { x, y };
}

// Handle mouse/touch start event
function startDrawing(e) {
    isDrawing = true;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.preventDefault();
}

// Handle mouse/touch move event
function draw(e) {
    if (isDrawing) {
        const { x, y } = getCoordinates(e);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    e.preventDefault();
}

// Handle mouse/touch end event
function stopDrawing() {
    isDrawing = false;
}

// Clear the signature pad
function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save the signature as a data URL (base64)
function saveSignature() {
    const dataURL = canvas.toDataURL('image/png');
    console.log("Signature saved: ", dataURL); // Here you can send this data to a server or store it as needed
}

// Print the form
function printForm() {
    window.print();
}

// Attach events for mouse and touch
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);
