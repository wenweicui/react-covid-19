import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import styles from './CountryList.module.css';
import ReactLoading from 'react-loading';
import { countriesName, countries } from '../../utils/countries';

const useStyles = makeStyles({
    number: {
        fontWeight: 500,
        color: '#5d5d5d',
    },
    name: {
        color: '#95a5a6',
    },
  });

const SearchBar = (props) => {
    return (
        <div className={styles.search}>
          <SearchIcon color="disabled"/>
          <input
            type="text"
            className={styles.input}
            placeholder="Search Country"
            onChange={(e) => props.onChange(e.target.value)}
          />
        </div>
    )
  }

const CountryList = ({ handleCountryChange }) => {
    const classes = useStyles();
    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState([]);
    const [ searchValue, setSearchValue ] = useState("");

    let searchData = data.filter((country) => {
        return (
          country.country.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
        )
      })

    useEffect(() => {
        fetch(`https://covid19.mathdro.id/api/confirmed`)
          .then((response) => response.json())
          .then((resultData) => {
            let countriesCount = countries.map((item) => {
              return { ...item }
            })

            for (let result of resultData) {
              if (countriesName.hasOwnProperty(result.countryRegion)) {
                countriesCount[
                    countriesName[result.countryRegion]
                ].confirmedCount += result.confirmed
              } else {
                countriesCount.push({
                  country: result.countryRegion,
                  confirmedCount: result.confirmed,
                })
              }
            }
            countriesCount.sort((a, b) => b.confirmedCount - a.confirmedCount);
            setData(countriesCount)
            setLoading(false)
          })
          .catch((error) => console.log(error))
    }, [])
    

    const listItems = searchData.map((data, i) => {

        const number = data.confirmedCount.toLocaleString();

        return (
            <ListItem key={i} button onClick={(e) => handleCountryChange(data.country)}>
                <ListItemText primary={number} classes={{primary: classes.number}}/>
                <ListItemText primary={data.country} classes={{primary: classes.name}}/>
            </ListItem>
        )
    })

    return(
        <div className={styles.container}>
            <SearchBar onChange={setSearchValue} />
            <div className={styles.list}>
                { loading ? 
                <ReactLoading type='bubbles' color={'#eee'} height={300} width={200} /> 
                : listItems }
            </div>
        </div>
    )
}

export default CountryList;