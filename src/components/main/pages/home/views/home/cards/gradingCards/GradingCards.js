import React from 'react';
import View from 'components/main/pages/home/views/View';
import GradingCardRow from 'components/main/items/rows/GradingCardRow';
import RecorderBar from 'components/audio/RecorderBar';

class GradingCards extends View {

  constructor(props){
    super(props);

    this.init(props);
    this.state = {
      selected: 0,
      commenting: false,
      audioCommenting: false
    }
  }

  componentDidMount(){
    this.getCards(this.props);
  }

  componentWillReceiveProps(newProps){
    const app = this.props.app;
    const studentProject = app.store.studentProjects.viewingStudentProject;
    const gradingCards = app.store.cards.gradingCards[studentProject._id];
    if(!gradingCards){
      this.init(newProps);
    }
  }

  getCards(props){
    const app = props.app;
    const func = app.functions;
    const studentProject = app.store.studentProjects.viewingStudentProject;

    const cardsToGet = [];
    const cardsToShow = studentProject.cards;

    for(var i=0;i<cardsToShow.length;i++){
      if(func.getCardById(cardsToShow[i]) === null){
        cardsToGet.splice(0,0, cardsToShow[i]);
      }
    }
    if(cardsToGet.length > 0){
      app.actions.cards.getCards(cardsToGet);
    }
  }

  init(props){
    const app = props.app;
    const actions = app.actions;
    const func = app.functions;
    const studentProject = app.store.studentProjects.viewingStudentProject;
    const cards = [];
    const cardsId = studentProject.cards;
    for(var i=0;i<cardsId.length;i++){
      const card = func.getCardById(cardsId[i]);
      if(card === null){ return; }
      cards.splice(0,0, card);
    }
    actions.cards.gradeCards(studentProject._id, cards);
  }

  gradingCardsList(gradingCards){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const listStyle = {...bs, ...ui.styles.list, ...{
      height: (bs.height * 0.92) - (bs.width * 0.2),
      justifyContent: 'flex-start',
      backgroundColor: ui.colors.ultraLightGrey
    }}
    const containerStyle = {...ui.styles.container, ...{
      width: '100%',
      margin: bs.width * 0.02,
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
              app={this.props.app}
              card={card}
              onClick={()=>{this.onRowSelect(i)}} />
            </div>
          )
        })}
        {this.gap(bs.width * 0.3)}
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
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const style = {...ui.styles.area, ...{
      height: bs.width * 0.2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: ui.colors.lightGrey,
      borderTop: '2px solid ' + ui.colors.darkGrey,
    }}
    const container = {...ui.styles.container, ...{
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
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const style = {...ui.styles.area, ...ui.styles.container, ...{
      height: bs.width * 0.2,
      backgroundColor: ui.colors.lightGrey,
      borderTop: '2px solid ' + ui.colors.darkGrey,
      borderBottom: '2px solid ' + ui.colors.darkGrey,
      position: 'absolute',
      bottom: bs.width * 0.2
    }}
    return(
      <div style={style}>
        {this.inputs.textArea('comment', ['95%', '90%'], '100%', gradingCard.comment, (e)=>{this.commenting(e)}, ['This card has no comment!','此卡片未有評論!'])}
      </div>
    )
  }

  audioCommentPanel(gradingCard){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const style = {...ui.styles.area, ...ui.styles.container, ...{
      height: bs.width * 0.2,
      backgroundColor: ui.colors.lightGrey,
      borderTop: '2px solid ' + ui.colors.darkGrey,
      borderBottom: '2px solid ' + ui.colors.darkGrey,
      position: 'absolute',
      bottom: bs.width * 0.2
    }}
    const audioBlob = gradingCard.audioComment;
    return(
      <div style={style}>
        <RecorderBar app={app} scale={['75%','100%']} audioBlob={audioBlob} onStopRecording={this.onStopRecording.bind(this)} canRemove={true}/>
      </div>
    )
  }

  render() {
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
    const app = this.props.app;
    const studentProject = app.store.studentProjects.viewingStudentProject;
    return app.store.cards.gradingCards[studentProject._id];
  }

  onCardChange(grade, comment, audioComment, removeAudio){
    const app = this.props.app;
    const actions = app.actions;
    const studentProjectId = app.store.studentProjects.viewingStudentProject._id;
    var gradingCard = app.store.cards.gradingCards[studentProjectId][this.state.selected];
    if(grade){ gradingCard.grade = grade; gradingCard.edited = true;}
    if(comment || comment === ''){ gradingCard.comment = comment; gradingCard.edited = true;}
    if(audioComment || removeAudio){ gradingCard.audioComment = audioComment; gradingCard.audioCommentEdited = true;}
    actions.cards.gradeCard(studentProjectId, this.state.selected, gradingCard);
  }

  onStopRecording(blob){
    this.onCardChange(null, null, blob, blob === null);
  }

  grading(grade){
    this.onCardChange(grade);
    if(this.state.selected < this.getGradingCards().length - 1){
      this.onRowSelect(this.state.selected + 1);
    }
    this.scrollToNext(this.state.selected)
  }

  scrollToNext(index){
    const app = this.props.app;
    const ui = app.store.ui;
    const bs = ui.basicStyle;
    const row = document.getElementById('row' + index);
    const scrollValue = row.offsetHeight + bs.width * 0.04;
    document.getElementById("list").scrollBy(0, scrollValue)
  }

  commenting(e){
    var comment = e.target.value;
    this.onCardChange(null, comment? comment:'');
  }

}

export default GradingCards;
