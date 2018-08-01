import React from 'react';
import Row from './Row';

import icon_student from 'resources/images/icons/student_grey.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';

class ProfileRow extends Row {

  rowInfo(){
    const profile = this.props.profile;

    const rowStyle = {...this.ui.styles.area, ...{
      width: '100%',
      height: this.bs.height * 0.06,
      alignItems: 'center'
    }}
    const iconSize = this.bs.height * 0.05;
    const textScale = [this.bs.height * 0.05,''];
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(profile.cardCount, textScale, '150%', 'center')}
        {this.verGap('5%')}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(profile.featuredCount, textScale, '150%', 'center')}
      </div>
    )
  }

  render(){
    this.init(this.props);
    if(this.props.profile === null){
      return null;
    }
    const rowStyle = {...this.ui.styles.area, ...{
      flexShrink: 0,
      height: this.bs.height * 0.15,
      borderBottom: '1px solid ' + this.ui.colors.darkGrey,
      alignItems: 'center'
    }}

    return(
      <div style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon(icon_student)}
        {this.rowContent(this.props.profile.name, this.rowInfo.bind(this) )}
      </div>
    )
  }
}

export default ProfileRow;
