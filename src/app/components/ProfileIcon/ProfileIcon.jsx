import React from 'react'

const getShortName = userInfo => {
  return 'TM'
}

const getFullName = userInfo => {
  return 'Tom Watts'
}

const ProfileIcon = props => {
  const { profileInfo } = props
  const shortName = getShortName(profileInfo)
  const fullName = getFullName(profileInfo)

  return (
    <div className='profile-icon'>
      <div className='profile-icon__circle'>{shortName}</div>
      <div className='profile-icon__name'>{fullName}</div>
    </div>
  )
}
export default ProfileIcon
