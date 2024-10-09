document.getElementById("scanButton").addEventListener("click", () => {
  const url = document.getElementById("urlInput").value;

  if (url) {
    // CORS Proxy URL
    const corsProxy = "https://corsproxy.io/?";
    const virusTotalApiUrl = `https://www.virustotal.com/vtapi/v2/url/report?apikey=463d3f50336022241779d8f815754f80fc1da0071f98c282e968a12a0b1fea4a&resource=${encodeURIComponent(
      url
    )}`;

    fetch(`${corsProxy}${virusTotalApiUrl}`)
      .then((response) => response.json())
      .then((data) => {
        let resultDiv = document.getElementById("result");
        if (data.positives > 0) {
          resultDiv.innerHTML = `<p><strong>⚠️ Warning:</strong> This URL is potentially malicious.</p>`;
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon.png",
            title: "Threat Detected",
            message: `⚠️ The URL ${url} has been flagged as malicious.`,
          });
        } else {
          // resultDiv.innerHTML = `<p>✅ This URL is safe.</p>`;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById(
          "result"
        ).innerHTML = `<p>Error: Unable to scan the URL.</p>`;
      });
  } else {
    document.getElementById(
      "result"
    ).innerHTML = `<p>Please enter a URL to scan.</p>`;
  }
});

document.getElementById("scanButton").addEventListener("click", function () {
  const urlInput = document.getElementById("urlInput");
  const resultDiv = document.getElementById("result");
  const loader = document.getElementById("loader");
  const successIcon = document.getElementById("successIcon");
  const safeMessage = document.getElementById("safeMessage"); // Reference to the new message element
  const button = document.getElementById("scanButton");

  // Clear previous result, hide success icon, and message
  resultDiv.innerHTML = "";
  successIcon.style.display = "none";
  safeMessage.style.display = "none";

  // Show loading spinner
  loader.style.display = "block";
  button.disabled = true;

  // Simulate a scan process with a timeout
  setTimeout(function () {
    loader.style.display = "none"; // Hide loading spinner
    successIcon.style.display = "block"; // Show success icon
    safeMessage.style.display = "block"; // Show the message
    safeMessage.innerHTML = "This URL is safe!"; // Display safety message
    button.disabled = false;
  }, 3000); // Simulate a 3-second loading process
});
