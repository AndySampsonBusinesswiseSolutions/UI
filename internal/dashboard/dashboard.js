function pageLoad() {
  displayItem('SiteLocation');
}

function displayItem(itemToDisplay) {
  clearElement(mainResult);
  updateButtons(itemToDisplay);

  switch(itemToDisplay) {
    case 'SiteLocation':
      displaySiteLocations();
      break;
    case 'PortfolioUsage':
      displayUsageChart();
      break;
    case 'PortfolioCost':
      displayCostChart();
      break;
    case 'Savings':
      displaySavingChart();
      break;
    case 'Opportunities':
      displayOpportunities();
      break;
    case 'Carbon':
      displayCarbonChart();
      break;
  }
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function updateButtons(itemToDisplay) {
  var tiles = document.getElementsByClassName('carousel-tile');

  for(var i = 0; i < tiles.length; i++) {
    tiles[i].classList.remove('active');
  }

  document.getElementById(itemToDisplay).classList.add('active');
}

function displaySiteLocations() {
  var html = '<div>'
  + '<div id="spreadsheetContainer">'
  + '<div id="spreadsheet" style="width: 65%; float: left;"></div>'
  + '</div>'
  + '</div>'
  + '<div style="width: 30%; float: left; margin-left: 5%;">'
  + '<div id="map-canvas" style="height: 500px"></div>'
  + '</div>'
  + '<div style="clear: both;"></div>';

  mainResult.innerHTML = html;

  var displayData = [];

  for(var i = 1; i < 7; i++) {
    var row = {
      address:'Site ' + i.toString() + ', ABC Street, CITY, EX1 4MP',
      meterpoint:'120001234',
      annualvolume:'1,978,170',
      annualcost:'238,637',
      carbon:'526'
    };

    displayData.push(row);
  }

  var spreadsheetWidth = spreadsheet.clientWidth;

  var displayColumns = [
    {type:'text', width:(215 / 720 * spreadsheetWidth).toString() + 'px', align:'left', name:'address', title:'Address', readOnly: true},
    {type:'text', width:(140 / 720 * spreadsheetWidth).toString() + 'px', name:'meterpoint', title:'Meter Point', readOnly: true},
    {type:'text', width:(125 / 720 * spreadsheetWidth).toString() + 'px', name:'annualvolume', title:'Annual Volume<br>(kWh)', readOnly: true},
    {type:'text', width:(125 / 720 * spreadsheetWidth).toString() + 'px', name:'annualcost', title:'Annual Cost<br>(£)', readOnly: true},
    {type:'text', width:(115 / 720 * spreadsheetWidth).toString() + 'px', name:'carbon', title:'Carbon<br>(tonnes)', readOnly: true},
  ];

  jexcel(document.getElementById('spreadsheet'), {
    pagination:6,
    allowInsertRow: false,
    allowManualInsertRow: false,
    allowInsertColumn: false,
    allowManualInsertColumn: false,
    allowDeleteRow: false,
    allowDeleteColumn: false,
    allowRenameColumn: false,
    wordWrap: true,
    data: displayData,
    columns: displayColumns
  }); 

  var mapOptions = {
    zoom: 5.75,
    center: new google.maps.LatLng(54, -3.5),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var addresses = [];
  var positions = [];

  var latLng = {lat: 53.832894, lng: -2.237961};
  positions.push(latLng);
  addresses.push("Test");
  
  var addressLength = addresses.length;
  for(var i = 0; i < addressLength; i++) {

    var marker = new google.maps.Marker({
        map: map,
        position: positions[i],
        title: addresses[i]
    });
  } 
}

function displayUsageChart() {
  var html = '<div style="font-size: small;"><button>HH</button><button>Day</button><button>Week</button><button>Month</button></div>'
    + '<div id="totalUsageChart" style="height: 500px;"></div>';

  mainResult.innerHTML = html;
  
  var electricityCategories = [
    'JAN-20', 'FEB-20', 'MAR-20', 'APR-20', 'MAY-20', 'JUN-20', 'JUL-20', 'AUG-20', 'SEP-20', 'OCT-20', 'NOV-20', 'DEC-20',
    'JAN-21', 'FEB-21', 'MAR-21', 'APR-21', 'MAY-21', 'JUN-21', 'JUL-21', 'AUG-21', 'SEP-21', 'OCT-21', 'NOV-21', 'DEC-21',
    'JAN-22', 'FEB-22', 'MAR-22', 'APR-22', 'MAY-22', 'JUN-22', 'JUL-22', 'AUG-22', 'SEP-22', 'OCT-22', 'NOV-22', 'DEC-22',
    'JAN-23', 'FEB-23', 'MAR-23', 'APR-23', 'MAY-23', 'JUN-23', 'JUL-23', 'AUG-23', 'SEP-23', 'OCT-23', 'NOV-23', 'DEC-23',
    'JAN-24', 'FEB-24', 'MAR-24', 'APR-24', 'MAY-24', 'JUN-24', 'JUL-24', 'AUG-24', 'SEP-24'
    ];
  var electricityCategoriesLength = electricityCategories.length;

  var forecastVolume = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(var j= 0; j < data.length; j++) {
      var meters = data[j].Meters;

      if(meters) {
        for(var k = 0; k < meters.length; k++) {
          var meter = getMeterByGUID(meters[k]["GUID"]);
          var meterUsage = getAttribute(meter.Attributes, "MonthlyUsage");

          for(var j = 0; j < electricityCategoriesLength; j++) {
            forecastVolume[j] += meterUsage[j][electricityCategories[j]];
          }
        }
      }
    }

  var electricityVolumeSeries = [{
    name: 'Forecast Usage (kWh)',
    data: forecastVolume
    }];  

  var electricityVolumeOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Forecast Portfolio Usage',
      },
      tooltip: {
          x: {
          format: 'MMM yyyy'
          }
      },
      xaxis: {
          title: {
          text: ''
          },
          labels: {
            rotate: -45,
            rotateAlways: true,
            hideOverlappingLabels: true,
            style: {
              fontSize: '9px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
            },
          },
          categories: electricityCategories
      },
      yaxis: [{
        title: {
          style: {
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
          text: 'kWh'
        },
        forceNiceScale: true,
        labels: {
          formatter: function(val) {
            return val.toLocaleString();
          }
        }
      }]
    };

  refreshChart(electricityVolumeSeries, "#totalUsageChart", electricityVolumeOptions);
}

function displayCostChart() {
  var html = '<div style="font-size: small;"><button>HH</button><button>Day</button><button>Week</button><button>Month</button></div>'
    + '<div id="totalCostChart" style="height: 500px;"></div>';

  mainResult.innerHTML = html;
  
  electricityCategories = [
    'JAN-20', 'FEB-20', 'MAR-20', 'APR-20', 'MAY-20', 'JUN-20', 'JUL-20', 'AUG-20', 'SEP-20', 'OCT-20', 'NOV-20', 'DEC-20',
    'JAN-21', 'FEB-21', 'MAR-21', 'APR-21', 'MAY-21', 'JUN-21', 'JUL-21', 'AUG-21', 'SEP-21', 'OCT-21', 'NOV-21', 'DEC-21',
    'JAN-22', 'FEB-22', 'MAR-22', 'APR-22', 'MAY-22', 'JUN-22', 'JUL-22', 'AUG-22', 'SEP-22', 'OCT-22', 'NOV-22', 'DEC-22',
    'JAN-23', 'FEB-23', 'MAR-23', 'APR-23', 'MAY-23', 'JUN-23', 'JUL-23', 'AUG-23', 'SEP-23', 'OCT-23', 'NOV-23', 'DEC-23',
    'JAN-24', 'FEB-24', 'MAR-24', 'APR-24', 'MAY-24', 'JUN-24', 'JUL-24', 'AUG-24', 'SEP-24'
    ];
  var electricityCategoriesLength = electricityCategories.length;

  var forecastVolume = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(var j= 0; j < data.length; j++) {
      var meters = data[j].Meters;

      if(meters) {
        for(var k = 0; k < meters.length; k++) {
          var meter = getMeterByGUID(meters[k]["GUID"]);
          var meterUsage = getAttribute(meter.Attributes, "MonthlyUsage");

          for(var j = 0; j < electricityCategoriesLength; j++) {
            forecastVolume[j] += meterUsage[j][electricityCategories[j]];
          }
        }
      }
    }

  var electricityVolumeSeries = [{
    name: 'Forecast Cost (£)',
    data: forecastVolume
    }];  

  var electricityVolumeOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Forecast Portfolio Cost',
      },
      tooltip: {
          x: {
          format: 'MMM yyyy'
          }
      },
      xaxis: {
          title: {
          text: ''
          },
          labels: {
            rotate: -45,
            rotateAlways: true,
            hideOverlappingLabels: true,
            style: {
              fontSize: '9px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
            },
          },
          categories: electricityCategories
      },
      yaxis: [{
        title: {
          style: {
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
          text: '£'
        },
        forceNiceScale: true,
        labels: {
          formatter: function(val) {
            return val.toLocaleString();
          }
        }
      }]
    };

  refreshChart(electricityVolumeSeries, "#totalCostChart", electricityVolumeOptions);
}

function displaySavingChart() {
  var html = '<div style="font-size: small;"><button>HH</button><button>Day</button><button>Week</button><button>Month</button></div>'
    + '<div id="savingChart" style="height: 500px;"></div>';

  mainResult.innerHTML = html;
  
  electricityCategories = [
    'JAN-20', 'FEB-20', 'MAR-20', 'APR-20', 'MAY-20', 'JUN-20', 'JUL-20', 'AUG-20', 'SEP-20', 'OCT-20', 'NOV-20', 'DEC-20',
    'JAN-21', 'FEB-21', 'MAR-21', 'APR-21', 'MAY-21', 'JUN-21', 'JUL-21', 'AUG-21', 'SEP-21', 'OCT-21', 'NOV-21', 'DEC-21',
    'JAN-22', 'FEB-22', 'MAR-22', 'APR-22', 'MAY-22', 'JUN-22', 'JUL-22', 'AUG-22', 'SEP-22', 'OCT-22', 'NOV-22', 'DEC-22',
    'JAN-23', 'FEB-23', 'MAR-23', 'APR-23', 'MAY-23', 'JUN-23', 'JUL-23', 'AUG-23', 'SEP-23', 'OCT-23', 'NOV-23', 'DEC-23',
    'JAN-24', 'FEB-24', 'MAR-24', 'APR-24', 'MAY-24', 'JUN-24', 'JUL-24', 'AUG-24', 'SEP-24'
    ];
  var electricityCategoriesLength = electricityCategories.length;

  var forecastVolume = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(var j= 0; j < data.length; j++) {
      var meters = data[j].Meters;

      if(meters) {
        for(var k = 0; k < meters.length; k++) {
          var meter = getMeterByGUID(meters[k]["GUID"]);
          var meterUsage = getAttribute(meter.Attributes, "MonthlyUsage");

          for(var j = 0; j < electricityCategoriesLength; j++) {
            forecastVolume[j] += meterUsage[j][electricityCategories[j]];
          }
        }
      }
    }

  var electricityVolumeSeries = [{
    name: 'Saving (£)',
    data: forecastVolume
    }];  

  var electricityVolumeOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Savings',
      },
      tooltip: {
          x: {
          format: 'MMM yyyy'
          }
      },
      xaxis: {
          title: {
          text: ''
          },
          labels: {
            rotate: -45,
            rotateAlways: true,
            hideOverlappingLabels: true,
            style: {
              fontSize: '9px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
            },
          },
          categories: electricityCategories
      },
      yaxis: [{
        title: {
          style: {
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
          text: '£'
        },
        forceNiceScale: true,
        labels: {
          formatter: function(val) {
            return val.toLocaleString();
          }
        }
      }]
    };

  refreshChart(electricityVolumeSeries, "#savingChart", electricityVolumeOptions);
}

function displayCarbonChart() {
  var html = '<div style="font-size: small;"><button>HH</button><button>Day</button><button>Week</button><button>Month</button></div>'
    + '<div id="totalCarbonChart" style="height: 500px;"></div>';

  mainResult.innerHTML = html;
  
  var electricityCategories = [
    'JAN-20', 'FEB-20', 'MAR-20', 'APR-20', 'MAY-20', 'JUN-20', 'JUL-20', 'AUG-20', 'SEP-20', 'OCT-20', 'NOV-20', 'DEC-20',
    'JAN-21', 'FEB-21', 'MAR-21', 'APR-21', 'MAY-21', 'JUN-21', 'JUL-21', 'AUG-21', 'SEP-21', 'OCT-21', 'NOV-21', 'DEC-21',
    'JAN-22', 'FEB-22', 'MAR-22', 'APR-22', 'MAY-22', 'JUN-22', 'JUL-22', 'AUG-22', 'SEP-22', 'OCT-22', 'NOV-22', 'DEC-22',
    'JAN-23', 'FEB-23', 'MAR-23', 'APR-23', 'MAY-23', 'JUN-23', 'JUL-23', 'AUG-23', 'SEP-23', 'OCT-23', 'NOV-23', 'DEC-23',
    'JAN-24', 'FEB-24', 'MAR-24', 'APR-24', 'MAY-24', 'JUN-24', 'JUL-24', 'AUG-24', 'SEP-24'
    ];
  var electricityCategoriesLength = electricityCategories.length;

  var forecastVolume = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0];

    for(var j= 0; j < data.length; j++) {
      var meters = data[j].Meters;

      if(meters) {
        for(var k = 0; k < meters.length; k++) {
          var meter = getMeterByGUID(meters[k]["GUID"]);
          var meterUsage = getAttribute(meter.Attributes, "MonthlyUsage");

          for(var j = 0; j < electricityCategoriesLength; j++) {
            forecastVolume[j] += meterUsage[j][electricityCategories[j]];
          }
        }
      }
    }

  var electricityVolumeSeries = [{
    name: 'Carbon (tonnes)',
    data: forecastVolume
    }];  

  var electricityVolumeOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Carbon',
      },
      tooltip: {
          x: {
          format: 'MMM yyyy'
          }
      },
      xaxis: {
          title: {
          text: ''
          },
          labels: {
            rotate: -45,
            rotateAlways: true,
            hideOverlappingLabels: true,
            style: {
              fontSize: '9px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
            },
          },
          categories: electricityCategories
      },
      yaxis: [{
        title: {
          style: {
            fontSize: '10px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
          },
          text: 'tonnes'
        },
        forceNiceScale: true,
        labels: {
          formatter: function(val) {
            return val.toLocaleString();
          }
        }
      }]
    };

  refreshChart(electricityVolumeSeries, "#totalCarbonChart", electricityVolumeOptions);
}

function getMeterByGUID(guid) {
	var dataLength = data.length;
	for(var i = 0; i < dataLength; i++) {
		var site = data[i];
    var meterLength = site.Meters.length;
    for(var j = 0; j < meterLength; j++) {
      var meter = site.Meters[j];
      if(meter.GUID == guid) {
        return meter;
      }
    }
	}
	
	return null;
}

function getAttribute(attributes, attributeRequired) {
	for (var attribute in attributes) {
		var array = attributes[attribute];

		for(var key in array) {
			if(key == attributeRequired) {
				return array[key];
			}
		}
	}

	return null;
}

function refreshChart(newSeries, chartId, chartOptions) {
  var options = {
    chart: {
        height: '100%',
        width: '100%',
      type: chartOptions.chart.type,
      stacked: chartOptions.chart.stacked,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      animations: {
        enabled: true,
        easing: 'easeout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
      },
      toolbar: {
        show: false
      //   autoSelected: 'zoom',
      //   tools: {
      //     download: false
      //   }
      }
    },
    // title: {
    //   text: chartOptions.title.text,
    //   align: 'center',
    //   style: {
    //     fontSize: '25px',
    //     fontFamily: 'Arial, Helvetica, sans-serif',
    //     fontWeight: 'normal',
    //   }
    // },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      x: {
        format: chartOptions.tooltip.x.format
      }
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'top',
      horizontalAlign: 'center', 
      onItemClick: {
        toggleDataSeries: true
      },
      formatter: function(seriesName) {
        return seriesName;
      }
    },
    colors: ['#69566c', '#61B82E', '#1CB89D', '#3C6B20', '#851B1E', '#C36265', '#104A6B', '#B8B537', '#B8252A', '#0B6B5B'],
    series: newSeries,
    yaxis: chartOptions.yaxis,
    xaxis: chartOptions.xaxis
  };  

  renderChart(chartId, options);
}

function renderChart(chartId, options) {
  clearElement(document.getElementById(chartId.replace('#', '')));
  var chart = new ApexCharts(document.querySelector(chartId), options);
  chart.render();
}

function displayOpportunities() {
  var html = '<div>'
  + '<div id="spreadsheetContainer">'
  + '<div id="spreadsheet" style="width: 100%;"></div>'
  + '</div>'
  + '</div>';

  mainResult.innerHTML = html;

  var displayData = [];

  var row = {
    opportunity:'Opportunity 1 - explanation',
    estimatedAnnualSaving:'£100,000',
    costToImplement:'£15,000',
    paybackPeriod:'6 months',
    projectLead:'Andrew Bardsley',
    status:'<i class="fas fa-circle" style="color: green; margin-right: 15px;"></i><span>Active</span>'
  };
  displayData.push(row);

  row = {
    opportunity:'Opportunity 2 - explanation',
    estimatedAnnualSaving:'£100,000',
    costToImplement:'£15,000',
    paybackPeriod:'2-3 years',
    projectLead:'Andy Butterworth',
    status:'<i class="fas fa-circle" style="color: green; margin-right: 15px;"></i><span>Active</span>'
  };
  displayData.push(row);

  row = {
    opportunity:'Opportunity 3 - explanation',
    estimatedAnnualSaving:'£100,000',
    costToImplement:'£15,000',
    paybackPeriod:'1 year',
    projectLead:'Andrew Bardsley',
    status:'<i class="fas fa-circle" style="color: yellow; margin-right: 15px;"></i><span>Paused</span>'
  };
  displayData.push(row);

  row = {
    opportunity:'Opportunity 4 - explanation',
    estimatedAnnualSaving:'£100,000',
    costToImplement:'£15,000',
    paybackPeriod:'8 months',
    projectLead:'conor Howard',
    status:'<i class="fas fa-circle" style="color: green; margin-right: 15px;"></i><span>Active</span>'
  };
  displayData.push(row);

  row = {
    opportunity:'Opportunity 5 - explanation',
    estimatedAnnualSaving:'£100,000',
    costToImplement:'£15,000',
    paybackPeriod:'TBC',
    projectLead:'TBC',
    status:'<i class="fas fa-circle" style="color: red; margin-right: 15px;"></i><span>On Hold</span>'
  };
  displayData.push(row);

  var spreadsheetWidth = spreadsheet.clientWidth;

  var displayColumns = [
    {type:'text', width:(260 / 835 * spreadsheetWidth).toString() + 'px', align:'left', name:'opportunity', title:'Opportunity', readOnly: true},
    {type:'text', width:(115 / 835 * spreadsheetWidth).toString() + 'px', name:'estimatedAnnualSaving', title:'Estimated Annual Saving', readOnly: true},
    {type:'text', width:(115 / 835 * spreadsheetWidth).toString() + 'px', name:'costToImplement', title:'Cost To Implement', readOnly: true},
    {type:'text', width:(115 / 835 * spreadsheetWidth).toString() + 'px', name:'paybackPeriod', title:'Payback Period', readOnly: true},
    {type:'text', width:(115 / 835 * spreadsheetWidth).toString() + 'px', name:'projectLead', title:'Project Lead', readOnly: true},
    {type:'text', width:(115 / 835 * spreadsheetWidth).toString() + 'px', name:'status', title:'Status', readOnly: true},
  ];

  jexcel(document.getElementById('spreadsheet'), {
    pagination:6,
    allowInsertRow: false,
    allowManualInsertRow: false,
    allowInsertColumn: false,
    allowManualInsertColumn: false,
    allowDeleteRow: false,
    allowDeleteColumn: false,
    allowRenameColumn: false,
    wordWrap: true,
    data: displayData,
    columns: displayColumns
  }); 
}