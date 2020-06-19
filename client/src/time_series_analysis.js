function compute_time_series_ISM(country){
    //const fs = require('fs')
    const data = require('./region_time_series.json');
    const data_pie = require('./region_pie_chart.json')
    //const country = 'Mainland China';
    var keys = Object.keys(data);
    var region_data = {};
    var key;
    var key2;
    for (var i = 0; i < keys.length; i++) {
        region_data[keys[i]] = data[keys[i]][country];
    }

    var region_isms = {};
    var keys = Object.keys(region_data);

    for (key in region_data[keys[keys.length-1]]){
        region_isms[key] = [];
    }

    var total_list = []
    var sum;
    for (key in region_data){
        let item = region_data[key];
        sum = 0;
        for (key2 in region_isms){
            if (key2 in item){
                region_isms[key2].push(parseInt(item[key2]));
                sum = sum + parseInt(item[key2]);
            } else {
                region_isms[key2].push(0);
            }
        }
        total_list.push(sum);
    }
    // COMPUTE RELATIVE ABUNDANCES
    for (key in region_isms){
        for (var i = 0; i < keys.length; i++){
            region_isms[key][i] = region_isms[key][i] / total_list[i]
        }
    }


// Parse pie chart
    var ism_pie = {}
    var sum = 0;
    var sub_total = 0;
    var limit = 3;
    var counter = 0;
    for (key in data_pie[country]){
        sum = sum + parseInt(data_pie[country][key][1]);
        if (counter < limit){
            ism_pie[key] = [data_pie[country][key][0], parseInt(data_pie[country][key][1])];
            sub_total = sub_total + parseInt(data_pie[country][key][1]);
            counter++;
        }
    }
    ism_pie["OTHER"] = ["-", sum - sub_total]
    var output = {};
    output["labels"] = keys;
    output["data"] = region_isms;
    output["num_ism"] = Object.keys(region_isms).length;
    output["isms"] = Object.keys(region_isms);
    output['total'] = sum;
    output['pie'] = ism_pie
    return output;
}
export {compute_time_series_ISM};