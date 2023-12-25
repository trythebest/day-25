const inputField = document.querySelector("#textField");
const rowDiv = document.querySelector(".row");

// Handling the search event
document.querySelector("button").addEventListener("click", () => {
  // Reading the data from user
  const breed = inputField.value;

  // Guard class for returning immediately if no input was found
  if (!breed) return;

  // Function for fetching the data from API
  const dogAPI = async () => {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const { message } = await res.json();

    // Checking whether the user data is correct
    if (res.status === 200) {
      for (i = 0; i < 20; i++) {
        if (message[i]) list(message[i]);
      }
    } else {
      // Alerting the user that entered data is invalid
      alert("Please enter a correct breed");
    }
  };

  // Making the request by calling the function
  dogAPI();

  // Rendering the received image data on screen for user

  const list = (data) => {
    let html = `<div class="col-lg-3 col-md-6 col-sm-12 deck">
      <img
        src=${data}
        class="img-thumbnail"
        alt="dogs"
      />
      </div>`;
    rowDiv.insertAdjacentHTML("afterbegin", html);
  };
});