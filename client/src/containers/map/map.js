import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { compute_time_series_ISM } from '../../time_series_analysis';
import { Line, Pie } from 'react-chartjs-2';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from 'react-simple-maps';
import './styles.css';
import { Typography } from '@material-ui/core';
const region_pie_chart = require('../../region_pie_chart.json');

// ALL OF THIS DATA IS JUST PLACE HOLDER
const color_list = [
  'rgba(75,192,192,1)',
  'rgba(0,100,0,1)',
  'rgba(100,0,0,1)',
  'rgba(0,0,100,1)',
  'rgba(255,127,80,1)',
  'rgba(139,69,19,1)'
];
const color_codes = {
  TCTCGTCCACGGGTAAC: '#ff0000B3',
  TCTCGTCCACGGGTGGG: '#ffa500B3',
  TTTCGTCCACGTGTGGG: '#008000B3',
  CCCCGCCCACAGGTGGG: '#0000ffB3',
  CCCCTCTCACAGTTGGG: '#ffd700B3',
  CCCTGCCTGTAGGCGGG: '#87cefaB3',
  TCTCGTCCACGTGTGGG: '#a52a2aB3',
  CCCTGCCCACAGGCGGG: '#000000B3',
  CCCCTCCCACAGGTGGG: '#ffc0cbB3',
  CCCTGCTCACAGGCGGG: '#ffff00B3',
  TCTCTTCCACGGGTGGG: '#bc8f8fB3',
  TCTYGTCCACGGGTGGG: '#b22222B3',
  '-TTCGTCCACGTGTGGG': '#ffe4e1B3',
  TTTCTTCCACGTGTGGG: '#e9967aB3',
  '-CTCGTCCACGGGTGGG': '#a0522dB3',
  CCCCGCCCACAGTTGGG: '#8b4513B3',
  '-CCTGCCTGTAGGCGGG': '#cd853fB3',
  '-CTCGTCCACGGGTAAC': '#deb887B3',
  CCCCTCCCACAGTTGGG: '#ffdeadB3',
  CCCCDCTCACAGTTGGG: '#ffe4b5B3',
  '-CCCTCCCACAGGTGGG': '#fffaf0B3',
  '-CCTGCTCACAGGCGGG': '#fffacdB3',
  '-CCCTCTCACAGTTGGG': '#bdb76bB3',
  CCCCDCCCACAGGTGGG: '#ffffe0B3',
  TCTCGTCCACGGGTDDV: '#9acd32B3',
  CCCYGCCCACAGGTGGG: '#7fff00B3',
  TCTCGCCCACGGGTGGG: '#8fbc8fB3',
  CCCTGCCCGTAGGCGGG: '#228b22B3',
  TTTCGTCCACGGGTGGG: '#2e8b57B3',
  CCCCGCCCACAGGCGGG: '#f5fffaB3',
  CCCCGCTCACAGTTGGG: '#7fffd4B3',
  CCCTGCCCATAGGCGGG: '#f0ffffB3',
  '-CCCGCCCACAGGTGGG': '#2f4f4fB3',
  'CCCTGCCCACAGG-GGG': '#008b8bB3',
  CCCTTCCCACAGGCGGG: '#00ced1B3',
  TCCCGTCCACGTGTGGG: '#00bfffB3',
  TCYCGTCCACGGGTDDV: '#f0f8ffB3',
  CYCCTCCCACAGGTGGG: '#778899B3',
  TCTTGTCCACGGGTGGG: '#6495edB3',
  CCTTGCCCACGGGCGGG: '#e6e6faB3',
  CCCTGCCCACAGGTGGG: '#00008bB3',
  CCCYGCCCACAGGYGGG: '#483d8bB3',
  '-CACTCCCACAGGTGGG': '#8a2be2B3',
  TTTYGTCYACGTGTDGG: '#9400d3B3',
  CCYCDCYCACAGGTGGG: '#dda0ddB3',
  CCCCGCTCACAGGCGGG: '#ff00ffB3',
  TTYYGTCYACGTGTDDV: '#c71585B3',
  YCCYGCCYRCAGGCGGG: '#fff0f5B3',
  OTHER: '#808080'
};
const color_list_pie = ['#FF6384', '#36A2EB', '#FFCE56', '#FFCB56'];
var dataset_template = {
  label: 'My First dataset',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: []
};

var data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: []
};
var pie_dataset_template = {
  data: [],
  backgroundColor: [],
  hoverBackgroundColor: []
};
var data_pie = {
  labels: [],
  datasets: []
};

const country_name_mapping = {
  'United States of America': 'USA',
  China: 'Mainland China',
  Czechia: 'Czech Republic',
  'Dem. Rep. Congo': 'Democratic Republic of the Congo'
};

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const ISMContainerStyle = { marginTop: '5px', marginBottom: '5px' };
export const ISMLegend = () => {
  return (
    <Paper elevation={10}>
      <Typography align='center' variant='h5' style={{ padding: '10px auto' }}>
        ISM Legend
      </Typography>
      {Object.keys(color_codes).map(colorKey => {
        return (
          <Card style={{ margin: '6px' }}>
            <Grid container alignItems='center' justify='center'>
              <Grid item xs={1} style={ISMContainerStyle}>
                <Paper
                  style={{
                    height: '20px',
                    width: '20px',
                    margin: '5px',
                    backgroundColor: color_codes[colorKey]
                  }}
                />
              </Grid>
              <Grid item xs={11} style={ISMContainerStyle}>
                <Typography style={{ marginLeft: '15px', fontSize: '10px' }}>{colorKey}</Typography>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </Paper>
  );
};
const Map = ({ setTooltipContent, setSelectedContent }) => {
  const [open, setOpen] = React.useState(false);
  const [clickedCountry, setClickedCountry] = React.useState('');
  const scroll = 'body';

  const handleClose = () => {
    setOpen(false);
    data['labels'] = [];
    data['datasets'] = [];
    data_pie['labels'] = [];
    data_pie['datasets'] = [];
  };

  return (
    <div>
      <ComposableMap data-tip='' width='1500' height='1000'>
        <ZoomableGroup zoom={1.8} center={[20, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  fill={
                    geo.properties.NAME in region_pie_chart
                      ? color_codes[Object.keys(region_pie_chart[geo.properties.NAME])[0]]
                      : geo.properties.NAME in country_name_mapping
                      ? color_codes[
                          Object.keys(
                            region_pie_chart[country_name_mapping[geo.properties.NAME]]
                          )[0]
                        ]
                      : '#D6D6DA'
                  }
                  stroke='#EAEAEC'
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent('');
                  }}
                  onClick={() => {
                    var { NAME } = geo.properties;
                    if (NAME in country_name_mapping) {
                      NAME = country_name_mapping[NAME];
                    }
                    var ism_data = compute_time_series_ISM(NAME);
                    var num_to_display = Math.min(5, ism_data['num_ism']);
                    data['labels'] = ism_data['labels'];
                    for (var i = 0; i < num_to_display; i++) {
                      var new_dataset = JSON.parse(JSON.stringify(dataset_template));
                      data['datasets'].push(new_dataset);
                      data['datasets'][i]['data'] = ism_data['data'][ism_data['isms'][i]];
                      data['datasets'][i]['borderColor'] = color_codes[ism_data['isms'][i]];
                      data['datasets'][i]['label'] = ism_data['isms'][i];
                    }
                    num_to_display = Math.min(4, ism_data['num_ism']);
                    var new_dataset = JSON.parse(JSON.stringify(pie_dataset_template));
                    data_pie['datasets'].push(new_dataset);
                    var ism_pie_keys = Object.keys(ism_data['pie']);
                    for (i = 0; i < num_to_display; i++) {
                      data_pie['datasets'][0]['data'].push(ism_data['pie'][ism_pie_keys[i]][1]);
                      data_pie['labels'].push(
                        ism_pie_keys[i].concat(' ', ism_data['pie'][ism_pie_keys[i]][0])
                      );
                      data_pie['datasets'][0]['backgroundColor'].push(color_codes[ism_pie_keys[i]]);
                      data_pie['datasets'][0]['hoverBackgroundColor'].push(
                        color_codes[ism_pie_keys[i]]
                      );
                    }
                    setSelectedContent(NAME);
                    setOpen(true);
                    setClickedCountry(NAME);
                    console.log(data_pie);
                  }}
                  style={{
                    hover: {
                      fill: '#F53',
                      outline: 'none'
                    },
                    pressed: {
                      fill: '#E42',
                      outline: 'none'
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={'lg'}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title' style={{ backgroundColor: '#07294D' }}>
          <Typography style={{ color: '#FFF' }}>{clickedCountry}</Typography>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText>
            <h2>Relative Abundance</h2>
            <Line data={data} />

            <h2>ISM Data</h2>
            <Pie data={data_pie} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default memo(Map);
