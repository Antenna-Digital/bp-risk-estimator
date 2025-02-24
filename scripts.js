import tippy from 'tippy.js';
import cleave from 'cleave.js';
import dataQuantaInfluenza from './influenza/quanta-influenza';
import dataQuantaSars from './influenza/quanta-sars';

export default class Influenzav2 {
  constructor(el) {
    
    this.el = el;
    
    function getData(data, activity, expiratory, shedding) {
      return data[`${activity}_${expiratory}_${shedding}`];
    }

    // libraries & imports
    const mathjs = require('mathjs');
    const noUiSlider = require('nouislider');
    const wNumb = require('wnumb');
    const Chart = require('chart.js');

    // constants
    const CHILDREN = 'children';
    const EMPLOYEES = 'employees';
    const ACTIVITY_ADULTS = 'adult-activity';
    const ACTIVITY_CHILDREN = 'children-activity';
    const SALARY = 'salary';
    const ROOM_HEIGHT = 'room-height';
    const ROOM_AREA = 'room-area';
    const ROOM_TOTAL = 'room-total';
    const RH_BASELINE = 'rh-baseline';
    const RH_DESIGN = 'rh-design';
    const UVGI_MOUNTING_HEIGHT = 'uvgi-mounting-height';
    const UVGI_BASELINE = 'baseline-uvgi';
    const UVGI_DESIGN = 'design-uvgi';
    const AIR_CHANGES_RECIRCULATION_BASELINE = 'air-changes-recirculation-baseline';
    const AIR_CHANGES_RECIRCULATION_DESIGN = 'air-changes-recirculation-design';
    const AIR_CHANGES_OUTDOOR_BASELINE = 'air-changes-outdoor-baseline';
    const AIR_CHANGES_OUTDOOR_DESIGN = 'air-changes-outdoor-design';
    const CLEANING_UNITS_BASELINE = 'baseline-portable-cleaning-units';
    const CLEANING_UNITS_CADR_BASELINE = 'baseline-portable-cleaning-unit-cadr';
    const CLEANING_UNITS_DESIGN = 'design-portable-cleaning-units';
    const CLEANING_UNITS_CADR_DESIGN = 'design-portable-cleaning-unit-cadr';
    const REMOVAL_TIME_SPREADING = 'removal-time-initial-spreading';
    const WEARING_MASK_INFECTED_BASELINE = 'baseline-infected-wearing-mask';
    const WEARING_MASK_NONINFECTED_BASELINE = 'baseline-noninfected-wearing-mask';
    const WEARING_MASK_INFECTED_DESIGN = 'design-infected-wearing-mask';
    const WEARING_MASK_NONINFECTED_DESIGN = 'design-noninfected-wearing-mask';
    const EXPOSURE_TIME = 'exposure-time';
    const EXPOSURE_TIME_SEASON = 'exposure-time-season';
    const EXPELLED = 'expelled';
    const SHEDDING = 'virus-shedding';
    const FILTER_BASELINE = 'filter-type-baseline';
    const FILTER_DESIGN = 'filter-type-design';
    const INFECTED = 'infected-people';
    const VIRUS_TYPE = 'virus-type';
    const VACCINATED_OVER_18 = 'over-18-vaccinated';
    const VACCINATED_UNDER_18 = 'under-18-vaccinated';
    const MASK_BASELINE = 'baseline-mask-wearing';
    const MASK_DESIGN = 'design-mask-wearing';
    const SICK_DAYS_LOST = 'sick-days-lost';
    const DYNAMIC_AIR_VELOCITY = 0.000018325;

    // forms
    const form = document.querySelector('[data-iz-form]');
    const fieldsets = document.querySelectorAll('[data-iz-fieldset]');
    let formData = new FormData(form);
    const sliders = [];

    // dom nodes
    const rangesliders = document.querySelectorAll('[data-iz-rangeslider]');
    const domSickDays = document.getElementById('iz-sick-days-lost');
    const domVirusType = document.getElementById('iz-virus-type');
    const domDesignSettling = document.querySelector('[data-iz-design-settling]');
    const domDesignVentilation = document.querySelector('[data-iz-design-ventilation]');
    const domDesignFiltration = document.querySelector('[data-iz-design-filtration]');
    const domDesignInactivationRH = document.querySelector('[data-iz-design-inactivation-rh]');
    const domDesignInactivationUVGI = document.querySelector('[data-iz-design-inactivation-uvgi]');
    const domDesignAirCleaner = document.querySelector('[data-iz-design-aircleaner-efficiency]');
    const domDesignMask= document.querySelector('[data-iz-design-mask-efficiency]');
    const domDesignTotal = document.querySelector('[data-iz-design-total]');
    const domBaselineTotal = document.querySelector('[data-iz-baseline-total]');
    
    const domAdultDesignSettling = document.querySelector('[data-iz-adult-design-settling]');
    const domAdultDesignVentilation = document.querySelector('[data-iz-adult-design-ventilation]');
    const domAdultDesignFiltration = document.querySelector('[data-iz-adult-design-filtration]');
    const domAdultDesignInactivationRH = document.querySelector('[data-iz-adult-design-inactivation-rh]');
    const domAdultDesignInactivationUVGI = document.querySelector('[data-iz-adult-design-inactivation-uvgi]');
    const domAdultDesignAirCleaner = document.querySelector('[data-iz-adult-design-aircleaner]');
    const domAdultDesignMask = document.querySelector('[data-iz-adult-design-mask]');
    const domAdultDesignTotal = document.querySelector('[data-iz-adult-design-total]');
    const domAdultBaselineTotal = document.querySelector('[data-iz-adult-baseline-total]');
    const domAdultDesignTotalSeason = document.querySelector('[data-iz-adult-design-total-season]');
    const domAdultBaselineTotalSeason = document.querySelector('[data-iz-adult-baseline-total-season]');
    const domAdultEstimatedDecreaseDay = document.querySelector('[data-iz-adult-design-decrease-day]');
    const domAdultEstimatedDecreaseYear = document.querySelector('[data-iz-adult-design-decrease-year]');

    const domAdultRiskInfectedDayBaseline = document.querySelector('[data-iz-adult-risk-infected-day-baseline]');
    const domAdultRiskInfectedDayDesign = document.querySelector('[data-iz-adult-risk-infected-day-design]');
    const domAdultRiskDecreaseDay = document.querySelector('[data-iz-adult-risk-decrease-day]');
    const domAdultRiskInfectedSeasonBaseline = document.querySelector('[data-iz-adult-risk-infected-season-baseline]');
    const domAdultRiskInfectedSeasonDesign = document.querySelector('[data-iz-adult-risk-infected-season-design]');
    const domAdultRiskDecreaseSeason = document.querySelector('[data-iz-adult-risk-decrease-season]');
    const domAdultRiskInfectedSalaryBaseline = document.querySelector('[data-iz-adult-risk-salary-baseline]');
    const domAdultRiskInfectedSalaryDesign = document.querySelector('[data-iz-adult-risk-salary-design]');
    const domAdultRiskDecreaseSalary = document.querySelector('[data-iz-adult-risk-decrease-salary]');

    const domChildDesignSettling = document.querySelector('[data-iz-child-design-settling]');
    const domChildDesignVentilation = document.querySelector('[data-iz-child-design-ventilation]');
    const domChildDesignFiltration = document.querySelector('[data-iz-child-design-filtration]');
    const domChildDesignInactivationRH = document.querySelector('[data-iz-child-design-inactivation-rh]');
    const domChildDesignInactivationUVGI = document.querySelector('[data-iz-child-design-inactivation-uvgi]');
    const domChildDesignAirCleaner = document.querySelector('[data-iz-child-design-aircleaner]');
    const domChildDesignMask = document.querySelector('[data-iz-child-design-mask]');
    const domChildDesignTotal = document.querySelector('[data-iz-child-design-total]');
    const domChildBaselineTotal = document.querySelector('[data-iz-child-baseline-total]');
    const domChildDesignTotalSeason = document.querySelector('[data-iz-child-design-total-season]');
    const domChildBaselineTotalSeason = document.querySelector('[data-iz-child-baseline-total-season]');
    const domChildEstimatedDecreaseDay = document.querySelector('[data-iz-child-design-decrease-day]');
    const domChildEstimatedDecreaseYear = document.querySelector('[data-iz-child-design-decrease-year]');
    
    const domChildRiskInfectedDayBaseline = document.querySelector('[data-iz-child-risk-infected-day-baseline]');
    const domChildRiskInfectedDayDesign = document.querySelector('[data-iz-child-risk-infected-day-design]');
    const domChildRiskDecreaseDay = document.querySelector('[data-iz-child-risk-decrease-day]');
    const domChildRiskInfectedSeasonBaseline = document.querySelector('[data-iz-child-risk-infected-season-baseline]');
    const domChildRiskInfectedSeasonDesign = document.querySelector('[data-iz-child-risk-infected-season-design]');
    const domChildRiskDecreaseSeason = document.querySelector('[data-iz-child-risk-decrease-season]');
    const domChildRiskInfectedDaysBaseline = document.querySelector('[data-iz-child-risk-days-baseline]');
    const domChildRiskInfectedDaysDesign = document.querySelector('[data-iz-child-risk-days-design]');
    const domChildRiskDecreaseDays = document.querySelector('[data-iz-child-risk-decrease-days]');

    const domHypotheticalRBaseline = document.querySelector('[data-iz-hypothetical-r-baseline]');
    const domHypotheticalRDesign = document.querySelector('[data-iz-hypothetical-r-design]');
    const domPrint = document.querySelectorAll('[data-happe-print]');
    
    // initialize tooltips
    tippy('[data-tippy-content]');

    function formattedPercent(evaluation, isNumber) {
      const exponent = mathjs.evaluate(evaluation);
      const decimal = mathjs.evaluate(1 - (Math.exp(exponent)));
      const percent = decimal * 100;
      const formatted = isNumber ? mathjs.round(percent, 1) : `${mathjs.round(percent, 1)}%`;

      return formatted;
    }

    // initialize cleave 
    var cleaveSalary = new Cleave('#iz-salary', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand'
    });

    // --------------------------------
    // Range Sliders
    // --------------------------------

    rangesliders.forEach(slider => {
      const start = Number(slider.getAttribute('data-start'));
      const min = Number(slider.getAttribute('data-min'));
      const max = Number(slider.getAttribute('data-max'));
      const step = Number(slider.getAttribute('data-step'));
      const decimals = Number(slider.getAttribute('data-decimals'));
      const suffix = slider.getAttribute('data-suffix');
      const controls = slider.getAttribute('data-controls');
      const input = document.getElementById(controls);

      sliders[controls] = noUiSlider.create(slider, {
        start: start,
        step: step,
        range: {
          'min': min,
          'max': max
        },
        tooltips: [
          wNumb({
            decimals: decimals,
            suffix: suffix
          })
        ],
        format: wNumb({
          decimals: decimals
        }),
      });

      slider.noUiSlider.on('update', function (values, handle) {
        input.value = values[handle];
        input.dispatchEvent(new Event('change', {
          'bubbles': true
        }));
      });
    });


    // --------------------------------
    // Canvas Graphs
    // --------------------------------

    // canvas - particle removal efficiency
    const chartAerosolDesignSettlingCanvas = document.getElementById('chart-aerosol-design-settling');
    const chartAerosolDesignSettling = new Chart(chartAerosolDesignSettlingCanvas, {
      type: 'horizontalBar',
      data: {
        labels: [
          "Design Settling Efficiency",
          "Design Ventilation Efficiency",
          "Design Filtration Efficiency",
          "Design RH Inactivation Efficiency",
          "Design UVGI Inactivation Efficiency",
          "Design PAC Efficiency",
          "Design Mask Efficiency",
          "Design Total Efficiency",
          "Baseline Total Efficiency"
        ],
        datasets: [{
          label: 'Data Set',
          barPercentage: .7,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          fill: true,
          backgroundColor: [
            "rgba(49, 69, 95, 1)",
            "rgba(49, 69, 95, 1)",
            "rgba(49, 69, 95, 1)",
            "rgba(49, 69, 95, 1)",
            "rgba(49, 69, 95, 1)",
            "rgba(49, 69, 95, 1)",
            "rgba(49, 69, 95, 1)",
            "rgba(49, 69, 95, 1)",
            "rgba(110, 118, 74, 1)",
          ]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Aerosol Viral Particle Removal Efficiency Output'
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return `${data['datasets'][0]['data'][tooltipItem['index']]}%`
            }
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}%`
              },
            },
          }]
        }
      }
    });

    // canvas - probability of infection by day
    const chartFluDayCanvas = document.getElementById('chart-flu-day');
    const chartFluDayCompare = new Chart(chartFluDayCanvas, {
      type: 'bar',
      data: {
        labels: ["Design Total", "Baseline Total", "Delta"],
        datasets: [{
            label: 'Adult',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(166, 169, 123, 1)",
              "rgba(166, 169, 123, 1)",
              "rgba(110, 118, 74, 1)",
            ]
          },
          {
            label: 'Child',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(206, 185, 100, 1)",
              "rgba(206, 185, 100, 1)",
              "rgba(110, 118, 74, 1)",
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Probability of Infection Per Day'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}%`
              },
            },
          }]
        }
      }
    });

    // canvas - probability of infection by season
    const chartFluSeasonCanvas = document.getElementById('chart-flu-season');
    const chartFluSeasonCompare = new Chart(chartFluSeasonCanvas, {
      type: 'bar',
      data: {
        labels: ["Design Total", "Baseline Total", "Delta"],
        datasets: [{
            label: 'Adult',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(166, 169, 123, 1)",
              "rgba(166, 169, 123, 1)",
              "rgba(110, 118, 74, 1)",
            ]
          },
          {
            label: 'Child',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(206, 185, 100, 1)",
              "rgba(206, 185, 100, 1)",
              "rgba(110, 118, 74, 1)",
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Probability of Infection Per Flu Season'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}%`
              },
            },
          }]
        }
      }
    });

    // canvas graph - child and adults infected
    const chartInfectedDayCanvas = document.getElementById('chart-infected-day');
    const chartInfectedDayCompare = new Chart(chartInfectedDayCanvas, {
      type: 'bar',
      data: {
        labels: ["Baseline", "Design", "Decrease"],
        datasets: [{
            label: 'Adult',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(166, 169, 123, 1)",
              "rgba(166, 169, 123, 1)",
              "rgba(166, 169, 123, 1)",
            ]
          },
          {
            label: 'Child',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(206, 185, 100, 1)",
              "rgba(206, 185, 100, 1)",
              "rgba(206, 185, 100, 1)",
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Estimated Number of Infected Per Room*Day'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }]
        }
      }
    });

    // canvas graph - child and adults infected
    const chartInfectedSeasonCanvas = document.getElementById('chart-infected-season');
    const chartInfectedSeasonCompare = new Chart(chartInfectedSeasonCanvas, {
      type: 'bar',
      data: {
        labels: ["Baseline", "Design", "Decrease"],
        datasets: [{
            label: 'Adult',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(166, 169, 123, 1)",
              "rgba(166, 169, 123, 1)",
              "rgba(166, 169, 123, 1)",
            ]
          },
          {
            label: 'Child',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(206, 185, 100, 1)",
              "rgba(206, 185, 100, 1)",
              "rgba(206, 185, 100, 1)",
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Estimated Number of Infected Per Viral Season'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }]
        }
      }
    });

    // canvas graph - child days lost
    const chartEducationCanvas = document.getElementById('chart-aerosol-education');
    const chartEducationCompare = new Chart(chartEducationCanvas, {
      type: 'bar',
      data: {
        labels: ["Baseline", "Design", "Decrease"],
        datasets: [
          {
            label: 'Child',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(206, 185, 100, 1)",
              "rgba(206, 185, 100, 1)",
              "rgba(110, 118, 74, 1)",
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Estimated Child Days Lost'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }]
        }
      }
    });

    // canvas graph - salary lost
    const chartSalaryCanvas = document.getElementById('chart-aerosol-salary');
    const chartSalaryCompare = new Chart(chartSalaryCanvas, {
      type: 'bar',
      data: {
        labels: ["Baseline", "Design", "Decrease"],
        datasets: [
          {
            label: 'Adult',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(166, 169, 123, 1)",
              "rgba(166, 169, 123, 1)",
              "rgba(110, 118, 74, 1)",
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Estimated Salary Dollars Lost'
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}$`
              },
            },
          }]
        }
      }
    });

    // canvas graph - hypothetical r-values
    const chartRValuesCanvas = document.getElementById('chart-aerosol-rvalues');
    const chartRValuesCompare = new Chart(chartRValuesCanvas, {
      type: 'bar',
      data: {
        labels: ["Hypothetical Baseline R Value", "Hypothetical Design R Value"],
        datasets: [
          {
            label: 'Data Set',
            barPercentage: .7,
            data: [0, 0, 0, 0, 0, 0],
            fill: true,
            backgroundColor: [
              "rgba(110, 118, 74, 1)",
              "rgba(49, 69, 95, 1)",
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Hypothetical R Value'
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return `${value}`
              },
            },
          }]
        }
      }
    });

    // --------------------------------
    // Forms
    // --------------------------------

    // show/hide fieldsets in form
    fieldsets.forEach(fieldset => {
      const toggle = fieldset.querySelector('[data-iz-fieldsettoggle]')

      toggle.onclick = () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute('aria-expanded', !expanded);
        fieldset.setAttribute('aria-expanded', !expanded);
      };
    });

    // --------------------------------
    // Hidden Calculations
    // --------------------------------

    // design & baseline ηfilter
    function filter(type) {
      let value = null;
      const design = formData.get(type);

      switch (design) {
        case 'merv-4':
          value = .11;
          break;

        case 'merv-7':
          value = .44
          break;

        case 'merv-11':
          value = .72
          break;

        case 'merv-13':
          value = .87
          break;

        case 'merv-14':
          value = .89
          break;

        case 'merv-15':
          value = .90
          break;

        case 'merv-16':
          value = .95
          break;

        case 'hepa':
          value = .999
          break;
      }

      return value;
    }

    // design & baseline nmask
    function mask(type) {
      let value = null;
      const design = formData.get(type);

      switch (design) {
        case 'nomask':
          value = 0;
          break;

        case '2-layer-without-nose':
          value = .447;
          break;

        case '2-layer-with-nose':
          value = .563;
          break;

        case '2-layer-with-nose-filter':
          value = .744;
          break;

        case 'cotton-bandana':
          value = .490;
          break;

        case 'single-layer-gaiter':
          value = .378;
          break;

        case 'single-layer-nylon':
          value = .393;
          break;

        case 'nonwoven-mask':
          value = .286;
          break;

        case '3-layer-cotton':
          value = .265;
          break;

        case 'surgical-mask':
          value = .715;
          break;

        case 'procedure-mask':
          value = .385;
          break;

        case 'procedure-mask-guard':
          value = .617;
          break;

        case 'procedure-mask-fixthemask':
          value = .866;
          break;

        case 'n95':
          value = .984
          break;
      }

      return value;
    }

    // get room height
    function getRoomHeight() {
      const roomHeight = formData.get(ROOM_HEIGHT);
      return mathjs.evaluate(`${roomHeight}*0.3048`); 
    }

    // get room area
    function getRoomArea() {
      const roomArea = formData.get(ROOM_AREA);
      return mathjs.evaluate(`${roomArea}*0.092903`); 
    }

    // Initial Particle Diameter (Di) (μm)
    function initialParticleDiameter() {
      let value = null;
      const type = formData.get(EXPELLED);

      switch (type) {
        case 'breathing':
          value = 1.4;
          break;

        case 'speaking':
          value = 2;
          break;

        case 'singing':
          value = 2.5;
          break;
        
        case 'coughing':
          value = 5.8;
          break;

        case 'sneezing':
          value = 51.7;
          break;
      }

      return value;
    }

    // Activity level for adults
    function activityLevelAdults() {
      let value = null;
      const type = formData.get(ACTIVITY_ADULTS);

      switch (type) {
        case 'resting':
          value = 0.5;
          break;

        case 'light':
          value = 0.6;
          break;

        case 'moderate':
          value = 2.1;
          break;
        
        case 'heavy':
          value = 3.9;
          break;
      }

      return value;
    }

    // Activity level for children
    function activityLevelChildren() {
      let value = null;
      const type = formData.get(ACTIVITY_CHILDREN);

      switch (type) {
        case 'resting':
          value = 0.4;
          break;

        case 'light':
          value = 1;
          break;

        case 'moderate':
          value = 3.2;
          break;
        
        case 'heavy':
          value = 3.9;
          break;
      }

      return value;
    }

    // Baseline oudoor air changes per hour (ACHO)
    // =(B16/(B11*B12))*60
    function baselineOutdoorChangePerHour() {      
      const b16 = formData.get(AIR_CHANGES_OUTDOOR_BASELINE);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      
      return mathjs.evaluate(`(${b16}/(${b11}*${b12}))*60`);
    }

    // Baseline recirculating air changes per hour (ACHO)
    // =(B17/(B11*B12))*60
    function baselineRecirculatingChangePerHour() {      
      const b17 = formData.get(AIR_CHANGES_RECIRCULATION_BASELINE);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      
      // return b12;
      return mathjs.evaluate(`( ${b17} / ( ${b11} * ${b12} ) ) * 60`);
    }

    // Baseline Equilibrium Particle Diameter (Dp) (μm)
    function baselineEquilibriumParticleDiameter() {
      let dropletSize = 0
      const particleDiameter = initialParticleDiameter();
      const rhBaseline = formData.get(RH_BASELINE);

      switch (rhBaseline) {
        case '10':
          dropletSize = 0.399;
          break;

        case '20':
          dropletSize = 0.404;
          break;

        case '30':
          dropletSize = 0.409;
          break;

        case '40':
          dropletSize = 0.413;
          break;

        case '50':
          dropletSize = 0.424;
          break;

        case '60':
          dropletSize = 0.432;
          break;

        case '70':
          dropletSize = 0.444;
          break;

        case '80':
          dropletSize = 0.462;
          break;

        case '90':
          dropletSize = 0.505;
          break;
      }

      return particleDiameter * dropletSize;
    }

    // Baseline Settling velocity (ѵ) (cm/s)
    function baselineSettlingVelocity() {
      const particleDiameter = baselineEquilibriumParticleDiameter();
      return mathjs.evaluate(`(980 * ( ${particleDiameter} / 10000 ) ^ 2 * 1.104) / (18 * ${DYNAMIC_AIR_VELOCITY} * 10)`);
    }

    // Baseline Influenza A Innactivation rate (k)
    // =(0.0438*B15)-0.00629
    function baselineInnactivationRateInfluenza() {
      const b15 = (formData.get(RH_BASELINE) / 100);
      return mathjs.evaluate(`( 0.0438 * ${b15} ) - 0.00629`);
    }

    // Baseline SARS-CoV-2 Innactivation rate (kSC2)
    // =IF(B15>0.2,0.0135*B15-0.0028,0)
    function baselineInnactivationRateSars() {
      const b15 = (formData.get(RH_BASELINE) / 100);
      let value = 0;

      if (b15 > 0.2) {
        value = mathjs.evaluate(`0.0135 * ${b15} - 0.0028`);
      } else {
        value = 0;
      }

      return value;
    }
    
    // Baseline Influenza Susceptibility Parameter (ZIVA) (m2/J)
    // =IF(B15<0.33,0.29,IF(B15>0.66,0.22,0.27))
    function baselineSusceptibilityInfluenza() {
      const b15 = (formData.get(RH_BASELINE) / 100);
      let value = 0;

      if (b15 < 0.33) {
        value = 0.29;
      } else {
        value = b15 > 0.66 ? 0.22 : 0.27;
      }

      return value;
    }
    
    // Baseline SARS-CoV-2 Susceptibility Parameter (ZSC2) (m2/J)
    // =(0.377+0.0377)/2
    function baselineSusceptibilitySars() {
      const rhBaseline = (formData.get(RH_BASELINE) / 100);

      return mathjs.evaluate(`(0.377+0.0377)/2`);
    }

    // Baseline Influenza UVGI Coefficient of Inactivation (1/h)
    // =IF(B13=0,0,((B19*0.000001/0.0001)*60*60*((B11-B13)/B11)*B58))
    function baselineCoefficientInfluenza() {
      let value = 0;
      const b11 = formData.get(ROOM_HEIGHT);
      const b13 = formData.get(UVGI_MOUNTING_HEIGHT);
      const b19 = formData.get(UVGI_BASELINE);
      const b58 = baselineSusceptibilityInfluenza();

      if (b13 === 0) {
        value = 0;
      } else {
        value = mathjs.evaluate(`( ( ${b19} * 0.000001 / 0.0001 ) * 60 * 60 * ( ( ${b11} - ${b13} ) / ${b11} ) * ${b58} )`);
      }

      return value;
    }

    // Baseline SARS-CoV-2 UVGI Coefficient of Inactivation (1/h)
    // =IF(B13=0,0,((B19*0.000001/0.0001)*60*60*((B11-B13)/B11)*B59))
    function baselineCoefficientSars() {
      let value = 0;
      const b11 = formData.get(ROOM_HEIGHT);
      const b13 = formData.get(UVGI_MOUNTING_HEIGHT);
      const b19 = formData.get(UVGI_BASELINE);
      const b59 = baselineSusceptibilitySars();

      if (b13 === 0) {
        value = 0;
      } else {
        value = mathjs.evaluate(`( ( ${b19} * 0.000001 / 0.0001 ) * 60 * 60 * ( ( ${b11} - ${b13} ) / ${b11} ) * ${b59} )`);
      }

      return value;
    }

    // Baseline λaircleaner (1/h)
    // =(B20*B21)*60/(B11*B12)
    function baselineAirCleaner() {
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      const b20 = formData.get(CLEANING_UNITS_BASELINE);
      const b21 = formData.get(CLEANING_UNITS_CADR_BASELINE);

      return mathjs.evaluate(`( ${b20} * ${b21} ) * 60 / ( ${b11} * ${b12} )`);
    }

    // Design oudoor air changes per hour (ACHO)
    // =(B26/(B11*B12))*60
    function designOutdoorChangePerHour() {
      const b26 = formData.get(AIR_CHANGES_OUTDOOR_DESIGN);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      
      return mathjs.evaluate(`( ${b26} / ( ${b11} * ${b12} ) ) * 60`);
    }

    // Design recirculating air changes per hour (ACHR)
    // =(B27/(B11*B12))*60
    function designRecirculatingChangePerHour() {      
      const b27 = formData.get(AIR_CHANGES_RECIRCULATION_DESIGN);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      
      return mathjs.evaluate(`( ${b27} / ( ${b11} * ${b12} ) ) * 60`);
    }

    // Design Equilibrium Particle Diameter (Dp) (μm)
    function designEquilibriumParticleDiameter() {
      let dropletSize = 0
      const particleDiameter = initialParticleDiameter();
      const rhDesign = formData.get(RH_DESIGN);

      switch (rhDesign) {
        case '10':
          dropletSize = 0.399;
          break;

        case '20':
          dropletSize = 0.404;
          break;

        case '30':
          dropletSize = 0.409;
          break;

        case '40':
          dropletSize = 0.413;
          break;

        case '50':
          dropletSize = 0.424;
          break;

        case '60':
          dropletSize = 0.432;
          break;

        case '70':
          dropletSize = 0.444;
          break;

        case '80':
          dropletSize = 0.462;
          break;

        case '90':
          dropletSize = 0.505;
          break;
      }

      return particleDiameter * dropletSize;
    }

    // Design Settling velocity (ѵ) (cm/s)
    function designSettlingVelocity() {
      const particleDiameter = designEquilibriumParticleDiameter();
      return mathjs.evaluate(`(980 * ( ${particleDiameter} / 10000 ) ^ 2 * 1.104) / (18 * ${DYNAMIC_AIR_VELOCITY} * 10)`);
    }

    // Design Influenza A Inactivation rate (kIVA)
    // =(0.0438*B25)-0.00629
    function designInnactivationRateInfluenza() {
      const b25 = (formData.get(RH_DESIGN) / 100);
      return mathjs.evaluate(`( 0.0438 * ${b25} ) - 0.00629`);
    }

    // Design SARS-CoV-2 Innactivation rate (kSC2)
    // =IF(B15>0.2,0.0135*B15-0.0028,0)
    function designInnactivationRateSars() {
      const b25 = (formData.get(RH_DESIGN) / 100);
      let value = 0;

      if (b25 > 0.2) {
        value = mathjs.evaluate(`0.0135 * ${b25} - 0.0028`);
      } else {
        value = 0;
      }

      return value;
    }
    
    // Design Influenza Susceptibility Parameter (ZIVA) (m2/J)
    // =IF(B25<0.33,0.29,IF(B25>0.66,0.22,0.27))
    function designSusceptibilityInfluenza() {
      const b25 = (formData.get(RH_DESIGN) / 100);
      let value = 0;

      if (b25 < 0.33) {
        value = 0.29;
      } else {
        value = b25 > 0.66 ? 0.22 : 0.27;
      }

      return value;
    }
    
    // Design SARS-CoV-2 Susceptibility Parameter (ZSC2) (m2/J)
    // =(0.377+0.0377)/2
    function designSusceptibilitySars() {
      return mathjs.evaluate(`(0.377+0.0377)/2`);
    }

    // Design Influenza UVGI Coefficient of Inactivation (1/h)
    // =IF(B13=0,0,((B19*0.000001/0.0001)*60*60*((B11-B13)/B11)*B58))
    function designCoefficientInfluenza() {
      let value = 0;
      const b11 = formData.get(ROOM_HEIGHT);
      const b13 = formData.get(UVGI_MOUNTING_HEIGHT);
      const b29 = formData.get(UVGI_DESIGN);
      const b71 = designSusceptibilityInfluenza();

      if (b13 === 0) {
        value = 0;
      } else {
        value = mathjs.evaluate(`( ( ${b29} * 0.000001 / 0.0001 ) * 60 * 60 * ( ( ${b11} - ${b13} ) / ${b11} ) * ${b71} )`);
      }

      return value;
    }

    // Design SARS-CoV-2 UVGI Coefficient of Inactivation (1/h)
    // =IF(B13=0,0,((B19*0.000001/0.0001)*60*60*((B11-B13)/B11)*B59))
    function designCoefficientSars() {
      let value = 0;
      const b11 = formData.get(ROOM_HEIGHT);
      const b13 = formData.get(UVGI_MOUNTING_HEIGHT);
      const b29 = formData.get(UVGI_DESIGN);
      const b72 = designSusceptibilitySars();

      if (b13 === 0) {
        value = 0;
      } else {
        value = mathjs.evaluate(`( ( ${b29} * 0.000001 / 0.0001 ) * 60 * 60 * ( ( ${b11} - ${b13} ) / ${b11} ) * ${b72} )`);
      }

      return value;
    }

    // Design λaircleaner (1/h)
    // =(B30*B31)*60/(B11*B12)
    function designAirCleaner() {
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      const b30 = formData.get(CLEANING_UNITS_DESIGN);
      const b31 = formData.get(CLEANING_UNITS_CADR_DESIGN);

      return mathjs.evaluate(`( ${b30} * ${b31} ) * 60 / ( ${b11} * ${b12} )`);
    }

    // --------------------------------
    // Calculated or Required Values
    // --------------------------------

    // Baseline k-settling
    // =(B54/(B47*100))*60*60
    function valueBaselineSettling() {
      const b47 = getRoomHeight();
      const b54 = baselineSettlingVelocity();
      
      return mathjs.evaluate(`( ${b54} / ( ${b47} * 100 ) ) * 60 * 60`);
    }

    // Baseline λ-ventilation
    function valueBaselineVentilation() {
      return baselineOutdoorChangePerHour()
    }

    // Baseline k-filtration
    // =B52*B55
    function valueBaselineFiltration() {
      const b52 = baselineRecirculatingChangePerHour();
      const b55 = filter(FILTER_BASELINE);
      return mathjs.evaluate(`( ${b52} * ${b55} )`);
    }

    // Baseline k-inactivation
    // =B56*60
    function valueBaselineInactivation() {
      const b56 = baselineInnactivationRateInfluenza();
      return mathjs.evaluate(`${b56} * 60`);
    }

    // Baseline k-RHinactivationSC2
    // =B57*60
    function valueBaselineInactivationRH() {
      const b57 = baselineInnactivationRateSars();
      return mathjs.evaluate(`${b57} * 60`);
    }

    // Baseline k-UVGIinactivationIVA
    // B60
    function valueBaselineInactivationUVGIIVA() {
      const b60 = baselineCoefficientInfluenza();
      return b60;
    }

    // Baseline kU-VGIinactivationSC2
    // =B61
    function valueBaselineInactivationUVGISC2() {
      const b61 = baselineCoefficientSars();
      return b61;
    }

    // Baseline λ-aircleaner
    // =B62
    function valueBaselineAirCleaner() {
      const b62 = baselineAirCleaner();
      return b62;
    }

    // Baseline k-mask
    // =(((1.2*B24*(B6+B8-B40))*60/(B11*B12))*B63)+(B63*B23)
    function valueBaselineMask() {
      const b6 = formData.get(CHILDREN);
      const b8 = formData.get(EMPLOYEES);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      const b23 = (formData.get(WEARING_MASK_INFECTED_BASELINE)/100);
      const b24 = (formData.get(WEARING_MASK_NONINFECTED_BASELINE)/100);
      const b40 = formData.get(INFECTED);
      const b63 = mask(MASK_BASELINE);
      return mathjs.evaluate(`( ( ( 1.2 * ${b24} * ( ${b6} + ${b8} - ${b40} ) ) * 60 / ( ${b11} * ${b12} ) ) * ${b63} ) + ( ${b63} * ${b23} )`);
    }

    // Baseline modified p scaling factor (mask)
    function valueBaselineModifiedScalingFactor() {
      const b63 = mask(MASK_BASELINE);
      const b24 = (formData.get(WEARING_MASK_NONINFECTED_BASELINE)/100);
      return mathjs.evaluate(`1 - ${b63} * ${b24}`)
    }

    // progress here

    // Design k-settling
    // =(B67/(B47*100))*60*60
    function valueDesignSettling() {
      const b47 = getRoomHeight();
      const b67 = designSettlingVelocity();

      return mathjs.evaluate(`( ${b67} / ( ${b47} * 100 ) ) * 60 * 60`);
    }

    // Design λ-ventilation
    function valueDesignVentilation() {
      return designOutdoorChangePerHour();
    }

    // Design k-filtration
    // =B65*B68
    function valueDesignFiltration() {
      const b65 = designRecirculatingChangePerHour();
      const b68 = filter(FILTER_DESIGN);
      return mathjs.evaluate(`( ${b65} * ${b68} )`);
    }

    // Design k-inactivation
    // =B69*60
    function valueDesignInactivation() {
      const b69 = designInnactivationRateInfluenza();
      return mathjs.evaluate(`${b69} * 60`);
    }

    // Design k-RHinactivationSC2
    // =B70*60
    function valueDesignInactivationRH() {
      const b70 = designInnactivationRateSars();
      return mathjs.evaluate(`${b70} * 60`);
    }

    // Design k-UVGIinactivationIVA
    // B73
    function valueDesignInactivationUVGIIVA() {
      const b73 = designCoefficientInfluenza();
      return b73;
    }

    // Design kU-VGIinactivationSC2
    // =B74
    function valueDesignInactivationUVGISC2() {
      const b74 = designCoefficientSars();
      return b74;
    }

    // Design λ-aircleaner
    // =B75
    function valueDesignAirCleaner() {
      const b75 = designAirCleaner();
      return b75;
    }

    // Design k-mask
    // =(((1.2*B24*(B6+B8-B40))*60/(B11*B12))*B63)+(B63*B23)
    function valueDesignMask() {
      const b6 = formData.get(CHILDREN);
      const b8 = formData.get(EMPLOYEES);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      const b33 = (formData.get(WEARING_MASK_INFECTED_DESIGN)/100); /////
      const b34 = (formData.get(WEARING_MASK_NONINFECTED_DESIGN)/100);
      const b40 = formData.get(INFECTED);
      const b76 = mask(MASK_DESIGN);
      return mathjs.evaluate(`( ( ( 1.2 * ${b34} * ( ${b6} + ${b8} - ${b40} ) ) * 60 / ( ${b11} * ${b12} ) ) * ${b76} ) + ( ${b76} * ${b33} )`);
    }

    // Design modified p scaling factor (mask)
    // =1-B76*B34
    function valueDesignModifiedScalingFactor() {
      const b76 = mask(MASK_DESIGN);
      const b34 = (formData.get(WEARING_MASK_NONINFECTED_DESIGN)/100);
      return mathjs.evaluate(`1 - ${b76} * ${b34}`)
    }

    // Adult Vaccination Factor
    function vaccinationFactorAdult() {
      const inputValue = (formData.get(VACCINATED_OVER_18)/100);    
      return mathjs.evaluate(`1-${inputValue}`);
    }

    // Adult pulmonary ventilation rate (p)
    function pulmonaryVentilationRateAdult() {
      return activityLevelAdults();
    }

    // Child pulmonary ventilation rate (p)
    function pulmonaryVentilationRateChildren() {
      return activityLevelChildren();
    }

    // Adult Influenza Quanta (q)
    function quantaInfluenzaAdults() {
      const b9 = formData.get(ACTIVITY_ADULTS);
      const b41 = formData.get(EXPELLED);
      const b42 = formData.get(SHEDDING);
      return getData(dataQuantaInfluenza, b41, b9, b42);
    }

    // Child Influenza Quanta (q)
    function quantaInfluenzaChildren() {
      const b7 = formData.get(ACTIVITY_CHILDREN);
      const b41 = formData.get(EXPELLED);
      const b42 = formData.get(SHEDDING);
      return getData(dataQuantaInfluenza, b41, b7, b42);
    }

    // Adult SARS-CoV-2 Quanta (q)
    function quantaSarsAdults() {
      const b9 = formData.get(ACTIVITY_ADULTS);
      const b41 = formData.get(EXPELLED);
      const b42 = formData.get(SHEDDING);
      return getData(dataQuantaSars, b41, b9, b42);
    }

    // Child SARS-CoV-2 Quanta (q)
    function quantaSarsChildren() {
      const b7 = formData.get(ACTIVITY_CHILDREN);
      const b41 = formData.get(EXPELLED);
      const b42 = formData.get(SHEDDING);
      return getData(dataQuantaSars, b41, b7, b42);
    }

    // Child Vaccination Factor
    function vaccinationFactorChild() {
      const inputValue = (formData.get(VACCINATED_UNDER_18)/100);    
      return mathjs.evaluate(`1-${inputValue}`);
    }

    // Adult Vaccination Factor (Adjusted)
    function vaccinationFactorAdultAdjusted() {
      const b35 = formData.get(VIRUS_TYPE);
      const virusType = (b35 === 'influenza') ? 0.62 : 0.8; 
      const inputValue = (formData.get(VACCINATED_OVER_18)/100);    
      return mathjs.evaluate(`1-(${inputValue}*${virusType})`);
    }

    // Child Vaccination Factor (Adjusted)
    function vaccinationFactorChildAdjusted() {
      const b35 = formData.get(VIRUS_TYPE);
      const virusType = (b35 === 'influenza') ? 0.7 : 0.8; 
      const inputValue = (formData.get(VACCINATED_UNDER_18)/100);
      return mathjs.evaluate(`1-(${inputValue}*${virusType})`);
    }

    // --------------------------------
    // Removal Efficiency Outputs
    // --------------------------------

    // Design Settling Efficiency (E-settling)
    function resultDesignSettling() {
      const settlingVelocity = designSettlingVelocity();
      const removalTime = formData.get(REMOVAL_TIME_SPREADING);
      const evaluation = `-(${settlingVelocity}/(${getRoomHeight()}*100))*(${removalTime}*60*60)`;
      
      domDesignSettling.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[0] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update()
    }

    // Design Ventilation (Outdoor Air) Efficiency (E-vent)
    function resultDesignVentilation() {
      const removalTime = formData.get(REMOVAL_TIME_SPREADING);
      const evaluation = `-(${designOutdoorChangePerHour()} * ${removalTime})`;

      domDesignVentilation.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[1] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update()
    }

    // Design Filtration Efficiency (Efiltration)
    // =1-EXP(-(B65*B68*B36))
    function resultDesignFiltration() {
      const b65 = designRecirculatingChangePerHour();
      const b68 = filter(FILTER_DESIGN);
      const b36 = formData.get(REMOVAL_TIME_SPREADING);
      const evaluation = `-(${b65} * ${b68} * ${b36})`;

      domDesignFiltration.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[2] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update();
    }

    // Design Inactivation Efficiency (Einactivation)
    function resultDesignInactivationRH() {
      const b35 = formData.get(VIRUS_TYPE);
      const b69 = designInnactivationRateInfluenza();
      const b70 = designInnactivationRateSars();
      const b36 = formData.get(REMOVAL_TIME_SPREADING);
      const virusType = (b35 === 'influenza') ? b69 : b70; 
      const evaluation = `-(${virusType} * ${b36} * 60)`;

      domDesignInactivationRH.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[3] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update();
    }

    // Design UVGI Inactivation Efficiency (EUVGIinactivation)
    // =IF(B35="Influenza",1-EXP(-B73*B36),1-EXP(-B74*B36))
    function resultDesignInactivationUVGI() {
      const b35 = formData.get(VIRUS_TYPE);
      const b73 = designCoefficientInfluenza();
      const b74 = designCoefficientSars();
      const b36 = formData.get(REMOVAL_TIME_SPREADING);
      const virusType = (b35 === 'influenza') ? b73 : b74; 
      const evaluation = `-(${virusType} * ${b36})`;

      domDesignInactivationUVGI.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[4] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update();
    }

    // Design Portable Air Cleaner Efficiency (EPAC)
    // = 1-EXP(-B75*B36)
    function resultDesignAirCleanerEfficiency() {
      const b75 = designAirCleaner();
      const b36 = formData.get(REMOVAL_TIME_SPREADING);
      const evaluation = `-(${b75} * ${b36})`;

      domDesignAirCleaner.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[5] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update();
    }

    // Design Mask Efficiency (Emask)
    // =1- EXP(-((B76*B33)+(((1.2*B34*(B6+B8-B40))*60/(B11*B12))*B76*B36)))
    function resultDesignMaskEfficiency() {
      const b6 = formData.get(CHILDREN);
      const b8 = formData.get(EMPLOYEES);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      const b33 = (formData.get(WEARING_MASK_INFECTED_DESIGN)/100);
      const b34 = (formData.get(WEARING_MASK_NONINFECTED_DESIGN)/100);
      const b36 = formData.get(REMOVAL_TIME_SPREADING);
      const b40 = formData.get(INFECTED);
      const b76 = mask(MASK_DESIGN);
      const evaluation = `-( ( ${b76} * ${b33} ) + ( ( ( 1.2 * ${b34} * ( ${b6} + ${b8} - ${b40} ) ) * 60 / ( ${b11} * ${b12} ) ) * ${b76} * ${b36} ) )`;

      domDesignMask.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[6] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update();
    }

    // Design Total Efficiency (Etotal)
    function designTotalEfficiency() {
      const b6 = formData.get(CHILDREN);
      const b8 = formData.get(EMPLOYEES);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      const b33 = (formData.get(WEARING_MASK_INFECTED_DESIGN)/100);
      const b34 = (formData.get(WEARING_MASK_NONINFECTED_DESIGN)/100);
      const b35 = formData.get(VIRUS_TYPE);
      const b36 = formData.get(REMOVAL_TIME_SPREADING);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b64 = designOutdoorChangePerHour();
      const b65 = designRecirculatingChangePerHour();
      const b67 = designSettlingVelocity();
      const b68 = filter(FILTER_DESIGN);
      const b69 = designInnactivationRateInfluenza();
      const b70 = designInnactivationRateSars();
      const b73 = designCoefficientInfluenza();
      const b74 = designCoefficientSars();
      const b75 = designAirCleaner();
      const b76 = mask(MASK_DESIGN);
      const inactivation = (b35 === 'influenza') ? b69 : b70; 
      const coefficient = (b35 === 'influenza') ? b73 : b74; 
      const evaluation = `-( ( ${b76} * ${b33} ) + ( ( ${b67} / ( ${b47} * 100 ) + ${b64} / 60 / 60 + ${b65} * ${b68} / 60 / 60 + ${inactivation} / 60 + ${coefficient} / 60 / 60 + ${b75} / 60 / 60 + ( ( 1.2 * ${b34} * ( ${b6} + ${b8} - ${b40} ) / 60 ) / ( ${b11} * ${b12} ) ) * ${b76} ) * ${b36} * 60 * 60 ) )`;
      
      domDesignTotal.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[7] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update()
    }

    // Baseline Total Efficiency (Etotal)
    function baselineTotalEfficiency() {
      const b6 = formData.get(CHILDREN);
      const b8 = formData.get(EMPLOYEES);
      const b11 = formData.get(ROOM_HEIGHT);
      const b12 = formData.get(ROOM_AREA);
      const b23 = (formData.get(WEARING_MASK_INFECTED_BASELINE)/100);
      const b24 = (formData.get(WEARING_MASK_NONINFECTED_BASELINE)/100);
      const b35 = formData.get(VIRUS_TYPE);
      const b36 = formData.get(REMOVAL_TIME_SPREADING);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b51 = baselineOutdoorChangePerHour();
      const b52 = baselineRecirculatingChangePerHour();
      const b54 = baselineSettlingVelocity();
      const b55 = filter(FILTER_BASELINE);
      const b56 = baselineInnactivationRateInfluenza();
      const b57 = baselineInnactivationRateSars();
      const b60 = baselineCoefficientInfluenza();
      const b61 = baselineCoefficientSars();
      const b62 = baselineAirCleaner();
      const b63 = mask(MASK_BASELINE);
      const inactivation = (b35 === 'influenza') ? b56 : b57; 
      const coefficient = (b35 === 'influenza') ? b60 : b61; 
      const evaluation = `-( ( ${b63} * ${b23} ) + ( ( ${b54} / ( ${b47} * 100 ) + ${b51} / 60 / 60 + ${b52} * ${b55} / 60 / 60 + ${inactivation} / 60 + ${coefficient} / 60 / 60 + ${b62} / 60 / 60 + ( ( 1.2 * ${b24} * ( ${b6} + ${b8} - ${b40} ) / 60 ) / ( ${b11} * ${b12} ) ) * ${b63} ) * ${b36} * 60 * 60 ) )`;

      domBaselineTotal.innerHTML = formattedPercent(evaluation);
      chartAerosolDesignSettling.data.datasets[0].data[8] = formattedPercent(evaluation, true);
      chartAerosolDesignSettling.update()
    }

    // --------------------------------
    // Adult
    // --------------------------------

    // Design Settling Efficiency in Adults (E-settling)
    function resultDesignSettlingAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f57 = valueDesignSettling();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const evaluation = `-( ( ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f57} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;

      domAdultDesignSettling.innerHTML = `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Ventilation (Outdoor Air) Efficiency in Adults (E-vent)
    function resultDesignVentilationAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f58 = valueDesignVentilation();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const evaluation = `-( ( ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f58} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;

      domAdultDesignVentilation.innerHTML = f58 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Filtration Efficiency in Adults (Efiltration)
    function resultDesignFiltrationAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f59 = valueDesignFiltration();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const evaluation = `-( ( ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f59} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;

      domAdultDesignFiltration.innerHTML = f59 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Inactivation Efficiency in Adults (Einactivation)
    function resultDesignInactivationRHAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f60 = valueDesignInactivation();
      const f61 = valueDesignInactivationRH();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const inactivationType = (b35 === 'influenza') ? f60 : f61; 
      const evaluation = `-( ( ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${inactivationType} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;

      domAdultDesignInactivationRH.innerHTML = (f61 === 0) && (b35 === 'sars') ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Adult Pinfection-UVGIinactivation Per Day
    function resultDesignInactivationUVGIAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f62 = valueDesignInactivationUVGIIVA();
      const f63 = valueDesignInactivationUVGISC2();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const inactivationType = (b35 === 'influenza') ? f62 : f63; 
      const evaluation = `-( ( ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${inactivationType} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;

      domAdultDesignInactivationUVGI.innerHTML = (f62 === 0) && (f63 === 0) ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Adult Pinfection-PAC Per Day
    function resultDesignInactivationPACAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f64 = valueDesignAirCleaner();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const evaluation = `-( ( ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f64} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;

      domAdultDesignAirCleaner.innerHTML = f64 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Adult Pinfection-mask Per Day
    function resultDesignInactivationMaskAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f65 = valueDesignMask();
      const f66 = valueDesignModifiedScalingFactor();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const evaluation = `-( ( ${f66} * ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f65} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;

      domAdultDesignMask.innerHTML = f65 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Total Efficiency in Adults (Etotal)
    function getDesignTotalEfficiencyAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f57 = valueDesignSettling();
      const f58 = valueDesignVentilation();
      const f59 = valueDesignFiltration();
      const f60 = valueDesignInactivation();
      const f61 = valueDesignInactivationRH();
      const f62 = valueDesignInactivationUVGIIVA();
      const f63 = valueDesignInactivationUVGISC2()
      const f64 = valueDesignAirCleaner();
      const f65 = valueDesignMask();
      const f66 = valueDesignModifiedScalingFactor();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const arg1 = (b35 === 'influenza') ? f60 : f61; 
      const arg2 = (b35 === 'influenza') ? f62 : f63; 
      const evaluation = `-( ( ${f66} * ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f57} + ${f58} + ${f59} + ${arg1} + ${arg2} + ${f64} + ${f65} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultDesignTotalEfficiencyAdult() {
      domAdultDesignTotal.innerHTML = `${getDesignTotalEfficiencyAdult()}%`;
      chartFluDayCompare.data.datasets[0].data[0] = getDesignTotalEfficiencyAdult();
      chartFluDayCompare.update()
    }

    // Baseline Total Efficiency in Adults (Etotal)
    function getBaselineTotalEfficiencyAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f47 = valueBaselineSettling();
      const f48 = valueBaselineVentilation();
      const f49 = valueBaselineFiltration();
      const f50 = valueBaselineInactivation();
      const f51 = valueBaselineInactivationRH();
      const f52 = valueBaselineInactivationUVGIIVA();
      const f53 = valueBaselineInactivationUVGISC2()
      const f54 = valueBaselineAirCleaner();
      const f55 = valueBaselineMask();
      const f56 = valueBaselineModifiedScalingFactor();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const arg1 = (b35 === 'influenza') ? f50 : f51; 
      const arg2 = (b35 === 'influenza') ? f52 : f53; 
      const evaluation = `-( ( ${f56} * ${f67} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f47} + ${f48} + ${f49} + ${arg1} + ${arg2} + ${f54} + ${f55} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultBaselineTotalEfficiencyAdult() {
      domAdultBaselineTotal.innerHTML = `${getBaselineTotalEfficiencyAdult()}%`;
      chartFluDayCompare.data.datasets[0].data[1] = getBaselineTotalEfficiencyAdult();
      chartFluDayCompare.update()
    }

    // Design Total Efficiency in Adults for Flu Season
    function getDesignTotalEfficiencySeasonAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b38 = (formData.get(EXPOSURE_TIME_SEASON) / 100);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f57 = valueDesignSettling();
      const f58 = valueDesignVentilation();
      const f59 = valueDesignFiltration();
      const f60 = valueDesignInactivation();
      const f61 = valueDesignInactivationRH();
      const f62 = valueDesignInactivationUVGIIVA();
      const f63 = valueDesignInactivationUVGISC2()
      const f64 = valueDesignAirCleaner();
      const f65 = valueDesignMask();
      const f66 = valueDesignModifiedScalingFactor();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const arg1 = (b35 === 'influenza') ? f60 : f61; 
      const arg2 = (b35 === 'influenza') ? f62 : f63; 
      const time = (b35 === 'influenza') ? 5 * 4 * 5 : 12 * 4 * 5; 
      const evaluation = `-( ( ${f66} * ${f67} * ${b40} * ${virusType} * ( ( ${time} * ${b37} ) * ${b38} ) ) / ( ${b47} * ${b48} ) ) / ( ${f57} + ${f58} + ${f59} + ${arg1} + ${arg2} + ${f64} + ${f65} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultDesignTotalEfficiencySeasonAdult() {
      domAdultDesignTotalSeason.innerHTML = `${getDesignTotalEfficiencySeasonAdult()}%`;
      chartFluSeasonCompare.data.datasets[0].data[0] = getDesignTotalEfficiencySeasonAdult();
      chartFluSeasonCompare.update();
    }

    // Baseline Total Efficiency in Adults for Flu Season
    function getBaselineTotalEfficiencySeasonAdult() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b38 = (formData.get(EXPOSURE_TIME_SEASON) / 100);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f47 = valueBaselineSettling();
      const f48 = valueBaselineVentilation();
      const f49 = valueBaselineFiltration();
      const f50 = valueBaselineInactivation();
      const f51 = valueBaselineInactivationRH();
      const f52 = valueBaselineInactivationUVGIIVA();
      const f53 = valueBaselineInactivationUVGISC2()
      const f54 = valueBaselineAirCleaner();
      const f55 = valueBaselineMask();
      const f56 = valueBaselineModifiedScalingFactor();
      const f67 = pulmonaryVentilationRateAdult();
      const f69 = quantaInfluenzaAdults();
      const f71 = quantaSarsAdults();
      const f75 = vaccinationFactorAdultAdjusted();
      const virusType = (b35 === 'influenza') ? f69 : f71; 
      const arg1 = (b35 === 'influenza') ? f50 : f51; 
      const arg2 = (b35 === 'influenza') ? f52 : f53; 
      const time = (b35 === 'influenza') ? 5 * 4 * 5 : 12 * 4 * 5; 
      const evaluation = `-( ( ${f56} * ${f67} * ${b40} * ${virusType} * ( ( ${time} * ${b37} ) * ${b38} ) ) / ( ${b47} * ${b48} ) ) / ( ${f47} + ${f48} + ${f49} + ${arg1} + ${arg2} + ${f54} + ${f55} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f75;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultBaselineTotalEfficiencySeasonAdult() {
      domAdultBaselineTotalSeason.innerHTML = `${getBaselineTotalEfficiencySeasonAdult()}%`;
      chartFluSeasonCompare.data.datasets[0].data[1] = getBaselineTotalEfficiencySeasonAdult();
      chartFluSeasonCompare.update()
    }

    // Estimated Decrease in Adult Pinfection-total Per Day Compared to Baseline
    function getResultEstimatedDecreaseDayAdult() {
      const f89 = getBaselineTotalEfficiencyAdult();
      const f88 = getDesignTotalEfficiencyAdult();
      const evaluation = `${f89} - ${f88}`;
      const evaluationAdjusted = mathjs.evaluate(evaluation);

      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultEstimatedDecreaseDayAdult() {
      domAdultEstimatedDecreaseDay.innerHTML = `${getResultEstimatedDecreaseDayAdult()}%`;
      chartFluDayCompare.data.datasets[0].data[2] = getResultEstimatedDecreaseDayAdult();
      chartFluDayCompare.update()
    }

    // Estimated Decrease in Adult Pinfection-total Per Year Compared to Baseline
    function getResultEstimatedDecreaseYearAdult() {
      const f92 = getBaselineTotalEfficiencySeasonAdult();
      const f91 = getDesignTotalEfficiencySeasonAdult();
      const evaluation = `${f92} - ${f91}`;
      const evaluationAdjusted = mathjs.evaluate(evaluation);

      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultEstimatedDecreaseYearAdult() {
      domAdultEstimatedDecreaseYear.innerHTML = `${getResultEstimatedDecreaseYearAdult()}%`;
      chartFluSeasonCompare.data.datasets[0].data[2] = getResultEstimatedDecreaseYearAdult();
      chartFluSeasonCompare.update()
    }

    // Estimated Baseline Number of Adults Infected / Room*Day
    // =F89*B8
    function getAdultRiskInfectedDayBaseline() {
      const f89 = (getBaselineTotalEfficiencyAdult() / 100);
      const b8 = formData.get(EMPLOYEES);
      return mathjs.evaluate(`${f89} * ${b8}`);
    }
    function setAdultRiskInfectedDayBaseline() {
      const total = `${mathjs.round(getAdultRiskInfectedDayBaseline(), 1)}`;
      domAdultRiskInfectedDayBaseline.innerHTML = total;
      chartInfectedDayCompare.data.datasets[0].data[0] = total;
      chartInfectedDayCompare.update();
    }

    // Estimated Design Number of Adults Infected / Room*Day
    // =F88*B8
    function getAdultRiskInfectedDayDesign() {
      const f88 = (getDesignTotalEfficiencyAdult() / 100);
      const b8 = formData.get(EMPLOYEES);
      return mathjs.evaluate(`${f88} * ${b8}`);
    }
    function setAdultRiskInfectedDayDesign() {
      const total = `${mathjs.round(getAdultRiskInfectedDayDesign(), 1)}`;
      domAdultRiskInfectedDayDesign.innerHTML = total;
      chartInfectedDayCompare.data.datasets[0].data[1] = total;
      chartInfectedDayCompare.update();
    }

    // Estimated Decrease in Adults Infected / Room*Day
    // =F90*B8
    function getAdultRiskDecreaseDay() {
      const f90 = (getResultEstimatedDecreaseDayAdult() / 100);
      const b8 = formData.get(EMPLOYEES);
      return mathjs.evaluate(`${f90} * ${b8}`);
    }
    function setAdultRiskDecreaseDay() {
      const total = `${mathjs.round(getAdultRiskDecreaseDay(), 1)}`;
      domAdultRiskDecreaseDay.innerHTML = total;
      chartInfectedDayCompare.data.datasets[0].data[2] = total;
      chartInfectedDayCompare.update();
    }

    // Estimated Baseline Number of Adults Infected / Viral Season
    // =F92*B8*B14
    function getAdultRiskInfectedSeasonBaseline() {
      const f92 = (getBaselineTotalEfficiencySeasonAdult() / 100);
      const b8 = formData.get(EMPLOYEES);
      const b14 = formData.get(ROOM_TOTAL);
      return mathjs.evaluate(`${f92}*${b8}*${b14}`);
    }
    function setAdultRiskInfectedSeasonBaseline() {
      const total = `${mathjs.round(getAdultRiskInfectedSeasonBaseline(), 1)}`;
      domAdultRiskInfectedSeasonBaseline.innerHTML = total;
      chartInfectedSeasonCompare.data.datasets[0].data[0] = total;
      chartInfectedSeasonCompare.update();
    }

    // Estimated Design Number of Adults Infected / Viral Season
    // =F91*B8*B14
    function getAdultRiskInfectedSeasonDesign() {
      const f91 = (getDesignTotalEfficiencySeasonAdult() / 100);
      const b8 = formData.get(EMPLOYEES);
      const b14 = formData.get(ROOM_TOTAL);
      return mathjs.evaluate(`${f91}*${b8}*${b14}`);
    }
    function setAdultRiskInfectedSeasonDesign() {
      const total = `${mathjs.round(getAdultRiskInfectedSeasonDesign(), 1)}`;
      domAdultRiskInfectedSeasonDesign.innerHTML = total;
      chartInfectedSeasonCompare.data.datasets[0].data[1] = total;
      chartInfectedSeasonCompare.update();
    }

    // Estimated Decrease in Adults Infected / Viral Season
    // =F93*B8*B14
    function getAdultRiskDecreaseSeason() {
      const f93 = (getResultEstimatedDecreaseYearAdult() / 100);
      const b8 = formData.get(EMPLOYEES);
      const b14 = formData.get(ROOM_TOTAL);
      return mathjs.evaluate(`${f93}*${b8}*${b14}`);
    }
    function setAdultRiskDecreaseSeason() {
      const total = `${mathjs.round(getAdultRiskDecreaseSeason(), 1)}`;
      domAdultRiskDecreaseSeason.innerHTML = total;
      chartInfectedSeasonCompare.data.datasets[0].data[2] = total;
      chartInfectedSeasonCompare.update();
    }

    // Estimated Baseline Salary Dollars Directly Lost / Viral Season
    // =(F99*8*B39/2080)*B10
    function getAdultRiskSalaryBaseline() {
      const b10 = parseInt(cleaveSalary.getRawValue());
      const f99 = getAdultRiskInfectedSeasonBaseline();
      const b39 = formData.get(SICK_DAYS_LOST);
      return mathjs.evaluate(`( ${f99} * 8 * ${b39} / 2080 ) * ${b10}`);
    }
    function setAdultRiskSalaryBaseline() {
      const total = parseInt(getAdultRiskSalaryBaseline(), 10); 
      domAdultRiskInfectedSalaryBaseline.innerHTML = `${total.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 0})}`;;
      chartSalaryCompare.data.datasets[0].data[0] = total;
      chartSalaryCompare.update();
    }

    // Estimated Design Salary Dollars Directly Lost / Viral Season
    // =(F100*8*B39/2080)*B10
    function getAdultRiskSalaryDesign() {
      const b10 = parseInt(cleaveSalary.getRawValue());
      const f100 = getAdultRiskInfectedSeasonDesign();
      const b39 = formData.get(SICK_DAYS_LOST);
      return mathjs.evaluate(`( ${f100} * 8 * ${b39} / 2080 ) * ${b10}`);
    }
    function setAdultRiskSalaryDesign() {
      const total = parseInt(getAdultRiskSalaryDesign(), 10);
      domAdultRiskInfectedSalaryDesign.innerHTML = `${total.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 0})}`;;
      chartSalaryCompare.data.datasets[0].data[1] = total;
      chartSalaryCompare.update();
    }

    // Estimated Decrease in Salary Dollars Directly Lost / Viral Season
    // =(F100*8*B39/2080)*B10
    function getAdultRiskDecreaseSalary() {
      const b10 = parseInt(cleaveSalary.getRawValue());
      const f101 = getAdultRiskDecreaseSeason();
      const b39 = formData.get(SICK_DAYS_LOST);
      return mathjs.evaluate(`( ${f101} * 8 * ${b39} / 2080 ) * ${b10}`);
    }
    function setAdultRiskDecreaseSalary() {
      const total = parseInt(getAdultRiskDecreaseSalary(), 10);
      domAdultRiskDecreaseSalary.innerHTML = `${total.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 0})}`;;
      chartSalaryCompare.data.datasets[0].data[2] = total;
      chartSalaryCompare.update();
    }

    // --------------------------------
    // Children
    // --------------------------------

    // Design Settling Efficiency in Children (E-settling)
    function resultDesignSettlingChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f57 = valueDesignSettling();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const evaluation = `-( ( ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f57} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;

      domChildDesignSettling.innerHTML = `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Ventilation (Outdoor Air) Efficiency in Children (E-vent)
    function resultDesignVentilationChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f58 = valueDesignVentilation();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const evaluation = `-( ( ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f58} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;
      domChildDesignVentilation.innerHTML = f58 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Filtration Efficiency in Children (Efiltration)
    function resultDesignFiltrationChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f59 = valueDesignFiltration();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const evaluation = `-( ( ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f59} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;
      domChildDesignFiltration.innerHTML = f59 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Inactivation Efficiency in Children (Einactivation)
    function resultDesignInactivationRHChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f60 = valueDesignInactivation();
      const f61 = valueDesignInactivationRH();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const inactivationType = (b35 === 'influenza') ? f60 : f61; 
      const evaluation = `-( ( ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${inactivationType} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;

      domChildDesignInactivationRH.innerHTML = (f61 === 0) && (b35 === 'sars') ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Child Pinfection-UVGIinactivation Per Day
    function resultDesignInactivationUVGIChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f62 = valueDesignInactivationUVGIIVA();
      const f63 = valueDesignInactivationUVGISC2();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const inactivationType = (b35 === 'influenza') ? f62 : f63; 
      const evaluation = `-( ( ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${inactivationType} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;

      domChildDesignInactivationUVGI.innerHTML = (f62 === 0) && (f63 === 0) ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Child Pinfection-PAC Per Day
    function resultDesignInactivationPACChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f64 = valueDesignAirCleaner();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const evaluation = `-( ( ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f64} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;

      domChildDesignAirCleaner.innerHTML = f64 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Child Pinfection-mask Per Day
    function resultDesignInactivationMaskChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f65 = valueDesignMask();
      const f66 = valueDesignModifiedScalingFactor();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const evaluation = `-( ( ${f66} * ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f65} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;

      domChildDesignMask.innerHTML = f65 === 0 ? 'N/A' : `${mathjs.round(evaluationAdjusted, 1)}%`;
    }

    // Design Total Efficiency in Children (Etotal)
    function getDesignTotalEfficiencyChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f57 = valueDesignSettling();
      const f58 = valueDesignVentilation();
      const f59 = valueDesignFiltration();
      const f60 = valueDesignInactivation();
      const f61 = valueDesignInactivationRH();
      const f62 = valueDesignInactivationUVGIIVA();
      const f63 = valueDesignInactivationUVGISC2()
      const f64 = valueDesignAirCleaner();
      const f65 = valueDesignMask();
      const f66 = valueDesignModifiedScalingFactor();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const arg1 = (b35 === 'influenza') ? f60 : f61; 
      const arg2 = (b35 === 'influenza') ? f62 : f63; 
      const evaluation = `-( ( ${f66} * ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f57} + ${f58} + ${f59} + ${arg1} + ${arg2} + ${f64} + ${f65} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultDesignTotalEfficiencyChild() {
      domChildDesignTotal.innerHTML = `${getDesignTotalEfficiencyChild()}%`;
      chartFluDayCompare.data.datasets[1].data[0] = getDesignTotalEfficiencyChild();
      chartFluDayCompare.update()
    }

    // Baseline Total Efficiency in Children (Etotal)
    function getBaselineTotalEfficiencyChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f47 = valueBaselineSettling();
      const f48 = valueBaselineVentilation();
      const f49 = valueBaselineFiltration();
      const f50 = valueBaselineInactivation();
      const f51 = valueBaselineInactivationRH();
      const f52 = valueBaselineInactivationUVGIIVA();
      const f53 = valueBaselineInactivationUVGISC2()
      const f54 = valueBaselineAirCleaner();
      const f55 = valueBaselineMask();
      const f56 = valueBaselineModifiedScalingFactor();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren()
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const arg1 = (b35 === 'influenza') ? f50 : f51; 
      const arg2 = (b35 === 'influenza') ? f52 : f53; 
      const evaluation = `-( ( ${f56} * ${f68} * ${b40} * ${virusType} * ${b37} ) / ( ${b47} * ${b48} ) ) / ( ${f47} + ${f48} + ${f49} + ${arg1} + ${arg2} + ${f54} + ${f55} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultBaselineTotalEfficiencyChild() {
      domChildBaselineTotal.innerHTML = `${getBaselineTotalEfficiencyChild()}%`;
      chartFluDayCompare.data.datasets[1].data[1] = getBaselineTotalEfficiencyChild();
      chartFluDayCompare.update()
    }

    // Design Total Efficiency in Adults for Flu Season
    function getDesignTotalEfficiencySeasonChild() {
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b38 = (formData.get(EXPOSURE_TIME_SEASON) / 100);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f57 = valueDesignSettling();
      const f58 = valueDesignVentilation();
      const f59 = valueDesignFiltration();
      const f60 = valueDesignInactivation();
      const f61 = valueDesignInactivationRH();
      const f62 = valueDesignInactivationUVGIIVA();
      const f63 = valueDesignInactivationUVGISC2()
      const f64 = valueDesignAirCleaner();
      const f65 = valueDesignMask();
      const f66 = valueDesignModifiedScalingFactor();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren();
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const arg1 = (b35 === 'influenza') ? f60 : f61; 
      const arg2 = (b35 === 'influenza') ? f62 : f63; 
      const time = (b35 === 'influenza') ? 5 * 4 * 5 : 12 * 4 * 5; 
      const evaluation = `-( ( ${f66} * ${f68} * ${b40} * ${virusType} * ( ( ${time} * ${b37} ) * ${b38} ) ) / ( ${b47} * ${b48} ) ) / ( ${f57} + ${f58} + ${f59} + ${arg1} + ${arg2} + ${f64} + ${f65} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultDesignTotalEfficiencySeasonChild() {
      domChildDesignTotalSeason.innerHTML = `${getDesignTotalEfficiencySeasonChild()}%`;
      chartFluSeasonCompare.data.datasets[1].data[0] = getDesignTotalEfficiencySeasonChild();
      chartFluSeasonCompare.update()
    }

    // Baseline Total Efficiency in Childs for Flu Season
    function getBaselineTotalEfficiencySeasonChild() {    
      const b35 = formData.get(VIRUS_TYPE);
      const b37 = formData.get(EXPOSURE_TIME);
      const b38 = (formData.get(EXPOSURE_TIME_SEASON) / 100);
      const b40 = formData.get(INFECTED);
      const b47 = getRoomHeight();
      const b48 = getRoomArea();
      const f47 = valueBaselineSettling();
      const f48 = valueBaselineVentilation();
      const f49 = valueBaselineFiltration();
      const f50 = valueBaselineInactivation();
      const f51 = valueBaselineInactivationRH();
      const f52 = valueBaselineInactivationUVGIIVA();
      const f53 = valueBaselineInactivationUVGISC2()
      const f54 = valueBaselineAirCleaner();
      const f55 = valueBaselineMask();
      const f56 = valueBaselineModifiedScalingFactor();
      const f68 = pulmonaryVentilationRateChildren();
      const f70 = quantaInfluenzaChildren();
      const f72 = quantaSarsChildren()
      const f76 = vaccinationFactorChildAdjusted();
      const virusType = (b35 === 'influenza') ? f70 : f72; 
      const arg1 = (b35 === 'influenza') ? f50 : f51; 
      const arg2 = (b35 === 'influenza') ? f52 : f53; 
      const time = (b35 === 'influenza') ? 5 * 4 * 5 : 12 * 4 * 5; 
      const evaluation = `-( ( ${f56} * ${f68} * ${b40} * ${virusType} * ( ( ${time} * ${b37} ) * ${b38} ) ) / ( ${b47} * ${b48} ) ) / ( ${f47} + ${f48} + ${f49} + ${arg1} + ${arg2} + ${f54} + ${f55} )`;
      const evaluationAdjusted = formattedPercent(evaluation, true) * f76;
      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultBaselineTotalEfficiencySeasonChild() {
      domChildBaselineTotalSeason.innerHTML = `${getBaselineTotalEfficiencySeasonChild()}%`;
      chartFluSeasonCompare.data.datasets[1].data[1] = getBaselineTotalEfficiencySeasonChild();
      chartFluSeasonCompare.update()
    }

    // Estimated Decrease in Child Pinfection-total Per Day Compared to Baseline
    function getResultEstimatedDecreaseDayChild() {
      const i89 = getBaselineTotalEfficiencyChild();
      const i88 = getDesignTotalEfficiencyChild();
      const evaluation = `${i89} - ${i88}`;
      const evaluationAdjusted = mathjs.evaluate(evaluation);

      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultEstimatedDecreaseDayChild() {
      domChildEstimatedDecreaseDay.innerHTML = `${getResultEstimatedDecreaseDayChild()}%`;
      chartFluDayCompare.data.datasets[1].data[2] = getResultEstimatedDecreaseDayChild();
      chartFluDayCompare.update()
    }


    // Estimated Decrease in Child Pinfection-total Per Year Compared to Baseline
    function getResultEstimatedDecreaseYearChild() {
      const i92 = getBaselineTotalEfficiencySeasonChild()
      const i91 = getDesignTotalEfficiencySeasonChild()
      const evaluation = `${i92} - ${i91}`;
      const evaluationAdjusted = mathjs.evaluate(evaluation);

      return `${mathjs.round(evaluationAdjusted, 1)}`;
    }
    function resultEstimatedDecreaseYearChild() {
      domChildEstimatedDecreaseYear.innerHTML = `${getResultEstimatedDecreaseYearChild()}%`;
      chartFluSeasonCompare.data.datasets[1].data[2] = getResultEstimatedDecreaseYearChild();
      chartFluSeasonCompare.update()
    }

    // Estimated Baseline Number of Children Infected / Room*Day
    // =I89*B6
    function getChildRiskInfectedDayBaseline() {
      const i89 = (getBaselineTotalEfficiencyChild() / 100);
      const b6 = formData.get(CHILDREN);
      return mathjs.evaluate(`${i89} * ${b6}`);
    }
    function setChildRiskInfectedDayBaseline() {
      const total = `${mathjs.round(getChildRiskInfectedDayBaseline(), 1)}`;
      domChildRiskInfectedDayBaseline.innerHTML = total;
      chartInfectedDayCompare.data.datasets[1].data[0] = total;
      chartInfectedDayCompare.update();
    }

    // Estimated Design Number of Children Infected / Room*Day
    // =F88*B8
    function getChildRiskInfectedDayDesign() {
      const i88 = (getDesignTotalEfficiencyChild() / 100);
      const b6 = formData.get(CHILDREN);
      return mathjs.evaluate(`${i88} * ${b6}`);
    }
    function setChildRiskInfectedDayDesign() {
      const total = `${mathjs.round(getChildRiskInfectedDayDesign(), 1)}`;
      domChildRiskInfectedDayDesign.innerHTML = total;
      chartInfectedDayCompare.data.datasets[1].data[1] = total;
      chartInfectedDayCompare.update();
    }

    // Estimated Decrease in Children Infected / Room*Day
    // =I90*B6
    function getChildRiskDecreaseDay() {
      const i90 = (getResultEstimatedDecreaseDayChild() / 100);
      const b6 = formData.get(CHILDREN);
      return mathjs.evaluate(`${i90} * ${b6}`);
    }
    function setChildRiskDecreaseDay() {
      const total = `${mathjs.round(getChildRiskDecreaseDay(), 1)}`;
      domChildRiskDecreaseDay.innerHTML = total;
      chartInfectedDayCompare.data.datasets[1].data[2] = total;
      chartInfectedDayCompare.update();
    }

    // Estimated Baseline Number of Children Infected / Viral Season
    // =I92*B6*B14
    function getChildRiskInfectedSeasonBaseline() {
      const i92 = (getBaselineTotalEfficiencySeasonChild() / 100);
      const b6 = formData.get(CHILDREN);
      const b14 = formData.get(ROOM_TOTAL);
      return mathjs.evaluate(`${i92}*${b6}*${b14}`);
    }
    function setChildRiskInfectedSeasonBaseline() {
      const total = `${mathjs.round(getChildRiskInfectedSeasonBaseline(), 1)}`;
      domChildRiskInfectedSeasonBaseline.innerHTML = total;
      chartInfectedSeasonCompare.data.datasets[1].data[0] = total;
      chartInfectedSeasonCompare.update();
    }

    // Estimated Design Number of Children Infected / Viral Season
    // =I91*B6*B14
    function getChildRiskInfectedSeasonDesign() {
      const i91 = (getDesignTotalEfficiencySeasonChild() / 100);
      const b6 = formData.get(CHILDREN);
      const b14 = formData.get(ROOM_TOTAL);
      return mathjs.evaluate(`${i91}*${b6}*${b14}`);
    }
    function setChildRiskInfectedSeasonDesign() {
      const total = `${mathjs.round(getChildRiskInfectedSeasonDesign(), 1)}`;
      domChildRiskInfectedSeasonDesign.innerHTML = total;
      chartInfectedSeasonCompare.data.datasets[1].data[1] = total;
      chartInfectedSeasonCompare.update();
    }

    // Estimated Decrease in Children Infected / Viral Season
    // =I93*B6*B14
    function getChildRiskDecreaseSeason() {
      const i93 = (getResultEstimatedDecreaseYearChild() / 100);
      const b6 = formData.get(CHILDREN);
      const b14 = formData.get(ROOM_TOTAL);
      return mathjs.evaluate(`${i93}*${b6}*${b14}`);
    }
    function setChildRiskDecreaseSeason() {
      const total = `${mathjs.round(getChildRiskDecreaseSeason(), 1)}`;
      domChildRiskDecreaseSeason.innerHTML = total;
      chartInfectedSeasonCompare.data.datasets[1].data[2] = total;
      chartInfectedSeasonCompare.update();
    }

    // Estimated Baseline Child Days Lost / Viral Season
    // =I99*B39
    function getChildRiskDaysBaseline() {
      const i99 = getChildRiskInfectedSeasonBaseline();
      const b39 = formData.get(SICK_DAYS_LOST);
      return mathjs.evaluate(`${i99} * ${b39}`);
    }
    function setChildRiskDaysBaseline() {
      const total = `${mathjs.round(getChildRiskDaysBaseline(), 1)}`;
      domChildRiskInfectedDaysBaseline.innerHTML = total;
      chartEducationCompare.data.datasets[0].data[0] = total;
      chartEducationCompare.update();
    }

    // Estimated Design Child Days Lost / Viral Season
    // =I100*B39
    function getChildRiskDaysDesign() {
      const i100 = getChildRiskInfectedSeasonDesign();
      const b39 = formData.get(SICK_DAYS_LOST);
      return mathjs.evaluate(`${i100} * ${b39}`);
    }
    function setChildRiskDaysDesign() {
      const total = `${mathjs.round(getChildRiskDaysDesign(), 1)}`;
      domChildRiskInfectedDaysDesign.innerHTML = total;
      chartEducationCompare.data.datasets[0].data[1] = total;
      chartEducationCompare.update();
    }

    // Estimated Decrease in Child Days Lost / Viral Season
    // =I101*B39
    function getChildRiskDecreaseDays() {
      const i101 = getChildRiskDecreaseSeason();
      const b39 = formData.get(SICK_DAYS_LOST);
      return mathjs.evaluate(`${i101} * ${b39}`);
    }
    function setChildRiskDecreaseDays() {
      const total = `${mathjs.round(getChildRiskDecreaseDays(), 1)}`;
      domChildRiskDecreaseDays.innerHTML = total;
      chartEducationCompare.data.datasets[0].data[2] = total;
      chartEducationCompare.update();
    };

    // Hypothetical Baseline R Value
    // =(F96+I96)/B40
    function getHypotheticalRBaseline() {
      const f96 = `${mathjs.round(getAdultRiskInfectedDayBaseline(), 1)}`;
      const i96 = `${mathjs.round(getChildRiskInfectedDayBaseline(), 1)}`;
      const b40 = formData.get(INFECTED);
      return mathjs.evaluate(`( ${f96} + ${i96} ) / ${b40}`);
    }
    function setHypotheticalRBaseline() {
      const total = `${mathjs.round(getHypotheticalRBaseline(), 1)}`;
      domHypotheticalRBaseline.innerHTML = total;
      chartRValuesCompare.data.datasets[0].data[0] = total;
      chartRValuesCompare.update();
    };

    // Hypothetical Design R Value
    // =(F97+I97)/B40
    function getHypotheticalRDesign() {
      const f97 = `${mathjs.round(getAdultRiskInfectedDayDesign(), 1)}`;
      const i97 = `${mathjs.round(getChildRiskInfectedDayDesign(), 1)}`;
      const b40 = formData.get(INFECTED);
      return mathjs.evaluate(`( ${f97} + ${i97} ) / ${b40}`);
    }
    function setHypotheticalRDesign() {
      const total = `${mathjs.round(getHypotheticalRDesign(), 1)}`;
      domHypotheticalRDesign.innerHTML = total;
      chartRValuesCompare.data.datasets[0].data[1] = total;
      chartRValuesCompare.update();
    };

    function setSickDays() {
      const currentValue = domVirusType.value;
      let setSickDays = 0;

      switch (currentValue) {
        case 'influenza':
          setSickDays = 5;
          break;

        case 'sars':
          setSickDays = 17;
          break;
      
        default:
          break;
      }

      domSickDays.value = setSickDays;
    }

    function setVaccinatedOver() {
      const currentValue = domVirusType.value;
      let percent = 0;

      switch (currentValue) {
        case 'influenza':
          percent = 42;
          break;
      
        default:
          break;
      }

      sliders['iz-over-18-vaccinated'].set(percent);
    }

    function setVaccinatedUnder() {
      const currentValue = domVirusType.value;
      let percent = 0;

      switch (currentValue) {
        case 'influenza':
          percent = 57;
          break;
      
        default:
          break;
      }

      sliders['iz-under-18-vaccinated'].set(percent);
    }

    domVirusType.onchange = function() {
      setSickDays();
      setVaccinatedOver();
      setVaccinatedUnder();
      // console.log(this.value);
      // renderCompare.$refs.compare.toggleItem(checkbox);
    };

    // toggle print
    domPrint.forEach(printButton => {
      printButton.onclick = () => {
        window.print();
      };
    });

    function init() {
      console.log('===========');
      console.log('room-height', getRoomHeight());
      console.log('room-area', getRoomArea());
      console.log('particle-diameter', initialParticleDiameter());
      console.log('salary', parseInt(cleaveSalary.getRawValue()));


      console.log('===========');
      console.log('baseline-OutdoorChangePerHour', baselineOutdoorChangePerHour());
      console.log('baseline-RecirculatingChangePerHour', baselineRecirculatingChangePerHour());
      console.log('baseline-EquilibriumParticleDiameter', baselineEquilibriumParticleDiameter());
      console.log('baseline-SettlingVelocity', baselineSettlingVelocity());
      console.log('baseline-Filter', filter(FILTER_BASELINE));
      console.log('baseline-InnactivationRateInfluenza', baselineInnactivationRateInfluenza());
      console.log('baseline-InnactivationRateSars', baselineInnactivationRateSars());
      console.log('baseline-SusceptibilityInfluenza', baselineSusceptibilityInfluenza());
      console.log('baseline-SusceptibilitySars', baselineSusceptibilitySars());
      console.log('baseline-CoefficientInfluenza', baselineCoefficientInfluenza());
      console.log('baseline-CoefficientSars', baselineCoefficientSars());
      console.log('baseline-AirCleaner', baselineAirCleaner());
      console.log('baseline-Mask', mask(MASK_BASELINE));
      console.log('---------');
      console.log('design-OutdoorChangePerHour', designOutdoorChangePerHour());
      console.log('design-RecirculatingChangePerHour', designRecirculatingChangePerHour());
      console.log('design-EquilibriumParticleDiameter', designEquilibriumParticleDiameter());
      console.log('design-SettlingVelocity', designSettlingVelocity());
      console.log('design-Filter', filter(FILTER_DESIGN));
      console.log('design-InnactivationRateInfluenza', designInnactivationRateInfluenza());
      console.log('design-InnactivationRateSars', designInnactivationRateSars());
      console.log('design-SusceptibilityInfluenza', designSusceptibilityInfluenza());
      console.log('design-SusceptibilitySars', designSusceptibilitySars());
      console.log('design-CoefficientInfluenza', designCoefficientInfluenza());
      console.log('design-CoefficientSars', designCoefficientSars());
      console.log('design-AirCleaner', designAirCleaner());
      console.log('design-Mask', mask(MASK_DESIGN));
      

      console.log('===========');
      console.log('value-baseline-settling', valueBaselineSettling());
      console.log('value-baseline-ventilation', valueBaselineVentilation());
      console.log('value-baseline-filtration', valueBaselineFiltration());
      console.log('value-baseline-inactivation', valueBaselineInactivation());
      console.log('value-baseline-inactivation-rh', valueBaselineInactivationRH());
      console.log('value-baseline-inactivation-iva', valueBaselineInactivationUVGIIVA());
      console.log('value-baseline-inactivation-sc2', valueBaselineInactivationUVGISC2());
      console.log('value-baseline-aircleaner', valueBaselineAirCleaner());
      console.log('value-baseline-mask', valueBaselineMask());
      console.log('value-baseline-modified-scaling-factor', valueBaselineModifiedScalingFactor());
      console.log('---------');
      console.log('value-design-settling', valueDesignSettling());
      console.log('value-design-ventilation', valueDesignVentilation());
      console.log('value-design-filtration', valueDesignFiltration());
      console.log('value-design-inactivation', valueDesignInactivation());
      console.log('value-design-inactivation-rh', valueDesignInactivationRH());
      console.log('value-design-inactivation-iva', valueDesignInactivationUVGIIVA());
      console.log('value-design-inactivation-sc2', valueDesignInactivationUVGISC2());
      console.log('value-design-aircleaner', valueDesignAirCleaner());
      console.log('value-design-mask', valueDesignMask());
      console.log('value-design-modified-scaling-factor', valueDesignModifiedScalingFactor());        
      console.log('---------');
      console.log('pulmonaryVentilationRateAdult', pulmonaryVentilationRateAdult());
      console.log('pulmonaryVentilationRateChildren', pulmonaryVentilationRateChildren());
      console.log('quantaInfluenzaAdults', quantaInfluenzaAdults());
      console.log('quantaInfluenzaChildren', quantaInfluenzaChildren());
      console.log('quantaSarsAdults', quantaSarsAdults());
      console.log('quantaSarsChildren', quantaSarsChildren());
      console.log('vaccinationFactorAdult', vaccinationFactorAdult());
      console.log('vaccinationFactorChild', vaccinationFactorChild());
      console.log('vaccinationFactorAdultAdjusted', vaccinationFactorAdultAdjusted());
      console.log('vaccinationFactorChildAdjusted', vaccinationFactorChildAdjusted());

      resultDesignSettling();
      resultDesignVentilation();
      resultDesignFiltration();
      resultDesignInactivationRH();
      resultDesignInactivationUVGI();
      resultDesignAirCleanerEfficiency();
      resultDesignMaskEfficiency();
      designTotalEfficiency();
      baselineTotalEfficiency();

      resultDesignSettlingAdult();
      resultDesignVentilationAdult();
      resultDesignFiltrationAdult();
      resultDesignInactivationRHAdult();
      resultDesignInactivationUVGIAdult();
      resultDesignInactivationPACAdult();
      resultDesignInactivationMaskAdult();
      resultDesignTotalEfficiencyAdult();
      resultBaselineTotalEfficiencyAdult();
      resultDesignTotalEfficiencySeasonAdult();
      resultBaselineTotalEfficiencySeasonAdult();
      resultEstimatedDecreaseDayAdult();
      resultEstimatedDecreaseYearAdult();

      setAdultRiskInfectedDayBaseline();
      setAdultRiskInfectedDayDesign();
      setAdultRiskDecreaseDay();
      setAdultRiskInfectedSeasonBaseline();
      setAdultRiskInfectedSeasonDesign();
      setAdultRiskDecreaseSeason();
      setAdultRiskSalaryBaseline();
      setAdultRiskSalaryDesign();
      setAdultRiskDecreaseSalary();

      resultDesignSettlingChild();
      resultDesignVentilationChild();
      resultDesignFiltrationChild();
      resultDesignInactivationRHChild();
      resultDesignInactivationUVGIChild();
      resultDesignInactivationPACChild();
      resultDesignInactivationMaskChild();
      resultDesignTotalEfficiencyChild();
      resultBaselineTotalEfficiencyChild();
      resultDesignTotalEfficiencySeasonChild();
      resultBaselineTotalEfficiencySeasonChild();
      resultEstimatedDecreaseDayChild();
      resultEstimatedDecreaseYearChild();

      setChildRiskInfectedDayBaseline();
      setChildRiskInfectedDayDesign();
      setChildRiskDecreaseDay();
      setChildRiskInfectedSeasonBaseline();
      setChildRiskInfectedSeasonDesign();
      setChildRiskDecreaseSeason();
      setChildRiskDaysBaseline();
      setChildRiskDaysDesign();
      setChildRiskDecreaseDays();

      setHypotheticalRBaseline();
      setHypotheticalRDesign();
    }

    form.addEventListener('change', function () {
      formData = new FormData(form);
      // console.log('change');
      init();
    });

    init();
    setSickDays();
    setVaccinatedOver();
    setVaccinatedUnder();
  }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
      // Check if required elements exist before initializing
      const form = document.querySelector('[data-iz-form]');
      if (!form) {
        console.error('Could not find form with [data-iz-form] attribute');
        return;
      }
  
      // Initialize the class only if we found the required elements
      const influenzav2Instance = new Influenzav2(document.body);
      console.log('Influenzav2 initialized successfully');
    } catch (error) {
      console.error('Error initializing Influenzav2:', error);
    }
  });