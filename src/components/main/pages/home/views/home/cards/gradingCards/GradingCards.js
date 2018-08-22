import React from 'react';
import View from 'components/main/pages/home/views/View';
import GradingCardRow from 'components/main/items/rows/GradingCardRow';
import RecorderBar from 'components/audio/RecorderBar';

class GradingCards extends View {

  constructor(props){
    super(props);
    this.init(this.props);
    //this.initGradingCards(props);
    this.state = {
      selected: 0,
      gradingCardsInited: false,

      commenting: false,
      audioCommenting: false,

      audioCommentsBlob:{},
      blobFetched: false
    }
  }

  async getAudioCommentsBlob(newProps){
    if(this.state.blobFetched){ return; }
    this.setState({
      blobFetched: true
    })
    this.init(newProps);
    const gradingCards = this.getGradingCards();
    if(!gradingCards){ console.log('no gradingCards!'); return; }
    for(var i=0;i<gradingCards.length;i++){
      if(!gradingCards[i].audioComment){ continue; }
      const url = await this.func.url(gradingCards[i].audioComment, 'audioComment');
      const res = await fetch(url);
      const blob = await res.blob();
      //console.log(blob);
      var newAudioCommentsBlob = {...this.state.audioCommentsBlob};
      newAudioCommentsBlob[gradingCards[i].audioComment] = blob;
      this.setState({
        audioCommentsBlob: newAudioCommentsBlob
      })
    }
  }

  componentDidMount(){
    this.init(this.props);
    this.getCards(this.props);
  }

  componentWillReceiveProps(newProps){
    this.checkInit(newProps);
    this.getAudioCommentsBlob(newProps);
  }

  checkInit(props){
    const studentProject = this.store.studentProjects.viewingStudentProject;
    const gradingCards = this.store.cards.gradingCards[studentProject._id];
    if(!gradingCards){
      //console.log('componentWillReceiveProps')
      this.initGradingCards(props);
    }
  }

  getCards(props){
    const studentProject = this.store.studentProjects.viewingStudentProject;

    const cardsToGet = [];
    const cardsToShow = studentProject.cards;

    for(var i=0;i<cardsToShow.length;i++){
      if(this.func.getCardById(cardsToShow[i]) === null){
        cardsToGet.splice(0,0, cardsToShow[i]);
      }
    }
    if(cardsToGet.length > 0){
      this.actions.cards.getCards(cardsToGet);
    }else{
      this.checkInit(this.props);
    }
  }

  initGradingCards(props){
    if(this.state.gradingCardsInited){
      return;
    }
    //console.log('initGradingCards')
    const studentProject = this.store.studentProjects.viewingStudentProject;
    const cards = [];
    const cardsId = studentProject.cards;
    for(var i=0;i<cardsId.length;i++){
      const card = this.func.getCardById(cardsId[i]);
      if(card === null){ return; }
      cards.splice(0,0, card);
    }
    if(cards.length === studentProject.cards.length){
      this.setState({
        gradingCardsInited: true
      })
      this.actions.cards.gradeCards(studentProject._id, cards);
    }
  }

  gradingCardsList(gradingCards){
    const listStyle = {...this.bs, ...this.ui.styles.list, ...{
      height: (this.bs.height * 0.92) - (this.bs.width * 0.2),
      justifyContent: 'flex-start',
      backgroundColor: this.ui.colors.ultraLightGrey
    }}
    const containerStyle = {...this.ui.styles.container, ...{
      width: '100%',
      margin: this.bs.width * 0.02,
      flexShrink: 0
    }}
    return(
      <div id='list' style={listStyle}>
        {gradingCards.map((card, i)=>{
          return(
            <div key={i} style={containerStyle}>
              <GradingCardRow
              selected={this.state.selected}
              index={i}
              app={this.app}
              card={card}
              onClick={()=>{this.onRowSelect(i)}} />
            </div>
          )
        })}
        {this.gap(this.bs.width * 0.3)}
      </div>
    )
  }

  onRowSelect(index){
    this.setState({ selected: index});
    const gradingCards = this.getGradingCards();
    const comment = document.getElementById('comment');
    if(comment){
      comment.value = gradingCards[index].comment;
    }
  }

  gradingPanel(){
    const style = {...this.ui.styles.area, ...{
      height: this.bs.width * 0.2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: this.ui.colors.lightGrey,
      borderTop: '2px solid ' + this.ui.colors.darkGrey,
    }}
    const container = {...this.ui.styles.container, ...{
      width: '20%',
      height: '100%'
    }}
    return(
      <div style={style}>
        <div style={container}>{this.buttons.gradingFailed(()=>{this.grading('failed')})}</div>
        <div style={container}>{this.buttons.gradingPassed(()=>{this.grading('passed')})}</div>
        <div style={container}>{this.buttons.gradingFeatured(()=>{this.grading('featured')})}</div>
        <div style={container}>{this.buttons.gradingComment(()=>{this.toggleCommentPanel()})}</div>
        <div style={container}>{this.buttons.gradingAudioComment(()=>{this.toggleAudioCommentPanel()})}</div>
      </div>
    )
  }

  toggleCommentPanel(){
    this.setState({
      commenting: !this.state.commenting,
      audioCommenting: false
    })
  }

  toggleAudioCommentPanel(){
    this.setState({
      commenting: false,
      audioCommenting: !this.state.audioCommenting
    })
  }

  commentPanel(gradingCard){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: this.bs.width * 0.2,
      backgroundColor: this.ui.colors.lightGrey,
      borderTop: '2px solid ' + this.ui.colors.darkGrey,
      borderBottom: '2px solid ' + this.ui.colors.darkGrey,
      position: 'absolute',
      bottom: this.bs.width * 0.2
    }}
    return(
      <div style={style}>
        {this.inputs.textArea('comment', ['This card has no comment!','此卡片未有評論!'], gradingCard.comment, (e)=>{this.commenting(e)}, ['95%', '90%'])}
      </div>
    )
  }

  audioCommentPanel(gradingCard){
    const style = {...this.ui.styles.area, ...this.ui.styles.container, ...{
      height: this.bs.width * 0.2,
      backgroundColor: this.ui.colors.lightGrey,
      borderTop: '2px solid ' + this.ui.colors.darkGrey,
      borderBottom: '2px solid ' + this.ui.colors.darkGrey,
      position: 'absolute',
      bottom: this.bs.width * 0.2
    }}
    const audioBlob =
    gradingCard.audioCommentBlob? gradingCard.audioCommentBlob:
    gradingCard.audioComment? this.state.audioCommentsBlob[gradingCard.audioComment]:
    null;

    return(
      <div style={style}>
        <RecorderBar app={this.app} scale={['75%','100%']} audioBlob={audioBlob} onStopRecording={this.onStopRecording.bind(this)} canRemove={true}/>
      </div>
    )
  }

  render() {
    this.init(this.props);
    const gradingCards = this.getGradingCards();
    if(!gradingCards){
      return null;
    }
    const gradingCard = gradingCards[this.state.selected];
    return(
      <div style={this.viewStyle()}>
        {this.gradingCardsList(gradingCards)}
        {this.state.commenting && this.commentPanel(gradingCard)}
        {this.state.audioCommenting && this.audioCommentPanel(gradingCard)}
        {this.gradingPanel()}
      </div>
    )
  }

  getGradingCards(){
    const studentProject = this.store.studentProjects.viewingStudentProject;
    return this.store.cards.gradingCards[studentProject._id];
  }

  onCardChange(grade, comment, audioCommentBlob, removeAudio){
    const studentProjectId = this.store.studentProjects.viewingStudentProject._id;
    var gradingCard = {...this.store.cards.gradingCards[studentProjectId][this.state.selected]};
    if(grade){ gradingCard.grade = grade; gradingCard.edited = true;}
    if(comment || comment === ''){ gradingCard.comment = comment; gradingCard.edited = true;}
    if(audioCommentBlob || removeAudio){
      gradingCard.audioCommentBlob = audioCommentBlob;
      gradingCard.audioCommentEdited = true;

      var newAudioCommentsBlob = {...this.state.audioCommentsBlob};
      delete newAudioCommentsBlob[gradingCard.audioComment];
      this.setState({
        audioCommentsBlob: newAudioCommentsBlob
      })
      gradingCard.audioComment = removeAudio? null: 'newAudioComment';
    }
    this.actions.cards.gradeCard(studentProjectId, this.state.selected, gradingCard);
  }

  onStopRecording(blob){
    this.onCardChange(null, null, blob, blob === null);
  }

  grading(grade){
    this.onCardChange(grade);
    if(this.state.selected < this.getGradingCards().length - 1){
      clearTimeout(this.autoScroll);
      this.autoScroll = setTimeout(()=>{
        this.scrollToNext(this.state.selected);
        this.onRowSelect(this.state.selected + 1);
      }, 500);
    }
  }

  scrollToNext(index){
    const row = document.getElementById('row' + index);
    const scrollValue = row.offsetHeight + this.bs.width * 0.04;
    document.getElementById("list").scrollBy(0, scrollValue);
  }

  commenting(e){
    var comment = e.target.value;
    this.onCardChange(null, comment? comment:'');
  }

}

export default GradingCards;
