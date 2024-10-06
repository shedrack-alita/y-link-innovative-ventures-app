document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const messageElement = document.getElementById("message");
    const submitButton = document.getElementById("submit-button");
    const form = document.getElementById("contact-form");
  
    messageElement.textContent = "Submitting..";
    messageElement.style.display = "block";
    submitButton.disabled = true;
  
    const formData = new FormData(this);
    const keyValuePairs = [];
    for (let pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + encodeURIComponent(pair[1]));
    }
  
    const formDataString = keyValuePairs.join("&");
  
    fetch(
      "https://script.google.com/macros/s/AKfycbx12T1jAZGrkIAwe8598MOzPP6bP-Lf1jZj8Wmh3NqNzmgju75e7Ek5C2mLYRHKTFq4NQ/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
      .then(function (data) {
        if (data.status === "success") {
          messageElement.textContent = "Data submitted successfully!";
          messageElement.style.color = "green";
        } else {
          messageElement.textContent = "An error occurred: " + (data.message || "Unknown error");
          messageElement.style.color = "red";
        }
        messageElement.style.display = "block";
        form.reset();
      })
      .catch(function (error) {
        console.error(error);
        messageElement.textContent = "An error occurred while submitting the form.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
      })
      .finally(function () {
        submitButton.disabled = false;
        setTimeout(function () {
          messageElement.textContent = "";
          messageElement.style.display = "none";
        }, 1500);
      });
  });
  