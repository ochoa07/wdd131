// Function to generate the participant template with unique IDs based on the participant count
function participantTemplate(count) {
    return `
      <section class="participant">
        <p>Participant ${count}</p>
        <div class="item">
          <label for="fname-${count}">First Name<span>*</span></label>
          <input id="fname-${count}" type="text" name="fname-${count}" required />
        </div>
        <div class="item activities">
          <label for="activity-${count}">Activity #<span>*</span></label>
          <input id="activity-${count}" type="text" name="activity-${count}" />
        </div>
        <div class="item">
          <label for="fee-${count}">Fee ($)<span>*</span></label>
          <input id="fee-${count}" type="number" name="fee-${count}" />
        </div>
        <div class="item">
          <label for="date-${count}">Desired Date <span>*</span></label>
          <input id="date-${count}" type="date" name="date-${count}" />
        </div>
        <div class="item">
          <p>Grade</p>
          <select name="grade-${count}">
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
      </section>
    `;
  }
  
  // Function to calculate total fees
  function totalFees() {
    // Select all fee input elements
    let feeElements = document.querySelectorAll("[id^=fee]");
  
    // Convert NodeList to an array using the spread operator
    feeElements = [...feeElements];
  
    // Sum up the fees using reduce
    const total = feeElements.reduce((sum, feeElement) => {
      const feeValue = parseFloat(feeElement.value) || 0;  // Convert to number, treat empty values as 0
      return sum + feeValue;
    }, 0);
  
    return total;
  }
  
  // Function to generate the success message
  function successTemplate(info) {
    return `
      <p>Thank you ${info.adultName} for registering.</p>
      <p>You have registered ${info.participantCount + 1} participants and owe $${info.totalFees.toFixed(2)} in Fees.</p>
    `;
  }
  
  // Function to handle form submission
  function submitForm(event) {
    event.preventDefault();  // Prevent the default form submission (page reload)
  
    // Get adult's name (assuming the input field with id 'adult_name')
    const adultName = document.getElementById("adult_name").value;
  
    // Count the number of participants
    const participantCount = document.querySelectorAll('.participant').length;
  
    // Calculate the total fees
    const total = totalFees();
  
    // Create the success message object
    const successInfo = {
      adultName: adultName,
      participantCount: participantCount,
      totalFees: total
    };
  
    // Hide the form
    const form = document.getElementById("registrationForm");
    form.style.display = "none";
  
    // Show the summary
    const summaryElement = document.getElementById("summary");
    summaryElement.style.display = "block";
  
    // Insert the success message into the summary element
    summaryElement.innerHTML = successTemplate(successInfo);
  }
  
  // Event listener for the Add Participant button
  document.addEventListener("DOMContentLoaded", function() {
    let participantCount = 1; // Set initial participant count
  
    // Add event listener to the "Add Participant" button
    document.getElementById("add").addEventListener("click", function() {
      participantCount++; // Increase the participant count
  
      // Generate the HTML for the new participant using the participantTemplate function
      const newParticipantHTML = participantTemplate(participantCount);
  
      // Insert the new participant section before the "Add Participant" button
      document.getElementById("add").insertAdjacentHTML('beforebegin', newParticipantHTML);
    });
  
    // Add event listener to the form for submit event
    const form = document.getElementById("registrationForm"); // Assuming the form has id="registrationForm"
    form.addEventListener("submit", submitForm);
  });