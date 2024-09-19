// "use client";
import { defaultConfig } from "next/dist/server/config-shared";
import { useState } from "react";
import '../app/globals.css';
 // Correct the path based on your actual structure
import Link from 'next/link';
import { useRouter, useEffect } from "next/router";  // For navigation


export default function WorkshopCardForm(){
    const [plateNumber, setPlateNumber] = useState('');
    const [driver, setdriver] = useState('');
    const [location, setlocation] = useState('');
    const [entryDate, setEntryDate] = useState('');
    const [mechanicalIssue, setMechanicalIssue] = useState('');
    // const [status, setStatus] = useState('');
    const router = useRouter();
    const { id } = router.query;  // Extract the card ID from the URL


    // changes


    // If editing, fetch the existing card data
  //   useEffect(() => {
  //     if (id) {
  //         const fetchCard = async () => {
  //             const response = await fetch(`http://localhost:5000/api/workshop-cards/${id}`);
  //             const data = await response.json();

  //             // Pre-fill form with existing card data for editing
  //             setPlateNumber(data.plateNumber);
  //             setDriver(data.driver);
  //             setLocation(data.location);
  //             setEntryDate(data.entryDate);
  //             setMechanicalIssue(data.mechanicalIssue);
  //             setStatus(data.status);  // Keep the status as it is
  //         };
  //         fetchCard();
  //     }
  // }, [id]);
    

    //Function for handling form submission

    // const handleSubmit = async (e) => {
    //     e.preventDefault(); // Prevent the default form submission behavior

        
    //     const method = id ? 'PUT' : 'POST';  // If ID exists, use PUT for editing, otherwise POST for creating
    //     const url = id 
    //         ? `http://localhost:5000/api/workshop-cards/${id}` 
    //         : 'http://localhost:5000/api/workshop-cards';

    //     // Create or update the card based on whether ID exists
    //     const response = await fetch(url, {
    //         method,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             plateNumber,
    //             driver,
    //             location,
    //             entryDate,
    //             mechanicalIssue,
    //             status: "created",  // Default status for new cards is "created"
    //         }),
    //     });

    //     if (response.ok) {
    //         setSuccessMessage(id ? 'Card successfully updated!' : 'Card successfully created!');
    //         if (!id) {
    //             // For new card creation, reset the form
    //             resetForm();
    //         } else {
    //             // For edit, redirect back to the cards list
    //             router.push('/cards');
    //         }
    //     } else {
    //         alert('Failed to submit card');
    //     }
    // };


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

          };   


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
  // };

  return (
    <div className="border-[#151953] shadow-inner">
    <h1 className="capitalize text-3xl font-bold mb-4 text-center pt-4 text-bg">Garage management system</h1>
    <div style={{ padding: '45px', maxWidth: '600px', margin: ' auto', background: "#e1e2e9"}} className="rounded shadow-inner">
        
      <h1 className="mb-6 text-xl text-black font-bold">Register a New Car</h1>
      <form onSubmit={handleSubmit}>
        {/* Plate Number Input */}
        <div style={{ marginBottom: '10px', color: "black" }} className="text-sm p-2">
          <label htmlFor="plateNumber">Plate Number:</label>
          <input
            type="text"
            id="plateNumber"
            value={plateNumber}
            // onChange={(e) => setPlateNumber(e.target.value)} // Update state with user input
            onChange={(e) => {
              if (e.target.value.length <= 8) { // Limit plate number to 8 characters
                setPlateNumber(e.target.value);
              }
            }}
            required // Make this field mandatory
            style={{ width: '100%', padding: '8px', outline: 'none' }} className="rounded-md focus:border-2 border-gray-200 focus:border-peri"
            />
            </div>
    
            {/* Driver's Name Input */}
            <div style={{ marginBottom: '10px', color: "black" }} className="text-sm p-2">
              <label htmlFor="driver">Driver's Name:</label>
              <input
                type="text"
                id="driver"
                value={driver}
                onChange={(e) => setdriver(e.target.value)} // Update state with user input
                required // Make this field mandatory
                style={{ width: '100%', padding: '8px', outline: 'none' }} className="rounded-md focus:border-2 border-gray-200 focus:border-peri"
              />
            </div>

            {/* Location Input */}
            <div style={{ marginBottom: '10px', color: "black" }} className="text-sm p-2">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="driver"
                value={location}
                onChange={(e) => setlocation(e.target.value)} // Update state with user input
                required // Make this field mandatory
                style={{ width: '100%', padding: '8px', outline: 'none' }} className="rounded-md focus:border-2 border-gray-200 focus:border-peri"
              />
            </div>

            {/* Entry Date Input */}
        <div style={{ marginBottom: '10px', color: "black" }} className="text-sm p-2">
          <label htmlFor="entryDate">Entry Date:</label>
          <input
            type="date"
            id="entryDate"
            value={entryDate}
            // onChange={(e) => setEntryDate(e.target.value)} // Update state with user input
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const today = new Date();
              
              if (selectedDate <= today) { // Ensure entry date is not after today
                setEntryDate(e.target.value);
              } else {
                alert("Entry date cannot be in the future");
              }
            }}
            required // Make this field mandatory
            style={{ width: '100%', padding: '8px' , outline: 'none' }} className="rounded-md focus:border-2 border-gray-200 focus:border-peri"
          />
        </div>

        {/* Mechanical Issue Textarea */}
        <div style={{ marginBottom: '10px', color:"black" }} className="text-sm p-2">
          <label htmlFor="mechanicalIssue">Mechanical Issue:</label>
          <textarea
            id="mechanicalIssue"
            value={mechanicalIssue}
            onChange={(e) => setMechanicalIssue(e.target.value)} // Update state with user input
            required // Make this field mandatory
            rows="4" // Set the number of visible rows
            style={{ width: '100%', padding: '8px', outline: 'none' }} className="rounded-md focus:border-2 border-gray-200 focus:border-peri"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
        <button
          type="submit"
          style={{ padding: '8px 20px'}} className=" border border-peri text-[#151953] rounded hover:bg-peri hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit  
          {/* {id ? 'Update' : 'Submit'} */}
        </button>
        </div>
      </form>
    </div> 
    <div className="flex justify-center p-4">
    <Link href="/cards" style={{ color: '#0070f3' }} >
        <button className="px-4 py-2 bg-[#3E448E] text-white rounded hover:bg-[#25295D] place-content-center shadow-inner">View Workshop Cards</button>
        </Link>
        </div>
    </div>
  );
}
  