import { defaultConfig } from "next/dist/server/config-shared";
import { useState } from "react";

export default function WorkshopCardForm(){
    const [plateNumber, setPlateNumber] = useState('');
    const [driver, setdriver] = useState('');
    const [location, setlocation] = useState('');
    const [entryDate, setEntryDate] = useState('');
    const [mechanicalIssue, setMechanicalIssue] = useState('');
    // const [status, setStatus] = useState('');
    

    //Function for handling form submission

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const response = await fetch('http://localhost:5000/api/workshop-cards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plateNumber,
                driver,
                location,
                entryDate,
                mechanicalIssue,
                status: "created", // Include status if applicable
              }),
            });
            if (response.ok) {
                // Clear the form fields
                setPlateNumber('');
                setdriver('');
                setlocation('');
                setEntryDate('');
                setMechanicalIssue('');
                alert('Card successfully created!');
              } else {
                alert('Failed to create card');
              }


         // Log the form data to the console (or send it to a backend)
    // console.log({
    //     plateNumber,
    //     driver,
    //     entryDate,
    //     mechanicalIssue,
    //   });

       // Optionally, clear the form fields after submission
    // setPlateNumber('');
    // setdriver('');
    // setEntryDate('');
    // setMechanicalIssue('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Register a New Car</h1>
      <form onSubmit={handleSubmit}>
        {/* Plate Number Input */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="plateNumber">Plate Number:</label>
          <input
            type="text"
            id="plateNumber"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)} // Update state with user input
            required // Make this field mandatory
            style={{ width: '100%', padding: '8px' }}
            />
            </div>
    
            {/* Driver's Name Input */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="driver">Driver's Name:</label>
              <input
                type="text"
                id="driver"
                value={driver}
                onChange={(e) => setdriver(e.target.value)} // Update state with user input
                required // Make this field mandatory
                style={{ width: '100%', padding: '8px' }}
              />
            </div>

            {/* Location Input */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="driver"
                value={location}
                onChange={(e) => setlocation(e.target.value)} // Update state with user input
                required // Make this field mandatory
                style={{ width: '100%', padding: '8px' }}
              />
            </div>

            {/* Entry Date Input */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="entryDate">Entry Date:</label>
          <input
            type="date"
            id="entryDate"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)} // Update state with user input
            required // Make this field mandatory
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {/* Mechanical Issue Textarea */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="mechanicalIssue">Mechanical Issue:</label>
          <textarea
            id="mechanicalIssue"
            value={mechanicalIssue}
            onChange={(e) => setMechanicalIssue(e.target.value)} // Update state with user input
            required // Make this field mandatory
            rows="4" // Set the number of visible rows
            style={{ width: '100%', padding: '8px' }}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
