import React from 'react';
import UI from 'components/UI';

import icon_student from 'resources/images/icons/student.png';
import cards from 'resources/images/icons/cards_lightgrey.png';
import star2 from 'resources/images/icons/star2_lightgrey.png';

class ProfileRow extends UI {

  info(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const infoStyle = Object.assign({}, ui.basicStyle, {
      width: '72%',
      height: bs.height * 0.12,
      marginLeft: bs.height * 0.02
    })
    return(
      <div style={infoStyle}>
        {this.profileName()}
        {this.infoRow()}
      </div>
    )
  }

  profileName(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const nameStyle = {
      width: '100%',
      height: bs.height * 0.06,
      fontWeight: 'bold',
      fontSize: '125%'
    }
    return <div style={nameStyle}>{this.props.profile.name}</div>
  }

  infoRow(){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const profile = this.props.profile;

    const rowStyle = Object.assign({}, ui.areaStyle, {
      width: '100%',
      height: bs.height * 0.06,
      alignItems: 'center'
    })
    const iconSize = bs.height * 0.05;
    const textScale = [bs.height * 0.06,bs.height * 0.04];
    return(
      <div style={rowStyle}>
        {this.icon(cards, [iconSize, iconSize])}
        {this.textDisplay(profile.cardCount, textScale, '150%', ui.deepDarkGrey)}
        {this.icon(star2, [iconSize, iconSize])}
        {this.textDisplay(profile.featuredCount, textScale, '150%', ui.deepDarkGrey)}
      </div>
    )
  }

  render(){
    if(this.props.profile === null){
      return null;
    }
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;

    const rowStyle = Object.assign({}, ui.areaStyle, {
      flexShrink: 0,
      height: bs.height * 0.15,
      borderBottom: '1px solid ' + ui.darkGrey,
      alignItems: 'center'
    })

    return(
      <div style={rowStyle}>
        {this.verGap('3%')}
        {this.rowIcon(icon_student)}
        {this.info()}
      </div>
    )
  }
}

export default ProfileRow;
