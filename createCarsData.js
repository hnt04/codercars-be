const fs = require("fs");
const csv = require("csvtojson");

const createCarsData = async() => {
    
    const newData = await csv().fromFile("data.csv");

    let data = JSON.parse(fs.readFileSync("db.json"));
    
    const carsData = newData.map((e) => {
        return {
            make: e.Make,
            model:e.Model,
            release_date: e.Year,
            transmission_type: e["Transmission Type"],
            size: e["Vehicle Size"],
            style: e["Vehicle Style"], 
            price: e.MSRP,
    }
})
    data.car = carsData;
    console.log(data);

    fs.writeFileSync("db.json",JSON.stringify(carsData));
};

createCarsData();