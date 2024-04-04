let canHeaderHide = true;

// making a scroll-responsive header
let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
  if (canHeaderHide) {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      document.getElementById("main-header").style.top = "0";
    } else {
      document.getElementById("main-header").style.top = "-55px"; // Adjust this value based on your header height
    }
    prevScrollPos = currentScrollPos;
  }
  // else {
  //   console.log("Header is temporarily prevented from hiding.");
  // }
};

//opening and closing pop-up tabs, animating buttons
document.addEventListener('DOMContentLoaded', function () {
  var closeButtons = document.querySelectorAll('.close-button');
  var audio = new Audio('../audio/click-tear.wav');
  audio.volume = 0.7;

  document.getElementById("about").addEventListener('click', function () {
    audio.play();
    document.getElementById("help-page").classList.remove("active");
    document.getElementById("progress-page").classList.remove("active");
    document.getElementById("about-page").classList.toggle("active");
  });

  document.getElementById("help").addEventListener('click', function () {
    audio.play();
    document.getElementById("about-page").classList.remove("active");
    document.getElementById("progress-page").classList.remove("active");
    document.getElementById("help-page").classList.toggle("active");
  });

  document.getElementById("progress").addEventListener('click', function () {
    audio.play();
    document.getElementById("help-page").classList.remove("active");
    document.getElementById("about-page").classList.remove("active");
    document.getElementById("progress-page").classList.toggle("active");
  });

  closeButtons.forEach(function (closeButton) {
    closeButton.addEventListener("click", function () {
      var audio = new Audio('../audio/click-tear.wav');
      audio.play();
      canHeaderHide = false;
      document.getElementById("main-header").style.top = "0";
      document.getElementById("about-page").classList.remove("active");
      document.getElementById("help-page").classList.remove("active");
      document.getElementById("progress-page").classList.remove("active");
      document.getElementById("egg-page").classList.remove("active");
      setTimeout(() => {
        canHeaderHide = true;
      }, 500);
    });
  });

  var buttons = document.querySelectorAll('.button');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      button.classList.add('active');
      // Check if the clicked element has type "submit"
      if (button.getAttribute('type') === 'submit') {
        var audio = new Audio('../audio/click2.mp3');
        audio.volume = 0.7;
        audio.play();
      } else {
        var audio = new Audio('../audio/click1.mp3');
        audio.volume = 0.7;
        audio.play();
      }
      // Set a timeout to deactivate the button after 250 milliseconds (0.25 seconds)
      setTimeout(function () {
        // Deactivate the button (remove the "active" class)
        button.classList.remove('active');
      }, 250);
    });
  });
});

// document.getElementById("back").addEventListener("click", function () {
//   window.history.back();
// });

//Track player's use of hints
localStorage.removeItem('hintUse');
// reset progress
document.addEventListener("DOMContentLoaded", function () {

  if (document.getElementById("hint-parent") !== null || document.body.getAttribute("data-page-id") === "initiation") {

    var hintUse = JSON.parse(localStorage.getItem('hintUse')) || [];
    var currentPage = document.body.getAttribute("data-page-id");
    var clueTexts = document.querySelectorAll(".clue-text");

    function noteHintUse(elementId) {
      // Get the existing hintUse array from localStorage or initialize it if it doesn't exist

      // Push the data of the clicked element and currentPage to the hintUse array
      hintUse.push({ elementId: elementId, currentPage: currentPage });

      // Update the hintUse array in localStorage
      localStorage.setItem('hintUse', JSON.stringify(hintUse));
    }

    document.getElementById("hint1").addEventListener("click", function () {
      clueTexts.forEach(function (clue) {
        clue.classList.add("bold");
      });
      document.getElementById("hint1").classList.add("helpful");
      noteHintUse("hint1");
    });

    document.getElementById("hint2").addEventListener("click", function () {
      document.getElementById("clue2").classList.remove("hidden");
      document.getElementById("hint2").classList.add("helpful");
      noteHintUse("hint2")
      // Smoothly scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });

    document.getElementById("hint3").addEventListener("click", function () {
      document.getElementById("clue3").classList.remove("hidden");
      document.getElementById("hint3").classList.add("helpful");
      noteHintUse("hint3");
      // Smoothly scroll to the bottom of the page
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
  }
});

// Update hintUse in localStorage before leaving the page
window.addEventListener('beforeunload', function () {
  if (document.getElementById("hint-parent") !== null) {
    // Update the hintUse array in localStorage
    localStorage.setItem('hintUse', JSON.stringify(hintUse));
  }
});






localStorage.removeItem('gameProgress');
// reset progress

//tracking user progress and checking passwords
document.addEventListener('DOMContentLoaded', function () {
  var currentPage = document.body.getAttribute("data-page-id");
  var puzzleSolved = false; // Initialize puzzleSolved variable
  // Retrieve the 'gameProgress' from local storage and parse it as JSON
  var gameProgress = JSON.parse(localStorage.getItem('gameProgress'));
  // If 'gameProgress' doesn't exist or is not an array, initialize a new array with "index" in the 0 spot
  if (!Array.isArray(gameProgress)) {
    gameProgress = ["index"];
  } else {
    // If 'gameProgress' exists and is an array, but it's empty, you can also initialize it with "index" in the 0 spot
    if (gameProgress.length === 0) {
      gameProgress.push("index");
    }
  }

  // Update local storage with the modified gameProgress array
  if (!gameProgress.includes(currentPage)) {
    gameProgress.push(currentPage);
  }
  console.log(gameProgress);
  localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
  // }

  // Get the element where you want to display the progress list
  var progressListElement = document.getElementById("progress-list");

  // Create an unordered list
  var ul = document.createElement("ul");

  // Iterate through gameProgress and create list items with links
  gameProgress.forEach(function (pageId) {
    var li = document.createElement("li");
    var link = document.createElement("a");

    // Set the link href based on the pageId 
    link.href = pageId + ".html";

    // Set the link text content (
    link.textContent = pageId;

    // Append the link to the list item
    li.appendChild(link);

    // Append the list item to the unordered list
    ul.appendChild(li);
  });

  // Append the unordered list to the progress list element
  progressListElement.appendChild(ul);



  //Check passwords
  // Initialize an object to store page IDs and their respective correct passwords


  var pageNextStep = {
    "initiation": "luck",
    "head": "origins",
    "tail": "origins",
    "fog": "architect",
    "architect": "collapse",
    "??": "labyrinth",
    "future": "congrats",
    "goodbye": "piano",
    "collapse": "../begin/origins",
    "explanation": "../begin/initiation",
  };
  var correctNextStep = pageNextStep[currentPage];

  var pagePasswords = {
    "initiation": "l",
    "file": "placeholder",
    "architect": "river",
    "future": "2267",
    "lettuce": "200",
    "goodbye": "piano",
  };
  var correctPassword = pagePasswords[currentPage];

  var pageAlerts = {
    "initiation": "Not what I was looking for. Looks like you're still learning how to play, eh?",
    "architect": "That's not right. Don't put words in my mouth unless I ask for them.",
  }
  var correctAlert = pageAlerts[currentPage];

  function success() {
    puzzleSolved = true; // Set puzzleSolved to TRUE when the correct password is entered
    document.body.style.backgroundColor = 'var(--green-dark)';
    document.getElementById("main-header").style.backgroundColor = 'var(--green-medium)';
    setTimeout(function () {
      document.body.style.backgroundColor = '';
      document.getElementById("main-header").style.backgroundColor = '';
      window.location.href = correctNextStep + ".html";
    }, 700);
  }

  function failure() {
    document.body.style.backgroundColor = 'var(--red-dark)';
    document.getElementById("main-header").style.backgroundColor = 'var(--red-medium)';
    setTimeout(function () {
      alert(correctAlert);
      document.body.style.backgroundColor = '';
      document.getElementById("main-header").style.backgroundColor = '';
    }, 500);
  }

  if (document.getElementById("continue") !== null) {
    document.getElementById("continue").addEventListener("click", function (event) {
      event.preventDefault();
      success();
    });
  }

  if (document.getElementById("my-form") !== null) {
    document.getElementById("my-form").addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the form from submitting and reloading the page
      var enteredPassword = document.getElementById("file-pass").value; // Check the entered password based on the current page
      if (enteredPassword === correctPassword) {
        success();
      } else {
        failure();
      }
    });
  }

});