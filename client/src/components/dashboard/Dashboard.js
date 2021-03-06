import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {Link} from 'react-router-dom';
import {getCurrentProfile, deleteAccount} from '../../actions/profileActions';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

 class Dashboard extends React.Component {
     //branch 10 merge10
     componentDidMount(){
         this.props.getCurrentProfile();
     }
     onDelete = (e) => {
         this.props.deleteAccount();
     }
    render(){
         const {user} = this.props.auth;
         const {profile,loading} = this.props.profile;

         let dashboardContent;
         if(profile === null || loading){
             dashboardContent = <Spinner />;
         }else{
             if(Object.keys(profile).length > 0){
                 dashboardContent = <div>
             <p className='lead text-muted'>Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                <ProfileActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                     <div style={{marginBottom: '60px'}} >
                        <button onClick={this.onDelete} className='btn btn-danger'>Delete my Account</button>
                     </div>
                 </div>
             }else {
                 dashboardContent = (
                   <div>
                        <p className='lead text-muted'>Welcome {user.name}</p>
                     <p>You have not a profile please set up a profile</p>
                     <Link to='/create-profile' className='btn btn-lg btn-info'> Create Profile </Link>
                   </div>
                 );
             }

         }
        return(
            <div className='dashboard'>
            <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
            <h1 className='display-4'>Dashboard</h1>
        {dashboardContent}
        </div>
            </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
     profile: state.profile,
         auth: state.auth
});
export default connect(mapStateToProps, {getCurrentProfile,deleteAccount})(Dashboard);