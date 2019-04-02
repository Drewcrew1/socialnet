import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProfileByHandle} from '../../actions/profileActions';
class Profile extends React.Component{
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/not-found');
        }
    }
    render(){
        const {profile, loading} = this.props;
        let profileContent;

        if(profile === null || loading){
            profileContent = <Spinner/>

        }else {
            profileContent = (
                <div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Link to='/profiles' className='btn btn-light mb-3 float-left'>
                                Back to Profiles
                            </Link>
                        </div>

                    </div>
                    <div className='col-md-6'>
                        <ProfileHeader profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <ProfileCreds education={profile.profile.education} experience={profile.profile.experience}/>
                        {profile.profile.githubusername ? (<ProfileGithub profile={profile} username={profile.profile.githubusername}/>) : null}

                    </div>
                </div>
            );
        }

        return(
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(Profile);