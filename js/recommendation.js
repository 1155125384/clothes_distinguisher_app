const dropdowns = document.querySelectorAll(".custom-dropdown select");
dropdowns.forEach(function(dropdown) {
  dropdown.addEventListener("click", function() {
    customizeOptionsTextSize(dropdown);
  });
});

function customizeOptionsTextSize(dropdown) {
  const options = dropdown.options;
  for (let i = 0; i < options.length; i++) {
    options[i].style.fontSize = "13px"; // Adjust the font size as needed
  }
}

function generateRecommendation() {
  // Get selected values from the HTML dropdowns
  var gender = document.getElementById("gender").value;
  var venue = document.getElementById("venue").value;
  var age = document.getElementById("age").value;
  var style = document.getElementById("style").value;
  var season = document.getElementById("season").value;

  // Define the available options for color and type based on the limitations
  var colors = [
    "黑色",
    "藍色",
    "棕色",
    "綠色",
    "灰色",
    "橙色",
    "紅色",
    "紫色",
    "白色",
    "黃色",
  ];
  var types = [
    "上衣",
    "連衣裙",
    "連帽衫",
    "長袖衫",
    "褲子",
    "領衫",
    "襯衫",
    "短褲",
    "裙子",
    "T恤",
  ];

  // Apply limitations based on the selected values
  if (gender === "boy") {
    types = types.filter(function (type) {
      return type !== "連衣裙" && type !== "裙子";
    });
  }

  if (venue === "office") {
    types = types.filter(function (type) {
      return type !== "連帽衫";
    });
  }

  if (venue === "gym") {
    types = types.filter(function (type) {
      return type !== "連衣裙" && type !== "裙子";
    });
  }

  if (venue === "wedding") {
    types = ["白色"];
    colors = ["白色"];
    types = types.filter(function (type) {
      return type !== "連帽衫" && type !== "短褲" && type !== "T恤";
    });
  }

  if (venue === "date_night") {
    types = types.filter(function (type) {
      return type !== "短褲";
    });
  }

  if (age === "6-11") {
    types = types.filter(function (type) {
      return type !== "連帽衫";
    });
  }

  if (style === "formal") {
    types = types.filter(function (type) {
      return (
        type !== "上衣" &&
        type !== "連帽衫" &&
        type !== "長袖衫" &&
        type !== "領衫" &&
        type !== "短褲" &&
        type !== "裙子" &&
        type !== "T恤"
      );
    });
    colors = colors.filter(function (color) {
      return (
        color !== "綠色" &&
        color !== "橙色" &&
        color !== "紅色" &&
        color !== "紫色" &&
        color !== "白色"
      );
    });
  }

  if (style === "vintage") {
    types = types.filter(function (type) {
      return type !== "連帽衫";
    });
  }

  if (style === "romantic") {
    types = types.filter(function (type) {
      return type !== "短褲" && type !== "T恤";
    });
    colors = colors.filter(function (color) {
      return (
        color !== "綠色" &&
        color !== "橙色" &&
        color !== "紅色" &&
        color !== "紫色" &&
        color !== "黃色"
      );
    });
  }

  if (season === "summer") {
    types = types.filter(function (type) {
      return type !== "長袖衫";
    });
  }

  if (season === "winter") {
    types = types.filter(function (type) {
      return type !== "短褲" && type !== "裙子";
    });
  }

  // Randomly select a color and a type from the available options
  var randomColor = colors[Math.floor(Math.random() * colors.length)];
  var randomType = types[Math.floor(Math.random() * types.length)];

  // Display the recommendation on the HTML page
  var recommendationResult = document.getElementById("recommendationResult");
  recommendationResult.innerHTML =
    "推薦穿" + randomColor + randomType;
}
