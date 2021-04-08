import React from 'react';
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getWorkingDays } from '../../controllers/WorkingDaysController'

class WorkingDays extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            groups: [],
            search: '',
        };
    }

    componentDidMount() {
        getWorkingDays()
            .then(result => {
                this.setState({ loading: false, groups: result });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            })
    }

    Loading = () => ( < tr >
        <
        td className = "text-center"
        colSpan = { 6 } >
        <
        div className = "d-flex justify-content-center mt-1" >
        <
        div className = "spinner-border spinner-border-sm"
        role = "status" >
        <
        /div> 

        <
        h6 className = "px-2 font-08" > Loading Records. < /h6>

        <
        /div> </td > < /tr>
    );

    NoResult = () => ( < tr > < td className = "text-center"
        colSpan = { 6 } >
        <
        div className = "d-flex justify-content-center mt-1" >
        <
        h6 className = "px-2 font-08" > Sorry, No Result Found!
        <
        /h6>  < /
        div > <
        /td>  < /
        tr >
    );

    search = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    render() {
        const { loading, groups } = this.state;

        return ( < div className = "app" >
            <
            Sidebar activemenu = { 'WORKING_DAYS' }
            submenu = { 'DAYS_LIST' }
            /> <main > <
            div className = "container-fluid" >
            <
            div className = "row" >
            <
            div className = "col-12 shadow-sm rounded bg-white mt-1" >
            <
            h6 className = "text-header py-3 mb-0 font-weight-bold line-hight-1" > Working Days Groups < br > < /br> <span className = "text-muted small" > Details about groups </span > < /h6 > < /
            div >

            <
            div className = "col-12 shadow-sm rounded bg-white mt-2" >
            <
            input type = 'text'
            onChange = { this.search }
            placeholder = "Search Anything..."
            className = "form-control form-control-sm mt-3 mb-3" / >
            <
            table class = "table borderless customtable" >
            <
            thead >
            <
            tr >
            <
            th className = "font-08 text-dark2 " > List ID < /th>        <
            th className = "font-08 text-dark2 " > List Name < /th>  <
            th className = "font-08 text-dark2 " > #No of Days < /th>  <
            th className = "font-08 text-dark2 " > Days List < /th> <
            th className = "font-08 text-dark2 " > Working Time < /th> <th className = "font-08 text-dark2 " > Actions < /th > < tr > <
            /thead > <tbody > { loading && < this.Loading / >
        }

        {!loading && groups.length == 0 && < this.NoResult / > }

        {!loading && groups.length > 0 && < this.LoadData / > }

        <
        /tbody> < /
        table > <
            /div>   < /
            div > <
            /div>   < /
            main > <
            /div>
    );
}

LoadData = () => {
        const { groups, search } = this.state;
        var filtered = groups;

        if (search.length > 0) {
            filtered = groups.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        return filtered.map((row, i) => ( < tr key = { i } >
                    <
                    td > {
                        ("0" + (i + 1)).slice(-2)
                    } < /td> <td > { row.name } < /
                    td > < td > { row.daycount }
                    Days < /td >

                    <
                    td > { row.dayslist.toString() } < /td>  <
                    td > { moment(row.start_time, 'HH:mm:ss').format('hh:mm A') }: { moment(row.end_time, 'HH:mm:ss').format('hh:mm A') } <
                    /td> <td > < Link to = { `/workingdays / timeslots / $ { row._id }
                    ` } >
 <span className = "badge badge-info rounded-0 bg-white text-primary border border-info click font-weight-bold " > More Info 
</span> </Link > <Link to = { ` / workingday / delete / $ { row._id }
                    ` } >
 < span className = "ml-1 badge badge-danger rounded-0 bg-white text-danger border border-danger click font-weight-bold " > Remove
  </span> < /
            Link > <
            /td> < /
            tr >
        ));

    }
}

export default WorkingDays;