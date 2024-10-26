// fertilizersData.js

// Function to generate data
const generateData = () => {
    const states = [
      "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
      "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand",
      "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
      "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
      "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
      "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];
    const fertilizers = ["DAP", "MAP", "MOP", "NPK", "TSP", "UREA"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = "2015-2016";
    const data = [];
    let id = 1;
  
    // Loop to populate data array
    states.forEach(state => {
      months.forEach(month => {
        fertilizers.forEach(product => {
          data.push({
            _year: year,
            month: month,
            product: product,
            state: state,
            requirement_in_mt_: Math.floor(Math.random() * 1000).toString(),
            availability_in_mt_: Math.floor(Math.random() * 1000).toString(),
            id: id++
          });
        });
      });
    });
  
    return data;
  };
  
  // Generate data once and export it
  export const fertilizerData = generateData();
  