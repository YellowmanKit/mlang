import React from 'react';
import UI from 'components/UI';
import Sound from 'react-sound';

class CardBar extends UI {

  constructor(props){
    super(props);
    this.init(props);
    this.state = {
      expended: false,
      audioCommentUrl: null,
      playAudioComment: false
    }
    this.getAudioUrl();
  }

  componentWillReceiveProps(newProps){
    this.init(newProps);
    this.getAudioUrl();
  }

  async getAudioUrl(){
    const url = await this.func.url(this.store.cards.viewingCard.audioComment, 'audioComment');
    this.setState({
      audioCommentUrl: url
    })
  }

  render(){
    this.init(this.props);
    const expended = this.state.expended;
    const card = this.store.cards.viewingCard;

    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      position: 'absolute',
      justifyContent: 'flex-start',
      bottom: this.bs.width * 0.05,
      right: expended? -this.bs.width * 0.075: -this.bs.width * 0.365,
      height: this.bs.width * 0.125,
      width: this.bs.width * 0.45,
      borderRadius: '35px',
      backgroundColor: expended? 'rgba(0,0,0,0.85)': 'rgba(0,0,0,0.25)'
    }}

    return(
      <div style={style}>
        {this.verGap('1%')}
        {expended && this.buttons.barCollapse(()=>{this.toggleExpend()})}
        {!expended && this.buttons.barExpend(()=>{this.toggleExpend()})}
        {this.verGap('6%')}
        {this.buttons.barComment(()=>{this.actions.main.enlargeText(card.comment)}, card.comment !== '')}
        {this.verGap('6%')}
        {this.buttons.barAudioComment(()=>{this.toggleAuidioComment()}, card.audioComment)}
        {this.state.playAudioComment &&
          <Sound
          url={this.state.audioCommentUrl}
          playStatus={Sound.status.PLAYING}
          onFinishedPlaying={this.toggleAuidioComment.bind(this)}/>}
      </div>
    )
  }

  toggleAuidioComment(){
    this.setState({
      playAudioComment: !this.state.playAudioComment
    })
  }

  toggleExpend(){
    this.setState({
      expended: !this.state.expended
    })
  }
}

export default CardBar;
