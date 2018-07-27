import React from 'react';
import UI from 'components/UI';

import badge_failed from 'resources/images/icons/badges/badge_corner_failed.png';
import badge_passed from 'resources/images/icons/badges/badge_corner_passed.png';
import badge_featured from 'resources/images/icons/badges/badge_corner_featured.png';


class Badge extends UI {

  render(){
    const scale = this.props.scale;
    const badgeStyle = {
      width: scale[0],
      height: scale[1],
      position: 'absolute',
      top: -2,
      right: -2
    }
    const grade = this.props.grade;
    const icon =
    grade === 'notGraded'? '':
    grade === 'failed'? badge_failed:
    grade === 'passed'? badge_passed:
    grade === 'featured'? badge_featured:
    ''

    return(
      <img style={badgeStyle} src={icon} alt=''/>

    )
  }

}

export default Badge;
