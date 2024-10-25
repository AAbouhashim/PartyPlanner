//https://fsa-crud-2aa9294fe819.herokuapp.com/api/2409-FTB-ET-WEB-FT/events

// Function to fetch Upcoming Parties
const fetchParties = async () => {
  try {
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2409-FTB-ET-WEB-FT/events');
    const responseData = await response.json(); // Get the full response object
    return responseData.data;
  } catch (error) {
    console.error('No Response from Server', error);
  }
};

// Function to render parties onto the page
const renderParties = async () => {
  const parties = await fetchParties();
  const partyList = document.getElementById('partyList');

  // Render each party
  parties.forEach(element => {
    const partyLI = document.createElement('li');

    partyLI.innerHTML = `
      <strong>${element.name}</strong>
      <p>${element.description}</p>
      <p>${new Date(element.date).toLocaleDateString()} at ${new Date(element.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p>${element.location}</p>
    `;

    partyList.appendChild(partyLI);
  });
};

// Function to handle the form submission
const handleFormSubmit = async (event) => {
  event.preventDefault();

  const name = document.getElementById('party-name').value;
  const date = document.getElementById('party-date').value;
  const time = document.getElementById('party-time').value;
  const location = document.getElementById('party-location').value;
  const description = document.getElementById('party-description').value;

  // Combine date and time into a single string for submission
  const partyDateTime = new Date(`${date}T${time}`);

  // Create a new party object
  const newParty = {
    name,
    date: partyDateTime.toISOString(),
    location,
    description,
  };

  // Post the new party to the API (adjust the URL as needed)
  try {
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2409-FTB-ET-WEB-FT/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newParty),
    });

    if (response.ok) {
      renderParties(); // Re-render the parties after adding a new one
      document.getElementById('new-party-form').reset(); // Reset the form fields
    } else {
      console.error('Failed to add party', response.statusText);
    }
  } catch (error) {
    console.error('Error adding party:', error);
  }
};

// Call the render function to display parties when the page loads
document.addEventListener('DOMContentLoaded', renderParties);

// Attach the form submit event listener
document.getElementById('new-party-form').addEventListener('submit', handleFormSubmit);