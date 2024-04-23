document.addEventListener("DOMContentLoaded", function () {
  // Kết nối MQTT
  var client = mqtt.connect("wss://435b3c02b27348a19cafe4c40c82aa38.s1.eu.hivemq.cloud:8884/mqtt", {
    username: "Thuan1912",
    password: "Thuan19122002"
  });

  // Lấy các vị trí cần điền dữ liệu
  var temp = document.getElementById("ESP32_01_Temp");
  var humidity = document.getElementById("ESP32_01_Humd");

  // Kiểm tra xem các vị trí đã tìm thấy trong DOM chưa
  if (temp && humidity) {
    // Subscribe vào các topic
    client.on("connect", function () {
      console.log("Connected to shiftr.io broker");
      client.subscribe("esp32/temperature");
      client.subscribe("esp32/humidity");
    });

    // Lấy tin nhắn từ các topic và cập nhật dữ liệu tương ứng
    client.on("message", function (topic, message) {
      if (topic === "esp32/temperature") {
        temp.innerHTML = message.toString();
      } else if (topic === "esp32/humidity") {
        humidity.innerHTML = message.toString();
      }
    });
  } else {
    console.error("One or more elements not found in the DOM.");
  }
});