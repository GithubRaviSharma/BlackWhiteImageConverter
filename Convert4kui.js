const imageUpload = document.getElementById('imageUpload');
const preview = document.createElement('img'); // Create an image element
preview.id = "preview";
preview.classList.add("image-preview"); // Add class for styling

const button = document.querySelector(".button1"); // Get the button element
const canvas = document.createElement('canvas'); // Create a canvas element
const ctx = canvas.getContext('2d'); // Get the 2D context

button.addEventListener('click', function() {
  imageUpload.click(); // Simulate a click on the hidden file input
});

// Handle image selection and display
imageUpload.addEventListener('change', function() {
  const file = this.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.onload = function(e) 
    {
      preview.src = e.target.result; // Set the image source

      // Append the preview image to the container
      document.querySelector(".container1").appendChild(preview);

      // Create a new image element for the grayscale image
      
      const grayscaleImage = new Image();
      grayscaleImage.onload = function() {
        canvas.width = grayscaleImage.width;
        canvas.height = grayscaleImage.height;
        ctx.drawImage(grayscaleImage, 0, 0);
        grayscale(ctx); // Call the grayscale conversion function

        // Display the grayscale image in container2
        const grayscaleImageElement = document.getElementById('grayscale-image');
        grayscaleImageElement.src = canvas.toDataURL(); // Set src to canvas data URL

        // Insert the grayscale image at the beginning of the container
        container2.insertBefore(grayscaleImageElement, container2.firstChild);
      }; // Close grayscaleImage.onload function
      grayscaleImage.src = e.target.result; // Set src to the same image data URL
    }; // Close reader.onload function

    reader.readAsDataURL(file); // Read the image file
  } else {
    alert("Please select an image file!");
  }
});

function grayscale(ctx) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // Red
    data[i + 1] = avg; // Green
    data[i + 2] = avg; // Blue
    // Alpha channel remains unchanged (data[i + 3])
  }

  ctx.putImageData(imageData, 0, 0);
}


// ... (existing code)

const downloadButton = document.querySelector(".button2"); // Get the download button

downloadButton.addEventListener("click", function () {
  const link = document.createElement("a"); // Create a link element
  link.download = "grayscale_image.png"; // Set the download filename
  link.href = canvas.toDataURL("image/png"); // Set the link's href to the canvas data URL
  link.click(); // Simulate a click on the link to trigger download
  link.remove(); // Remove the link (optional)
});
