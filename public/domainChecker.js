document.getElementById('domainForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const domainName = document.getElementById('domainName').value;
    const domainSuffix = document.getElementById('domainSuffix').value;
    const proxyUrl = `/api/whois?name=${domainName}&suffix=${domainSuffix}`;
    console.log('proxyUrl:', proxyUrl);
    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            if (data.status === 'ok') {
                resultDiv.innerHTML = `
                    <p>Domain: ${data.domain}</p>
                    <p>Registered: ${data.available ? 'No' : 'Yes'}</p>
                    ${data.creation_datetime ? `<p>Registration Date: ${data.creation_datetime}</p>` : ''}
                    ${data.expiry_datetime ? `<p>Expiry Date: ${data.expiry_datetime}</p>` : ''}
                `;
            } else {
                resultDiv.textContent = 'Error fetching domain information.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error fetching domain information.';
        });
});
