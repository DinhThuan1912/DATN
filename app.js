document.addEventListener("DOMContentLoaded", function () {
  // MQTT broker connection with username and password
  var client = mqtt.connect("wss://435b3c02b27348a19cafe4c40c82aa38.s1.eu.hivemq.cloud:8884/mqtt", {
    username: "Thuan1912",
    password: "Thuan19122002"
  });

  // Function for clarity and maintainability (optional)
  function updateElement(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = message.toString();
    } else {
      console.error(`Element with ID "${elementId}" not found in DOM.`);
    }
  }

  // Get references to DOM elements for temperature, humidity, and atmosphere (assuming gas)
  var temp = document.getElementById("ESP32_01_Temp");
  var humidity = document.getElementById("ESP32_01_Humd");
  var atmosphere = document.getElementById("ESP32_01_Atmosphere"); // Check if gas element exists

  // Check if elements exist before subscribing
  if (temp && humidity) {
    // Subscribe to topics
    client.on("connect", function () {
      console.log("Connected to MQTT broker");
      client.subscribe("esp32/temperature");
      client.subscribe("esp32/humidity");
      client.subscribe("esp32/atmosphere"); // Subscribe to atmosphere topic
    });

    // Process messages from subscribed topics
    client.on("message", function (topic, message) {
      switch (topic) {
        case "esp32/temperature":
          updateElement("ESP32_01_Temp", message.toString());
          break;
        case "esp32/humidity":
          updateElement("ESP32_01_Humd", message.toString());
          break;
        case "esp32/atmosphere":
          // Assuming atmosphere refers to gas readings
          if (atmosphere) { // Check if gas element exists
            updateElement("ESP32_01_Atmosphere", message.toString());
          } else {
            console.warn("Element for atmosphere data not found. Consider adding it to your HTML.");
          }
          break;
        default:
          console.warn("Unknown topic:", topic); // Handle unknown topics (optional)
      }
    });
  } else {
    console.error("One or more elements not found in the DOM.");
  }
});
