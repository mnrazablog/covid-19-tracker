import React, { useState,useEffect } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./App.css"
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

import { Card, CardContent } from "@material-ui/core";
// "https://disease.sh/v3/covid-19/countries"

function App() {
const [countries,setCountries]=useState([]);
const [selectCountry,setSelectCountry]=useState("");



  useEffect(() => {
    //  console.log("Hi there");
      const getCountryData = async ()=>{
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response)=>response.json())
        .then((data)=>{
          const countries = data.map((country)=>({
              name:country.country,
              value:country.countryInfo.iso2
            }));
            setCountries(countries);
        });
        
      };
      getCountryData();
    }, []);
// To change the Country from Drop Down
   const changeCountry =(e)=>{
   const countryCode = e.target.value;
     setSelectCountry(countryCode);
   }

  return (
    <div className="app">
      {/* App Left */}
      <div className="app__left">
         {/* App Header */}
         <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      {/* New DropDown */}
        <FormControl className="app__dropdown">  
          <Select  
           value={selectCountry}
           variant='outlined' 
           displayEmpty
          //  inputProps={{ 'aria-label': 'Without label' }}
          //  defaultValue={selectCountry}
           onChange={changeCountry}>

          <MenuItem value=""><em>World Wide</em></MenuItem>
          {countries.map((country)=>(
          <MenuItem value={country.value}>{country.name}</MenuItem>
        ))}
          </Select>
        </FormControl>
      </div>
  {/* End App Header */}
  {/* App Stats */}
<div className="app__stats">
     {/* InfoBoxs  title="Coronavirus Cases" */}
     <InfoBox title="Coronavirus Cases" cases={1234} total={2000}/>
     {/* InfoBoxs  title="Coronavirus Recoveries" */}
     <InfoBox title="Recovered Cases" cases={1234} total={6000}/>
     {/* InfoBoxs  title="Coronavirus Deaths" */}
     <InfoBox title="Deaths Cases" cases={1234} total={5000}/>
</div>
  
     {/* Table */}
     {/* Graph */}
     {/* Map */}
    <Map/>
      </div>
      {/* App Right */}

      <Card className="app__right">
     
      <CardContent>
        <h3>Live Cases by Country</h3>
            {/* Table */}
        <h3>Worldwide new Cases</h3>
      </CardContent>
          {/* Graph */}
      </Card>
   
   </div>
  );
}

export default App;
