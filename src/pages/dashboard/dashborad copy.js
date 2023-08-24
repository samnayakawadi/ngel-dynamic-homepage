import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BreadcrumbBox } from '../../components/common/Breadcrumb'
import FooterTwo from '../../components/FooterTwo'
import HeaderTwo from '../../components/HeaderTwo'
import { Styles } from './styles/dashborad.js'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import UserService from '../../services/UserService'
import service from '../../services/service'
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const chardata = [
    [24.2, 'Hyderabad'],
    [20.8, 'Banglore'],
    [14.9, 'Ranchi'],
    [13.7, 'Kolokata'],
    [13.1, 'Indore'],
    [12.7, 'Bhopal'],
    [12.4, 'Mumbai'],
    [12.2, 'Chandigarh'],
    [12.0, 'Agra'],
    [11.7, 'Delhi'],
    [11.5, 'Pune'],
    [9.3, 'Noida']
];
const chardata1 = [
    [28.2, 'India'],
    [24.8, 'Japan'],
    [20.9, 'China'],
    [17.7, 'USA'],
    [15.1, 'Dubai'],
    [12.7, 'Africa'],
    [10.4, 'Canada'],
    [7.2, 'Tokyo'],
    [5.0, 'Malesiya'],
    [3.7, 'Koria'],
    [1.5, 'Indonesia'],
    [9.3, 'Sri Lanka']
];

const chardata2 = [
    [28.2, 'India'],
    [24.8, 'Japan'],
    [20.9, 'China'],
    [17.7, 'USA'],
    [15.1, 'Dubai'],
    [12.7, 'Africa'],
    [10.4, 'Canada'],
    [7.2, 'Tokyo'],
    [5.0, 'Malesiya'],
    [3.7, 'Koria'],
    [1.5, 'Indonesia'],
    [9.3, 'Sri Lanka']
];

const courseProgress = [
    [40, 'Completed'],
    [35, 'In Progress'],
    [25, 'Not Started']
]



const chartOptions1 = {
    chart: {
        backgroundColor: '#e1f2ef',
        type: 'pie',
    },
    title: {
        text: 'Course Progress, By Status'
    },
    credits: {
        enabled: false,
    },
    exporting: {
        enabled: true
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
        {
            data: courseProgress,
            showInLegend: true,
            keys: ["y", "name", 'selected', 'sliced'],
            allowPointSelect: true,
        }
    ]
};

const chartOptions2 = {
    chart: {
        backgroundColor: '#e1f2ef',
        type: 'bar'
    },
    title: {
        text: 'Time Spending Learning, By Month'
    },
    plotOptions: {
        series: {
            colorByPoint: true,
            colors: ['#FF0000', '#00FFFF', '#0000FF', '#00008B', '#ADD8E6', '#728FCE', '#82CAFF', '#9AFEFF', '#93FFE8', '#3EB489', '#728C00', '#FFEBCD']
        }
    },
    credits: {
        enabled: false,
    },
    exporting: {
        enabled: true
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
        {
            data: chardata1,
            keys: ["y", "name"],
        },
        {
            data: chardata,
            keys: ["y", "name"],
            color: "black",
        }
    ]
};

const chartOptions3 = {
    chart: {
        backgroundColor: '#e1f2ef',
        type: 'area'
    },
    title: {
        text: 'Active User, By Month'
    },
    plotOptions: {
        series: {
            colorByPoint: true,
            colors: ['#FF0000', '#00FFFF', '#0000FF', '#00008B', '#ADD8E6', '#728FCE', '#82CAFF', '#9AFEFF', '#93FFE8', '#3EB489', '#728C00', '#FFEBCD']
        }
    },
    credits: {
        enabled: false,
    },
    exporting: {
        enabled: true
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
        {
            data: chardata1,
            keys: ["y", "name"],
        },
        {
            data: chardata,
            keys: ["y", "name"],
            color: "black",
        }
    ]
};


const chartOptions4 = {
    chart: {
        backgroundColor: '#e1f2ef',
        type: 'column'
    },
    title: {
        text: 'Learner Login, By Month'
    },
    credits: {
        enabled: false,
    },
    plotOptions: {
        series: {
            colorByPoint: true,
            colors: ['#FF0000', '#00FFFF', '#0000FF', '#00008B', '#ADD8E6', '#728FCE', '#82CAFF', '#9AFEFF', '#93FFE8', '#3EB489', '#728C00', '#FFEBCD']
        }
    },
    exporting: {
        enabled: true
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [
        {
            data: chardata2,
            keys: ["y", "name"],
        },
        {
            data: chardata,
            keys: ["y", "name"],
            color: "black",
        }
    ]
};

function Dashborad() {

    const [getTimeDur, setTimeDur] = useState([]);
    const [getContentTimeDur, setContentTimeDur] = useState([]);
    let userId = UserService.getUserid();
    useEffect(() => {
        service.userLoginDuration(userId)
            .then(res => {
                setTimeDur(res.data);
            })
        service.userContentAccessDur(userId)
            .then(res => {
                setContentTimeDur(res.data);
            })
    }, [])




    let data1 = getTimeDur.map((d) => {
        return d.time + "," + d.month + "," + d.year
    })

    var arr1 = [];
    var month = [];
    var myStringArray = data1;
    var arrayLength = myStringArray.length;
    for (var i = 0; i < arrayLength; i++) {
        var minutes = [];
        var hms = myStringArray[i];
        var b = hms.split(',');
        b.shift();
        var lastItem = b.pop();
        var a = hms.split(':');
        if (b == "1") {
            b = `Jan, ${lastItem}`
        } else if (b == "2") {
            b = `Feb, ${lastItem}`
        } else if (b == "3") {
            b = `Mar, ${lastItem}`
        } else if (b == "4") {
            b = `Apr, ${lastItem}`
        } else if (b == "5") {
            b = `May, ${lastItem}`
        } else if (b == "6") {
            b = `Jun, ${lastItem}`
        } else if (b == "7") {
            b = `Jul, ${lastItem}`
        } else if (b == "8") {
            b = `Aug, ${lastItem}`
        } else if (b == "9") {
            b = `Sep, ${lastItem}`
        } else if (b == "10") {
            b = `Oct, ${lastItem}`
        } else if (b == "11") {
            b = `Nov, ${lastItem}`
        } else if (b == "12") {
            b = `Dec, ${lastItem}`
        }
        month.push(b);
        minutes.push((+a[0]) * 60 + (+a[1]), b.toString())
        arr1.push(minutes)
    }


    const chartOptions = {
        chart: {
            backgroundColor: '#e1f2ef',
            type: 'column'
        },
        title: {
            text: 'Time Spending Lear, By Month'
        },
        plotOptions: {
            series: {
                colorByPoint: true,
                colors: ['#FF0000', '#00FFFF', '#0000FF', '#00008B', '#ADD8E6', '#728FCE', '#82CAFF', '#9AFEFF', '#93FFE8', '#3EB489', '#728C00', '#FFEBCD']
            }
        },
        credits: {
            enabled: false,
        },
        yAxis: {
            title: {
                text: 'Value in Minutes'
            }
        },
        xAxis: {
            categories: month
        },
        exporting: {
            enabled: true
        },
        series: [
            {
                data: arr1,
                enablePolling: true,
                keys: ["y", "name"],
                color: "#00FF00",
            },
        ]
    };



    return (

        <Styles>

            {/* Main Wrapper */}
            <div className="main-wrapper dashboard-page">

                <HeaderTwo />

                {/* Breadcroumb */}
                <BreadcrumbBox title="Dashborad" />

                <section className="dashboard-page-area">
                    <Container className>
                        <Row>
                            <Col lg="4">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={""}
                                    options={chartOptions}
                                />
                            </Col>
                            <Col lg="4">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={""}
                                    options={chartOptions1}
                                />
                            </Col>
                            <Col lg="4">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={""}
                                    options={chartOptions2}
                                />
                            </Col>
                        </Row>
                        <br></br><br></br>
                        <Row>
                            <Col>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={""}
                                    options={chartOptions3}
                                />
                            </Col>
                            <Col>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={""}
                                    options={chartOptions4}
                                />
                            </Col>
                        </Row>
                    </Container>

                </section>

                {/* Footer 2 */}
                <FooterTwo />
            </div>
        </Styles>

    )
}
export default Dashborad