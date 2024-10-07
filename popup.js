document.getElementById('scanButton').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value;

  if (url) {
    // CORS Proxy URL
    const corsProxy = 'https://corsproxy.io/?';
    const virusTotalApiUrl = `https://www.virustotal.com/vtapi/v2/url/report?apikey=463d3f50336022241779d8f815754f80fc1da0071f98c282e968a12a0b1fea4a&resource=${encodeURIComponent(url)}`;

    fetch(`${corsProxy}${virusTotalApiUrl}`)
      .then(response => response.json())
      .then(data => {
        let resultDiv = document.getElementById('result');
        if (data.positives > 0) {
          resultDiv.innerHTML = `<p><strong>⚠️ Warning:</strong> This URL is potentially malicious.</p>`;
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon.png',
            title: 'Threat Detected',
            message: `⚠️ The URL ${url} has been flagged as malicious.`,
          });
        } else {
          resultDiv.innerHTML = `<p>✅ This URL is safe.</p>`;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>Error: Unable to scan the URL.</p>`;
      });
  } else {
    document.getElementById('result').innerHTML = `<p>Please enter a URL to scan.</p>`;
  }
});
