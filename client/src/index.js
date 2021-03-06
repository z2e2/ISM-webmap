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
import gisaidLogo from './containers/gisaidLogo.png';
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
const footnoteStyle = {fontSize: '12px', marginLeft: '35px', marginRight: '35px'};
const mapDisclaimer = {fontSize: '10px', marginLeft: '15px', marginRight: '15px'};
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
          <p align='center' style={mapDisclaimer}>
          The world map is only for ISM distribution illustration purposes and does not
          imply the expression of any opinion whatsoever concerning the legal status of
          any country, area or territory or of its authorities, or concerning the
          delimitation of its borders.
          </p>
          <p align='center' style={footnoteStyle}>
          GISAID data provided on this website is subject to{' '}
          <a href='https://www.gisaid.org/registration/terms-of-use/' target='_blank'  rel='noopener noreferrer'>
          GISAID’s Terms and Conditions
          </a>.
          </p>
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
const placeholderStyle = { fontSize: '16px', color: '#07294D', fontWeight: 500 };
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
        <Grid container justify='left' alignItems='left' style={{ paddingTop: '15px', marginLeft: '35px' }}>
          <Grid item display='flex' style={{ marginRight: '10px' }}>
            <a href="https://drexel.edu/engineering/">
              <img height='50px' src={engineeringGoldWhitePrimary} />
            </a>
          </Grid>
          <Grid item>
            <Typography align='left' style={titleStyle}>
              COVID-19 World Map of
            </Typography>
            <Typography align='left' style={titleStyle}>
              Informative Subtype Marker
            </Typography>
          </Grid>
          <Grid item>
            <StyledTabs value={selectedTab} onChange={handleTabChange} style={tabStyling}>
              <StyledTab disableRipple style={tabStyling} value={0} label='World Map' />
              <StyledTab disableRipple style={tabStyling} value={1} label='Acknowledgements' />
              <StyledTab disableRipple style={tabStyling} value={2} label='About' />
            </StyledTabs>
          </Grid>
          <Grid item>
            <Typography align='right' style={placeholderStyle}>
              ISM Map enabled data from
            </Typography>
          </Grid>
          <Grid item>
            <Typography align='right' style={titleStyle}>
              ISM World Map
            </Typography>
            <Typography align='right' style={titleStyle}>
              enabled by data from
            </Typography>
          </Grid>
          <Grid item display='flex' style={{ marginRight: '35px' }}>
            <a href="https://www.gisaid.org/">
              <img height='50px' src={gisaidLogo} />
            </a>
          </Grid>
        </Grid>
      </div>
      {selectedTab == 0 && <Webmap />}
      {selectedTab == 1 && (
        <div label='Acknowledgements' style={{marginLeft: '35px', marginRight: '35px'}}>
          <h3>Acknowledgements</h3>
          <p />
          <p align='justify'>
            Informative Marker Subtyping (ISM) Platform is enabled by hCoV-19 genome sequence data
            from the GISAID EpiCoV<sup>TM</sup> database. The GISAID organisation{' '}
            <a href='https://www.gisaid.org/about-us/mission/' target='_blank' rel='noopener noreferrer'>
              promotes the rapid sharing of data whilst protecting the acknowledgement rights of data providers
            </a>{' '}
          </p>
          <p align='justify'>
            As per requirements from GISAID, if you intend to publish research using the sequence data from GISAID,
            or the derived data available from Informative Marker Subtyping (ISM) Platform, you must accept the{' '}
            <a href='https://www.gisaid.org/registration/terms-of-use/' target='_blank' rel='noopener noreferrer'>
              GISAID Data Access Agreement
            </a>{' '}
            and appropriately credit (e.g. by attaching as supplementary data) the data contributors.
            In academic publications, you should also cite the GISAID project itself.
            Details of how to give appropriate credit are available on the{' '}
            <a href='https://www.gisaid.org/' target='_blank' rel='noopener noreferrer'>
              GISAID website
            </a>.
          </p>
          <p align='justify'>
            We also gratefully acknowledge the authors, originating and submitting laboratories
            of the sequences from GISAID’s EpiCoV<sup>TM</sup> Database on which this research is based.
            Access to the individual isolates is facilitated through{' '}
            <a href='https://www.gisaid.org/' target='_blank' rel='noopener noreferrer'>
              GISAID
            </a>. A full list of authors, originating laboratories, and submitting laboratories
            of sequences used in our research can be downloaded{' '}
            <a
              href='https://github.com/z2e2/ISM-webmap/blob/master/acknowledgement_table.csv'
              target='_blank'
              rel='noopener noreferrer'
            >
              here
            </a>.
          </p>
          <p />
          <p />
          <p />
          <p />
          <p />
          <p align='center' style={footnoteStyle}>
          GISAID data provided on this website is subject to{' '}
          <a href='https://www.gisaid.org/registration/terms-of-use/' target='_blank'  rel='noopener noreferrer'>
          GISAID’s Terms and Conditions
          </a>.
          </p>
        </div>
      )}
      {selectedTab == 2 && (
        <div label='Info' style={{marginLeft: '35px', marginRight: '35px'}}>
          <h3>Project Information</h3>

          <p />
          <p align='justify'>
            <b>
              <u>Informative Subtype Markers:</u>
            </b>{' '}
            <a href='https://github.com/EESI/ISM' target='_blank' rel='noopener noreferrer'>
              {' '}
              Source Code
            </a>
          </p>
          <p align='justify'>
            Informative Subtype Markers (ISM) is an efficient framework for genetic subtyping of a
            pandemic virus and is implemented for SARS-CoV-2 (hCoV-19/GISAID), the novel coronavirus that causes
            COVID-19. The use of ISMs permits subtyping individual SARS-CoV-2 (hCoV-19/GISAID) virus genomes, and in
            essence generating a signature that can be readily used to track viral evolution through
            geography and time. Please find the reference paper at:{' '}
            <a href='https://www.biorxiv.org/content/10.1101/2020.04.07.030759v4.full.pdf' target='_blank' rel='noopener noreferrer'>
              Characterizing geographical and temporal dynamics of novel coronavirus SARS-CoV-2 using informative subtype markers
            </a>.
          </p>

          <p />
          <p align='justify'>
            <b>
              <u>Website Development:</u>
            </b>{' '}
            <a
              href='https://github.com/z2e2/ISM-webmap'
              target='_blank'
              rel='noopener noreferrer'
            >
              {' '}
              Source Code
            </a>
          </p>
          <p align='justify'>
            The COVID-19 World Map is a website created to display SARS-CoV-2 (hCoV-19/GISAID) genotypes (ISMs) in an interactive way.
            This is done with the use of ISMs, which are described in the section below. The
            interactive ISM Map allows users to click on a certain country on the map, and visualize
            important ISMs regarding a specific country. This data includes relative
            abundance graphs and ISM pie charts. This website is maintained by {' '}
            <a href='https://drexeleesi.com/' target='_blank' rel='noopener noreferrer'>
              EESI laboratory
            </a> at Drexel University.
            <p />
            <p>Website contributors:</p>
            <ul type='square'>
              <li>Kleanthis Karavangelas</li>
              <li>Liam Shamir</li>
              <li>Dan Dunkers</li>
              <li>Karanveer Singh</li>
              <li>Dan Drzewicki</li>
              <li>Zhengqiao Zhao</li>
              <li>Bahrad A. Sokhansanj</li>
              <li>Gail L. Rosen</li>
            </ul>
          </p>

          <p />
          <p align='justify'>
            <b>
              <u>Contact</u>
            </b>{' '}
          </p>
          <p align='justify'>
            This website is offered under the auspices of the College of Engineering, Drexel University
            <p />
            <p>IT Support:</p>
            <ul type='square'>
              <li>Andrew Marx, marx@drexel.edu</li>
              <li>Paul Dempsey, pfd36@drexel.edu</li>
            </ul>
          </p>
          <p align='center' style={footnoteStyle}>
          GISAID data provided on this website is subject to{' '}
          <a href='https://www.gisaid.org/registration/terms-of-use/' target='_blank'  rel='noopener noreferrer'>
          GISAID’s Terms and Conditions
          </a>.
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
