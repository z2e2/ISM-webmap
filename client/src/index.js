import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './configureApolloClient';
import * as serviceWorker from './serviceWorker';
import Map, { ISMLegend } from './containers/map/map';
import ReactTooltip from 'react-tooltip';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, Grid } from '@material-ui/core';
import drexelWhiteLogo from './containers/drexelWhiteLogo.png';
import engineeringGoldWhitePrimary from './containers/engineeringGoldWhitePrimary.png';
import { withStyles } from '@material-ui/styles';
require('./containers/tabs/styles.css');
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

function Webmap() {
  const [tooltip, setTooltip] = useState('');
  const [selected, setSelected] = useState('');
  return (
    <div style={{ padding: '30px' }}>
      <Grid container spacing={5}>
        <Grid item xs={2}>
          <ISMLegend />
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={10}>
            <Map setTooltipContent={setTooltip} setSelectedContent={setSelected} />
            <ReactTooltip>{tooltip}</ReactTooltip>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
const tabStyling = {
  root: {
    textTransform: 'none',
    fontSize: '14px'
  },
  color: '#FFFFFF',
  '&:focus': {
    color: '#FFF'
  }
};

const titleStyle = { fontSize: '16px', color: '#FFF', fontWeight: 500 };

const StyledTabs = withStyles({
  root: {
    marginLeft: '20px'
  },
  indicator: {
    '& > span': {
      width: '100%'
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ style: { backgroundColor: '#07294D' } }} />);

const StyledTab = withStyles({
  root: {
    fontSize: '14px',
    minWidth: 72,
    '&:hover': {
      color: '#123456'
    },
    '&$selected': {
      color: '#123456',
      fontWeight: 700
    }
  }
})(props => <Tab {...props} />);

function AppTabs() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newTab) => {
    console.log(newTab);
    setSelectedTab(newTab);
  };

  return (
    <>
      <div style={{ backgroundColor: '#07294D', minHeight: '90px' }}>
        <Grid container justify='center' alignItems='center' style={{ paddingTop: '15px' }}>
          <Grid item display='flex' style={{ marginRight: '10px' }}>
            <a href="https://drexel.edu/engineering/">
              <img height='50px' src={engineeringGoldWhitePrimary} />
            </a>
          </Grid>
          <Grid item>
            <Typography align='left' style={titleStyle}>
              COVID-19
            </Typography>
            <Typography align='left' style={titleStyle}>
              ISM World Map
            </Typography>
          </Grid>
          <Grid item>
            <StyledTabs value={selectedTab} onChange={handleTabChange} style={tabStyling}>
              <StyledTab disableRipple style={tabStyling} value={0} label='World Map' />
              <StyledTab disableRipple style={tabStyling} value={1} label='Acknowledgements' />
              <StyledTab disableRipple style={tabStyling} value={2} label='About' />
            </StyledTabs>
          </Grid>
        </Grid>
      </div>
      {selectedTab == 0 && <Webmap />}
      {selectedTab == 1 && (
        <div label='Acknowledgements' style={{marginLeft: '50px', marginRight: '50px'}}>
          <h3>Acknowledgements list</h3>
          <a
            href='https://raw.githubusercontent.com/EESI/ISM/master/acknowledgement_table.csv'
            target='_blank'
            rel='noopener noreferrer'
          >
            Click here to download list
          </a>
          <p />
          <p align='justify'>
            We would like to thank GISAID and{' '}
            <a href='https://github.com/nextstrain' target='_blank' rel='noopener noreferrer'>
              Nextstrain
            </a>{' '}
            for sharing the sequence data and metadata. We also gratefully acknowledge the authors,
            originating and submitting laboratories of the sequences from GISAID’s EpiFlu Database
            on which this research is based. All submitters of data may be contacted directly via
            the{' '}
            <a href='https://www.gisaid.org/' target='_blank' rel='noopener noreferrer'>
              GISAID
            </a>{' '}
            website.
          </p>
          <p align='justify'>Special thanks to:</p>
          <ul align='justify' type='square'>
            <li>Zhengqiao Zhao</li>
            <li>Dr. Gail L. Rosen</li>
            <li>Bahrad A. Sokhansanj</li>
          </ul>
        </div>
      )}
      {selectedTab == 2 && (
        <div label='Info' style={{marginLeft: '50px', marginRight: '50px'}}>
          <h3>Project Information and Source Code</h3>
          <p />
          <p align='justify'>
            <b>
              <u>General Info</u>
            </b>{' '}
            &rarr;{' '}
            <a
              href='https://github.com/Karavangelas/webmap'
              target='_blank'
              rel='noopener noreferrer'
            >
              {' '}
              WebMap GitHub
            </a>
          </p>
          <p align='justify'>
            The Covid-19 WebMap is a website created to display Covid-19 data in an interactive way.
            This is done with the use of ISMs, which are described in the section below. The
            interactive WebMap allows users to click on a certain country on the map, and visualize
            important Covid-19 data regarding a specific country. This data includes relative
            abundance graphs and ISM pie charts.
            <p />
            <p>Website contributors:</p>
            <ul type='square'>
              <li>Kleanthis Karavangelas</li>
              <li>Liam Shamir</li>
              <li>Dan Dunkers</li>
              <li>Karanveer Singh</li>
              <li>Dan Drzewicki</li>
            </ul>
          </p>

          <p />
          <p align='justify'>
            <b>
              <u>ISMs</u>
            </b>{' '}
            &rarr;{' '}
            <a href='https://github.com/EESI/ISM' target='_blank' rel='noopener noreferrer'>
              {' '}
              ISM GitHub
            </a>
          </p>
          <p align='justify'>
            Informative Subtype Markers (ISM) is an efficient framework for genetic subtyping of a
            pandemic virus and is implemented for SARS-CoV-2, the novel coronavirus that causes
            COVID-19. The use of ISMs permits subtyping individual SARS-CoV-2 virus genomes, and in
            essence generating a signature that can be readily used to track viral evolution through
            geography and time.
          </p>
        </div>
      )}
    </>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const container = document.createElement('div');
document.body.appendChild(container);

const rootElement = document.getElementById('root');
ReactDOM.render(<AppTabs />, rootElement);
