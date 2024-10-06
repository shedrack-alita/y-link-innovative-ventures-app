document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission
    
    // Check if the "I agree" checkbox is checked
    if (!document.getElementById("checkbox").checked) {
      alert("Please agree to the data collection policy.");
      return; // Stop further processing if checkbox is not checked
    }
  
    // Collect form data
    const formData = {
      name: document.querySelector('input[name="username"]').value,
      email: document.querySelector('input[name="email"]').value,
      phone: document.querySelector('input[name="phone"]').value,
      message: document.querySelector('textarea[name="message"]').value
    };
  
    // Replace with your Google Apps Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxwVV2Ke7eC2-fwXhAJhOBJsFIdS4jswp_Kehj64SOljfwXnkSrtXFnIhIxEAzlWYH27A/exec';
    
    // Send the data using fetch API
    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        alert('Success! Thank you for contacting Y-Link Innovative ventures. We will get back to you shortly.');
      } else {
        alert('Error: ' + data.error);
      }
    })
    .catch(error => {
      alert('Error: Unable to send message. Please try again later.');
    });
  });
  