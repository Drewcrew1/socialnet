import React from 'react';
import isEmpty from '../../validation/is-empty';
class ProfileHeader extends React.Component{
    render(){
        const {profile} = this.props;
console.log(profile);
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img className="rounded-circle"
                                     src={profile.profile.user.avatar}
                                     alt=""/>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="display-4 text-center">{profile.profile.user.name}</h1>
                            <p className="lead text-center">{profile.profile.status} {isEmpty(profile.profile.company) ? null : (<span> at {profile.profile.company}</span>)}</p>
                            {isEmpty(profile.profile.location) ? null : (<p>{profile.profile.location}</p>)}
                            <p>
                                {isEmpty(profile.profile.website) ? null : (
                                    <a className="text-white p-2"  href={profile.profile.website} target='_blank'>
                                        <i className="fas fa-globe fa-2x"></i>
                                    </a>
                                ) }

                                {isEmpty(profile.profile.social && profile.profile.social.twitter) ? null : (
                                    <a className="text-white p-2"  href={profile.profile.social.twitter} target='_blank'>
                                        <i className="fab fa-twitter fa-2x"></i>
                                    </a>
                                ) }
                                {isEmpty(profile.profile.social && profile.profile.social.facebook) ? null : (
                                    <a className="text-white p-2"  href={profile.profile.social.facebook} target='_blank'>
                                        <i className="fab fa-facebook fa-2x"></i>
                                    </a>
                                ) }
                                {isEmpty(profile.profile.social && profile.profile.social.instagram) ? null : (
                                    <a className="text-white p-2"  href={profile.profile.social.instagram} target='_blank'>
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </a>
                                ) }
                                {isEmpty(profile.profile.social && profile.profile.social.youtube) ? null : (
                                    <a className="text-white p-2"  href={profile.profile.social.youtube} target='_blank'>
                                        <i className="fab fa-youtube fa-2x"></i>
                                    </a>
                                ) }
                                {isEmpty(profile.profile.social && profile.profile.social.linkedin) ? null : (
                                    <a className="text-white p-2"  href={profile.profile.social.linkedin} target='_blank'>
                                        <i className="fab fa-linkedin fa-2x"></i>
                                    </a>
                                ) }

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;