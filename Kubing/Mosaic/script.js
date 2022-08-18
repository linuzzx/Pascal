$(() => {
    // $("#inpFile").on("change", openDrawing);
    document.getElementById('inpFile').addEventListener('change', openDrawing, false)
});

function openDrawing(event) {
    const image = document.getElementById("fileImage");
    image.src = URL.createObjectURL(event.target.files[0]);

    setTimeout(function () {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        console.log(imageData)
        for (let i = 0; i < image.height; i++) {
            for (let j = 0; j < image.width; j++) {
                const index = (i * imageData.width + j) * 4;
                const red = imageData.data[index];
                const green = imageData.data[index + 1];
                const blue = imageData.data[index + 2];
                const alpha = imageData.data[index + 3];
                $("#x" + j + "y" + i).css("background", 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')');
            }
        }
    }, 500);

    $("#fileInput").replaceWith("<input id='fileInput' type='file' onchange='openDrawing(this.files)' accept='image/*'>");
}