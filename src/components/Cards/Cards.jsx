import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        boxShadow: `4px 4px rgba(0,0,0,0.03)`,
    }
}); 

const Cards = ({data: {confirmed, recovered, deaths, lastUpdate, country }}) => {

    const classes = useStyles();

    if (!confirmed) {
        return 'Loading...';
    }
    
    return(
        <div className={styles.container}>
            {country ? (<h2 className={styles.title}>{country}</h2>) : (<h2 className={styles.title}>Global</h2>)}
            <Card className={styles.cardContainer} classes={{root: classes.root}}>  
                <CardContent className={styles.card}>
                    <Typography className={styles.name} gutterBottom >Aggregared Confirmed</Typography>
                    <Typography className={styles.confirmed}>
                        <CountUp start={0} end={confirmed.value} duration={2} separator="," />
                    </Typography>
                </CardContent>
            </Card>
            <Card className={styles.cardContainer}  classes={{root: classes.root}}>  
                <CardContent className={styles.card}>
                    <Typography className={styles.name} gutterBottom >Recovered</Typography>
                    <Typography className={styles.recovered}>
                        <CountUp start={0} end={recovered.value} duration={2} separator="," />
                    </Typography>
                </CardContent>
            </Card>
            <Card className={styles.cardContainer} classes={{root: classes.root}}>  
                <CardContent className={styles.card}>
                    <Typography className={styles.name} gutterBottom >Death</Typography>
                    <Typography className={styles.death}>
                        <CountUp start={0} end={deaths.value} duration={2} separator="," />
                    </Typography>
                </CardContent>
            </Card>
            <Card className={styles.cardContainer} classes={{root: classes.root}}>  
                <CardContent className={styles.card}>
                    <Typography className={styles.name} gutterBottom >Last Update</Typography>
                    <Typography className={styles.date}>{new Date(lastUpdate).toDateString()}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Cards;