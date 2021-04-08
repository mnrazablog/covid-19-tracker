import React, { useState, useEffect } from "react";

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./App.css"
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";

import { Card, CardContent } from "@material-ui/core";
import { sortData } from "./components/util";
// "https://disease.sh/v3/covid-19/countries"

function App() {
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState({});
const [tableData,setTableData]=useState([])
  

useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })

  }, [])
  useEffect(() => {
    //  console.log("Hi there");
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });

    };
    getCountryData();
  }, []);
  // To change the Country from Drop Down
  const changeCountry = async (e) => {
    const countryCode = e.target.value;
    setSelectCountry(countryCode);
    // await fetch("https://disease.sh/v3/covid-19/countries")

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setSelectCountry(countryCode);
        setCountryInfo(data)
      })

  }

  console.log("COUNTRY INFO", countryInfo);
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
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* End App Header */}
        {/* App Stats */}
        <div className="app__stats">
          {/* InfoBoxs  title="Coronavirus Cases" */}
          <InfoBox
            title="Today Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases} />
          {/* InfoBoxs  title="Coronavirus Recoveries" */}
          <InfoBox
            title="Today Recovered "
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered} />
          {/* InfoBoxs  title="Coronavirus Deaths" */}
          <InfoBox
            title="Today Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />
      </div>
      {/* App Right */}

      <Card className="app__right">

        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <Table countries={tableData}/>
          {/* Graph */}
          <h3>Worldwide new Cases</h3>
        </CardContent>

      </Card>

    </div>
  );
}

export default App;
