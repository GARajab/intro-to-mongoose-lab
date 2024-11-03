// i was using const  then required but vscode was giving error and cant execute the application

import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import promptSync from "prompt-sync"
import Customer from "./models/customer.js"

dotenv.config()
const app = express()
const promp = promptSync()
const PORT = process.env.PORT

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

console.log("Welcome to the CRM")
const appStart = () => {
  console.log("1. Create a customer")
  console.log("2. View all customers")
  console.log("3. Update a customer")
  console.log("4. Delete a customer")
  console.log("5. Quit")
}
appStart()

while (true) {
  const custInput = promp("What would you like to do? ")

  if (custInput === "1") {
    // Create a customer
    const name = promp("Enter Your Name: ")
    const age = promp("Enter Your Age: ")
  

    const customerData = {
      customerName: name,
      age: age,
    }
    const customer = await Customer.create(customerData)
    console.log("Customer created:", customer)
    appStart()
  } else if (custInput === "2") {
    // View all customers
    const customers = await Customer.find({})
    console.log("Below is a list of customers:")
    console.log(customers)
    appStart()
  } else if (custInput === "3") {
    // Update a customer - example
    const id = promp("Enter customer ID to update: ")
    const updatedName = promp("Enter the new name: ")
    await Customer.findByIdAndUpdate(id, { customerName: updatedName })
    console.log("Customer updated.")
    appStart()
  } else if (custInput === "4") {
    // Delete a customer
    const id = promp("Enter customer ID to delete: ")
    await Customer.findByIdAndDelete(id)
    console.log("Customer deleted.")
    appStart()
  } else if (custInput === "5") {
    console.log("Exiting...")
    if (mongoose.connection.close()) {
      console.log("Connection With Database Is Disconnected Successfully")
      console.log("Application Stopped")
      break
    }
  }
}
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
